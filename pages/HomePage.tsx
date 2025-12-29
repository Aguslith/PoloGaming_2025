
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePower } from '../App';

const HomePage: React.FC = () => {
  const parallaxRef = useRef<HTMLImageElement>(null);
  const { isPoweredOn, powerOn } = usePower();
  const [isBooting, setIsBooting] = useState(false);
  const [showContent, setShowContent] = useState(isPoweredOn);

  useEffect(() => {
    if (parallaxRef.current) {
      // @ts-ignore
      new window.simpleParallax(parallaxRef.current, {
        delay: 0.6,
        orientation: 'up',
        scale: 1.5,
        overflow: true
      });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'v' && showContent) {
        window.scrollTo({ top: 800, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showContent]);

  const handlePowerOn = () => {
    if (isPoweredOn || isBooting) return;
    setIsBooting(true);
    
    // Play "Booting" sounds/animations
    setTimeout(() => {
      powerOn();
      setIsBooting(false);
      setShowContent(true);
    }, 1200);
  };

  const handleExploreClick = () => {
    window.scrollTo({ top: 800, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col pb-20 bg-dark-void min-h-screen bg-cyber-grid relative">
      {/* Hero Section */}
      <section className="relative w-full h-[700px] overflow-hidden border-b-8 border-neon-purple bg-black">
        <img 
          ref={parallaxRef}
          src="https://raw.githubusercontent.com/PoloTecnologicoLR/landing-page/main/assets/img/backgrounds/polo-building-pixel.png" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200';
          }}
          alt="Polo Hub"
          className={`w-full h-full object-cover transition-all duration-1000 ${isPoweredOn ? 'grayscale-0 brightness-100 blur-none' : 'grayscale brightness-[0.2] blur-sm'}`}
        />

        {/* Interactive Console Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          {!showContent && (
            <div className={`pointer-events-auto flex flex-col items-center gap-10 p-12 bg-black/80 border-4 border-neon-purple shadow-[0_0_50px_rgba(139,92,246,0.3)] transition-all ${isBooting ? 'animate-glitch opacity-50' : ''}`}>
               <div className="font-pixel text-neon-blue text-[10px] animate-pulse">
                 {isBooting ? 'PROCESANDO_BOOT...' : 'SISTEMA_HUB: STANDBY'}
               </div>
               
               <div className="flex items-center gap-12">
                  <div className="flex flex-col items-center gap-3">
                     <div className="w-4 h-16 bg-slate-800 border-2 border-neon-blue rounded-full relative overflow-hidden">
                        <div className={`absolute top-1 left-1 right-1 bg-neon-blue transition-all ${isBooting ? 'h-full opacity-100' : 'h-6 opacity-20'}`}></div>
                     </div>
                     <span className="text-[8px] font-pixel text-slate-500">INIT</span>
                  </div>

                  <button 
                    onClick={handlePowerOn}
                    className={`size-28 bg-neon-purple border-8 border-black shadow-[8px_8px_0_0_#3B82F6] active:translate-y-2 active:shadow-none transition-all flex items-center justify-center group relative ${!isBooting ? 'pulse-ring' : 'animate-ping'}`}
                  >
                    <span className={`material-symbols-outlined !text-7xl text-white transition-transform ${isBooting ? 'rotate-180 scale-75' : 'group-hover:rotate-12'}`}>power_settings_new</span>
                  </button>

                  <div className="flex flex-col items-center gap-3">
                     <div className="size-12 bg-slate-900 border-4 border-neon-purple flex items-center justify-center">
                        <div className={`size-4 bg-neon-green ${isBooting ? 'animate-ping' : ''}`}></div>
                     </div>
                     <span className="text-[8px] font-pixel text-slate-500">SYNC</span>
                  </div>
               </div>
               <p className="text-[8px] font-pixel text-soft-white/40">INTERACTÚA PARA DESBLOQUEAR EL HUB</p>
            </div>
          )}

          {showContent && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-dark-void via-transparent to-transparent">
               <div className="bg-black/60 p-12 border-4 border-neon-green shadow-[0_0_40px_rgba(34,197,94,0.4)] backdrop-blur-md animate-panel-in scan-effect relative">
                  <div className="absolute top-2 left-2 text-[8px] font-pixel text-neon-green opacity-50">ESTADO: ONLINE</div>
                  <h1 className="text-3xl md:text-6xl font-pixel text-soft-white mb-6 uppercase tracking-widest animate-glitch">POLO GAMING</h1>
                  <p className="text-sm md:text-lg font-pixel text-neon-blue uppercase tracking-[0.2em] animate-pulse">La Rioja Tech Ecosystem</p>
                  <div className="h-1 w-full bg-neon-purple mt-8"></div>
               </div>
               <button 
                onClick={handleExploreClick}
                className="mt-12 pixel-button !bg-neon-blue animate-bounce pointer-events-auto shadow-[8px_8px_0_0_#000] hover:shadow-none transition-all"
               >
                 EXPLORAR [V]
               </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Sections */}
      <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}>
        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col gap-32">
          
          <section className="grid lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-8">
                <div className="inline-block px-4 py-2 bg-neon-blue/20 text-neon-blue font-pixel text-[10px] border-l-4 border-neon-blue">
                   DATA_STREAM_v2.0
                </div>
                <h2 className="text-2xl md:text-4xl font-pixel leading-tight text-soft-white">
                  EL FUTURO DEL <span className="text-neon-purple">GAMING</span> <br/>
                  Y EL <span className="text-neon-green">HARDWARE</span>.
                </h2>
                <p className="font-body text-slate-400 text-lg leading-relaxed">
                  Polo Tecnológico La Rioja es el epicentro de innovación para gamers y desarrolladores. 
                  Arma tu build, compite en torneos y conecta con la comunidad.
                </p>
                <div className="flex flex-wrap gap-8 pt-6">
                   <Link to="/pc-builder" className="pixel-button !text-sm !bg-neon-purple">
                     BUILDER IA
                   </Link>
                   <Link to="/marketplace" className="pixel-button !text-sm !bg-transparent border-neon-blue !text-neon-blue shadow-[4px_4px_0_0_#3B82F6]">
                     MARKETPLACE
                   </Link>
                </div>
             </div>

             <div className="relative">
                <div className="aspect-square bg-slate-900 border-8 border-neon-purple shadow-[20px_20px_0_0_#22C55E] overflow-hidden group">
                   <img 
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/40 to-transparent"></div>
                </div>
                <div className="absolute -top-10 -right-10 size-40 border-4 border-dashed border-neon-blue animate-[spin_10s_linear_infinite]"></div>
             </div>
          </section>

          <section className="grid md:grid-cols-3 gap-12">
            <FeatureItem icon="sports_esports" title="ESPORTS PRO" color="neon-purple" link="/events" />
            <FeatureItem icon="precision_manufacturing" title="PC ARCHITECT" color="neon-green" link="/pc-builder" />
            <FeatureItem icon="hub" title="TECH NETWORK" color="neon-blue" link="/community" />
          </section>
        </div>
      </div>

      <footer className="mt-auto bg-black border-t-8 border-neon-purple p-10 text-center">
         <div className="font-pixel text-[8px] text-slate-500 tracking-[0.3em] uppercase">
            POLO TECNOLÓGICO LA RIOJA © 2024 | CPU_TEMP: 42°C | UPTIME: 99.9%
         </div>
      </footer>
    </div>
  );
};

const FeatureItem = ({ icon, title, color, link }: { icon: string, title: string, color: string, link: string }) => (
  <Link to={link} className="pixel-border p-10 group hover:translate-y-[-8px] transition-all border-neon-blue">
    <div className={`size-20 mb-8 flex items-center justify-center border-4 border-black shadow-[4px_4px_0_0_#000] bg-${color}`}>
       <span className="material-symbols-outlined !text-5xl text-white">{icon}</span>
    </div>
    <h3 className="text-[12px] font-pixel text-soft-white mb-4 group-hover:text-neon-blue transition-colors">{title}</h3>
    <p className="text-[10px] font-body text-slate-500">Accede a las últimas misiones y recursos de nuestro sistema central.</p>
  </Link>
);

export default HomePage;
