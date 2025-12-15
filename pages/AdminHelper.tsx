import React from 'react';
import { Github, ExternalLink, Zap, ShieldCheck, Image as ImageIcon, Cloud } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const AdminHelper: React.FC = () => {
  const { t } = useLanguage();

  // Ganti URL ini dengan URL repo GitHub Anda
  // Format: https://github.com/[USERNAME]/[REPO_NAME]/issues/new?template=add_prompt.yml
  const GITHUB_ISSUES_LINK = "https://github.com/imajinasilokal/prompt-house/issues/new?template=add_prompt.yml"; 

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pb-24">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 flex justify-center items-center gap-3">
          <Github className="text-white w-10 h-10" /> 
          Contributor Panel
        </h1>
        <p className="text-xl text-gray-400">
          Upload & Share Prompt langsung dari GitHub App / Browser HP.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Card Metode Baru */}
        <div className="bg-gradient-to-br from-primary/20 to-green-900/20 border border-primary/50 rounded-2xl p-8 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap size={120} />
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-6">
              <Zap size={14} /> METODE OTOMATIS (Tanpa File Lokal)
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">Upload via GitHub Form</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Cara paling gampang! Tidak perlu folder lokal atau coding. Cukup isi form di GitHub Issues, gambar akan di-hosting otomatis oleh GitHub.
            </p>

            <ul className="space-y-3 mb-8 text-sm text-gray-400">
              <li className="flex gap-2">
                <Cloud className="text-primary shrink-0" size={18} />
                <strong>Gambar Hosting Gratis</strong> (di Cloud GitHub)
              </li>
              <li className="flex gap-2">
                <ShieldCheck className="text-primary shrink-0" size={18} />
                Tidak perlu upload file ke folder public
              </li>
              <li className="flex gap-2">
                <ShieldCheck className="text-primary shrink-0" size={18} />
                Otomatis update website dalam 1-2 menit
              </li>
            </ul>

            <div className="mt-auto">
              <a 
                href="https://github.com/users/imajinasilokal/projects/1" 
                target="_blank" 
                rel="noreferrer"
                // Logic fallback untuk user
                onClick={(e) => {
                   e.preventDefault();
                   alert("Silakan buka Repository GitHub Anda -> Tab 'Issues' -> 'New Issue' -> Pilih 'Tambah Prompt Baru'");
                   window.open('https://github.com', '_blank');
                }}
                className="block w-full py-4 bg-primary text-black font-bold text-center rounded-xl hover:bg-green-400 transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
              >
                Buka Form Upload <ExternalLink size={18} />
              </a>
              <p className="text-[10px] text-center mt-3 text-gray-500">
                *Login GitHub diperlukan. Gambar yang diupload di Issue otomatis jadi link publik.
              </p>
            </div>
          </div>
        </div>

        {/* Card Manual (Legacy) */}
        <div className="bg-card border border-white/10 rounded-2xl p-8 flex flex-col opacity-60 hover:opacity-100 transition-opacity">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <ImageIcon size={20} /> Metode Edit Manual
            </h2>
            <p className="text-sm text-gray-400">
              Edit langsung file <code>public/prompts.json</code> di GitHub.
            </p>
          </div>
          
          <div className="space-y-4 text-sm text-gray-500 mt-auto">
            <div className="p-3 bg-black/40 rounded-lg border border-white/5">
              <p className="text-xs text-gray-400 mb-1 font-bold">OPSI GAMBAR:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Pakai link luar (Discord/Cloudinary)</li>
                <li>ATAU Upload file ke folder <code>public/images</code> (Ribet)</li>
              </ul>
            </div>
            
            <p>1. Buka file <code>public/prompts.json</code></p>
            <p>2. Klik Edit (Ikon Pensil)</p>
            <p>3. Tambahkan objek JSON baru</p>
            <p>4. Commit Changes</p>
          </div>
        </div>

      </div>
    </div>
  );
};