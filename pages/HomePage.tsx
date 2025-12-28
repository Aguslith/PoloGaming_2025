
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col bg-cyber-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Animation Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1 mb-6 border border-primary/50 bg-primary/5 text-primary text-[10px] font-pixel tracking-widest animate-bounce">
            NUEVA ERA_POLO GAMING
          </div>
          
          <h1 className="text-5xl md:text-8xl font-modern font-black mb-6 tracking-tighter leading-none">
            EL HUB DE <span className="text-primary glow-text">INNOVACIÓN</span><br/>
            DIGITAL DE LA RIOJA
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-body mb-12">
            Conectamos el talento local con el ecosistema gaming global. Hardware de última generación, eventos masivos y la comunidad técnica más fuerte del NOA.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/marketplace" className="px-10 py-4 bg-primary text-white font-modern font-bold tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,0,51,0.4)]">
              EXPLORAR MERCADO
            </Link>
            <Link to="/events" className="px-10 py-4 border border-white/20 text-white font-modern font-bold tracking-widest hover:bg-white hover:text-black transition-all">
              VER EVENTOS
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
           <span className="material-symbols-outlined !text-4xl">keyboard_double_arrow_down</span>
        </div>
      </section>

      {/* Modern Info Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        <InfoCard 
          icon="monitoring" 
          title="DATA ANALYTICS" 
          desc="Monitoreo de precios de hardware en tiempo real con IA."
        />
        <InfoCard 
          icon="hub" 
          title="NETWORKING" 
          desc="Unimos gamers, desarrolladores y entusiastas del hardware."
        />
        <InfoCard 
          icon="bolt" 
          title="HIGH PERFORMANCE" 
          desc="Acceso a las últimas novedades en GPUs y CPUs del mercado."
        />
      </section>

      <footer className="mt-auto bg-black/80 py-10 border-t border-primary/20 text-center px-6">
         <p className="text-[10px] font-pixel text-white/40 tracking-[0.3em]">
           POLO GAMING © 2024 | LA RIOJA ARGENTINA | <span className="text-primary">INNOVACIÓN CONSTANTE</span>
         </p>
      </footer>
    </div>
  );
};

const InfoCard = ({ icon, title, desc }: { icon: string, title: string, desc: string }) => (
  <div className="cyber-card p-10 group">
    <div className="size-14 bg-primary/10 rounded-lg flex items-center justify-center mb-8 border border-primary/20 group-hover:bg-primary transition-all">
       <span className="material-symbols-outlined !text-4xl text-primary group-hover:text-white transition-colors">{icon}</span>
    </div>
    <h3 className="text-xl font-modern font-bold mb-4 tracking-wider">{title}</h3>
    <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default HomePage;
