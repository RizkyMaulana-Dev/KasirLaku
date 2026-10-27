import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Monitor, Smartphone, Trash2 } from 'lucide-react';

function DownloadButton({ position = 'up' }: { position?: 'up' | 'down' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [platform, setPlatform] = useState<'windows' | 'android'>('windows');

  useEffect(() => {
    setPlatform(/Mobi|Android/i.test(navigator.userAgent) ? 'android' : 'windows');
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const download = (p: 'windows' | 'android') => {
    if (p === 'windows') {
      window.open('https://github.com/[ISI]/releases/latest/download/kasirlaku-windows.exe', '_blank');
    } else {
      window.open('https://github.com/[ISI]/releases/latest/download/kasirlaku-android.apk', '_blank');
    }
  };

  const PlatformIcon = platform === 'windows' ? Monitor : Smartphone;
  const label = platform === 'windows' ? 'Unduh untuk Windows' : 'Unduh untuk Android';

  return (
    <div className="relative inline-block" ref={ref}>
      <div className="inline-flex">
        <button
          onClick={() => download(platform)}
          className="btn btn-primary gap-2 px-5 h-[44px]"
        >
          <PlatformIcon size={18} />
          {label}
        </button>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Pilih platform lain"
          aria-expanded={open}
          className="inline-flex items-center justify-center w-11 h-[44px] border border-l-0 border-control-line bg-white text-ink rounded-r-[12px] hover:bg-surface-alt"
        >
          <ChevronDown size={18} className={open ? 'rotate-180 transition-transform' : 'transition-transform'} />
        </button>
      </div>

      {open && (
        <div className={`absolute right-0 z-20 w-max card p-1 ${position === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'}`} style={{ animation: 'scale-in 0.15s ease-out' }}>
          <button
            onClick={() => { setPlatform('windows'); setOpen(false); download('windows'); }}
            className="flex items-center gap-3 text-left px-4 h-[44px] text-sm font-medium hover:bg-surface-alt rounded-r-[12px]"
          >
            <Monitor size={18} className="text-muted" />
            Unduh untuk Windows
          </button>
          <hr className="border-line" />
          <button
            onClick={() => { setPlatform('android'); setOpen(false); download('android'); }}
            className="flex items-center gap-3 text-left px-4 h-[44px] text-sm font-medium hover:bg-surface-alt rounded-r-[12px]"
          >
            <Smartphone size={18} className="text-muted" />
            Unduh untuk Android
          </button>
        </div>
      )}
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-page">
      <header className="h-[72px] border-b border-line flex items-center justify-between px-6 max-w-[1160px] mx-auto">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="KasirLaku" className="h-6 w-6" />
          <span className="text-xl font-bold text-primary">KasirLaku</span>
        </div>
        <nav className="flex gap-6">
          <Link to="/kasir" className="text-sm text-muted hover:text-ink">Kasir</Link>
          <Link to="/riwayat" className="text-sm text-muted hover:text-ink">Riwayat</Link>
          <Link to="/produk" className="text-sm text-muted hover:text-ink">Produk</Link>
        </nav>
        <DownloadButton position="down" />
      </header>

      <main className="max-w-[1160px] mx-auto px-6">
        {/* Hero */}
        <section className="py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                Aplikasi kasir yang<br />tidak bikin pusing.
              </h1>
              <p className="mt-6 text-lg text-muted max-w-lg">
                Dibangun untuk warung, kafe, dan jualan rumahan. Offline-first, sinkron otomatis, struk thermal, QRIS — semuanya jalan tanpa ribet.
              </p>
              <div className="mt-10">
                <DownloadButton position="down" />
              </div>
              <p className="mt-6 text-sm text-muted">Gratis untuk perorangan. Tidak butuh kartu kredit.</p>
            </div>

            {/* App preview - simplified UI mockup */}
            <div className="card relative overflow-hidden" style={{ background: '#F6F7F9' }}>
              <div className="flex items-center gap-2 px-4 py-3 border-b border-line">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="p-6 space-y-4">
                {/* Header bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary-soft flex items-center justify-center">
                      <Monitor size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-ink">KasirLaku</div>
                      <div className="text-xs text-muted">Mode: Kasir • Budi</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted">Offline</div>
                    <div className="text-xs text-primary font-medium">Sinkron siap</div>
                  </div>
                </div>

                {/* Product grid preview */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-white border border-line hover:border-primary transition-colors">
                    <div className="font-semibold text-ink">Kopi Susu</div>
                    <div className="text-xs text-muted mt-1">Stok: 99</div>
                    <div className="text-lg font-extrabold text-primary mt-2 tab-nums">Rp 18.000</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-line hover:border-primary transition-colors">
                    <div className="font-semibold text-ink">Nasi Goreng</div>
                    <div className="text-xs text-muted mt-1">Stok: 20</div>
                    <div className="text-lg font-extrabold text-primary mt-2 tab-nums">Rp 25.000</div>
                  </div>
                  <div className="p-4 rounded-xl bg-disabled-bg border border-dashed">
                    <div className="font-semibold text-muted">Mie Goreng</div>
                    <div className="text-xs text-muted mt-1">Stok habis</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-line hover:border-primary transition-colors">
                    <div className="font-semibold text-ink">Teh Tarik</div>
                    <div className="text-xs text-muted mt-1">Stok: 50</div>
                    <div className="text-lg font-extrabold text-primary mt-2 tab-nums">Rp 15.000</div>
                  </div>
                </div>

                {/* Cart panel preview */}
                <div className="rounded-xl bg-white border border-line p-4 space-y-3 border-l-4 border-primary">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Pesanan aktif</span>
                    <span className="font-semibold text-ink">#14</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-line">
                    <div>
                      <div className="font-medium text-ink">Kopi Susu</div>
                      <div className="text-xs text-muted">Rp 18.000 × 2</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded-lg border border-line text-xs">−</button>
                      <span className="w-8 text-center font-bold tab-nums">2</span>
                      <button className="w-8 h-8 rounded-lg border border-line text-xs">+</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-line">
                    <div>
                      <div className="font-medium text-ink">Nasi Goreng</div>
                      <div className="text-xs text-muted">Rp 25.000 × 1</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded-lg border border-line text-xs">−</button>
                      <span className="w-8 text-center font-bold tab-nums">1</span>
                      <button className="w-8 h-8 rounded-lg border border-line text-xs">+</button>
                    </div>
                  </div>
                  <div className="flex justify-between text-lg font-extrabold tab-nums text-primary">
                    <span>Total</span>
                    <span>Rp 61.000</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button className="btn btn-secondary flex-1 text-sm py-2">Tahan</button>
                    <button className="btn btn-primary flex-1 text-sm py-2">Bayar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust signals / Quick stats */}
        <section className="py-12 border-t border-line border-b border-line">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Latensi ketukan (lokal)', value: '0 ms' },
              { label: 'Offline-capable', value: '100%' },
              { label: 'Metode bayar', value: '3' },
              { label: 'Transaksi/hari', value: '∞' },
            ].map((stat, i) => (
              <div key={i} className="card animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="text-3xl font-extrabold text-primary tab-nums">{stat.value}</div>
                <div className="text-sm text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Core features - problem/solution format */}
        <section className="py-20">
          <header className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold">Dibangun untuk situasi nyata</h2>
            <p className="mt-4 text-muted text-lg">Bukan fitur daftar belanja. Setiap fitur memecah masalah kasir harian.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Antrean panjang, kasir panik',
                problem: 'Pelanggan menunggu, tangan keringetan, salah ketuk.',
                solution: 'Tahan pesanan (Hold), bedain pelanggan via tab, lanjutkan yang tadi. Satu layar, Tidak ada menu tersembunyi.',
              },
              {
                title: 'Internet mati di tengah hari',
                problem: 'Transaksi berhenti, struk tidak bisa cetak, data hilang.',
                solution: 'Semua alur kasir jalan offline. Data tersimpan IndexedDB, sinkron otomatis pas online. Struk cetak nanti dari Riwayat.',
              },
              {
                title: 'Printer thermal macet/putus',
                problem: 'Pelanggan minta struk, printer tidak nyambung, antrean macet.',
                solution: 'Transaksi tetap selesai tanpa struk. Cetak ulang nanti dari Riwayat. Printer cuma aksesoris, bukan blokir.',
              },
              {
                title: 'Stok habis tapi masih ketuk',
                problem: 'Kasir tidak tahu stok 0, pesanan diterusin, pelanggan marah.',
                solution: 'Produk stok 0 otomatis nonaktif di grid, label "Stok habis", tidak bisa ditambah. Peringatan stok menipis (≤5) di strip atas.',
              },
              {
                title: 'Salah hapus item, tidak bisa undo',
                problem: 'Ketukan cepat, item terhapus, harus input ulang dari awal.',
                solution: 'Hapus item → toast "Batalkan" muncul 5 detik. Satu ketukan, item kembali. Nggak ada dialog konfirmasi yang lambat.',
              },
              {
                title: 'Bayar tunai, hitung kembalian manual',
                problem: 'Kasir hitung manual, salah, pelanggan komplain.',
                solution: 'Input uang → kembalian otomatis besar di kotak teal. Tombol "Uang pas" + nominal cepat (50k, 100k, 150k). Tombol Selesai disable kalau uang kurang.',
              },
            ].map((f, i) => (
              <article key={i} className="card p-6 hover:border-primary hover-lift animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted mb-3">{f.problem}</p>
                <p className="text-sm text-ink leading-relaxed">{f.solution}</p>
              </article>
            ))}
          </div>
        </section>

        {/* How it works / Flow */}
        <section className="py-20 bg-surface-alt -mx-6 px-6">
          <header className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold">Alur kasir 3 langkah</h2>
            <p className="mt-4 text-muted text-lg">Didesain biar kasir baru selesai transaksi pertama tanpa dilatih.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '1',
                title: 'Ketuk produk',
                desc: 'Grid produk besar, cari via papan ketik, atau filter per kategori. Stok habis langsung abu-abu dan tidak bisa diketuk.',
                visual: (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white border border-line text-center hover:border-primary transition-colors">
                      <div className="font-semibold text-sm truncate">Kopi Susu</div>
                      <div className="text-primary font-extrabold text-sm mt-1 tab-nums">Rp 18.000</div>
                      <div className="text-xs text-muted mt-1">Stok: 99</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-line text-center hover:border-primary transition-colors">
                      <div className="font-semibold text-sm truncate">Nasi Goreng</div>
                      <div className="text-primary font-extrabold text-sm mt-1 tab-nums">Rp 25.000</div>
                      <div className="text-xs text-muted mt-1">Stok: 20</div>
                    </div>
                    <div className="p-3 rounded-xl bg-disabled-bg border border-dashed text-center cursor-not-allowed">
                      <div className="font-semibold text-sm text-muted truncate">Mie Goreng</div>
                      <div className="text-xs text-muted mt-1">Stok habis</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-line text-center hover:border-primary transition-colors">
                      <div className="font-semibold text-sm truncate">Teh Tarik</div>
                      <div className="text-primary font-extrabold text-sm mt-1 tab-nums">Rp 15.000</div>
                      <div className="text-xs text-muted mt-1">Stok: 50</div>
                    </div>
                  </div>
                )
              },
              {
                step: '2',
                title: 'Cek & koreksi',
                desc: 'Panel kanan: tekan ± untuk jumlah, hapus otomatis munculkan Batalkan selama 5 detik, total selalu besar di bawah.',
                visual: (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-white border border-line">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-semibold text-sm min-w-0 truncate">Kopi Susu</div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button className="w-7 h-7 rounded-lg border border-line flex items-center justify-center text-sm">−</button>
                          <span className="w-6 text-center font-bold tab-nums text-sm">2</span>
                          <button className="w-7 h-7 rounded-lg border border-line flex items-center justify-center text-sm">+</button>
                          <Trash2 size={13} className="text-danger" />
                        </div>
                      </div>
                      <div className="text-xs text-muted tab-nums mt-1">Rp 18.000</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-line">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-semibold text-sm min-w-0 truncate">Nasi Goreng</div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button className="w-7 h-7 rounded-lg border border-line flex items-center justify-center text-sm">−</button>
                          <span className="w-6 text-center font-bold tab-nums text-sm">1</span>
                          <button className="w-7 h-7 rounded-lg border border-line flex items-center justify-center text-sm">+</button>
                          <Trash2 size={13} className="text-danger" />
                        </div>
                      </div>
                      <div className="text-xs text-muted tab-nums mt-1">Rp 25.000</div>
                    </div>
                    <div className="p-3 rounded-xl bg-primary-soft flex justify-between items-center font-extrabold text-base tab-nums text-primary-hover">
                      <span>Total</span>
                      <span>Rp 61.000</span>
                    </div>
                  </div>
                )
              },
              {
                step: '3',
                title: 'Bayar & selesai',
                desc: 'Tunai: ketik uang, kembalian otomatis. QRIS/Transfer: tunggu, lalu tekan Selesai. Semua ke Riwayat.',
                visual: (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <button className="h-10 rounded-xl border border-primary bg-primary-soft text-primary font-semibold text-sm flex items-center justify-center">Tunai</button>
                      <button className="h-10 rounded-xl border border-line text-muted text-sm flex items-center justify-center">QRIS</button>
                      <button className="h-10 rounded-xl border border-line text-muted text-sm flex items-center justify-center">Transfer</button>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-line space-y-1.5">
                      <label className="block text-xs font-semibold">Uang dari pelanggan</label>
                      <input className="input text-lg font-extrabold text-center tab-nums py-2" placeholder="Rp 70.000" />
                      <div className="grid grid-cols-3 gap-2">
                        <button className="h-9 rounded-lg border border-line text-xs font-semibold flex items-center justify-center whitespace-nowrap">Uang pas</button>
                        <button className="h-9 rounded-lg border border-line text-xs font-semibold flex items-center justify-center whitespace-nowrap">50.000</button>
                        <button className="h-9 rounded-lg border border-line text-xs font-semibold flex items-center justify-center whitespace-nowrap">100.000</button>
                      </div>
                      <div className="p-2 rounded-lg bg-primary-soft flex justify-between font-bold text-base text-primary-hover border border-primary">
                        <span>Kembalian</span>
                        <span>Rp 9.000</span>
                      </div>
                      <button className="btn btn-primary w-full text-sm py-2">Selesai</button>
                    </div>
                  </div>
                )
              },
            ].map((s, i) => (
              <article key={i} className="group animate-fade-in min-w-0" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center font-extrabold text-white transition-transform group-hover:scale-110" style={{ background: 'var(--primary)' }}>
                    {s.step}
                  </div>
                  <h3 className="text-xl font-bold">{s.title}</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-muted leading-relaxed">{s.desc}</p>
                  <div className="card p-5 transition-all duration-300 group-hover:border-primary group-hover:shadow-sm">{s.visual}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Technical details for decision makers */}
        <section className="py-20">
          <header className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold">Detail teknis</h2>
            <p className="mt-4 text-muted text-lg">Hal-hal yang penting kalau Anda yang putusin teknologi.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Arsitektur offline-first',
                items: [
                  'Dexie.js (IndexedDB) — data 100% lokal',
                  'Service Worker + Vite PWA — installable, update otomatis',
                  'Sinkronisasi idempoten — tidak ada transaksi ganda',
                  'Antrean sinkron dengan retry exponential backoff',
                ]
              },
              {
                title: 'Integrasi pembayaran',
                items: [
                  'Tunai: kembalian otomatis, nominal cepat, uang pas',
                  'QRIS: status pending/success/failed, timeout handling',
                  'Transfer: status manual, idempotency key per transaksi',
                  'Printer thermal: ESC/POS via Web USB/Bluetooth',
                ]
              },
              {
                title: 'Keamanan & akses',
                items: [
                  'PIN 4-6 digit, hash + rate limit (5× = lock 15 menit)',
                  'Peran: Owner / Manager / Kasir (RBAC siap pakai)',
                  'Log aktivitas sensitif (refund, hapus produk, ganti harga)',
                  'Harga transaksi terkunci saat bayar (ER-08)',
                ]
              },
              {
                title: 'Performa & UX',
                items: [
                  'Target ≤100 ms respons ketukan, siap ≤3 detik',
                  'Touch target ≥44×44 px, kontras ≥4.5:1',
                  'Tabular numbers di semua harga/total',
                  'Reduced-motion support, focus-visible ring',
                ]
              },
            ].map((cat, i) => (
              <article key={i} className="card p-6">
                <h3 className="text-lg font-bold mb-4">{cat.title}</h3>
                <ul className="space-y-3">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed">
                      <span className="flex-shrink-0 w-5 h-5 mt-0.5 text-primary">✓</span>
                      <span className="text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Scale comparison */}
        <section className="py-20">
          <header className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold">Satu aplikasi, tiga skala</h2>
            <p className="mt-4 text-muted text-lg">Fitur kafe bisa dimatikan. Tampilan perorangan tetap bersih.</p>
          </header>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="border-b border-line text-sm text-muted">
                  <th className="p-4 font-semibold w-48">Fitur</th>
                  <th className="p-4 font-semibold text-center">Perorangan</th>
                  <th className="p-4 font-semibold text-center">Warung/Toko</th>
                  <th className="p-4 font-semibold text-center">Kafe/Restoran</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { f: 'Transaksi tunai', p: '✓', w: '✓', k: '✓' },
                  { f: 'QRIS & Transfer', p: '✓', w: '✓', k: '✓' },
                  { f: 'Struk thermal + cetak ulang', p: '✓', w: '✓', k: '✓' },
                  { f: 'Stok otomatis & peringatan menipis', p: '✓', w: '✓', k: '✓' },
                  { f: 'Offline-first + sinkron', p: '✓', w: '✓', k: '✓' },
                  { f: 'Multi-kasir (PIN per orang)', p: '—', w: '✓', k: '✓' },
                  { f: 'Tahan pesanan (Hold/Resume)', p: '—', w: '✓', k: '✓' },
                  { f: 'Varian menu (ukuran/gula/es)', p: '—', w: '—', k: 'P1' },
                  { f: 'Pisah tagihan per meja', p: '—', w: '—', k: 'P1' },
                  { f: 'Layar dapur (KDS)', p: '—', w: '—', k: 'P2' },
                  { f: 'Multi-cabang', p: '—', w: '—', k: 'P2' },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-line ${i % 2 === 1 ? 'bg-surface-alt/50' : ''}`}>
                    <td className="p-4 font-medium">{row.f}</td>
                    <td className="p-4 text-center text-muted">{row.p}</td>
                    <td className="p-4 text-center text-primary">{row.w}</td>
                    <td className="p-4 text-center text-primary">{row.k}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-surface-alt -mx-6 px-6">
          <header className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold">Pertanyaan umum</h2>
          </header>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              { q: 'Bisa offline?', a: 'Ya. Semua alur kasir jalan tanpa internet. Data tersimpan di perangkat (IndexedDB), lalu sinkron otomatis saat online kembali.' },
              { q: 'Cara mencetak struk?', a: 'Sambungkan printer thermal USB atau Bluetooth (ESC/POS). Struk juga bisa dicetak ulang dari halaman Riwayat kapan saja.' },
              { q: 'Apakah berbayar?', a: 'Versi dasar gratis untuk perorangan. Paket warung dan kafe (multi-kasir, hold, varian, pisah tagihan) akan diumumkan nanti.' },
              { q: 'Data saya aman?', a: 'Ya. PIN di-hash, tidak disimpan plaintext. Data tidak keluar perangkat kecuali Anda aktifkan sinkron. Tidak ada telemetry tersembunyi.' },
              { q: 'Bisa import produk dari Excel/CSV?', a: 'Belum di v1. Rencananya P1. Saat ini input manual via halaman Produk.' },
              { q: 'Printer apa yang didukung?', a: 'Printer thermal ESC/POS standar (Epson, Star, dll) via Web USB (Chrome/Edge) atau Bluetooth. Daftar lengkap di docs nanti.' },
            ].map((item, i) => (
              <details key={i} className="card p-4 group">
                <summary className="flex items-center justify-between font-semibold cursor-pointer list-none">
                  {item.q}
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-3 text-muted text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Siap mencoba?</h2>
          <p className="text-muted mb-8 max-w-lg mx-auto">Unduh, jalankan, transaksi pertama dalam 5 menit. Tidak butuh akun, tidak butuh internet.</p>
<div className="flex justify-center w-fit mx-auto">
            <DownloadButton position="up" />
          </div>
        </section>

        <footer className="py-8 border-t border-line flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-muted">KasirLaku v0.1.0</span>
          <div className="flex gap-6 text-sm text-muted">
            <a href="mailto:[ISI]" className="hover:text-ink">Email</a>
            <a href="https://wa.me/[ISI]" className="hover:text-ink" target="_blank" rel="noopener">WhatsApp</a>
            <a href="/privacy" className="hover:text-ink">Privasi</a>
          </div>
        </footer>
      </main>
    </div>
  );
}