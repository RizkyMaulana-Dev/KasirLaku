# DESIGN.md — Kasirku

Aturan desain untuk landing page dan aplikasi kasir. Nilai diambil dari artboard yang sudah dibuat (Landing, Kasir, Login, Pembayaran). Konteks produk ada di `PRD.md`.
Penanda: `(asumsi)` = belum diuji. `(celah)` = belum sesuai aturan dan harus diperbaiki.

## 1. Karakter Visual

- **Mood:** tenang, bersih, fungsional. Terasa seperti alat kerja, bukan brosur.
- **Kepadatan:** lega di landing page, sedang di layar kasir.
- **Tema:** terang saja. Mode gelap belum dirancang `(asumsi)`.
- **Signature:**
  1. Satu aksen teal, dipakai hemat.
  2. Angka selalu tabular. Harga dan total besar dan tebal.
  3. Satu aksi utama per layar, tombol besar.
  4. Status sistem (offline, printer, stok habis) ditulis sebagai teks, tidak hanya warna.
  5. Tanpa bayangan. Pemisah memakai garis 1px dan beda latar.
  6. Landing page memakai baris teks bergaris, bukan kisi kartu ikon.

## 2. Design Tokens

### 2.1 Warna

| Token | Hex | Peran | Kontras |
|---|---|---|---|
| `page` | #FFFFFF | Latar utama, kartu | ink 17,74:1 |
| `surface-alt` | #F6F7F9 | Latar aplikasi, section selang-seling | ink 16,55:1, muted 7,05:1 |
| `ink` | #111827 | Teks utama, chip aktif | — |
| `muted` | #4B5563 | Teks sekunder | 7,56:1 di putih |
| `primary` | #0F766E | Aksi utama, item terpilih | putih di atasnya 5,47:1 |
| `primary-hover` | #115E59 | Hover tombol utama, teks di `primary-soft` | putih 7,58:1 |
| `primary-soft` | #E6F4F2 | Latar item terpilih, panel unduh, kembalian | `primary` 4,84:1, `primary-hover` 6,71:1 |
| `line` | #E5E7EB | Garis kartu dan pemisah | dekoratif |
| `control-line` | #D1D5DB | Garis tombol, input, chip (saat ini) | 1,47:1 `(celah)` |
| `control-line-aa` | #6B7280 | Pengganti `control-line`, wajib ≥ 3:1 | ~4,8:1 |
| `disabled-bg` | #F3F4F6 | Latar elemen nonaktif | muted 6,87:1 |
| `warn-bg` / `warn-ink` | #FEF3C7 / #78350F | Status sistem (offline, printer) | 8,15:1 |
| `danger` | #B91C1C | Pesan error | 6,47:1 di putih |
| `toast-bg` / `toast-accent` | #111827 / #5EEAD4 | Toast Batalkan | 11,99:1 |

**Proporsi:** ±85% netral (putih, abu, ink), ≤ 10% teal, ≤ 5% status (amber, merah).

**Aturan warna:**
- Teal hanya untuk aksi utama, item terpilih, dan angka kembalian.
- Merah hanya untuk error. Amber hanya untuk status sistem.
- Tidak ada gradasi, tidak ada warna ungu atau biru-ungu, tidak ada hijau Tailwind default.
- Menambah warna baru wajib punya peran dan lolos kontras.

### 2.2 Tipografi

Satu keluarga: **Plus Jakarta Sans** (400–800), fallback `system-ui, -apple-system, 'Segoe UI', sans-serif`. Semua angka memakai `font-variant-numeric: tabular-nums`.

