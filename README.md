# IMAJINASI LOKAL - PROMPT HOUSE

Web app untuk berbagi prompt AI (Midjourney, Gemini, Flux, dll) tanpa login, dengan dukungan multi-bahasa.

---

## 🔗 FORM CONTRIBUTE (UPLOAD DISINI)

Ingin menambahkan Prompt baru beserta gambarnya? Klik link di bawah ini:

### 👉 [KLIK DISINI UNTUK ISI FORM UPLOAD](https://github.com/imajinasilokal/prompt-house/issues/new?template=add_prompt.yml)

*(Pastikan Anda sudah Login ke GitHub)*

---

## ⚡ PANDUAN AWAL (SETUP PERTAMA KALI)

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

## 🚀 CARA KERJA UPLOAD

### Cara 1: Otomatis (Link di Atas) - Recommended
Metode ini **TIDAK** membutuhkan penyimpanan file gambar di folder lokal komputer Anda.
1. Klik Link **Form Contribute** di atas.
2. Isi Judul, Model AI, dan Prompt.
3. **Drag & drop gambar** langsung ke area text (atau klik bar upload di bawahnya).
4. Klik **Submit New Issue**.
5. Tunggu 1-2 menit, GitHub Actions akan memproses data dan website akan terupdate otomatis.

### Cara 2: Manual (Edit JSON)
1. Edit file `public/prompts.json`.
2. Masukkan URL gambar (bisa link Discord, Cloudinary, atau link GitHub).
3. Commit changes.

---

## 🆘 TROUBLESHOOTING: GAGAL PUSH / SAVE TO GITHUB?

Jika Anda mendapatkan error saat mencoba **Save to GitHub** (biasanya error: *rejected* atau *fetch first*), itu karena **Robot GitHub Actions baru saja mengupdate file `prompts.json`**, dan data di komputer/studio Anda tertinggal.

**Solusinya (Jalankan di Terminal Studio):**

```bash
# 1. Simpan perubahan Anda sementara
git stash

# 2. Ambil data terbaru dari GitHub (termasuk update dari Robot)
git pull origin main --rebase

# 3. Kembalikan perubahan Anda
git stash pop

# 4. Upload lagi
git add .
git commit -m "Update kode"
git push origin main
```

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
