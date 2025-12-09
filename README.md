# IMAJINASI LOKAL - PROMPT HOUSE

Web app untuk berbagi prompt AI (Midjourney, Gemini, Flux, dll) tanpa login, dengan dukungan multi-bahasa.

## Cara Update Konten (Prompt Baru)

Anda tidak perlu coding untuk menambah prompt. Cukup edit satu file:

1. Buka file `data.ts`.
2. Di bagian `PROMPTS`, tambahkan data prompt baru.
3. (Opsional) Gunakan fitur **Admin Helper** di website lokal Anda (`/admin-helper`) untuk membuat kode snippet secara otomatis, lalu copy-paste ke `data.ts`.
4. Commit dan Push ke GitHub. Vercel/Netlify akan otomatis mendeploy ulang website Anda.

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