| Peran | Desktop | Ponsel | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Display (h1 landing) | 56px | 36px | 800 | 1,08 | -0,02em |
| H2 section | 36px | 28px | 800 | 1,15 | -0,01em |
| H1 layar app | 26–28px | 26px | 800 | 1,2 | 0 / -0,01em |
| H3 baris/kartu | 18–20px | 18px | 700 | 1,3 | 0 |
| Body lead | 18px | 17px | 400 | 1,65 | 0 |
| Body | 15–17px | 15px | 400 | 1,6 | 0 |
| Small / caption | 13–14px | 13px | 400–500 | 1,5 | 0 |
| Label | 13px | 13px | 600 | 1,4 | 0 |
| Total / harga besar | 28–36px | 28px | 800 | 1,1 | 0 |
| Tombol | 15–18px | 16px | 600–700 | 1 | 0 |

**Aturan:**
- Teks isi berbobot 400. Bobot 600 hanya untuk label dan tombol.
- Judul 700–800. Tidak lebih dari 4 ukuran berbeda pada satu layar.
- Lebar baris paragraf ≤ 560px.
- Dilarang font Inter, Arial, atau Space Grotesk sebagai pengganti otomatis.

### 2.3 Spacing

Skala dasar 4px: `4, 8, 12, 16, 20, 24, 28, 32, 48, 56, 80`.

| Konteks | Nilai |
|---|---|
| Padding section landing | 80px atas-bawah |
| Padding kartu | 24–28px |
| Gap grid produk | 16px |
| Gap tombol berdampingan | 8–12px |
| Padding area app | 24–32px |
| Jarak aksi merusak ke aksi utama | ≥ 16px |

### 2.4 Radius

| Token | Nilai | Dipakai pada |
|---|---|---|
| `r-md` | 12px | Tombol, input, stepper, kotak status |
| `r-lg` | 14px | Tombol Bayar besar, tombol keypad PIN |
| `r-xl` | 16px | Kartu produk, kartu konten |
| `r-2xl` | 24px | Panel besar (unduh, pratinjau hero) |
| `r-pill` | 999px | Chip, badge jumlah |

Maksimal 5 nilai radius. Jangan menambah nilai baru tanpa alasan.

### 2.5 Border dan elevasi

- Tidak ada `box-shadow`. Elevasi dibuat dari beda latar (putih di atas `surface-alt`).
- Border 1px `line` untuk kartu, 1px `control-line-aa` untuk kontrol interaktif.
- Hover kartu produk: border menjadi `primary`. Nonaktif: border putus-putus.
- Dilarang bayangan seragam di semua elemen.

### 2.6 CSS token

```css
:root{
  --page:#FFFFFF; --surface-alt:#F6F7F9; --ink:#111827; --muted:#4B5563;
  --primary:#0F766E; --primary-hover:#115E59; --primary-soft:#E6F4F2;
  --line:#E5E7EB; --control-line:#6B7280; --disabled-bg:#F3F4F6;
  --warn-bg:#FEF3C7; --warn-ink:#78350F; --danger:#B91C1C;
  --r-md:12px; --r-lg:14px; --r-xl:16px; --r-2xl:24px; --r-pill:999px;
  --font:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',sans-serif;
}
.app{font-family:var(--font);font-variant-numeric:tabular-nums;color:var(--ink)}
```

## 3. Layout

| Konteks | Aturan |
|---|---|
| Landing | Kontainer `max-width:1160px`, padding sisi 24px, rata kiri |
| Aplikasi kasir | Grid 3 kolom: `88px 1fr 380px`, tinggi desain 800px |
| Grid produk | `repeat(auto-fill, minmax(160px, 1fr))`, gap 16px |
| Login | Satu kolom di tengah, `max-width:380px` |
| Pembayaran | Dua kolom: `minmax(0,1fr) minmax(340px,460px)`, gap 24px |

**Anatomi landing (urut):**
1. Header 72px: logo, tautan, tombol Unduh.
2. Hero: 2 kolom. Teks dan CTA di kiri, pratinjau pesanan di kanan.
3. Skala usaha: baris bergaris, kolom judul : isi = 1 : 2.
4. Situasi: pola sama, latar `surface-alt`.
5. Unduh: panel `primary-soft` radius 24px, satu kartu per platform.
6. FAQ: `max-width:808px`, elemen `details`.
7. Footer: satu baris.

