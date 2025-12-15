import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, AlertTriangle, Loader2 } from 'lucide-react';
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

  // Derive unique models from enum
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
      
      return matchesModel && (titleMatch || promptMatch || tagsMatch);
    });
  }, [selectedModel, searchQuery, prompts]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header & Controls */}
      <div className="sticky top-20 z-40 bg-darker/95 backdrop-blur-xl border-b border-white/10 pb-4 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Grid className="text-primary" /> {t.collections.title}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {loading ? 'Memuat database...' : `${filteredPrompts.length} ${t.collections.found}`}
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder={t.collections.searchPlaceholder}
                className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl leading-5 placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-primary transition duration-150 ease-in-out sm:text-sm text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Chips */}
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

      {/* Grid */}
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
            <button 
              onClick={() => {setSelectedModel('All'); setSearchQuery('')}}
              className="mt-6 px-6 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-full font-bold transition-colors"
            >
              {t.collections.reset}
            </button>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredPrompts.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="break-inside-avoid group relative bg-card rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/10"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-auto">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <img 
                    src={getOptimizedImageUrl(item.imageUrl)} 
                    alt={item.title} 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 min-h-[200px] bg-white/5"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0.3';
                      e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                  
                  {/* Hover Overlay Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                    <p className="text-white font-bold text-lg truncate">{item.title}</p>
                    <p className="text-primary text-xs font-mono mt-1">{item.subModel}</p>
                  </div>
                </div>

                {/* Always visible info */}
                <div className="p-4 bg-card">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-200 line-clamp-1">{item.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-gray-400">
                      {item.model}
                    </span>
                    {item.subModel && (
                      <span className="text-[10px] text-gray-500">
                        {item.subModel}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedItem && (
        <PromptModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
};