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
      f3_title: "Gratis & Terbuka",
      f3_desc: "Update berkala dan 100% Gratis. Jika bermanfaat, dukungan sukarela Anda adalah bahan bakar semangat kami."
    },
    collections: {
      title: "Koleksi Prompt",
      found: "prompt ditemukan",
      searchPlaceholder: "Cari nomor #ID, judul, atau tag...",
      noResults: "Tidak ada prompt yang cocok dengan pencarian Anda.",
      reset: "Reset Filter",
      featured: "SPONSOR / REKOMENDASI"
    },
    modal: {
      prompt: "Prompt",
      negPrompt: "Negative Prompt",
      copy: "Salin",
      copied: "Tersalin!",
      added: "Ditambahkan",
      supportAuthor: "Traktir Kreator",
      buyPremium: "Beli Paket Pro"
    },
    footer: {
      rights: "Hak Cipta Dilindungi."
    },
    admin: {
      title: "Android / Web Generator",
      desc: "Isi form, copy kodenya, lalu paste ke file public/prompts.json di GitHub.",
      labelTitle: "Judul Gambar",
      labelModel: "Model AI",
      labelSubModel: "Sub Model / Versi",
      labelUrl: "URL Gambar / Path Lokal",
      urlHelper: "Gunakan: /images/nama-file-kamu.jpg",
      labelPrompt: "Prompt",
      labelNegPrompt: "Negative Prompt (Opsional)",
      labelTags: "Tags (Pisahkan dengan koma)",
      btnGenerate: "1. Generate Kode",
      output: "2. Salin Kode Ini:",
      copyCode: "Copy JSON",
      preview: "Preview Tampilan",
      step1: "Siapkan Gambar",
      step1_desc: "Upload foto ke folder 'public/images' di GitHub.",
      step2: "Isi Form",
      step2_desc: "Isi data di sini, lalu klik Generate.",
      step3: "Update JSON",
      step3_desc: "Copy kode di kanan, paste ke 'public/prompts.json' di GitHub.",
      discordWarning: "⚠️ JANGAN pakai link Discord. Link akan mati dalam 24 jam.",
      urlError: "⚠️ Link harus berakhiran .jpg, .png, atau .webp. Gunakan 'Copy Image Address' / 'Salin Alamat Gambar'."
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
      f3_title: "Free & Open",
      f3_desc: "Regular updates and 100% Free. If useful, your voluntary support is the fuel for our passion."
    },
    collections: {
      title: "Prompt Collections",
      found: "prompts found",
      searchPlaceholder: "Search #ID, title, or tags...",
      noResults: "No prompts match your search.",
      reset: "Reset Filter",
      featured: "FEATURED / ADS"
    },
    modal: {
      prompt: "Prompt",
      negPrompt: "Negative Prompt",
      copy: "Copy",
      copied: "Copied!",
      added: "Added",
      supportAuthor: "Support Creator",
      buyPremium: "Buy Premium Pack"
    },
    footer: {
      rights: "All rights reserved."
    },
    admin: {
      title: "Android / Web Generator",
      desc: "Fill form, copy code, paste into public/prompts.json on GitHub.",
      labelTitle: "Image Title",
      labelModel: "AI Model",
      labelSubModel: "Sub Model / Version",
      labelUrl: "Image URL / Local Path",
      urlHelper: "Use: /images/your-file-name.jpg",
      labelPrompt: "Prompt",
      labelNegPrompt: "Negative Prompt (Optional)",
      labelTags: "Tags (Comma separated)",
      btnGenerate: "1. Generate Code",
      output: "2. Copy This Code:",
      copyCode: "Copy JSON",
      preview: "Preview Layout",
      step1: "Prepare Image",
      step1_desc: "Upload photo to 'public/images' on GitHub.",
      step2: "Fill Form",
      step2_desc: "Fill details here, click Generate.",
      step3: "Update JSON",
      step3_desc: "Copy code on right, paste to 'public/prompts.json' on GitHub.",
      discordWarning: "⚠️ DO NOT use Discord links. They expire in 24h.",
      urlError: "⚠️ Link must end in .jpg, .png, or .webp. Please use 'Copy Image Address'."
    }
  }
};

export type Language = 'id' | 'en';