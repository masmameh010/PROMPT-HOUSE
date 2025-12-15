# IMAJINASI LOKAL - PROMPT HOUSE

Web app untuk berbagi prompt AI (Midjourney, Gemini, Flux, dll) tanpa login, dengan dukungan multi-bahasa.

---

## ⚡ PANDUAN METODE BARU (ISSUES AS CMS)

Agar fitur **Upload via GitHub Issues** berjalan lancar, Anda wajib mengaktifkan izin di pengaturan Repository GitHub Anda.

### ⚠️ WAJIB: Aktifkan Izin Robot (Read & Write)

1. Buka Repository GitHub Anda.
2. Masuk ke **Settings** (Tab paling kanan).
3. Di menu kiri, klik **Actions** -> **General**.
4. Scroll ke bawah ke bagian **Workflow permissions**.
5. Pilih opsi: **Read and write permissions**.
6. Klik **Save**.

*Jika ini tidak diaktifkan, Robot akan gagal mengupdate file `prompts.json` dan memberikan error "Permission Denied" saat Anda submit issue.*

---

## 🚀 CARA UPLOAD PROMPT

### Cara 1: Otomatis (Tanpa Folder Lokal) - Recommended
Metode ini **TIDAK** membutuhkan penyimpanan file gambar di folder lokal komputer Anda.
1. Buka tab **Issues** di repo ini.
2. Klik **New Issue**.
3. Pilih **🚀 Tambah Prompt Baru**.
4. Isi form, **drag & drop gambar langsung ke form**, dan Submit.
5. GitHub akan meng-hosting gambar tersebut secara gratis.

### Cara 2: Manual (Edit JSON)
1. Edit file `public/prompts.json`.
2. Masukkan URL gambar (bisa link Discord, Cloudinary, atau link GitHub).
3. Commit changes.

---

## ❓ FAQ (Pertanyaan Umum)

**Q: Apakah saya harus upload gambar ke folder `public/images`?**
A: **Tidak Wajib.** Jika Anda menggunakan "Cara 1 (Issues)", gambar otomatis di-host di server GitHub. Folder `public/images` hanya dibutuhkan jika Anda ingin menyimpan file gambar secara fisik di dalam repo (yang mana lebih ribet untuk pemula).

**Q: Kenapa "Save to GitHub" gagal?**
A: Karena ada update baru dari Robot (GitHub Actions) yang belum masuk ke komputer Anda. Lakukan `git pull` dulu sebelum push.

---

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

## Struktur Folder

* `.github/workflows/` -> Logika otomatisasi robot.
* `public/prompts.json` -> Database utama.
* `public/images/` -> (Opsional) Tempat menyimpan gambar jika tidak pakai link luar.

## Deploy

Project ini siap di-deploy ke Vercel, Netlify, atau Cloudflare Pages.
Pastikan setting "Build Command" adalah `npm run build` dan "Output Directory" adalah `dist`.
