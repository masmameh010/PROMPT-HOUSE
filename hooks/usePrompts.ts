import { useState, useEffect } from 'react';
import { PromptItem } from '../types';
import { PROMPTS as FALLBACK_PROMPTS } from '../data';

export const usePrompts = () => {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        // Coba ambil dari file JSON di folder public
        // Tambahkan timestamp agar tidak dicache browser saat update
        const response = await fetch(`./prompts.json?t=${new Date().getTime()}`);
        
        if (!response.ok) {
          throw new Error('Gagal mengambil database prompt');
        }
        
        const data = await response.json();
        
        if (Array.isArray(data)) {
          // Sort berdasarkan yang terbaru (asumsi ID besar = baru, atau dateAdded)
          const sortedData = data.sort((a, b) => {
             // Coba sort by ID (timestamp) descending
             return Number(b.id) - Number(a.id);
          });
          setPrompts(sortedData);
        } else {
          setPrompts(FALLBACK_PROMPTS);
        }
      } catch (err) {
        console.warn("Menggunakan fallback data karena:", err);
        setPrompts(FALLBACK_PROMPTS);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  return { prompts, loading, error };
};