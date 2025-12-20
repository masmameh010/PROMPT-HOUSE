import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, AlertTriangle, Loader2, Sparkles, ShoppingCart, ExternalLink } from 'lucide-react';
import { AiModel, PromptItem } from '../types';
import { PromptModal } from '../components/PromptModal';
import { useLanguage } from '../contexts/LanguageContext';
import { getOptimizedImageUrl } from '../utils/imageHelper';
import { usePrompts } from '../hooks/usePrompts';

export const Collections: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<AiModel | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<PromptItem | null>(null);
  const { t } = useLanguage();
  const { prompts, loading } = usePrompts();

  const models = ['All', ...Object.values(AiModel)];

  const filteredPrompts = useMemo(() => {
    const safePrompts = Array.isArray(prompts) ? prompts : [];

    return safePrompts.filter(item => {
      if (!item || !item.title) return false;
      const matchesModel = selectedModel === 'All' || item.model === selectedModel;
      const searchLower = searchQuery.toLowerCase();
      const titleMatch = item.title.toLowerCase().includes(searchLower);
      const promptMatch = item.prompt?.toLowerCase().includes(searchLower) || false;
      const tagsMatch = item.tags?.some(tag => tag.toLowerCase().includes(searchLower)) || false;
      const idMatch = item.id.toLowerCase().includes(searchLower);
      return matchesModel && (titleMatch || promptMatch || tagsMatch || idMatch);
    });
  }, [selectedModel, searchQuery, prompts]);

  return (
    <div className="min-h-screen pb-20">
      <div className="relative pt-8 pb-4 border-b border-white/10 bg-darker z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Grid className="text-primary" /> {t.collections.title}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {loading ? 'Memuat database...' : `${filteredPrompts.length} ${t.collections.found}`}
              </p>
            </div>
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder={t.collections.searchPlaceholder}
                className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl leading-5 placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-primary transition duration-150 ease-in-out sm:text-sm text-white font-mono"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-6 flex overflow-x-auto pb-2 gap-3 no-scrollbar">
            <div className="flex items-center mr-2 text-gray-500">
              <Filter size={16} />
            </div>
            {models.map((model) => (
              <button
                key={model}
                onClick={() => setSelectedModel(model as AiModel | 'All')}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedModel === model
                    ? 'bg-primary text-black shadow-lg shadow-primary/20'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {model}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-gray-400">Sedang mengambil data terbaru...</p>
          </div>
        ) : filteredPrompts.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <AlertTriangle className="mx-auto h-12 w-12 text-gray-500 mb-4" />
            <p className="text-gray-400 text-xl font-medium">{t.collections.noResults}</p>
            <p className="text-gray-600 text-sm mt-2">Coba kata kunci lain atau reset filter</p>
            <button onClick={() => {setSelectedModel('All'); setSearchQuery('')}} className="mt-6 px-6 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-full font-bold transition-colors">
              {t.collections.reset}
            </button>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredPrompts.map((item, index) => (
              <React.Fragment key={item.id}>
                {/* 
                  ADS / SPONSOR CARD: Muncul setiap 6 item 
                  Ini adalah strategi monetisasi (Affiliate/Sponsor)
                */}
                {index > 0 && index % 6 === 0 && (
                  <a 
                    href="https://lynk.id/imajinasilokal1" 
                    target="_blank" 
                    rel="noreferrer"
                    className="break-inside-avoid block p-6 bg-gradient-to-br from-secondary/20 to-primary/20 border border-primary/30 rounded-2xl hover:scale-[1.02] transition-transform shadow-xl shadow-primary/5"
                  >
                    <div className="flex items-center gap-2 text-primary mb-3">
                      <Sparkles size={18} />
                      <span className="text-[10px] font-bold tracking-widest uppercase">{t.collections.featured}</span>
                    </div>
                    <h4 className="text-xl font-bold mb-2">MEGA PROMPT BUNDLE (PDF)</h4>
                    <p className="text-gray-400 text-sm mb-4">Dapatkan 500+ Koleksi Prompt Eksklusif untuk hasil generate yang lebih maksimal.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-white">Rp 25.000,-</span>
                      <div className="bg-primary text-black p-2 rounded-lg"><ShoppingCart size={20} /></div>
                    </div>
                  </a>
                )}

                <div 
                  onClick={() => setSelectedItem(item)}
                  className="break-inside-avoid group relative bg-card rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/10"
                >
                  <div className="relative overflow-hidden aspect-auto">
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2 py-1 rounded-md border border-white/10 z-20 shadow-sm">
                      #{item.id}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <img 
                      src={getOptimizedImageUrl(item.imageUrl)} 
                      alt={item.title} 
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 min-h-[200px] bg-white/5"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                      <p className="text-white font-bold text-lg truncate">{item.title}</p>
                      <p className="text-primary text-xs font-mono mt-1">{item.subModel}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-card">
                    <h3 className="font-semibold text-gray-200 line-clamp-1 mb-2">{item.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-gray-400">
                        {item.model}
                      </span>
                      {item.subModel && <span className="text-[10px] text-gray-500 truncate">{item.subModel}</span>}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {selectedItem && <PromptModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
};