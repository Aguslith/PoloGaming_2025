
import React, { useState } from 'react';

interface EventItem {
  id: number;
  title: string;
  date: string;
  category: 'Torneo' | 'Workshop' | 'Meetup' | 'Chaya';
  description: string;
  time: string;
  prize?: string;
}

const MOCK_EVENTS: EventItem[] = [
  { id: 1, title: 'JAM POLO TECNOLÓGICO LR', date: '2025-05-15', category: 'Workshop', description: 'DISEÑO DE JUEGOS EN LA RIOJA. TRAETE EL MATE Y APRENDÉ.', time: '10:00 AM' },
  { id: 2, title: 'TORNEO DE COUNTER "LA CHAYA"', date: '2025-05-20', category: 'Torneo', description: 'COMPETICIÓN PRO EN EL HUB. EL QUE PIERDE PAGA EL ASADO.', time: '04:00 PM', prize: '$150.000 ARS + CAJÓN DE VINO' },
  { id: 3, title: 'MEETUP HARDWARE RIOJANO', date: '2025-06-02', category: 'Meetup', description: 'ENCUENTRO DE EXPERTOS EN PC. VAMOS A HABLAR DE FIERROS Y SIERRA.', time: '02:00 PM' },
  { id: 4, title: 'LA CHAYA GAMER 2025', date: '2025-02-15', category: 'Chaya', description: 'EL EVENTO MÁS GRANDE. HARINA, ALBAHACA Y GAMING.', time: '09:00 PM', prize: 'RTX 4090 PARA EL MEJOR DISFRAZ' },
];

const EventsPage: React.FC = () => {
  const [filter, setFilter] = useState('ALL');

  const filteredEvents = filter === 'ALL' ? MOCK_EVENTS : MOCK_EVENTS.filter(e => e.category.toUpperCase() === filter);

  return (
    <div className="min-h-screen bg-midnight-black bg-[radial-gradient(circle_at_50%_50%,#1E3A8A_0%,#020617_70%)] py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 border-b-8 border-neon-orange pb-12">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1 bg-ultra-purple text-event-white font-pixel text-[8px] animate-pulse">BITÁCORA_DE_LA_CHAYA_v2025</div>
            <h1 className="text-3xl md:text-5xl font-pixel text-event-white leading-tight uppercase">CALENDARIO <br/><span className="text-neon-orange">RIOJANO</span></h1>
            <p className="text-[12px] font-pixel text-neon-blue uppercase">PRÓXIMAS OPERACIONES DEL COMANDO POLO LR</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {['ALL', 'TORNEO', 'WORKSHOP', 'MEETUP', 'CHAYA'].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 border-4 font-pixel text-[10px] transition-all ${
                  filter === cat 
                  ? 'bg-neon-orange border-black text-black shadow-[4px_4px_0_0_#9333EA]' 
                  : 'bg-midnight-black border-event-white/20 text-event-white hover:border-neon-orange'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar View / Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {filteredEvents.map(event => (
            <div key={event.id} className="pixel-border !bg-midnight-black border-ultra-purple group hover:shadow-[0_0_40px_rgba(147,51,234,0.3)] transition-all">
              <div className="flex flex-col sm:flex-row">
                 {/* Left side: Date Badge */}
                 <div className="w-full sm:w-56 bg-deep-blue p-10 flex flex-col items-center justify-center text-center border-b-8 sm:border-b-0 sm:border-r-8 border-neon-orange">
                    <span className="text-[20px] font-pixel text-neon-orange mb-2">{event.date.split('-')[2]}</span>
                    <span className="text-[10px] font-pixel text-event-white uppercase">{new Date(event.date).toLocaleString('es-ES', { month: 'short' })}</span>
                    <div className="h-2 w-12 bg-neon-orange my-6"></div>
                    <span className="material-symbols-outlined !text-6xl text-event-white group-hover:scale-125 transition-transform duration-500">
                      {event.category === 'Torneo' ? 'military_tech' : event.category === 'Workshop' ? 'school' : event.category === 'Chaya' ? 'celebration' : 'diversity_3'}
                    </span>
                 </div>

                 {/* Right side: Info */}
                 <div className="p-10 flex-1 space-y-6">
                    <div className="flex justify-between items-start">
                       <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue text-[8px] font-pixel border-l-2 border-neon-blue uppercase">{event.category}</span>
                       <span className="text-[8px] font-pixel text-slate-500 tracking-tighter">HORA: {event.time}</span>
                    </div>
                    
                    <h3 className="text-[14px] font-pixel text-event-white leading-relaxed uppercase">{event.title}</h3>
                    <p className="font-body text-slate-400 text-sm leading-relaxed">{event.description}</p>
                    
                    {event.prize && (
                      <div className="bg-neon-green/10 border border-neon-green/30 p-4 flex items-center gap-4">
                         <span className="material-symbols-outlined text-neon-green">workspace_premium</span>
                         <span className="text-neon-green font-pixel text-[10px] uppercase">PREMIO: {event.prize}</span>
                      </div>
                    )}

                    <div className="pt-6 flex items-center justify-between">
                       <button className="pixel-button !bg-neon-orange !text-black !py-3 !px-8 hover:!bg-event-white transition-colors">
                          ANOTATE ACÁ
                       </button>
                       <div className="flex gap-2">
                          <div className="size-2 bg-neon-orange"></div>
                          <div className="size-2 bg-ultra-purple"></div>
                          <div className="size-2 bg-neon-blue"></div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-32 p-12 bg-ultra-purple/20 border-4 border-dashed border-ultra-purple text-center">
           <h2 className="text-xl font-pixel text-event-white mb-6 uppercase">¿TENÉS UNA IDEA PARA UN TORNEO?</h2>
           <p className="font-body text-slate-400 mb-10">Mándanos un mensaje al comando central del Polo LR y lo armamos meta.</p>
           <button className="pixel-button !bg-event-white !text-midnight-black">CONTACTO_SISTEMA</button>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
