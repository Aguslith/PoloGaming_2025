
import React from 'react';

const CommunityPage: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-64px)]">
      <aside className="w-80 glass border-r border-white/5 flex flex-col p-6 space-y-8 hidden md:flex">
         <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Canales</h2>
            <div className="space-y-1">
               <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-bold text-sm cursor-pointer">
                 <span className="material-symbols-outlined text-[18px]">tag</span> general
               </div>
               <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-slate-400 font-medium text-sm cursor-pointer transition-colors">
                 <span className="material-symbols-outlined text-[18px]">tag</span> ue5-dev
               </div>
               <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-slate-400 font-medium text-sm cursor-pointer transition-colors">
                 <span className="material-symbols-outlined text-[18px]">tag</span> hardware-builds
               </div>
            </div>
         </div>
         
         <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Miembros Online</h2>
            <div className="space-y-4">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="flex items-center gap-3">
                    <div className="relative">
                       <img src={`https://picsum.photos/seed/${i+10}/50/50`} className="size-8 rounded-full" />
                       <div className="absolute -bottom-0.5 -right-0.5 size-2.5 bg-green-500 rounded-full border-2 border-background-dark"></div>
                    </div>
                    <span className="text-xs font-medium text-slate-300">Gamer_{i}42</span>
                 </div>
               ))}
            </div>
         </div>
      </aside>

      <main className="flex-1 flex flex-col bg-background-dark/50">
        <header className="px-8 py-4 border-b border-white/5 flex items-center justify-between glass">
           <div className="flex items-center gap-2">
              <span className="text-slate-500 font-bold">#</span>
              <h1 className="font-bold">general</h1>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
           <Message user="Alex" text="¿Alguien ha probado el nuevo driver de Nvidia? ¿Mejoró el performance en UE5?" time="10:45" />
           <Message user="Marta_Dev" text="Sí, lo probé ayer. Ganas unos 5-8 fps en el viewport con Lumen activado. Muy recomendado." time="10:52" />
           <Message user="HwMaster" text="Cuidado con las RTX 3080, hay reportes de artifacts." time="11:05" />
        </div>

        <div className="p-8">
           <div className="glass border-white/10 rounded-2xl flex items-center p-2">
              <button className="p-3 text-slate-500 hover:text-white transition-colors">
                 <span className="material-symbols-outlined">add_circle</span>
              </button>
              <input 
                type="text" 
                placeholder="Escribe un mensaje en #general..."
                className="flex-1 bg-transparent border-none outline-none text-white px-2"
              />
              <button className="p-3 bg-primary text-white rounded-xl shadow-lg">
                 <span className="material-symbols-outlined">send</span>
              </button>
           </div>
        </div>
      </main>
    </div>
  );
};

const Message = ({ user, text, time }: { user: string, text: string, time: string }) => (
  <div className="flex gap-4 group">
    <img src={`https://picsum.photos/seed/${user}/100/100`} className="size-10 rounded-xl" />
    <div>
       <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-sm hover:underline cursor-pointer">{user}</span>
          <span className="text-[10px] text-slate-600 font-bold">{time}</span>
       </div>
       <p className="text-sm text-slate-400 leading-relaxed">{text}</p>
    </div>
  </div>
);

export default CommunityPage;
