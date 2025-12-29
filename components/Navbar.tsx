
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Logo8Bit = () => (
  <div className="polo-logo-8bit group-hover:scale-105 transition-transform">
    <div className="node-pixel node-p1"></div>
    <div className="node-pixel node-p2"></div>
    <div className="node-pixel node-p3"></div>
    <div className="connector-pixel conn-1-2"></div>
    <div className="connector-pixel conn-2-3"></div>
    <div className="connector-pixel conn-1-3"></div>
  </div>
);

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'HUB' },
    { path: '/marketplace', label: 'MARKET' },
    { path: '/pc-builder', label: 'BUILDER' },
    { path: '/events', label: 'EVENTOS' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[60] bg-dark-void/90 backdrop-blur-md border-b-4 border-neon-purple py-4 px-6 lg:px-12 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-6 group">
        <Logo8Bit />
        <div className="flex flex-col ml-2">
          <span className="text-[11px] font-pixel text-soft-white group-hover:text-crimson-rgb transition-colors">POLO GAMING</span>
          <span className="text-[6px] font-pixel text-neon-blue mt-1">LA RIOJA // ARGENTINA</span>
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-10">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`text-[9px] font-pixel transition-all hover:text-neon-green tracking-widest ${
              location.pathname === item.path ? 'text-neon-purple underline decoration-2 underline-offset-8' : 'text-soft-white'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <a 
          href="https://discord.gg/pologaming" 
          target="_blank" 
          rel="noopener noreferrer"
          className="pixel-button !py-2 !px-4 !bg-[#5865F2] !text-white border-black shadow-[4px_4px_0_0_#000] hover:!bg-[#4752C4] flex items-center gap-3 group/discord"
        >
          <div className="discord-8bit-icon text-white"></div>
          <span className="text-[8px]">DISCORD</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
