import React, { useState, useMemo } from 'react';
import { Heart, Grid, AlertTriangle, Loader2 } from 'lucide-react';
import { PromptItem } from '../types';
import { PromptModal } from '../components/PromptModal';
import { useLanguage } from '../contexts/LanguageContext';
import { getOptimizedImageUrl } from '../utils/imageHelper';
import { usePrompts } from '../hooks/usePrompts';
import { useLikes } from '../contexts/LikesContext';

export const Favorites: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<PromptItem | null>(null);
  const { t } = useLanguage();
  const { prompts, loading } = usePrompts();
  const { toggleLike, isLiked, likedIds } = useLikes();

  const favoritePrompts = useMemo(() => {
    const safePrompts = Array.isArray(prompts) ? prompts : [];
    return safePrompts.filter(item => isLiked(item.id));
  }, [prompts, likedIds]);

  return (
    <div className="min-h-screen pb-20">
      <div className="relative pt-8 pb-4 border-b border-white/10 bg-darker z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Heart className="text-pink-500 fill-pink-500" /> {t.collections.favTitle}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {loading ? 'Memuat database...' : `${favoritePrompts.length} prompt favorit`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-gray-400">Sedang mengambil data...</p>
          </div>
        ) : favoritePrompts.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <Heart className="mx-auto h-12 w-12 text-gray-700 mb-4" />
            <p className="text-gray-400 text-xl font-medium">{t.collections.noFavs}</p>
            <p className="text-gray-600 text-sm mt-2">Klik ikon hati pada prompt yang kamu suka untuk menyimpannya di sini.</p>
            <a href="#/collections" className="mt-6 inline-block px-6 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-full font-bold transition-colors">
              {t.collections.goExplore}
            </a>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {favoritePrompts.map((item) => (
              <div 
                key={item.id}
                className="break-inside-avoid group relative bg-card rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="relative overflow-hidden aspect-auto" onClick={() => setSelectedItem(item)}>
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

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(item.id);
                  }}
                  className={`absolute top-2 right-2 z-30 p-2 rounded-full backdrop-blur-md transition-all transform active:scale-125 bg-pink-500 text-white shadow-lg shadow-pink-500/50`}
                >
                  <Heart size={18} fill="currentColor" />
                </button>

                <div className="p-4 bg-card" onClick={() => setSelectedItem(item)}>
                  <h3 className="font-semibold text-gray-200 line-clamp-1 mb-2">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-gray-400">
                      {item.model}
                    </span>
                    {item.subModel && <span className="text-[10px] text-gray-500 truncate">{item.subModel}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedItem && <PromptModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
};