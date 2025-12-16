import React, { useState, useEffect } from 'react';
import { Copy, Check, FileJson, Image as ImageIcon, User, Eye, ExternalLink, Github, RefreshCw, Plus, RotateCcw, Hash } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { AiModel, PromptItem } from '../types';

export const AdminHelper: React.FC = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  
  // Initial State untuk Form
  const initialFormState = {
    title: '',
    model: 'Gemini' as AiModel,
    subModel: '',
    imageUrl: '',
    prompt: '',
    negativePrompt: '',
    tags: '',
    author: '',
    authorUrl: ''
  };

  // Form State
  const [formData, setFormData] = useState(initialFormState);

  // ID Management
  const [generatedId, setGeneratedId] = useState("001");
  const [lastDbId, setLastDbId] = useState(0); // Melacak ID terakhir di DB real
  const [localIncrement, setLocalIncrement] = useState(1); // Melacak berapa item dibuat sesi ini

  // 1. Ambil data terakhir dari prompts.json saat load
  useEffect(() => {
    const fetchLatestId = async () => {
      try {
        const response = await fetch('./prompts.json');
        const data = await response.json();
        
        let maxId = 0;
        if (Array.isArray(data)) {
          data.forEach((item: any) => {
            const numId = parseInt(item.id, 10);
            if (!isNaN(numId) && numId > maxId) {
               // Filter: hanya anggap ID sebagai angka urut jika di bawah timestamp (misal < 100000)
               // atau jika user memang sudah merubah semua ID jadi angka kecil.
               // Di sini kita ambil max value number apa saja.
               if (numId < 1700000000000) { // Asumsi ID timestamp pasti besar
                  maxId = numId;
               }
            }
          });
        }
        setLastDbId(maxId);
        // Set ID awal = Max + 1
        const nextId = String(maxId + 1).padStart(3, '0');
        setGeneratedId(nextId);
      } catch (error) {
        console.error("Gagal load prompts.json", error);
      }
    };

    fetchLatestId();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fungsi Reset untuk Item Baru (Increment ID)
  const handleReset = () => {
    const isConfirmed = !formData.title || window.confirm("Bersihkan form dan buat ID urutan selanjutnya?");
    if (isConfirmed) {
      setFormData(initialFormState);
      
      // Increment ID local
      const nextNum = lastDbId + localIncrement + 1;
      setLocalIncrement(prev => prev + 1);
      setGeneratedId(String(nextNum).padStart(3, '0'));
      
      setCopied(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Membuat Object JSON
  const generateJSON = () => {
    const item: PromptItem = {
      id: generatedId,
      title: formData.title || "Judul Gambar",
      model: formData.model,
      subModel: formData.subModel || "V1",
      imageUrl: formData.imageUrl || "https://via.placeholder.com/400x600?text=No+Image",
      prompt: formData.prompt || "Isi prompt disini...",
      negativePrompt: formData.negativePrompt,
      dateAdded: new Date().toISOString().split('T')[0],
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : ['LOKAL'],
      author: formData.author || "Admin",
      authorUrl: formData.authorUrl
    };
    return JSON.stringify(item, null, 2); // Indentasi 2 spasi biar rapi
  };

  const handleCopy = () => {
    const codeToCopy = generateJSON() + ","; // Tambah koma biar user tinggal paste
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
      
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-2 flex justify-center items-center gap-3">
          <FileJson className="text-primary w-10 h-10" /> 
          Generator JSON Manual
        </h1>
        <p className="text-gray-400">
          ID Otomatis Urut. <span className="text-primary font-bold">Tidak Perlu Refresh.</span>
        </p>
      </div>

      {/* SYNC DATA ALERT */}
      <div className="mb-8 bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-full text-blue-400">
            <RefreshCw size={24} />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Sinkronisasi Data</h3>
            <p className="text-sm text-gray-400">
              Pastikan Anda sudah melakukan pull terbaru agar nomor urut ID tidak bentrok.
            </p>
          </div>
        </div>
        <div className="bg-black/50 px-4 py-2 rounded-lg border border-white/10 font-mono text-sm text-yellow-400 whitespace-nowrap">
           npm run sync
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* KOLOM KIRI: FORM INPUT */}
        <div className="space-y-6">
          
          {/* TOMBOL RESET / NEW ITEM */}
          <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
             <div className="flex items-center gap-2 text-gray-400 text-sm font-mono">
                <Hash size={14} className="text-primary"/>
                ID Selanjutnya: <span className="text-white bg-black px-2 py-0.5 rounded font-bold text-lg text-primary">{generatedId}</span>
             </div>
             <button 
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-lg text-sm font-bold transition-all"
             >
                <Plus size={16} /> Item Baru (Next ID)
             </button>
          </div>

          <div className="bg-card border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <ImageIcon size={20} className="text-primary" /> 1. Isi Detail Gambar
            </h2>
            
            <div className="space-y-4">
              {/* Judul */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Judul Gambar</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Contoh: Gadis Cyberpunk"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                />
              </div>

              {/* Model & SubModel */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Model AI</label>
                  <select
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  >
                    {Object.values(AiModel).map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Versi / Sub Model</label>
                  <input
                    type="text"
                    name="subModel"
                    value={formData.subModel}
                    onChange={handleChange}
                    placeholder="Contoh: Nano Banana, Flux.1"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Link Gambar (URL)</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://i.imgur.com/..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none font-mono text-xs"
                />
                <p className="text-[10px] text-gray-500 mt-1">
                  *Tips: Upload gambar ke Discord/Cloudinary lalu copy link-nya ke sini.
                </p>
              </div>

              {/* Author Info */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Nama Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Nama Kamu"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Link Sosmed</label>
                  <input
                    type="text"
                    name="authorUrl"
                    value={formData.authorUrl}
                    onChange={handleChange}
                    placeholder="https://instagram.com/..."
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Prompt */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Prompt Asli</label>
                <textarea
                  name="prompt"
                  value={formData.prompt}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Masukkan prompt lengkap..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none font-mono text-sm"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Tags (Pisahkan koma)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="LOKAL, REALISTIC, INDO"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: PREVIEW & OUTPUT */}
        <div className="space-y-6">
          
          {/* PREVIEW CARD */}
          <div className="bg-card border border-white/10 rounded-2xl p-6">
             <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Eye size={20} className="text-secondary" /> Preview Tampilan
            </h2>
            <div className="w-full max-w-sm mx-auto bg-darker rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <div className="relative aspect-[3/4] bg-black">
                <img 
                  src={formData.imageUrl || "https://via.placeholder.com/400x600?text=Preview+Image"} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-white font-bold truncate">{formData.title || "Judul Gambar"}</p>
                  <p className="text-primary text-xs">{formData.subModel || "V1"}</p>
                </div>
              </div>
              <div className="p-3">
                 <div className="flex justify-between items-center text-xs text-gray-400">
                    <span className="bg-white/10 px-2 py-1 rounded">{formData.model}</span>
                    <span className="flex items-center gap-1"><User size={10}/> {formData.author || "Admin"}</span>
                 </div>
              </div>
            </div>
          </div>

          {/* CODE OUTPUT */}
          <div className="bg-[#1e1e1e] border border-primary/30 rounded-2xl p-6 shadow-lg shadow-primary/5">
            <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
              <FileJson size={20} /> 2. Copy Kode Ini
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Kode di bawah ini sudah valid. Tinggal copy dan paste.
            </p>

            <div className="relative group">
              <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto text-xs font-mono text-green-400 border border-white/10">
                {generateJSON()},
              </pre>
              <div className="absolute top-2 right-2 flex gap-2">
                 <button
                  onClick={handleCopy}
                  className="bg-primary hover:bg-green-400 text-black px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all shadow-lg"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Tersalin!" : "Copy JSON"}
                </button>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="mt-4 flex justify-end">
               <button 
                  onClick={handleReset}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1 hover:underline"
               >
                  <RotateCcw size={12}/> Sudah dicopy? Klik untuk buat baru (ID +1)
               </button>
            </div>

            {/* INSTRUCTION */}
            <div className="mt-6 p-4 bg-white/5 rounded-lg border-l-2 border-yellow-500">
              <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                <Github size={16} /> Langkah Terakhir:
              </h3>
              <ol className="text-sm text-gray-400 space-y-2 list-decimal pl-4">
                <li>Copy kode di atas (klik tombol hijau).</li>
                <li>Buka file <code className="bg-black px-1 py-0.5 rounded text-yellow-500">public/prompts.json</code> di Repo GitHub kamu.</li>
                <li>Klik icon Pensil (Edit).</li>
                <li>Paste kode tadi di <strong>baris ke-2</strong> (setelah tanda kurung siku buka <code>[</code> ).</li>
                <li>Klik <strong>Commit Changes</strong>. Selesai!</li>
              </ol>
              <div className="mt-4">
                <a 
                   href="https://github.com/imajinasilokal/prompt-house/edit/main/public/prompts.json"
                   target="_blank"
                   rel="noreferrer" 
                   className="inline-flex items-center gap-2 text-xs text-primary hover:text-white hover:underline cursor-pointer"
                >
                  <ExternalLink size={12} /> Klik untuk buka prompts.json langsung
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
