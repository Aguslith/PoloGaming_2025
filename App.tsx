
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MarketplacePage from './pages/MarketplacePage';
import EventsPage from './pages/EventsPage';
import Navbar from './components/Navbar';
import FloatingAI from './components/FloatingAI';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-cyber-black text-white">
        <Navbar />
        <main className="flex-grow pt-24">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/events" element={<EventsPage />} />
          </Routes>
        </main>
        <FloatingAI />
      </div>
    </HashRouter>
  );
};

export default App;