**Anatomi aplikasi kasir:**
1. Rail navigasi: Kasir, Riwayat, Produk, Laporan, Atur.
2. Area produk: strip status → judul dan pencarian → chip kategori → grid produk.
3. Panel pesanan: tab pesanan → daftar item → toast Batalkan → total → metode bayar → Tahan dan Bayar.

**Aturan:** heading section rata kiri, bukan tengah. Satu aksi utama per layar. Aksi utama selalu di kanan bawah panel.

## 4. Komponen

Ukuran sentuh minimum 44×44px untuk semua yang bisa diketuk.

| Komponen | Struktur dan ukuran | Varian | State |
|---|---|---|---|
| Tombol utama | Tinggi 48px (landing), 56px (hero), 64px (Bayar), radius `r-md`/`r-lg`, latar `primary`, teks putih | Utama, sekunder (putih + garis), tautan | Hover `primary-hover`. Tekan: gelap satu tingkat. Fokus: ring 2px `primary` offset 2px. Nonaktif: `disabled-bg`, tanpa hover |
| Chip | Tinggi 44px, padding 20px, pill | Default, aktif (`ink` + teks putih) | Hover latar `#F3F4F6`. Fokus ring |
| Kartu produk | Tinggi min 112px, padding 16px, nama 16/700, harga 14 `muted`, radius 16 | Default, di keranjang (badge jumlah 28px `primary`), habis | Hover border `primary`. Habis: dashed, `disabled-bg`, label "Stok habis", tidak bisa diketuk |
| Stepper jumlah | Dua tombol 44×44px radius 12 + angka 20px lebar min | — | Tekan cepat berulang diperbolehkan. Jumlah 0 → hapus item + toast Batalkan |
| Item keranjang | Nama 15/600, harga satuan 13 `muted`, stepper di kanan, garis bawah `line` | — | — |
| Total | Label 15 `muted`, angka 30/800 rata kanan | — | — |
| Pilihan metode bayar | 3 tombol sama lebar, tinggi 44px | Aktif: `primary-soft` + border `primary` | Fokus ring |
| Nominal cepat | Chip: Uang pas, 50.000, 100.000, 150.000 | Aktif: `ink` | — |
| Kembalian | Kotak `primary-soft`, label 15/600, angka 30/800, warna `primary-hover` | — | Tampil hanya bila uang ≥ total |
| Keypad PIN | Grid 3 kolom, gap 12px, tombol tinggi 64px, angka 22/600 | Hapus (teks 15 `muted`), Masuk (`primary`) | Tekan ada umpan balik instan. Salah: titik PIN berborder `danger` + pesan |
| Titik PIN | 4 lingkaran 16px, border 2px | Kosong, terisi, error | — |
| Strip status | Latar `warn-bg`, teks `warn-ink` 14px, radius 12, di atas konten | Offline, printer, sinkron | Muncul/hilang sesuai kondisi, `role="status"` |
| Toast Batalkan | Latar `toast-bg`, teks putih 14px, tombol `toast-accent` tinggi 44px | — | Hilang otomatis beberapa detik `(asumsi)` |
| Tab pesanan | Chip kecil (14px): #14 aktif, #15 ditahan, + Baru | Aktif, ditahan | Berpindah tab tidak menghapus isi |
| Baris bergaris (landing) | Grid 1 : 2, judul 20/700 kiri, isi 17 `muted` kanan, garis atas 1px | — | Ponsel: 1 kolom |
| Header landing | Tinggi 72px, garis bawah `line` | Tautan 15/500 `muted` | Hover: `ink` `(asumsi)` |
| Input pencarian | Tinggi 48px, ikon kiri, radius 12 | — | Fokus ring. Label terlihat atau `aria-label` |
| FAQ | `details` dengan `summary` 17/700, garis bawah | Terbuka/tertutup | Fokus ring |

**State wajib di setiap layar:** normal, kosong, memuat, error, offline, nonaktif atau habis. Layar tanpa salah satu state ini dianggap belum selesai.

