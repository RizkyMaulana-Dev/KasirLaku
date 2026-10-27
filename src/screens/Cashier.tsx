import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingCart, Wallet, LogOut, RotateCcw } from 'lucide-react';
import { useAppStore, cartTotal } from '../lib/store';
import { db } from '../lib/db';
import type { Product } from '../types';

export default function Cashier() {
  const navigate = useNavigate();
  const cashierName = useAppStore((s) => s.cashierName);
  const cartItems = useAppStore((s) => s.cartItems);
  const heldOrders = useAppStore((s) => s.heldOrders);
  const addToCart = useAppStore((s) => s.addToCart);
  const increment = useAppStore((s) => s.increment);
  const decrement = useAppStore((s) => s.decrement);
  const clearCart = useAppStore((s) => s.clearCart);
  const undo = useAppStore((s) => s.undo);
  const resumeOrder = useAppStore((s) => s.resumeOrder);
  const loadHeld = useAppStore((s) => s.loadHeld);
  const setOffline = useAppStore((s) => s.setOffline);
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Semua');
  const [undoToast, setUndoToast] = useState<{ item: CartItem } | null>(null);

  useEffect(() => {
    if (!cashierName) { navigate('/login'); return; }
    db.products.where('active').equals(1).toArray().then(setProducts);
    loadHeld();
    const onOnline = () => setOffline(false);
    const onOffline = () => setOffline(true);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    setOffline(!navigator.onLine);
    return () => { window.removeEventListener('online', onOnline); window.removeEventListener('offline', onOffline); };
  }, [cashierName, navigate, loadHeld, setOffline]);

  const filtered = products.filter((p) => {
    const matchQuery = p.name.toLowerCase().includes(query.toLowerCase());
    const matchCat = category === 'Semua' || p.category === category;
    return matchQuery && matchCat;
  });

  const categories = ['Semua', ...Array.from(new Set(products.map((p) => p.category)))];
  const total = cartTotal(cartItems);
  const lowStockNames = products.filter((p) => p.active && p.stock > 0 && p.stock <= 5).map((p) => p.name);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/bayar');
  };

  const handleRemove = (productId: number) => {
    const item = cartItems.find((c) => c.productId === productId);
    if (!item) return;
    decrement(productId);
    setUndoToast({ item });
    setTimeout(() => setUndoToast(null), 5000);
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) return;
    if (!window.confirm('Kosongkan semua pesanan?')) return;
    clearCart();
  };

  return (
    <div className="h-screen flex bg-page">
      {/* Rail */}
      <nav className="w-[88px] border-r border-line flex flex-col items-center py-4 gap-4">
        <div className="text-primary font-extrabold text-lg mb-4">KL</div>
        <button onClick={() => navigate('/kasir')} className="p-3 rounded-xl bg-primary-soft text-primary" aria-label="Kasir">
          <ShoppingCart size={22} />
        </button>
        <button onClick={() => navigate('/riwayat')} className="p-3 rounded-xl text-muted hover:bg-surface-alt" aria-label="Riwayat">
          <Wallet size={22} />
        </button>
        <button onClick={() => navigate('/produk')} className="p-3 rounded-xl text-muted hover:bg-surface-alt" aria-label="Produk">
          <span className="text-sm font-bold">P</span>
        </button>
        <button onClick={() => { clearCart(); navigate('/login'); }} className="mt-auto p-3 rounded-xl text-muted hover:bg-surface-alt" aria-label="Keluar">
          <LogOut size={22} />
        </button>
      </nav>

      {/* Product Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-extrabold">Kasir</h1>
            {(!navigator.onLine || lowStockNames.length > 0) && (
              <div className="status-strip" role="status">
                {!navigator.onLine && <span>Offline, data tetap tersimpan</span>}
                {lowStockNames.length > 0 && <span className={!navigator.onLine ? ' ml-3' : ''}>Stok menipis: {lowStockNames.join(', ')}</span>}
              </div>
            )}
          </div>

          <input
            className="input max-w-md"
            placeholder="Cari produk…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`h-[44px] px-5 rounded-full text-sm font-semibold whitespace-nowrap ${
                  category === cat ? 'bg-ink text-white' : 'bg-surface-alt text-muted hover:bg-line'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="product-grid">
            {filtered.map((p) => {
              const isOut = p.stock <= 0;
              return (
                <button
                  key={p.id}
                  onClick={() => addToCart({ productId: p.id!, productName: p.name, unitPrice: p.price, quantity: 1 })}
                  className={`card text-left transition-colors min-w-0 ${
                    isOut ? 'border-dashed bg-disabled-bg cursor-not-allowed' : 'hover:border-primary'
                  }`}
                  disabled={isOut}
                >
                  <div className="font-semibold text-sm leading-tight truncate">{p.name}</div>
                  <div className="text-muted text-xs mt-1">
                    {isOut ? 'Stok habis' : `Stok: ${p.stock}`}
                  </div>
                  <div className="text-base font-bold mt-2 tab-nums truncate">Rp {p.price.toLocaleString('id-ID')}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cart Panel */}
      <aside className="w-[380px] border-l border-line flex flex-col">
        <div className="p-6 border-b border-line">
          <h2 className="text-lg font-bold">Pesanan</h2>
        </div>

        {/* Order tabs */}
        {(heldOrders.length > 0 || cartItems.length > 0) && (
          <div className="px-4 py-2 border-b border-line flex gap-1 overflow-x-auto">
            {heldOrders.map((o) => (
              <button
                key={o.id}
                onClick={() => resumeOrder(o.id!)}
                className={`h-[44px] px-3 rounded-full text-sm font-medium whitespace-nowrap ${
                  o.id === useAppStore.getState().activeOrderId ? 'bg-primary text-white' : 'bg-surface-alt text-muted hover:bg-line'
                }`}
              >
                {o.orderNumber}
              </button>
            ))}
            <button
              onClick={() => clearCart()}
              className="h-[44px] px-3 rounded-full text-sm font-medium whitespace-nowrap bg-primary-soft text-primary hover:bg-primary hover:text-white"
              aria-label="Pesanan baru"
            >
              + Baru
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 && (
            <p className="text-muted text-sm">Belum ada pesanan. Ketuk produk untuk memulai.</p>
          )}
          {cartItems.map((item) => (
            <div key={item.productId} className="flex items-center justify-between">
              <div className="min-w-0">
                <div className="font-semibold text-[15px] truncate">{item.productName}</div>
                <div className="text-muted text-[13px] tab-nums">Rp {item.unitPrice.toLocaleString('id-ID')}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrement(item.productId)}
                  className="w-[44px] h-[44px] rounded-xl border border-control-line flex items-center justify-center"
                  aria-label={`Kurangi ${item.productName}`}
                >
                  <Minus size={18} />
                </button>
                <span className="w-8 text-center font-semibold tab-nums">{item.quantity}</span>
                <button
                  onClick={() => increment(item.productId)}
                  className="w-[44px] h-[44px] rounded-xl border border-control-line flex items-center justify-center"
                  aria-label={`Tambah ${item.productName}`}
                >
                  <Plus size={18} />
                </button>
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="w-[44px] h-[44px] rounded-xl text-danger flex items-center justify-center"
                  aria-label={`Hapus ${item.productName}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-line space-y-3">
          <div className="flex justify-between text-[15px] text-muted">
            <span>Total</span>
            <span className="font-extrabold text-ink text-lg tab-nums">Rp {total.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex gap-3">
            <button onClick={handleClearCart} className="btn btn-secondary flex-1">
              <RotateCcw size={16} className="mr-2" /> Kosongkan
            </button>
            <button onClick={handleCheckout} className="btn btn-primary flex-1" disabled={cartItems.length === 0}>
              Bayar
            </button>
          </div>
        </div>
      </aside>

      {/* Undo Toast */}
      {undoToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 h-[44px] px-5 rounded-xl text-white text-sm" style={{ backgroundColor: 'var(--toast-bg)' }}>
          <span>{undoToast.item.productName} dihapus</span>
          <button onClick={undo} className="h-[32px] px-4 rounded-lg font-bold" style={{ backgroundColor: 'var(--toast-accent)', color: 'var(--ink)' }}>
            Batalkan
          </button>
        </div>
      )}
    </div>
  );
}

interface CartItem {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
}