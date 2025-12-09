import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Collections } from './pages/Collections';
import { AdminHelper } from './pages/AdminHelper';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/admin-helper" element={<AdminHelper />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
}

export default App;