import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { db } from '../lib/db';
import type { Product } from '../types';

export default function Products() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Makanan');
  const [stock, setStock] = useState('');

  useEffect(() => {
    db.products.toArray().then(setItems);
  }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.products.add({
      name,
      price: Number(price),
      category,
      stock: Number(stock),
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setName(''); setPrice(''); setStock('');
    db.products.toArray().then(setItems);
  };

  const remove = async (id?: number) => {
    if (!id) return;
    await db.products.delete(id);
    setItems((s) => s.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-page">
      <header className="h-[72px] border-b border-line flex items-center justify-between px-6">
        <h1 className="text-2xl font-extrabold">Produk</h1>
        <button onClick={() => navigate('/kasir')} className="btn btn-secondary">Kasir</button>
      </header>

      <main className="max-w-[900px] mx-auto px-6 py-10 space-y-8">
        <form onSubmit={add} className="card grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Nama produk</label>
            <input className="input" placeholder="Contoh: Nasi Goreng" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Kategori</label>
            <input className="input" placeholder="Contoh: Makanan" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Harga</label>
            <input className="input" placeholder="Rp 25000" inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Stok</label>
            <input className="input" placeholder="100" inputMode="numeric" value={stock} onChange={(e) => setStock(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary self-end"><Plus size={18} /></button>
        </form>

        <div className="space-y-3">
          {items.length === 0 && (
            <p className="text-muted text-sm">Belum ada produk. Tambahkan lewat form di atas.</p>
          )}
          {items.map((p) => (
            <div key={p.id} className="card flex items-center justify-between">
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-muted text-[13px]">{p.category} · Stok {p.stock}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-extrabold tab-nums">Rp {p.price.toLocaleString('id-ID')}</span>
                <button onClick={() => remove(p.id)} className="text-danger" aria-label={`Hapus ${p.name}`}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
