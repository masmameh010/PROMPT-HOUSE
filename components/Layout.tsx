import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Heart, ShoppingBag, Home, Layers, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LOGO_URL = "https://res.cloudinary.com/imajinasilokal/image/upload/v1765247701/LOKAL_TR_psrb0h.png";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1).split('?')[0] || '/');
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash.slice(1).split('?')[0] || '/';
      setCurrentPath(path);
    };
    window.addEventListener('hashchange', handleHashChange);
    // Initial set
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isActive = (path: string) => currentPath === path ? 'text-primary font-bold' : 'text-gray-300 hover:text-white';

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <div className="min-h-screen flex flex-col bg-darker text-white font-sans selection:bg-primary selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#/" className="flex-shrink-0 flex items-center gap-3 group">
              <img src={LOGO_URL} alt="Imajinasi Lokal" className="h-12 w-auto object-contain transition-transform group-hover:scale-105" />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold tracking-tighter">IMAJINASI LOKAL</h1>
                <p className="text-[10px] text-gray-400 tracking-widest">PROMPT HOUSE</p>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#/" className={`flex items-center gap-2 transition-colors ${isActive('/')}`}>
                <Home size={18} /> {t.nav.home}
              </a>
              <a href="#/collections" className={`flex items-center gap-2 transition-colors ${isActive('/collections')}`}>
                <Layers size={18} /> {t.nav.collections}
              </a>
              
              <a 
                href="https://lynk.id/imajinasilokal1" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
              >
                <ShoppingBag size={18} /> {t.nav.shop} <ExternalLink size={12} />
              </a>
              <a 
                href="https://lynk.id/imajinasilokal1/s/12o34vm546ld" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-medium transition-all transform hover:scale-105 shadow-lg shadow-purple-900/20"
              >
                <Heart size={18} className="fill-current" /> {t.nav.donate}
              </a>
              
              {/* Language Switcher Desktop */}
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Globe size={14} className="text-primary" />
                <span className={language === 'id' ? 'text-white' : 'text-gray-500'}>ID</span>
                <span className="text-gray-600">|</span>
                <span className={language === 'en' ? 'text-white' : 'text-gray-500'}>EN</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4">
               {/* Language Switcher Mobile */}
               <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md border border-white/10 bg-white/5"
              >
                <span className={language === 'id' ? 'text-white' : 'text-gray-500'}>ID</span>
                <span className="text-gray-600">|</span>
                <span className={language === 'en' ? 'text-white' : 'text-gray-500'}>EN</span>
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-panel border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a 
                href="#/" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-4 text-base font-medium text-white hover:bg-white/10 rounded-md"
              >
                {t.nav.home}
              </a>
              <a 
                href="#/collections" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-4 text-base font-medium text-white hover:bg-white/10 rounded-md"
              >
                {t.nav.collections}
              </a>
              <a 
                href="https://lynk.id/imajinasilokal1" 
                target="_blank" 
                rel="noreferrer"
                className="block px-3 py-4 text-base font-medium text-white hover:bg-white/10 rounded-md"
              >
                {t.nav.shop}
              </a>
              <a 
                href="https://lynk.id/imajinasilokal1/s/12o34vm546ld" 
                target="_blank" 
                rel="noreferrer"
                className="block px-3 py-4 text-base font-medium text-pink-400 hover:bg-white/10 rounded-md"
              >
                {t.nav.donate}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <img src={LOGO_URL} alt="Logo" className="h-16 w-auto mx-auto mb-6 opacity-80 grayscale hover:grayscale-0 transition-all" />
          <h2 className="text-2xl font-bold mb-2">IMAJINASI LOKAL</h2>
          <p className="text-gray-400 text-sm mb-8">{ ⬇ Follow Kami Lewat Link Di Bawah ini ⬇ }</p>
          
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://instagram.com/imajinasi.lokal" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-colors">
              Instagram @imajinasi.lokal
            </a>
            <span className="text-blue-700">|</span>
            <a href="https://www.threads.net/@ai.gabut" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-colors">
              Threads @ai.gabut
            </a>
            <span className="text-blue-700">|</span>
            <a href="Https://facebook.com/dszmjk" target="_blank" rel="noreferrer" className="text-black-400 hover:text-primary transition-colors">
              Facebook 
            </a>
          </div>

          <div className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Imajinasi Lokal Prompt House. {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
};
