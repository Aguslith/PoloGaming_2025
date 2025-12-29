
import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SkillTreePage from './pages/SkillTreePage';
import MarketplacePage from './pages/MarketplacePage';
import PCBuilderPage from './pages/PCBuilderPage';
import CommunityPage from './pages/CommunityPage';
import EventsPage from './pages/EventsPage';
import AILabPage from './pages/AILabPage';
import Navbar from './components/Navbar';
import FloatingAI from './components/FloatingAI';

interface PowerContextType {
  isPoweredOn: boolean;
  powerOn: () => void;
}

const PowerContext = createContext<PowerContextType | undefined>(undefined);

export const usePower = () => {
  const context = useContext(PowerContext);
  if (!context) throw new Error("usePower must be used within PowerProvider");
  return context;
};

const App: React.FC = () => {
  const [isPoweredOn, setIsPoweredOn] = useState(() => {
    return localStorage.getItem('POLO_SYSTEM_POWER') === 'ON';
  });

  const powerOn = () => {
    setIsPoweredOn(true);
    localStorage.setItem('POLO_SYSTEM_POWER', 'ON');
  };

  return (
    <PowerContext.Provider value={{ isPoweredOn, powerOn }}>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className={`flex-grow pt-20 transition-all duration-700 ${!isPoweredOn ? 'brightness-50 grayscale contrast-125' : 'brightness-100 grayscale-0'}`}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/skill-tree" element={<SkillTreePage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/pc-builder" element={<PCBuilderPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/ai-lab" element={<AILabPage />} />
            </Routes>
          </main>
          <FloatingAI />
        </div>
      </HashRouter>
    </PowerContext.Provider>
  );
};

export default App;
