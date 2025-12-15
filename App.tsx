import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Collections } from './pages/Collections';
import { AdminHelper } from './pages/AdminHelper';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1).split('?')[0] || '/');

  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash.slice(1).split('?')[0] || '/';
      setCurrentPath(path);
    };
    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    if (!window.location.hash) {
      window.location.hash = '#/';
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    switch (currentPath) {
      case '/':
        return <Home />;
      case '/collections':
        return <Collections />;
      case '/admin-helper':
        return <AdminHelper />;
      default:
        return <Home />;
    }
  };

  return (
    <LanguageProvider>
      <Layout>
        {renderContent()}
      </Layout>
    </LanguageProvider>
  );
}

export default App;