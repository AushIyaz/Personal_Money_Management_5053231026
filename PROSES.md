# PROSES.md

## 1. Identifikasi Persona dan Masalah Keuangan
Persona yang saya dapatkan adalah Ibu Rumah Tangga. Masalah keuangan utama dari persona ini adalah bagaimana mengelola dan membagi uang belanja bulanan ke dalam beberapa pos kebutuhan yang berbeda agar uang tidak tercampur dan cepat habis tanpa kendali. Untuk mengatasi hal tersebut, saya merancang sistem "amplop digital" di dalam aplikasi web ini agar setiap pengeluaran tercatat secara spesifik pada pos amplopnya masing-masing.

## 2. Rancangan Struktur Data (localStorage)
Data aplikasi disimpan secara lokal menggunakan localStorage dengan format JSON agar tetap persisten meskipun halaman browser ditutup atau di-refresh. Struktur data dibagi menjadi dua bagian utama:
- transaksi: Berupa array of objects untuk merekam riwayat seluruh pemasukan dan pengeluaran.
  Contoh struktur satu transaksi:
  {
    "id": 1739251200000,
    "tanggal": "2026-10-19",
    "jenis": "pengeluaran",
    "kategori": "Belanja Dapur",
    "nominal": 75000,
    "catatan": "Beli sayur dan bumbu"
  }
- amplopData: Berupa objek untuk menyimpan daftar pos amplop beserta alokasi nominal dananya.
  Contoh struktur:
  {
    "Belanja Dapur": 500000,
    "Listrik & Air": 300000,
    "Kebutuhan Anak": 400000
  }

## 3. Keputusan Desain
Saya memilih pendekatan antarmuka modular dengan memisahkan halaman menjadi beberapa bagian utama: kartu ringkasan otomatis (pemasukan, pengeluaran, saldo), kotak visualisasi status amplop interaktif, formulir input transaksi dinamis, serta daftar riwayat transaksi. 

Alasan desain ini dipilih adalah agar pengguna (ibu rumah tangga) bisa langsung melihat sisa saldo di setiap pos amplop secara sekilas (at a glance) sebelum memutuskan untuk mencatat pengeluaran baru. Selain itu, fungsi-fungsi JavaScript dirancang terpisah secara modular (renderDaftar(), hitungRingkasan(), renderAmplopGrid()) agar setiap ada perubahan data, seluruh komponen antarmuka dapat diperbarui secara sinkron tanpa jeda.

## 4. Kendala (Bug) dan Cara Mengatasinya
Selama proses pembuatan aplikasi, saya menghadapi beberapa kendala berikut:
- Kendala 1 (Sinkronisasi Data Amplop): 
  * Masalah: Ketika transaksi pengeluaran diedit atau dihapus melalui daftar riwayat, sisa nominal pada kartu amplop di bagian atas sempat tidak langsung memperbarui perhitungannya.
  * Solusi: Saya memastikan bahwa setiap kali fungsi tambah, edit, atau hapus dijalankan, program wajib memanggil ulang fungsi perenderan secara berurutan (fnSimpanData() -> renderDaftar() -> hitungRingkasan() -> renderAmplopGrid()).
- Kendala 2 (Tata Letak Responsif): 
  * Masalah: Elemen item daftar transaksi sempat berantakan dan meluber keluar dari batas layar saat diuji pada tampilan perangkat seluler berukuran kecil (lebar 360px).
  * Solusi: Saya menambahkan aturan CSS berupa Media Query (@media screen and (max-width: 360px)) yang secara otomatis mengubah susunan tombol aksi dan teks nominal dari posisi menyamping (horizontal) menjadi bertumpuk ke bawah (vertikal) agar tetap rapi.