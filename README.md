# Realtime Chat App menggunakan Socket.io 

## Description

Tugas ini bertujuan untuk menguji kemampuan Anda dalam mengembangkan aplikasi realtime chat menggunakan Node.js dan Socket.io. Anda akan membuat aplikasi chat sederhana yang memungkinkan pengguna untuk berkomunikasi secara langsung dalam waktu nyata.

## Langkah-langkah

1. **Inisialisasi Proyek**
   - Buat folder proyek baru.
   - Inisialisasi proyek Node.js dengan menggunakan `npm init`.

2. **Instalasi Dependencies**
   - Instal `express` untuk membuat server HTTP.
   - Instal `socket.io` untuk mengimplementasikan komunikasi realtime.

3. **Membuat Server dan Koneksi Socket.io**
   - Inisialisasi server menggunakan Express.
   - Inisialisasi koneksi Socket.io pada server.

4. **Implementasi Fungsi Chat**
   - Tangani event ketika user bergabung dan meninggalkan chat.
   - Tangani event ketika pesan baru diterima.
   - Kirim pesan ke semua pengguna dalam room yang sama.

5. **Membuat Antarmuka Pengguna**
   - Buat file HTML untuk antarmuka pengguna.
   - Implementasi form untuk mengirim pesan.
   - Tampilkan daftar pesan dalam elemen UI.

6. **Implementasi Client-side Socket.io**
   - Di dalam file HTML, tambahkan script untuk menginisialisasi socket.io client.
   - Tangani event ketika pesan baru diterima dari server.
   - Kirim pesan ke server saat pengguna mengirim pesan.

7. **Pengujian dan Debugging**
   - Jalankan server dan buka beberapa tab browser untuk menguji chat.
   - Gunakan alat pengembangan (misalnya, Chrome DevTools) untuk melacak masalah dan debugging.

8. **Peningkatan Tambahan (Opsional)**
   - Implementasikan sistem user authentication.
   - Buat multiple chat rooms.
   - Tambahkan fitur emoticon atau lampiran gambar.
