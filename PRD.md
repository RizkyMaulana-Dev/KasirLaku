# PRD — KasirLaku (nama sementara)

| | |
|---|---|
| Versi | 0.1 (draft) |
| Tanggal | 26 Oktober 2026 |
| Pemilik produk | Rizky Maulana |
| Dokumen terkait | `DESIGN.md` (aturan desain), artboard desain: Landing, Kasir, Login, Pembayaran |
| Penanda | `[ISI]` = data yang belum diketahui. `(asumsi)` = usulan yang perlu divalidasi dengan pengguna nyata |

---

## 1. Ringkasan

Kasirku adalah aplikasi kasir (point of sale) yang mudah dipakai orang awam. Satu aplikasi melayani tiga skala usaha: jualan perorangan, warung/toko, dan kafe/restoran. Aplikasi harus tetap tenang dipakai pada jam santai maupun jam paling ramai, dan sebisa mungkin mencegah kesalahan input sebelum terjadi.

Produk terdiri dari dua bagian:

1. **Aplikasi kasir** (desktop/tablet/ponsel) untuk mencatat penjualan, stok, dan pembayaran.
2. **Landing page** untuk memperkenalkan aplikasi dan menyediakan tombol unduh.

### Masalah yang diselesaikan

- Pencatatan manual lambat dan rawan salah hitung, struk, dan stok.
- Banyak aplikasi kasir terasa rumit untuk karyawan baru, sehingga butuh pelatihan.
- Saat antrean menumpuk, kasir panik, lalu salah ketuk, salah hapus, atau salah memberi kembalian.
- Internet atau printer bermasalah membuat penjualan terhenti.

## 2. Tujuan dan non-tujuan

### Tujuan

| ID | Tujuan | Cara mengukur (asumsi) |
|---|---|---|
| G1 | Kasir baru bisa menyelesaikan transaksi pertama tanpa dilatih | Uji coba dengan 5 pengguna awam, waktu ≤ 5 menit tanpa bantuan |
| G2 | Transaksi cepat di jam ramai | Pesanan 3 item selesai ≤ 15 detik sejak ketukan pertama |
| G3 | Kesalahan fatal minimal | Nol kehilangan transaksi saat offline, nol transaksi ganda akibat ketukan berulang |
| G4 | Satu produk untuk semua skala | Fitur kafe bisa dimatikan sehingga tampilan perorangan tetap sederhana |

### Non-tujuan (versi 1)

- Bukan sistem akuntansi lengkap, payroll, atau pajak.
- Bukan marketplace atau toko online.
- Belum mendukung multi-cabang dengan kontrol terpusat.
- Belum ada layar dapur (KDS) dan reservasi meja.

## 3. Pengguna dan skala usaha

| Skala | Contoh | Kebutuhan inti | Peran dalam aplikasi | Perangkat (asumsi) |
|---|---|---|---|---|
| Perorangan | Kaki lima, usaha rumahan, jualan online | Catat penjualan, stok, laporan harian | Pemilik sekaligus kasir | Ponsel |
| Warung / toko | Toko kelontong, warung makan | Beberapa kasir bergantian, struk cetak, QRIS | Pemilik + kasir (PIN masing-masing) | Tablet atau PC |
| Kafe / restoran | Kafe ramai, resto kecil | Tahan pesanan, varian menu, pisah tagihan, antrean | Pemilik, manajer, kasir | Tablet + printer thermal |

Persona utama untuk desain: **kasir awam**, yaitu orang yang baru memakai aplikasi, sering berdiri, dilihat pelanggan, dan tidak punya waktu membaca petunjuk.

## 4. Skenario operasional

| Skenario | Gambaran | Perilaku yang diharapkan | Ketentuan UI |
|---|---|---|---|
| **Santai** | Satu pelanggan, tidak ada antrean | Ketuk produk, cek pesanan, bayar | Alur 3 langkah, tidak ada menu tersembunyi |
| **Ramai** | Antrean menumpuk, pesanan menumpuk | Tahan pesanan, ganti ke pelanggan berikutnya, lanjutkan nanti | Tab pesanan, tombol Tahan, tombol besar, Batalkan setelah hapus |
| **Kacau** | Kasir salah ketuk, pelanggan berubah pikiran | Koreksi cepat tanpa panik | Undo, konfirmasi aksi merusak, tidak ada aksi tanpa jalan kembali |
| **Offline** | Internet putus | Penjualan tetap berjalan | Banner offline, antrean sinkron, jumlah transaksi tertunda terlihat |
| **Perangkat bermasalah** | Printer putus, baterai habis | Transaksi tetap aman | Peringatan printer, opsi selesai tanpa struk, cetak ulang dari Riwayat, keranjang tersimpan otomatis |
| **Pergantian kasir** | Shift berganti | Masuk cepat dan teridentifikasi | Login PIN per orang, lockout percobaan salah |
| **Stok habis** | Barang habis saat dipesan | Pelanggan tahu seketika | Kartu produk nonaktif berlabel "Stok habis" |