**Aturan jam ramai:**
- Aksi utama paling banyak 2 ketukan dari layar kasir.
- Tidak ada dialog untuk aksi yang bisa dibatalkan, pakai Batalkan.
- Dialog konfirmasi hanya untuk aksi yang tidak bisa dibatalkan (kosongkan semua, refund).
- Tombol tidak bergeser posisi saat status berubah.
- Aksi merusak tidak berdekatan dengan aksi utama.

## 5. Pola Teks dan Copywriting

| Aspek | Aturan |
|---|---|
| Bahasa | Indonesia, sapaan "Anda" di landing, kalimat langsung di aplikasi |
| Kapitalisasi | Sentence case di semua tempat |
| Heading | 4–9 kata |
| Subjudul | ≤ 25 kata, satu kalimat |
| CTA | 1–4 kata, kata kerja: "Bayar", "Tahan", "Unduh untuk Windows" |
| Uang | `Rp 71.000`: spasi setelah Rp, titik ribuan, tanpa desimal |
| Status | Tulis kondisi, bukan hanya warna: "Stok habis", "Offline" |
| Error | Tiga bagian: apa yang terjadi, apa yang tetap aman, langkah berikutnya |

**Contoh netral:**
- Heading: "Jualan lebih cepat, catatan lebih rapi."
- Error: "Printer belum tersambung. Transaksi tetap tersimpan dan struk bisa dicetak ulang dari Riwayat."
- Kosong: "Belum ada pesanan. Ketuk produk untuk memulai."

**Dilarang:** lorem ipsum, nama placeholder generik ("John Doe"), kata kosong ("revolusioner", "seamless", "next-gen"), tanda seru berlebihan, emoji sebagai ikon, angka pengguna atau testimoni karangan.

## 6. Ornamen dan Dekorasi

- Tidak ada ornamen. Tanpa gradasi, blob, glow, pola latar, atau ilustrasi abstrak.
- Pemisah hanya garis 1px dan perubahan latar.
- Dekorasi tidak boleh menggantikan makna produk.

## 7. Gambar dan Ilustrasi

- Foto produk bersifat opsional: persegi 1:1, radius 12, selalu disertai nama teks. Belum dirancang `(asumsi)`.
- Tidak memakai foto stok atau ilustrasi abstrak sebagai pengisi.
- Ikon: gaya garis (stroke 1,75px), ukuran 22px, `currentColor`, hanya di rail navigasi. Tidak ditempatkan di dalam tile berwarna.
- Pratinjau di landing dibuat dari komponen aplikasi sungguhan, bukan gambar tempelan.

## 8. Motion

| Hal | Aturan |
|---|---|
| Durasi | 120–160ms, easing `ease-out` `(asumsi)` |
| Dipakai untuk | Hover, tekan, toast masuk, tab berpindah |
| Tidak dipakai untuk | Dekorasi, animasi masuk halaman, efek pantul |
| Fungsi | Hanya menyampaikan perubahan status (item bertambah, pesanan ditahan) |
| `prefers-reduced-motion` | Matikan semua transisi kecuali perubahan status yang perlu |

Artboard saat ini statis. Motion belum diimplementasikan.

## 9. Responsif

| Breakpoint | Perubahan |
|---|---|
| ≥ 1024px | Target utama aplikasi: 3 kolom (rail, produk, panel pesanan) |
| 721–1023px | Kolom produk menyempit otomatis, panel pesanan tetap terlihat |
| ≤ 720px | Landing: baris bergaris jadi 1 kolom. Aplikasi: 1 kolom, panel pesanan jadi bottom sheet `(asumsi)` |

**Celah yang harus diperbaiki:**
- `(celah)` Tautan navigasi landing disembunyikan di ≤ 720px tanpa pengganti. Wajib diganti menu ringkas, bukan dihapus.
- `(celah)` Rail navigasi aplikasi disembunyikan di ≤ 720px. Wajib diganti navigasi bawah.

