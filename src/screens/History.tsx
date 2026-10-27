import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/db';
import type { Order } from '../types';

export default function History() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    db.orders.orderBy('createdAt').reverse().toArray().then(setOrders);
  }, []);

  return (
    <div className="min-h-screen bg-page">
      <header className="h-[72px] border-b border-line flex items-center justify-between px-6">
        <h1 className="text-2xl font-extrabold">Riwayat</h1>
        <button onClick={() => navigate('/kasir')} className="btn btn-secondary">Kasir</button>
      </header>

      <main className="max-w-[900px] mx-auto px-6 py-10 space-y-4">
        {orders.length === 0 && (
          <p className="text-muted text-sm">Belum ada transaksi.</p>
        )}
        {orders.map((o) => (
          <div key={o.id} className="card flex items-center justify-between">
            <div>
              <div className="font-semibold">{o.orderNumber}</div>
              <div className="text-muted text-[13px]">{new Date(o.createdAt).toLocaleString('id-ID')}</div>
            </div>
            <div className="text-right">
              <div className="font-extrabold tab-nums">Rp {o.total.toLocaleString('id-ID')}</div>
              <div className="text-[13px] text-muted">{o.paymentMethod ?? '-'}</div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
