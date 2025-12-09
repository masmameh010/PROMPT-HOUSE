export const translations = {
  id: {
    nav: {
      home: "Beranda",
      collections: "Koleksi",
      shop: "Toko",
      donate: "Donasi",
      admin: "Admin Tool"
    },
    home: {
      community: "KOMUNITAS",
      subtitle: "Temukan prompt favorit dan generate di platform pilihanmu.",
      explore: "Jelajahi Koleksi",
      visitShop: "Kunjungi Toko",
      f1_title: "Tanpa Login",
      f1_desc: "Akses seluruh library prompt tanpa perlu mendaftar atau login. Langsung copy dan paste.",
      f2_title: "Dukungan Multi-Model",
      f2_desc: "Koleksi terorganisir untuk Gemini, Dreamina, FLUX, Stable Diffusion, dan lainnya.",
      f3_title: "Selalu Update",
      f3_desc: "Konten diperbarui secara berkala melalui sistem repositori yang praktis dan transparan."
    },
    collections: {
      title: "Koleksi Prompt",
      found: "prompt ditemukan",
      searchPlaceholder: "Cari prompt, tag, atau gaya...",
      noResults: "Tidak ada prompt yang cocok dengan pencarian Anda.",
      reset: "Reset Filter"
    },
    modal: {
      prompt: "Prompt",
      negPrompt: "Negative Prompt",
      copy: "Salin",
      copied: "Tersalin!",
      added: "Ditambahkan"
    },
    footer: {
      rights: "Hak Cipta Dilindungi."
    },
    admin: {
      title: "Admin Helper Tool",
      desc: "Isi form ini untuk membuat kode prompt baru, lalu paste ke file",
      labelTitle: "Judul Gambar",
      labelModel: "Model AI",
      labelSubModel: "Sub Model / Versi",
      labelUrl: "Link Cloudinary (Image URL)",
      labelPrompt: "Prompt",
      labelNegPrompt: "Negative Prompt (Opsional)",
      labelTags: "Tags (Pisahkan dengan koma)",
      btnGenerate: "Generate Code Snippet",
      output: "Output Code",
      copyCode: "Copy Code",
      preview: "Preview Gambar"
    }
  },
  en: {
    nav: {
      home: "Home",
      collections: "Collections",
      shop: "Shop",
      donate: "Donate",
      admin: "Admin Tool"
    },
    home: {
      community: "COMMUNITY DRIVEN",
      subtitle: "Find your favorite prompts and generate them on your chosen platform.",
      explore: "Explore Collections",
      visitShop: "Visit Shop",
      f1_title: "No Login Required",
      f1_desc: "Access the entire prompt library without signing up or logging in. Just copy and paste.",
      f2_title: "Multi-Model Support",
      f2_desc: "Organized collections for Gemini, Dreamina, FLUX, Stable Diffusion, and others.",
      f3_title: "Always Updated",
      f3_desc: "Content regularly updated through a practical and transparent repository system."
    },
    collections: {
      title: "Prompt Collections",
      found: "prompts found",
      searchPlaceholder: "Search prompts, tags, or styles...",
      noResults: "No prompts match your search.",
      reset: "Reset Filter"
    },
    modal: {
      prompt: "Prompt",
      negPrompt: "Negative Prompt",
      copy: "Copy",
      copied: "Copied!",
      added: "Added"
    },
    footer: {
      rights: "All rights reserved."
    },
    admin: {
      title: "Admin Helper Tool",
      desc: "Fill this form to generate new prompt code, then paste it into file",
      labelTitle: "Image Title",
      labelModel: "AI Model",
      labelSubModel: "Sub Model / Version",
      labelUrl: "Cloudinary Link (Image URL)",
      labelPrompt: "Prompt",
      labelNegPrompt: "Negative Prompt (Optional)",
      labelTags: "Tags (Comma separated)",
      btnGenerate: "Generate Code Snippet",
      output: "Output Code",
      copyCode: "Copy Code",
      preview: "Image Preview"
    }
  }
};

export type Language = 'id' | 'en';