import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- HELPER FUNCTIONS ---

function extractValue(body, sectionTitle) {
  const regex = new RegExp(`### ${sectionTitle}\\s+([\\s\\S]*?)(?=###|$)`, 'i');
  const match = body.match(regex);
  return match ? match[1].trim() : '';
}

function extractImage(text) {
  const markdownRegex = /\!\[.*?\]\((.*?)\)/;
  const htmlRegex = /src=["'](.*?)["']/;
  
  const mdMatch = text.match(markdownRegex);
  if (mdMatch) return mdMatch[1];
  
  const htmlMatch = text.match(htmlRegex);
  if (htmlMatch) return htmlMatch[1];
  
  if (text.startsWith('http')) return text.trim();
  
  return '';
}

function generateMarkdownFiles(json) {
  // Urutkan berdasarkan ID descending (Terbaru diatas) untuk website, 
  // Tapi untuk markdown library mungkin lebih enak ascending atau descending.
  // Kita pakai Descending (Terbaru di file LIBRARY_01).
  
  // Sort numeric descending
  const sortedJson = [...json].sort((a, b) => Number(b.id) - Number(a.id));
  
  const CHUNK_SIZE = 50;
  const totalFiles = Math.ceil(sortedJson.length / CHUNK_SIZE);

  console.log(`📚 Generating ${totalFiles} Markdown Library files...`);

  for (let i = 0; i < totalFiles; i++) {
    const chunk = sortedJson.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
    const pageNum = i + 1;
    const fileName = `LIBRARY_${String(pageNum).padStart(2, '0')}.md`;
    const filePath = path.join(__dirname, '..', fileName);

    let mdContent = `# 📚 Prompt Library - Part ${pageNum}\n\n`;
    mdContent += `> Koleksi prompt AI (Gemini, Flux, dll). Halaman ini digenerate otomatis.\n\n`;
    mdContent += `[<< Kembali ke Website Utama](https://imajinasilokal.github.io/prompt-house/)\n\n`;
    mdContent += `| ID | Preview | Detail Prompt |\n`;
    mdContent += `| :--- | :--- | :--- |\n`;

    chunk.forEach(item => {
      const safeTitle = item.title.replace(/\|/g, '-');
      const safePrompt = item.prompt.replace(/\|/g, '-').replace(/\n/g, '<br>');
      const safeModel = item.model;
      const safeSub = item.subModel;
      
      // Thumbnail kecil untuk tabel
      const imgTag = `<img src="${item.imageUrl}" width="200" alt="${safeTitle}">`;

      mdContent += `| **#${item.id}** | ${imgTag}<br>**${safeTitle}** | **Model:** ${safeModel} (${safeSub})<br><br>**Prompt:**<br>_${safePrompt}_ |\n`;
    });

    // Navigasi bawah
    mdContent += `\n---\n`;
    if (pageNum < totalFiles) {
       mdContent += `[Halaman Berikutnya (Part ${pageNum + 1}) >>](./LIBRARY_${String(pageNum + 1).padStart(2, '0')}.md)\n`;
    }

    fs.writeFileSync(filePath, mdContent);
    console.log(`✅ Created: ${fileName}`);
  }
}

// --- MAIN PROCESS ---

try {
  const issueBody = process.env.ISSUE_BODY || '';
  const issueTitle = process.env.ISSUE_TITLE || 'Untitled';
  
  console.log("Processing New Prompt...");

  // 1. Parse Data Form Issue
  const rawModel = extractValue(issueBody, 'Model AI');
  const rawSubModel = extractValue(issueBody, 'Sub Model / Versi');
  const rawAuthor = extractValue(issueBody, 'Nama Contributor \\(Opsional\\)');
  const rawAuthorUrl = extractValue(issueBody, 'Link Social Media \\(Opsional\\)');
  const rawImageBlock = extractValue(issueBody, 'Upload Gambar');
  const rawPrompt = extractValue(issueBody, 'Prompt Asli');
  const rawTags = extractValue(issueBody, 'Tags / Kategori');
  const customTitle = extractValue(issueBody, 'Judul Gambar');

  const cleanTitle = (customTitle || issueTitle.replace('[PROMPT]:', '')).trim();
  const imageUrl = extractImage(rawImageBlock);

  if (!cleanTitle || !rawPrompt || !imageUrl) {
    console.error("❌ Data tidak lengkap! (Judul/Prompt/Gambar Missing)");
    process.exit(1);
  }

  // 2. Read JSON Database
  const dbPath = path.join(__dirname, '../public/prompts.json');
  let fileContent = '[]';
  if (fs.existsSync(dbPath)) {
      fileContent = fs.readFileSync(dbPath, 'utf8');
  }
  
  let json = [];
  try {
    json = JSON.parse(fileContent);
  } catch (e) {
    json = [];
  }

  // 3. GENERATE SEQUENTIAL ID
  // Mencari ID numeric tertinggi yang bukan timestamp (misal dibawah 1700000000000)
  // Atau jika user sudah merapikan semua jadi 001-021, kita ambil max nya.
  let maxId = 0;
  json.forEach(item => {
    const numId = parseInt(item.id, 10);
    // Kita filter ID yang masuk akal sebagai urutan (bukan timestamp raksasa)
    // Timestamp biasanya 13 digit (1765...)
    // Urutan manual biasanya 1-4 digit.
    if (!isNaN(numId) && numId < 1700000000000) {
      if (numId > maxId) maxId = numId;
    }
  });

  const nextIdNum = maxId + 1;
  const nextIdStr = String(nextIdNum).padStart(3, '0'); // 001, 002, ..., 022

  const newItem = {
    id: nextIdStr,
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

  console.log(`✨ New ID Generated: ${nextIdStr}`);

  // 4. Update JSON
  json.unshift(newItem); // Tambah di atas
  json.sort((a, b) => Number(b.id) - Number(a.id)); // Pastikan urut Descending

  fs.writeFileSync(dbPath, JSON.stringify(json, null, 2));
  console.log(`✅ Saved to prompts.json`);

  // 5. Generate Markdown Files for GitHub Browsing
  generateMarkdownFiles(json);

} catch (error) {
  console.error("❌ Fatal Error:", error);
  process.exit(1);
}
