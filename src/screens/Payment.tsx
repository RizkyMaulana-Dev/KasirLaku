import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore, cartTotal } from '../lib/store';
import { db } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';

export default function Payment() {
  const navigate = useNavigate();
  const cashierName = useAppStore((s) => s.cashierName);
  const cartItems = useAppStore((s) => s.cartItems);
  const clearCart = useAppStore((s) => s.clearCart);
  const [method, setMethod] = useState<'cash' | 'qris' | 'transfer'>('cash');
  const [received, setReceived] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const keyRef = useRef(uuidv4());

  const total = cartTotal(cartItems);
  const receivedNum = Number(received) || 0;
  const change = Math.max(0, receivedNum - total);
  const canPayCash = receivedNum >= total;

  const handlePay = async () => {
    if (method === 'cash' && !canPayCash) return;
    setProcessing(true);
    setError('');

    try {
      await db.transaction('rw', db.products, db.orders, db.payments, async () => {
        const existing = await db.payments.where('idempotencyKey').equals(keyRef.current).first();
        if (existing) throw new Error('Transaksi sudah diproses (idempotency)');

        const amountReceived = method === 'cash' ? receivedNum : total;
        const chg = method === 'cash' ? change : 0;
        const status = method === 'cash' ? 'success' : 'pending';

        const orderId = await db.orders.add({
          orderNumber: `#${Date.now().toString().slice(-6)}`,
          status: method === 'cash' ? 'completed' : 'active',
          cashierName: cashierName || 'unknown',
          items: cartItems,
          total,
          paymentMethod: method,
          amountReceived,
          change: chg,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        await db.payments.add({
          orderId: orderId as number,
          method,
          amountReceived,
          change: chg,
          status,
          idempotencyKey: keyRef.current,
          createdAt: new Date(),
        });

        for (const item of cartItems) {
          await db.products.where('id').equals(item.productId).modify((p: any) => {
            p.stock = Math.max(0, p.stock - item.quantity);
          });
        }

        clearCart();
        keyRef.current = uuidv4();
        setSuccess(true);
      });
    } catch (e: any) {
      setError(e.message || 'Gagal menyimpan transaksi');
    } finally {
      setProcessing(false);
    }
  };

  if (!cashierName) { navigate('/login'); return null; }

  return (
    <div className="min-h-screen bg-page">
      <header className="h-[72px] border-b border-line flex items-center justify-between px-6">
        <h1 className="text-2xl font-extrabold">Pembayaran</h1>
        <button onClick={() => navigate('/kasir')} className="btn btn-secondary" disabled={processing}>
          Kembali
        </button>
      </header>

      <main className="max-w-[900px] mx-auto px-6 py-10">
        {success && (
          <div className="card mb-8 text-center" role="status">
            <h2 className="text-xl font-bold text-primary mb-2">Transaksi Berhasil</h2>
            <p className="text-muted">Struk bisa dicetak ulang dari Riwayat.</p>
            <button onClick={() => { setSuccess(false); navigate('/riwayat'); }} className="btn btn-primary mt-4">Selesai</button>
          </div>
        )}

        {!success && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-lg font-bold">Metode bayar</h2>
              <div className="grid grid-cols-3 gap-3">
                {(['cash', 'qris', 'transfer'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => { setMethod(m); setReceived(''); setError(''); }}
                    className={`h-[44px] rounded-xl border text-sm font-semibold ${
                      method === m ? 'border-primary bg-primary-soft text-primary' : 'border-control-line'
                    }`}
                  >
                    {m === 'cash' ? 'Tunai' : m === 'qris' ? 'QRIS' : 'Transfer'}
                  </button>
                ))}
              </div>

              {method === 'cash' && (
                <div className="space-y-3">
                  <label className="block">
                    <span className="block text-sm font-semibold mb-2">Uang dari pelanggan</span>
                    <input
                      className="input"
                      inputMode="numeric"
                      value={received}
                      onChange={(e) => setReceived(e.target.value)}
                      placeholder="Rp 0"
                    />
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setReceived(String(total))}
                      className="h-[44px] px-4 rounded-xl border border-control-line text-sm font-semibold"
                    >
                      Uang pas
                    </button>
                    {[50000, 100000, 150000, 200000].map((nom) => (
                      <button
                        key={nom}
                        onClick={() => setReceived(String(nom))}
                        className="h-[44px] px-4 rounded-xl border border-control-line text-sm font-semibold"
                      >
                        Rp {nom.toLocaleString('id-ID')}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(method === 'qris' || method === 'transfer') && (
                <div className="p-4 rounded-xl bg-primary-soft border border-primary" role="status">
                  <p className="text-sm text-primary-hover font-medium">Tunggu pelanggan bayar {method === 'qris' ? 'QRIS' : 'Transfer'}</p>
                  <p className="text-xs text-muted mt-1">Tekan Selesai setelah uang masuk.</p>
                </div>
              )}

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
                  {error}
                </div>
              )}
            </div>

            <div className="card space-y-4">
              <h2 className="text-lg font-bold">Ringkasan</h2>
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex justify-between text-[15px]">
                    <span>{item.productName} x{item.quantity}</span>
                    <span className="tab-nums">Rp {(item.unitPrice * item.quantity).toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-line pt-4 flex justify-between text-lg font-extrabold tab-nums">
                <span>Total</span>
                <span>Rp {total.toLocaleString('id-ID')}</span>
              </div>
              {method === 'cash' && receivedNum >= total && (
                <div className="rounded-xl p-4 bg-primary-soft flex justify-between text-lg font-extrabold tab-nums">
                  <span className="text-primary-hover">Kembalian</span>
                  <span className="text-primary-hover">Rp {change.toLocaleString('id-ID')}</span>
                </div>
              )}
              <button
                onClick={handlePay}
                disabled={processing || (method === 'cash' && !canPayCash)}
                className="btn btn-primary w-full"
              >
                {processing ? 'Menyimpan…' : method === 'cash' ? 'Selesai' : 'Simpan transaksi'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}