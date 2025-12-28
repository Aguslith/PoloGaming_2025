
import React from 'react';

const SkillTreePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2">Tu Árbol de Habilidades</h1>
          <p className="text-slate-400">Visualiza tu progreso y desbloquea nuevas oportunidades.</p>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-2xl font-black text-primary">LVL 42</span>
           <div className="w-48 h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <div className="h-full bg-primary w-[75%] shadow-[0_0_15px_rgba(0,127,255,0.5)]"></div>
           </div>
        </div>
      </div>

      <div className="relative glass rounded-3xl p-12 min-h-[600px] overflow-hidden">
        {/* Simplified Visualization */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
           <SkillNode icon="code" label="C++ Core" active />
           <SkillNode icon="draw" label="VFX" active />
           <SkillNode icon="architecture" label="Level Design" active />
           <SkillNode icon="smart_toy" label="AI Logic" />
           <SkillNode icon="visibility" label="Raytracing" />
           <SkillNode icon="cloud" label="Server Architecture" />
           <SkillNode icon="joystick" label="UX Gaming" />
           <SkillNode icon="person_play" label="Networking" />
        </div>

        <div className="mt-20 p-8 glass bg-primary/5 border border-primary/20 rounded-2xl flex flex-col md:flex-row items-center gap-8">
           <div className="size-20 bg-primary/20 rounded-full flex items-center justify-center text-primary shrink-0">
             <span className="material-symbols-outlined !text-[40px]">workspace_premium</span>
           </div>
           <div>
              <h3 className="text-xl font-bold mb-1">Próximo Hito: Master de IA Generativa</h3>
              <p className="text-slate-400 text-sm">Desbloqueas el acceso a laboratorios experimentales de NPCs inteligentes.</p>
           </div>
           <button className="md:ml-auto px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-dark transition-all">
             Empezar Desafío
           </button>
        </div>
      </div>
    </div>
  );
};

const SkillNode = ({ icon, label, active = false }: { icon: string, label: string, active?: boolean }) => (
  <div className="flex flex-col items-center gap-4 group cursor-pointer">
    <div className={`size-20 rounded-2xl flex items-center justify-center transition-all ${
      active 
      ? 'bg-primary text-white shadow-xl shadow-primary/40 ring-4 ring-primary/20 scale-110' 
      : 'glass text-slate-600 border-white/5 grayscale group-hover:grayscale-0 group-hover:border-primary/50'
    }`}>
      <span className="material-symbols-outlined !text-[36px]">{icon}</span>
    </div>
    <span className={`text-xs font-bold uppercase tracking-widest ${active ? 'text-white' : 'text-slate-500'}`}>{label}</span>
  </div>
);

export default SkillTreePage;
