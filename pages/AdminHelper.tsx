import React, { useState } from 'react';
import { Copy, Check, Terminal, Image as ImageIcon } from 'lucide-react';
import { AiModel } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const AdminHelper: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    model: AiModel.Gemini,
    subModel: '',
    imageUrl: '',
    prompt: '',
    negativePrompt: '',
    tags: '',
  });

  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateSnippet = () => {
    const id = Date.now().toString(); // Simple unique ID generation based on timestamp
    const today = new Date().toISOString().split('T')[0];
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t !== '');

    const snippet = `  {
    id: '${id}',
    title: '${formData.title.replace(/'/g, "\\'")}',
    model: AiModel.${formData.model},
    subModel: '${formData.subModel}',
    imageUrl: '${formData.imageUrl}',
    prompt: '${formData.prompt.replace(/'/g, "\\'")}',${formData.negativePrompt ? `\n    negativePrompt: '${formData.negativePrompt.replace(/'/g, "\\'")}',` : ''}
    dateAdded: '${today}',
    tags: [${tagsArray.map(t => `'${t}'`).join(', ')}]
  },`;

    setGeneratedCode(snippet);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-card border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
          <div className="p-3 bg-primary/20 rounded-full text-primary">
            <Terminal size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{t.admin.title}</h1>
            <p className="text-gray-400 text-sm">{t.admin.desc} <code className="bg-black/50 px-2 py-0.5 rounded text-primary">data.ts</code></p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Side */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">{t.admin.labelTitle}</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                placeholder="Contoh: Cyberpunk City"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">{t.admin.labelModel}</label>
                <select 
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                >
                  {Object.values(AiModel).map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">{t.admin.labelSubModel}</label>
                <input 
                  type="text" 
                  name="subModel"
                  value={formData.subModel}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                  placeholder="e.g. V5, XL, Nano"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">{t.admin.labelUrl}</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-primary focus:outline-none"
                  placeholder="https://res.cloudinary.com/..."
                />
                <ImageIcon size={18} className="absolute left-3 top-3.5 text-gray-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">{t.admin.labelPrompt}</label>
              <textarea 
                name="prompt"
                value={formData.prompt}
                onChange={handleChange}
                rows={4}
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none text-sm font-mono"
                placeholder="Masukkan prompt lengkap..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">{t.admin.labelNegPrompt}</label>
              <textarea 
                name="negativePrompt"
                value={formData.negativePrompt}
                onChange={handleChange}
                rows={2}
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none text-sm font-mono"
                placeholder="bad quality, blurry..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">{t.admin.labelTags}</label>
              <input 
                type="text" 
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                placeholder="Sci-fi, Portrait, Colorful"
              />
            </div>

            <button 
              onClick={generateSnippet}
              className="w-full py-4 mt-4 bg-primary text-black font-bold rounded-xl hover:bg-green-400 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              <Terminal size={20} /> {t.admin.btnGenerate}
            </button>
          </div>

          {/* Result Side */}
          <div className="relative bg-black/50 rounded-xl border border-white/10 p-4 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{t.admin.output}</span>
              <button 
                onClick={copyToClipboard}
                disabled={!generatedCode}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  copied 
                    ? 'bg-green-500 text-black' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                } ${!generatedCode && 'opacity-50 cursor-not-allowed'}`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? t.modal.copied : t.admin.copyCode}
              </button>
            </div>
            
            <div className="flex-grow bg-black rounded-lg border border-white/5 p-4 overflow-auto custom-scrollbar">
              <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap break-all">
                {generatedCode || '// ...'}
              </pre>
            </div>

            {formData.imageUrl && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-gray-500 mb-2">{t.admin.preview}:</p>
                <div className="h-32 w-full rounded-lg overflow-hidden bg-black/50 border border-white/5 flex items-center justify-center">
                  <img src={formData.imageUrl} alt="Preview" className="h-full object-contain" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150?text=Invalid+URL')} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};