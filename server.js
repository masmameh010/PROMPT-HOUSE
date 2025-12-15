import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup path karena kita pakai ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001; // Port khusus untuk server admin
const DATA_FILE = path.join(__dirname, 'public', 'prompts.json');

app.use(cors());
app.use(bodyParser.json());

// 1. Cek Status Server
app.get('/api/status', (req, res) => {
  res.json({ status: 'online', message: 'Local Admin Server Running' });
});

// 2. Simpan Data ke JSON
app.post('/api/save', (req, res) => {
  const newItem = req.body;

  if (!newItem || !newItem.title) {
    return res.status(400).json({ ok: false, message: 'Data tidak valid' });
  }

  // Baca file lama
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error("Gagal membaca file:", err);
      return res.status(500).json({ ok: false, message: 'Gagal membaca database' });
    }

    let json = [];
    try {
      json = JSON.parse(data);
    } catch (e) {
      console.error("JSON Error:", e);
      json = [];
    }

    // Tambahkan item baru di paling atas (unshift)
    json.unshift(newItem);

    // Urutkan berdasarkan ID (terbaru di atas)
    json.sort((a, b) => Number(b.id) - Number(a.id));

    // Tulis balik ke file
    fs.writeFile(DATA_FILE, JSON.stringify(json, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).json({ ok: false, message: 'Gagal menulis file' });
      }
      console.log(`[SAVED] ${newItem.title} (ID: ${newItem.id})`);
      res.json({ ok: true, message: 'Berhasil disimpan ke prompts.json' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 LOCAL ADMIN SERVER BERJALAN DI PORT ${PORT}`);
  console.log(`📂 Siap menulis ke: ${DATA_FILE}`);
  console.log(`--------------------------------------------------`);
  console.log(`Sekarang jalankan 'npm run dev' di terminal LAIN untuk membuka web.\n`);
});