import React, { useState, useEffect, useRef } from 'react';
import { Download, Plus, Trash2, Database, Image as ImageIcon, Save, RefreshCw, Upload, Copy, Check } from 'lucide-react';
import { AiModel, PromptItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { getOptimizedImageUrl } from '../utils/imageHelper';

export const AdminHelper: React.FC = () => {
  const { t } = useLanguage();
  
  // State untuk Data Database
  const [currentPrompts, setCurrentPrompts] = useState<PromptItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State Form
  const [formData, setFormData] = useState({
    title: '',
    model: AiModel.Gemini,
    subModel: '',
    imageUrl: '',
    prompt: '',
    negativePrompt: '',
    tags: '',
  });

  // Load data saat pertama buka
  useEffect(() => {
    loadDatabase();
  }, []);

  const loadDatabase = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`./prompts.json?t=${Date.now()}`);
      if (response.ok) {
        const data = await response.json();
        setCurrentPrompts(data.sort((a: any, b: any) => Number(b.id) - Number(a.id)));
      }
    } catch (e) {
      console.error("Gagal load database", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          if (Array.isArray(json)) {
             setCurrentPrompts(json.sort((a: any, b: any) => Number(b.id) - Number(a.id)));
             alert(`Berhasil mengimpor ${json.length} item dari file!`);
          } else {
             alert("Format file JSON tidak valid (harus array).");
          }
        } catch (err) {
          alert("Gagal membaca file JSON. Pastikan format benar.");
        }
      };
      reader.readAsText(file);
    }
    // Reset input agar bisa upload file yang sama jika perlu
    if (event.target) event.target.value = '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cleanText = (text: string) => text ? text.replace(/[\r\n]+/g, ' ').trim() : '';

  const handleAddToDatabase = () => {
    if (!formData.title || !formData.prompt) {
      alert("Judul dan Prompt wajib diisi!");
      return;
    }

    const newId = Date.now().toString();
    const newItem: PromptItem = {
      id: newId,
      title: cleanText(formData.title),
      model: formData.model,
      subModel: cleanText(formData.subModel) || 'V1',
      imageUrl: formData.imageUrl.trim(),
      prompt: cleanText(formData.prompt),
      negativePrompt: cleanText(formData.negativePrompt),
      dateAdded: new Date().toISOString().split('T')[0],
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== '')
    };

    const updatedList = [newItem, ...currentPrompts];
    setCurrentPrompts(updatedList);
    
    setFormData({
      title: '',
      model: AiModel.Gemini,
      subModel: '',
      imageUrl: '',
      prompt: '',
      negativePrompt: '',
      tags: '',
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin hapus item ini dari list sementara?')) {
      setCurrentPrompts(currentPrompts.filter(p => p.id !== id));
    }
  };

  const downloadJson = () => {
    const jsonString = JSON.stringify(currentPrompts, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "prompts.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = () => {
    const jsonString = JSON.stringify(currentPrompts, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
      
      {/* Header Area */}
      <div className="bg-gradient-to-r from-primary/20 to-purple-900/20 border border-white/10 rounded-2xl p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Database className="text-primary" /> Database Manager
            </h1>
            <p className="text-gray-300 max-w-xl text-sm leading-relaxed">
              Karena website ini berjalan tanpa server database (Static), perubahan data dilakukan via file <b>prompts.json</b>.
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/10 flex items-center gap-2"
            >
              <Upload size={18} /> Import JSON
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImportJson} 
              accept=".json" 
              className="hidden" 
            />
            <button 
              onClick={downloadJson}
              className="px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-green-400 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              <Download size={18} /> Download JSON
            </button>
          </div>
        </div>

        {/* Workflow Guide */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/30 p-3 rounded-lg border border-white/5 flex items-center gap-3">
            <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
            <div className="text-xs text-gray-300"><b>Tambah Item</b> pada form di bawah ini.</div>
          </div>
          <div className="bg-black/30 p-3 rounded-lg border border-white/5 flex items-center gap-3">
            <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
            <div className="text-xs text-gray-300">Klik <b>Download JSON</b> untuk dapat file terbaru.</div>
          </div>
          <div className="bg-black/30 p-3 rounded-lg border border-white/5 flex items-center gap-3">
            <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
            <div className="text-xs text-gray-300">Timpa file <b>public/prompts.json</b> di GitHub.</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Input Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border border-white/10 rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
              <Plus size={20} className="text-primary" /> Input Data
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Judul</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                  placeholder="Contoh: Cyberpunk Street"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Model</label>
                  <select 
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white"
                  >
                    {Object.values(AiModel).map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Versi / Sub</label>
                  <input 
                    type="text" 
                    name="subModel"
                    value={formData.subModel}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white"
                    placeholder="e.g. XL, V6"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Image URL</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 pl-9 text-white focus:border-primary focus:outline-none"
                    placeholder="https://..."
                  />
                  <ImageIcon size={16} className="absolute left-3 top-3.5 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Prompt</label>
                <textarea 
                  name="prompt"
                  value={formData.prompt}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm"
                  placeholder="Isi prompt..."
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Negative Prompt</label>
                <textarea 
                  name="negativePrompt"
                  value={formData.negativePrompt}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm"
                  placeholder="Optional..."
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Tags</label>
                <input 
                  type="text" 
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white"
                  placeholder="Foto, Realistik, 8k..."
                />
              </div>

              <button 
                onClick={handleAddToDatabase}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors flex justify-center items-center gap-2 border border-white/10"
              >
                <Plus size={18} /> Tambah ke Tabel
              </button>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: List Preview */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-white/10 rounded-xl overflow-hidden flex flex-col h-full max-h-[800px]">
            <div className="p-4 bg-black/20 border-b border-white/10 flex justify-between items-center shrink-0">
              <h2 className="font-bold flex items-center gap-2">
                Database Preview <span className="text-xs bg-white/10 px-2 py-0.5 rounded ml-2">{currentPrompts.length} Items</span>
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-white/10 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors text-gray-300"
                  title="Copy JSON text to clipboard"
                >
                  {copied ? <Check size={16} className="text-green-500"/> : <Copy size={16} />}
                  {copied ? "Copied" : "Copy Text"}
                </button>
                <button onClick={loadDatabase} className="p-2 hover:bg-white/10 rounded-full" title="Reset / Reload">
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto custom-scrollbar p-4 space-y-3">
              {isLoading ? (
                <div className="text-center py-20 text-gray-500">
                  <RefreshCw className="animate-spin mx-auto mb-2" />
                  Loading data...
                </div>
              ) : (
                currentPrompts.map((item, index) => (
                  <div key={item.id} className={`flex gap-4 p-4 rounded-lg border ${index === 0 ? 'bg-primary/5 border-primary/30' : 'bg-black/20 border-white/5'}`}>
                    {/* Thumbnail */}
                    <div className="w-16 h-16 flex-shrink-0 bg-black rounded-md overflow-hidden border border-white/10 relative group">
                      <img 
                        src={getOptimizedImageUrl(item.imageUrl)} 
                        alt="thumb" 
                        className="w-full h-full object-cover"
                        onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/80'}
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-white truncate text-sm">{item.title}</h3>
                        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-400 whitespace-nowrap">{item.model}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2 font-mono">{item.prompt}</p>
                      <div className="flex gap-2 mt-2">
                        {item.tags?.map(t => (
                          <span key={t} className="text-[10px] text-primary bg-primary/10 px-1 rounded">{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};