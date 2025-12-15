export const getOptimizedImageUrl = (url: string): string => {
  if (!url) return '';

  try {
    // 1. Handle Local Images (Relative Path)
    // Jika tidak diawali http/https, asumsikan file ada di folder public
    if (!url.startsWith('http') && !url.startsWith('blob:')) {
      // Pastikan diawali slash agar terbaca dari root domain
      return url.startsWith('/') ? url : `/${url}`;
    }

    // 2. Handle Google Drive Links
    if (url.includes('drive.google.com')) {
      const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (idMatch && idMatch[1]) {
        return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
      }
    }

    // 3. Handle Dropbox Links
    if (url.includes('dropbox.com')) {
      return url.replace('dl=0', 'raw=1');
    }

    // Default return
    return url;
  } catch (e) {
    console.error("Error parsing image URL", e);
    return url;
  }
};