## 5. Lingkup fitur

Prioritas: **P0** wajib di MVP, **P1** versi berikutnya, **P2** kemudian.

### P0 — MVP

| ID | Fitur | Kriteria penerimaan ringkas |
|---|---|---|
| F-01 | Login PIN dan peran | Pilih nama, PIN 4 angka, 5 kali salah → terkunci sementara, ada jalur pemilik via email |
| F-02 | Layar kasir | Grid produk, pencarian, filter kategori, keranjang dengan stepper +/−, total selalu terlihat |
| F-03 | Tahan dan lanjutkan pesanan | Lebih dari satu pesanan terbuka, tiap pesanan bernomor, tidak ada data hilang saat berpindah |
| F-04 | Pembayaran tunai | Uang diterima, tombol nominal cepat, kembalian otomatis, tombol Selesai nonaktif bila uang kurang |
| F-05 | Pembayaran QRIS dan transfer | Status menunggu/berhasil/gagal jelas, bisa ganti metode tanpa mengulang pesanan |
| F-06 | Struk | Cetak, selesai tanpa struk, cetak ulang dari Riwayat, printer putus tidak menggagalkan transaksi |
| F-07 | Stok | Berkurang otomatis, peringatan stok menipis, produk habis tidak bisa ditambahkan |
| F-08 | Offline-first | Semua alur kasir jalan tanpa internet, sinkron otomatis, tidak ada transaksi ganda |
| F-09 | Riwayat transaksi | Daftar per hari, detail, cetak ulang struk |
| F-10 | Kelola produk | Tambah, ubah, nonaktifkan produk: nama, harga, kategori, stok |
| F-11 | Landing page | Hero, skala usaha, situasi, unduh per platform, FAQ, kontak |

### P1

| ID | Fitur |
|---|---|
| F-12 | Laporan harian: omzet, jumlah transaksi, produk terlaris |
| F-13 | Varian menu (ukuran, gula, es) |
| F-14 | Pisah tagihan |
| F-15 | Hapus/refund transaksi dengan otorisasi pemilik |
| F-16 | Buka dan tutup shift beserta modal kas |
| F-17 | Diskon dengan batas dan peringatan |
| F-18 | Kirim struk via WhatsApp |

### P2

Layar dapur (KDS), multi-cabang, promo terjadwal, pemindai barcode, ekspor CSV.

## 6. Aturan pencegahan kesalahan

Aturan ini wajib diuji di setiap fitur.

| ID | Aturan |
|---|---|
| ER-01 | Menghapus satu item memunculkan **Batalkan** selama beberapa detik, tanpa dialog |
| ER-02 | **Kosongkan** semua pesanan selalu meminta konfirmasi |
| ER-03 | Tombol Bayar/Selesai hanya bisa ditekan sekali. Ketukan berulang tidak membuat transaksi ganda (idempotency key per transaksi) |
| ER-04 | Pembayaran tunai tidak bisa selesai bila uang diterima kurang dari total |
| ER-05 | Produk stok habis tidak bisa ditambahkan dan terlihat jelas sebelum diketuk |
| ER-06 | Kasir tidak bisa mengubah harga dari layar kasir. Diskon di atas batas butuh otorisasi pemilik |
| ER-07 | Keranjang tersimpan otomatis. Aplikasi tertutup atau crash tidak menghilangkan pesanan |
| ER-08 | Perubahan harga produk tidak mengubah transaksi lama |
| ER-09 | Nilai uang disimpan sebagai bilangan bulat Rupiah, tanpa desimal |
| ER-10 | Sinkronisasi idempoten. Transaksi yang sama tidak terkirim dua kali |
| ER-11 | Aksi merusak (hapus produk, refund) tidak berdekatan dengan aksi utama |
| ER-12 | Setiap kegagalan (printer, QRIS, sinkron) menjelaskan apa yang terjadi, apa yang tetap aman, dan langkah berikutnya |

## 7. Daftar layar

| Layar | Tujuan | Status desain |
|---|---|---|
| Login PIN | Identifikasi kasir cepat | Selesai (termasuk kondisi PIN salah) |
| Kasir | Mencatat pesanan | Selesai (termasuk offline, stok habis, undo, pesanan ditahan) |
| Pembayaran tunai | Terima uang dan kembalian | Selesai (termasuk offline dan printer putus) |
| Pembayaran QRIS / transfer | Menunggu pembayaran digital | Belum, termasuk kondisi gagal dan waktu habis |
| Riwayat | Lihat dan cetak ulang transaksi | Belum |
| Produk | Kelola produk dan stok | Belum |
| Laporan | Ringkasan harian | Belum |
| Pengaturan | Printer, struk, pengguna, metode bayar | Belum |
| Landing page | Pengenalan dan unduh | Selesai |

