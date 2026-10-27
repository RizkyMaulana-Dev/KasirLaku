import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../lib/store';
import { db, seedEmpty } from '../lib/db';

export default function Login() {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAppStore((s) => s.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    await seedEmpty();

    const user = await db.users.where('name').equalsIgnoreCase(name).and((u) => u.active).first();
    if (!user) {
      setError('Nama tidak ditemukan.');
      return;
    }

    if (user.failedAttempts >= 5 && user.lockedUntil && user.lockedUntil > new Date()) {
      const menit = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 1000 / 60);
      setError(`Kunci sementara. Coba lagi ${menit} menit.`);
      return;
    }

    if (pin !== user.pinHash) {
      await db.users.update(user.id!, {
        failedAttempts: user.failedAttempts + 1,
        lockedUntil: user.failedAttempts + 1 >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : undefined,
      });
      const sisa = 5 - user.failedAttempts - 1;
      setError(`PIN salah. Percobaan tersisa: ${sisa}`);
      return;
    }

    await db.users.update(user.id!, { failedAttempts: 0, lockedUntil: undefined });
    login(user.name);
    navigate('/kasir');
  };

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-[380px]">
        <h1 className="text-3xl font-extrabold mb-2">Masuk</h1>
        <p className="text-muted text-[15px] mb-8">Masukkan nama dan PIN Anda.</p>

        {error && (
          <div className="status-strip mb-6" role="alert">{error}</div>
        )}

        <label className="block mb-4">
          <span className="block text-sm font-semibold mb-2">Nama</span>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama kasir"
            required
            autoFocus
          />
        </label>

        <label className="block mb-6">
          <span className="block text-sm font-semibold mb-2">PIN</span>
          <input
            className="input"
            type="password"
            inputMode="numeric"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="4–6 angka"
            required
          />
        </label>

        <button type="submit" className="btn btn-primary w-full">Masuk</button>

        <p className="mt-6 text-center text-sm text-muted">
          Pemilik? Pakai PIN <span className="font-semibold text-ink">1234</span>
        </p>
      </form>
    </div>
  );
}