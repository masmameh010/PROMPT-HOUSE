
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper untuk parsing body issue
function extractValue(body, sectionTitle) {
  // Regex mencari teks di antara heading "### Judul" dan heading berikutnya "###"
  const regex = new RegExp(`### ${sectionTitle}\\s+([\\s\\S]*?)(?=###|$)`, 'i');
  const match = body.match(regex);
  return match ? match[1].trim() : '';
}

function extractImage(text) {
  // Mencari format markdown gambar: ![alt](url) atau <img src="url">
  const markdownRegex = /\!\[.*?\]\((.*?)\)/;
  const htmlRegex = /src=["'](.*?)["']/;
  
  const mdMatch = text.match(markdownRegex);
  if (mdMatch) return mdMatch[1];
  
  const htmlMatch = text.match(htmlRegex);
  if (htmlMatch) return htmlMatch[1];
  
  // Jika user cuma paste URL mentah
  if (text.startsWith('http')) return text.trim();
  
  return '';
}

try {
  // 1. Ambil data dari Environment Variable (diset oleh GitHub Actions)
  const issueBody = process.env.ISSUE_BODY || '';
  const issueTitle = process.env.ISSUE_TITLE || 'Untitled';
  
  console.log("Memproses Prompt Baru...");

  // 2. Parsing Data
  const rawModel = extractValue(issueBody, 'Model AI');
  const rawSubModel = extractValue(issueBody, 'Sub Model / Versi');
  const rawAuthor = extractValue(issueBody, 'Nama Contributor \\(Opsional\\)'); // Escape tanda kurung
  const rawAuthorUrl = extractValue(issueBody, 'Link Social Media \\(Opsional\\)'); // Escape tanda kurung
  
  const rawImageBlock = extractValue(issueBody, 'Upload Gambar');
  const rawPrompt = extractValue(issueBody, 'Prompt Asli');
  const rawTags = extractValue(issueBody, 'Tags / Kategori');
  const customTitle = extractValue(issueBody, 'Judul Gambar');

  // Fallback title jika user lupa ganti judul issue [PROMPT]: ...
  const cleanTitle = (customTitle || issueTitle.replace('[PROMPT]:', '')).trim();
  const imageUrl = extractImage(rawImageBlock);

  if (!cleanTitle || !rawPrompt || !imageUrl) {
    console.error("❌ Data tidak lengkap! Pastikan Judul, Prompt, dan Gambar terisi.");
    process.exit(1);
  }

  // 3. Buat Object Item Baru
  const newItem = {
    id: Date.now().toString(),
    title: cleanTitle,
    model: rawModel || 'Gemini',
    subModel: rawSubModel || 'V1',
    imageUrl: imageUrl,
    prompt: rawPrompt,
    negativePrompt: "", 
    dateAdded: new Date().toISOString().split('T')[0],
    tags: rawTags ? rawTags.split(',').map(t => t.trim()) : ['LOKAL'],
    author: rawAuthor === "_No response_" ? "Anonymous" : rawAuthor || "Anonymous",
    authorUrl: rawAuthorUrl === "_No response_" ? "" : rawAuthorUrl || ""
  };

  // 4. Baca & Update File JSON
  const dbPath = path.join(__dirname, '../public/prompts.json');
  let fileContent = '[]';
  
  if (fs.existsSync(dbPath)) {
      fileContent = fs.readFileSync(dbPath, 'utf8');
  }
  
  let json = [];
  try {
    json = JSON.parse(fileContent);
  } catch (e) {
    console.log("File JSON kosong atau rusak, membuat baru.");
    json = [];
  }

  // Masukkan ke paling atas
  json.unshift(newItem);
  
  // Sort (jaga-jaga)
  json.sort((a, b) => Number(b.id) - Number(a.id));

  // Simpan
  fs.writeFileSync(dbPath, JSON.stringify(json, null, 2));
  
  console.log(`✅ Sukses menambahkan: ${cleanTitle}`);
  console.log(`👤 Author: ${newItem.author}`);
  console.log(`📸 Image: ${imageUrl}`);

} catch (error) {
  console.error("❌ Terjadi Error:", error);
  process.exit(1);
}