## 8. Landing page

Urutan bagian: header → hero (tombol unduh utama) → skala usaha → situasi (santai, ramai, bermasalah) → unduh per platform → FAQ → footer.

| Item | Ketentuan |
|---|---|
| Tombol unduh | Satu tombol per platform (Windows, Android `[ISI platform final]`), tersedia di header, hero, dan bagian unduh |
| Info unduhan | Versi `[ISI]`, ukuran `[ISI]`, syarat sistem `[ISI]`, tanggal pembaruan `[ISI]` |
| Kontak | Email `[ISI]`, WhatsApp `[ISI]` |
| Klaim fitur | Hanya fitur yang benar-benar ada di aplikasi. Isi ulang dari daftar F-xx setelah rilis |
| Tanpa | Testimoni palsu, angka pengguna karangan, logo klien fiktif |

## 9. Persyaratan non-fungsional

| Area | Ketentuan |
|---|---|
| Performa (asumsi) | Respons ketukan terasa instan, target awal ≤ 100 ms. Layar kasir siap dipakai ≤ 3 detik setelah dibuka |
| Offline | Semua alur P0 jalan tanpa internet, data lokal terenkripsi pada perangkat `[ISI]` |
| Keamanan | PIN disimpan sebagai hash, peran membatasi akses, log aktivitas pengguna untuk aksi sensitif |
| Aksesibilitas | Ikuti `DESIGN.md` §10: target sentuh ≥ 44 px, kontras teks ≥ 4,5:1 |
| Lokalisasi | Bahasa Indonesia, format `Rp 71.000`, zona waktu perangkat |
| Perangkat | Tablet landscape sebagai target utama, desktop dan ponsel didukung |

## 10. Data inti

| Entitas | Atribut utama |
|---|---|
| Pengguna | nama, peran, hash PIN, status aktif |
| Produk | nama, harga, kategori, stok, status aktif, (varian: P1) |
| Pesanan | nomor, status (aktif/ditahan/selesai/batal), pembuat, waktu |
| Item pesanan | produk, jumlah, harga saat transaksi |
| Pembayaran | metode, jumlah diterima, kembalian, status, idempotency key |
| Antrean sinkron | transaksi tertunda, waktu dibuat, percobaan kirim |

Aturan konflik sinkron: transaksi tidak pernah ditimpa. Data produk memakai versi terbaru, transaksi lama tetap membawa harga saat transaksi.

## 11. Rilis bertahap

| Tahap | Isi |
|---|---|
| MVP | F-01 sampai F-11 |
| v1.1 | F-12, F-13, F-16, F-17 |
| v1.2 | F-14, F-15, F-18 |
| v2 | P2 |

## 12. Risiko dan pertanyaan terbuka

| # | Pertanyaan atau risiko | Dampak |
|---|---|---|
| Q1 | Nama produk final dan identitas merek? | Landing page, logo |
| Q2 | Platform dan stack teknologi final? | Arsitektur offline dan cara distribusi |
| Q3 | Penyedia QRIS dan transfer yang dipakai? | F-05, biaya, status gagal/waktu habis |
| Q4 | Jenis printer yang didukung (Bluetooth, USB, LAN)? | F-06, daftar perangkat |
| Q5 | Model harga (gratis, berlangganan, sekali bayar)? | Landing page, bagian unduh |
| Q6 | Seberapa besar skala kafe yang ditargetkan di v1? | Cakupan P1 (varian, pisah tagihan) |
| R1 | Fitur kafe membuat tampilan perorangan terlalu rumit | Fitur lanjutan harus bisa dimatikan (G4) |
| R2 | Mode offline menimbulkan konflik data | Aturan §10 dan ER-10 harus diuji sejak awal |

## 13. Dasar riset

Ringkasan temuan: kebutuhan POS berbeda menurut jenis usaha, kafe butuh modifier menu dan layar dapur, kesalahan kasir saat ramai sering muncul karena sistem tidak meminta konfirmasi, mode offline dengan sinkron otomatis dianggap penting, dan UMKM Indonesia membutuhkan QRIS, stok otomatis, dan struk thermal. Tiap sumber dipakai sebagai rujukan arah, bukan data pengguna sendiri, sehingga validasi lapangan tetap diperlukan.

- https://www.lilachbullock.com/best-pos-systems-small-business/
- https://pos.toasttab.com/blog/best-cafe-pos-systems
- https://warelypos.com.sg/?p=14068
- https://www.zoho.com/blog/pos/benefits-of-pos-system-for-retail.html
- https://www.shopify.com/blog/pos-experience
- https://www.jurnal.id/id/blog/mengenal-tentang-program-kasir-gratis-sederhana/
- https://proceeding.isas.or.id/index.php/sentrinov/article/view/1714/1122
