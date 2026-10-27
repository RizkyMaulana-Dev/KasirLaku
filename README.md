# KasirLaku

Aplikasi kasir offline-first untuk warung, kafe, dan jualan rumahan. Tanpa server, tanpa akun — data tersimpan di perangkat, sinkron otomatis saat online kembali.

## Fitur

- **Alur kasir cepat** — ketuk produk, atur jumlah, bayar. Transaksi pertama selesai tanpa pelatihan.
- **Offline-first** — internet mati bukan alasan berhenti jualan. Semua data tersimpan lokal (IndexedDB), sinkron otomatis saat koneksi kembali.
- **Tunai / QRIS / Transfer** — kembalian dihitung otomatis, nominal cepat (uang pas, 50k, 100k).
- **Struk thermal** — cetak via printer ESC/POS (USB/Bluetooth), struk bisa dicetak ulang kapan saja.
- **Stok otomatis** — stok berkurang setelah transaksi, peringatan menipis muncul di layar kasir.
- **Multi-kasir** — PIN per orang, log aktivitas sensitif.
- **Tahan pesanan (Hold)** — pelanggan menunggu? Tahan dulu, lanjutkan yang lain.

## Teknologi

- React 18 + TypeScript + Vite
- Tailwind CSS
- Dexie.js (IndexedDB)
- Zustand (state)
- Workbox (PWA)

## Menjalankan

```bash
# install dependensi
yarn install

# dev server
yarn dev

# build
yarn build
```

## Struktur

```
src/
  screens/     # halaman (Landing, Kasir, Bayar, Riwayat, Produk)
  lib/         # db (Dexie), store (Zustand)
  types/       # type definisi
```

## Catatan

- PIN owner: `1234`, kasir: `2345` (default, ganti setelah install).
- Link download di landing masih placeholder (`[ISI]`), ganti ke repo release Anda.
