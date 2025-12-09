import React from 'react';
import { ArrowRight, Zap, Database, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,220,130,0.15),rgba(2,6,23,0)_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold tracking-widest animate-pulse">
            {t.home.community}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
            IMAJINASI LOKAL<br/>
            <span className="text-4xl md:text-6xl text-white">PROMPT HOUSE</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto font-light">
            {t.home.subtitle}
            <br className="hidden md:block" /> 
            <span className="text-primary">Gemini, Flux, Midjourney, ...</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#/collections" 
              className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              {t.home.explore} <ArrowRight size={20} />
            </a>
            <a 
              href="https://lynk.id/imajinasilokal1" 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-all backdrop-blur-md"
            >
              {t.home.visitShop}
            </a>
          </div>
        </div>
      </section>

      {/* Features/Stats Strip */}
      <section className="border-y border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 transition-colors group">
              <Database className="w-10 h-10 mx-auto mb-4 text-gray-500 group-hover:text-primary transition-colors" />
              <h3 className="text-xl font-bold mb-2">{t.home.f1_title}</h3>
              <p className="text-gray-400">{t.home.f1_desc}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 transition-colors group">
              <Zap className="w-10 h-10 mx-auto mb-4 text-gray-500 group-hover:text-primary transition-colors" />
              <h3 className="text-xl font-bold mb-2">{t.home.f2_title}</h3>
              <p className="text-gray-400">{t.home.f2_desc}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 transition-colors group">
              <Download className="w-10 h-10 mx-auto mb-4 text-gray-500 group-hover:text-primary transition-colors" />
              <h3 className="text-xl font-bold mb-2">{t.home.f3_title}</h3>
              <p className="text-gray-400">{t.home.f3_desc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};