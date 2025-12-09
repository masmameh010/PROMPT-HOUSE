import React, { useState } from 'react';
import { X, Copy, Check, Tag } from 'lucide-react';
import { PromptItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

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
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl bg-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-colors"
        >
          <X size={24} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-black flex items-center justify-center overflow-hidden">
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-full object-contain max-h-[50vh] md:max-h-full"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 text-xs font-bold text-black bg-primary rounded-full uppercase tracking-wider">
              {item.model}
            </span>
            <span className="px-3 py-1 text-xs font-medium text-primary border border-primary/30 rounded-full">
              {item.subModel}
            </span>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-white leading-tight">{item.title}</h2>

          {/* Prompt Box */}
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

          {/* Negative Prompt Box */}
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

          {/* Metadata */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 justify-between items-center">
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