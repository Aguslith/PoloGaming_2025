
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const PoloLogoModern = () => (
  <div className="relative size-14 flex items-center justify-center group/logo">
    {/* Glow de fondo dinámico */}
    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse group-hover/logo:bg-primary/40 transition-all duration-700"></div>
    
    <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-[0_0_8px_rgba(255,0,51,0.8)]">
      {/* Definición de gradientes y filtros para el look cyber */}
      <defs>
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Líneas de conexión con animación de flujo */}
      <line x1="25" y1="25" x2="65" y2="35" stroke="#FF0033" strokeWidth="4" strokeLinecap="round" className="animate-pulse" />
      <line x1="65" y1="35" x2="60" y2="75" stroke="#FF0033" strokeWidth="4" strokeLinecap="round" className="animate-pulse delay-75" />
      <line x1="25" y1="25" x2="60" y2="75" stroke="#FF0033" strokeWidth="4" strokeLinecap="round" className="animate-pulse delay-150" />

      {/* Círculos (Nodos) - Estilo Imagen Original */}
      <circle cx="25" cy="25" r="15" fill="#FF0033" className="animate-logo" />
      <circle cx="65" cy="35" r="18" fill="#FF0033" className="animate-logo delay-300" />
      <circle cx="60" cy="75" r="16" fill="#FF0033" className="animate-logo delay-700" />
      
      {/* Brillos internos para dar profundidad */}
      <circle cx="22" cy="22" r="4" fill="white" fillOpacity="0.3" />
      <circle cx="62" cy="32" r="5" fill="white" fillOpacity="0.3" />
      <circle cx="58" cy="72" r="4" fill="white" fillOpacity="0.3" />
    </svg>
  </div>
);

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'INICIO' },
    { path: '/marketplace', label: 'MERCADO' },
    { path: '/events', label: 'EVENTOS' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[60] glass border-b-2 border-primary/30 py-4 px-6 lg:px-12 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-4 group">
        <PoloLogoModern />
        <div className="flex flex-col">
          <span className="text-[18px] md:text-[22px] font-modern font-black text-white tracking-widest glow-text group-hover:text-primary transition-colors leading-none">
            POLO <span className="text-primary">GAMING</span>
          </span>
          <span className="text-[8px] font-pixel text-primary/80 mt-1 tracking-tighter">LA RIOJA ARGENTINA</span>
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-10">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`text-[10px] font-pixel transition-all hover:text-primary tracking-tighter ${
              location.pathname === item.path ? 'text-primary' : 'text-white/60'
            }`}
          >
            {item.label}
            {location.pathname === item.path && <div className="h-0.5 bg-primary mt-1 animate-pulse"></div>}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Link 
          to="/login"
          className="px-6 py-2 border-2 border-primary text-[10px] font-pixel text-primary hover:bg-primary hover:text-white transition-all shadow-[0_0_15px_rgba(255,0,51,0.2)]"
        >
          LOG_IN
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
