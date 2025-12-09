export const getOptimizedImageUrl = (url: string): string => {
  if (!url) return '';

  try {
    // Handle Google Drive Links
    // Ubah: https://drive.google.com/file/d/YOUR_ID/view?usp=sharing 
    // Jadi: https://drive.google.com/uc?export=view&id=YOUR_ID
    if (url.includes('drive.google.com')) {
      const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (idMatch && idMatch[1]) {
        return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
      }
    }

    // Handle Dropbox Links
    // Ubah: https://www.dropbox.com/.../image.jpg?dl=0
    // Jadi: https://www.dropbox.com/.../image.jpg?raw=1
    if (url.includes('dropbox.com')) {
      return url.replace('dl=0', 'raw=1');
    }

    // Handle Discord Attachments (kadang parameternya bikin error di beberapa tag img)
    // Biasanya aman, tapi return as is.
    
    return url;
  } catch (e) {
    console.error("Error parsing image URL", e);
    return url;
  }
};