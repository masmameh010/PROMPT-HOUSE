import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Collections } from './pages/Collections';
import { Favorites } from './pages/Favorites';
import { AdminHelper } from './pages/AdminHelper';
import { LanguageProvider } from './contexts/LanguageContext';
import { LikesProvider } from './contexts/LikesContext';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1).split('?')[0] || '/');

  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash.slice(1).split('?')[0] || '/';
      setCurrentPath(path);

      // MANUAL GOOGLE ANALYTICS TRACKING FOR SPA
      if (window.gtag) {
        window.gtag('config', 'G-71H5TC7TE7', {
          'page_path': path,
          'page_title': document.title
        });
        console.debug(`[GA] Tracked page view: ${path}`);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Initial check and tracking
    if (!window.location.hash) {
      window.location.hash = '#/';
    } else {
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    switch (currentPath) {
      case '/':
        return <Home />;
      case '/collections':
        return <Collections />;
      case '/favorites':
        return <Favorites />;
      case '/admin-helper':
        return <AdminHelper />;
      default:
        return <Home />;
    }
  };

  return (
    <LanguageProvider>
      <LikesProvider>
        <Layout>
          {renderContent()}
        </Layout>
      </LikesProvider>
    </LanguageProvider>
  );
}

export default App;