Aturan: layar kecil tidak boleh kehilangan fitur, hanya mengubah susunan.

## 10. Aksesibilitas

| Aturan | Nilai |
|---|---|
| Target sentuh | ≥ 44×44px |
| Kontras teks | ≥ 4,5:1 (semua pasangan di §2.1 sudah lolos) |
| Kontras kontrol | ≥ 3:1. `control-line` saat ini 1,47:1 `(celah)`, ganti `control-line-aa` |
| Fokus | Ring terlihat di semua elemen interaktif (`:focus-visible`: 2px `primary`, offset 2px). Belum ada di artboard `(celah)` |
| Status | Tidak hanya warna: selalu ada teks. `role="status"` untuk info, `role="alert"` untuk error |
| Tombol ikon/stepper | Wajib `aria-label` ("Tambah Kopi Susu") |
| Zoom | Layout tetap utuh sampai 200% |
| Angka | Tabular agar kolom harga sejajar |

## 11. Do dan Don't

### Pantangan "AI slop" (wajib lolos sebelum rilis)

| Dilarang | Gantinya |
|---|---|
| Font Inter/Arial/Space Grotesk sebagai default | Satu keluarga yang dipilih sadar (§2.2) |
| Gradasi ungu-ke-biru, hijau Tailwind default | Satu aksen teal dengan peran jelas |
| Kisi tiga atau enam kartu berikon | Baris teks bergaris yang menjelaskan situasi nyata |
| Kartu di dalam kartu | Satu tingkat kontainer |
| Bayangan bulat yang sama di semua elemen | Tanpa bayangan, pakai garis dan beda latar |
| Ikon di tile warna, langkah bernomor lingkaran | Teks dan struktur yang menjelaskan sendiri |
| Teks isi semibold | Teks isi 400 |
| Angka bulat dan nama placeholder palsu | Contoh realistis, data diisi `[ISI]` bila belum ada |
| Hanya menampilkan kondisi ideal | State error, offline, kosong, habis wajib dirancang |
| Membuang fitur di layar kecil | Susun ulang, bukan hapus |
| Permintaan "modern dan bersih" tanpa token | Semua nilai di dokumen ini terukur |

**Catatan:** slop adalah pola generik yang diulang, bukan satu warna atau font. Menukar satu klise dengan klise lain tetap slop. Periksa konteks produk, bukan hanya daftar.

### Pantangan khusus kasir

- Jangan menaruh tombol Hapus semua dekat tombol Bayar.
- Jangan membuat tombol Bayar bisa ditekan dua kali.
- Jangan mengandalkan warna saja untuk status.
- Jangan membuat kasir menghitung kembalian sendiri.
- Jangan menyembunyikan kondisi offline atau printer putus.

### Uji sebelum rilis

1. Kasir baru menyelesaikan transaksi tanpa petunjuk.
2. Simulasi jam ramai: tahan 3 pesanan, hapus item, batalkan, bayar.
3. Matikan internet dan printer di tengah transaksi, data harus utuh.
4. Cek semua pasangan warna dan target sentuh.
5. Lolos daftar pantangan slop di atas.

## 12. Cara Memperluas

- **Layar baru:** pakai token §2, satu aksi utama, dan seluruh state wajib (§4).
- **Komponen baru:** pakai ulang komponen yang ada lebih dulu. Baru buat bila perannya benar-benar berbeda.
- **Mengganti warna merek:** ubah `primary`, `primary-hover`, `primary-soft`, lalu cek ulang kontras ≥ 4,5:1.
- **Mode gelap:** rancang token tersendiri, jangan membalik warna otomatis.
- **Fitur kafe (varian, pisah tagihan):** harus bisa dimatikan agar tampilan perorangan tetap sederhana.
- **Sumber:** pola slop dirujuk dari `https://www.mintlify.com/pbakaus/impeccable/concepts/anti-patterns` dan `https://github.com/Laith0003/ux-skill/wiki/How-to-detect-AI-slop-in-your-design`.
