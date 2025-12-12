# IMAJINASI LOKAL - PROMPT HOUSE

Web app untuk berbagi prompt AI (Midjourney, Gemini, Flux, dll) tanpa login, dengan dukungan multi-bahasa.

## Cara Update Konten (Prompt Baru)

Website ini menggunakan sistem "Flat File Database" menggunakan JSON.

1. Buka halaman **Admin Tool** di website (`/admin-helper`).
2. Isi form dengan data prompt baru (Judul, URL Gambar, Prompt, dll).
3. Klik **Tambah ke Tabel**. Lakukan ini untuk semua prompt yang ingin ditambahkan.
4. Klik tombol **DOWNLOAD DATABASE**. Anda akan mendapatkan file `prompts.json`.
5. Upload/Replace file `prompts.json` yang ada di folder `public/` repository ini dengan file yang baru didownload.
6. Commit dan Push ke GitHub.

### Cara Manual
Jika ingin mengedit manual, cukup edit file `public/prompts.json`. Pastikan format JSON valid.

## Instalasi & Menjalankan Lokal

1. Clone repo ini.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Jalankan server development:
   ```bash
   npm run dev
   ```

## Deploy

Project ini siap di-deploy ke Vercel, Netlify, atau Cloudflare Pages.

1. Push ke GitHub.
2. Import project di dashboard Vercel/Netlify.
3. Framework preset akan otomatis terdeteksi sebagai **Vite**.
4. Deploy!