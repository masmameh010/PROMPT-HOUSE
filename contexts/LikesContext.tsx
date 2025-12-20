import React, { createContext, useContext, useState, useEffect } from 'react';

interface LikesContextType {
  likedIds: string[];
  toggleLike: (id: string) => void;
  isLiked: (id: string) => boolean;
}

const LikesContext = createContext<LikesContextType | undefined>(undefined);

export const LikesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [likedIds, setLikedIds] = useState<string[]>([]);

  // Load favorites from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('il-liked-prompts');
    if (saved) {
      try {
        setLikedIds(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse liked prompts", e);
      }
    }
  }, []);

  const toggleLike = (id: string) => {
    setLikedIds(prev => {
      const isAlreadyLiked = prev.includes(id);
      let newLikes;
      if (isAlreadyLiked) {
        newLikes = prev.filter(likedId => likedId !== id);
      } else {
        newLikes = [...prev, id];
      }
      localStorage.setItem('il-liked-prompts', JSON.stringify(newLikes));
      return newLikes;
    });
  };

  const isLiked = (id: string) => likedIds.includes(id);

  return (
    <LikesContext.Provider value={{ likedIds, toggleLike, isLiked }}>
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => {
  const context = useContext(LikesContext);
  if (context === undefined) {
    throw new Error('useLikes must be used within a LikesProvider');
  }
  return context;
};