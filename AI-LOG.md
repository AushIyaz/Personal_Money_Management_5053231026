# AI-LOG.md

Catatan penggunaan AI generatif selama pengembangan aplikasi Personal Money Management (Persona: Ibu Rumah Tangga).

## 1. Perhitungan Sisa Saldo Amplop Otomatis
- **Prompt:** "Bagaimana cara membuat fungsi JavaScript untuk menghitung sisa dana pos amplop berdasarkan data transaksi pengeluaran?"
- **Bagian yang Dipakai:** Logika perulangan `transaksi.forEach` untuk menjumlahkan pengeluaran per kategori amplop.
- **Modifikasi/Perbaikan:** Hasil kode dari AI awalnya langsung menampilkan angka minus jika pengeluaran melebihi alokasi. Saya tambahkan kondisi percabangan dan penambahan kelas CSS khusus (`.habis` dan `.mendekati-habis`) agar tampilannya memunculkan peringatan visual berupa teks [HABIS] atau [MENDEKATI BATAS] secara dinamis.

## 2. Fitur Bonus Edit Transaksi
- **Prompt:** "Tuliskan contoh kode untuk memuat data transaksi dari array ke dalam form input HTML agar bisa diubah (edit)."
- **Bagian yang Dipakai:** Logika pencarian data menggunakan `id` dan pengisian nilai input (`document.getElementById(...).value = ...`).
- **Modifikasi/Perbaikan:** Mengubah tombol *submit* agar bisa beralih fungsi secara dinamis antara "Simpan Transaksi Baru" dan "Perbarui Transaksi" tergantung apakah `edit-id` sedang terisi atau kosong, serta menambahkan tombol Batal.

## 3. Fitur Bonus Ekspor & Impor JSON
- **Prompt:** "Bagaimana cara membuat tombol ekspor data localStorage ke file JSON dan mengimpornya kembali menggunakan JavaScript?"
- **Bagian yang Dipakai:** Penggunaan objek `Blob` dan URL data URI untuk unduhan file, serta API `FileReader` untuk membaca file input.
- **Modifikasi/Perbaikan:** Menambahkan validasi `try-catch` serta pengecekan struktur objek `parsed.transaksi` saat proses impor agar aplikasi tidak mengalami *error* atau *crash* jika pengguna mengunggah file sembarangan.