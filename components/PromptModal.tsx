
import React, { useState } from 'react';
// Added Sparkles to the list of icons imported from lucide-react
import { X, Copy, Check, Tag, User, ExternalLink, Coffee, ShoppingCart, Heart, Sparkles } from 'lucide-react';
import { PromptItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { getOptimizedImageUrl } from '../utils/imageHelper';

interface PromptModalProps {
  item: PromptItem;
  onClose: () => void;
}

export const PromptModal: React.FC<PromptModalProps> = ({ item, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-5xl bg-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-colors"
        >
          <X size={24} />
        </button>

        <div className="w-full md:w-1/2 bg-black flex items-center justify-center overflow-hidden">
          <img 
            src={getOptimizedImageUrl(item.imageUrl)} 
            alt={item.title} 
            className="w-full h-full object-contain max-h-[50vh] md:max-h-full"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs font-bold text-black bg-primary rounded-full uppercase tracking-wider">
                {item.model}
              </span>
              <span className="text-[10px] text-gray-500 font-mono">ID #{item.id}</span>
            </div>
            
            {/* MONETISASI: Traktir Kreator Link (Contoh: Saweria/Lynk.id) */}
            <a 
              href="https://lynk.id/imajinasilokal1/s/12o34vm546ld" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-pink-400 hover:text-pink-300 transition-colors bg-pink-500/10 px-3 py-1.5 rounded-full border border-pink-500/20"
            >
              <Coffee size={14} /> {t.modal.supportAuthor}
            </a>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-white leading-tight">{item.title}</h2>

          <div className="flex items-center gap-2 mb-6 text-sm text-gray-400">
            <User size={14} />
            <span>by</span>
            {item.authorUrl ? (
              <a 
                href={item.authorUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="text-primary hover:text-white font-medium flex items-center gap-1 transition-colors underline"
              >
                {item.author || "Contributor"} <ExternalLink size={10} />
              </a>
            ) : (
              <span className="font-medium">{item.author || "Imajinasi Lokal"}</span>
            )}
          </div>

          {/* MONETISASI: Upselling Premium Bundle */}
          <div className="mb-8 p-4 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-xl">
             <div className="flex justify-between items-center gap-4">
                <div>
                   <h4 className="text-sm font-bold text-white flex items-center gap-2"><Sparkles size={14} className="text-yellow-400"/> Mau Prompt Berkualitas Lainnya?</h4>
                   <p className="text-[11px] text-gray-400">Dapatkan akses ribuan prompt eksklusif di toko kami.</p>
                </div>
                <a 
                  href="https://lynk.id/imajinasilokal1" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-primary transition-colors whitespace-nowrap"
                >
                  <ShoppingCart size={14} /> {t.modal.buyPremium}
                </a>
             </div>
          </div>

          <div className="mb-6 space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">{t.modal.prompt}</label>
              <button 
                onClick={() => handleCopy(item.prompt, 'prompt')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-md transition-all ${
                  copiedField === 'prompt' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {copiedField === 'prompt' ? <Check size={14} /> : <Copy size={14} />}
                {copiedField === 'prompt' ? t.modal.copied : t.modal.copy}
              </button>
            </div>
            <div className="p-4 bg-black/40 rounded-xl border border-white/10 font-mono text-sm text-gray-200 leading-relaxed max-h-48 overflow-y-auto">
              {item.prompt}
            </div>
          </div>

          {item.negativePrompt && (
            <div className="mb-6 space-y-2">
              <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-red-400 uppercase tracking-wider">{t.modal.negPrompt}</label>
                <button 
                  onClick={() => handleCopy(item.negativePrompt!, 'neg')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-md transition-all ${
                    copiedField === 'neg' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {copiedField === 'neg' ? <Check size={14} /> : <Copy size={14} />}
                  {copiedField === 'neg' ? t.modal.copied : t.modal.copy}
                </button>
              </div>
              <div className="p-4 bg-red-900/10 rounded-xl border border-red-500/20 font-mono text-sm text-red-200/80 leading-relaxed">
                {item.negativePrompt}
              </div>
            </div>
          )}

          <div className="mt-auto pt-6 border-t border-white/10 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {item.tags?.map(tag => (
                <span key={tag} className="flex items-center gap-1 text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-md">
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>
            <div className="text-xs text-gray-600">
              {t.modal.added}: {item.dateAdded}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
