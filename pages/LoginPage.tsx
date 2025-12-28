
import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 glass rounded-3xl overflow-hidden shadow-2xl border border-white/5">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-4xl font-black mb-2">Bienvenido de nuevo</h1>
            <p className="text-slate-400">Accede a tu cuenta de Polo Gaming Hub.</p>
          </div>
          
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
              <input 
                type="email" 
                placeholder="nombre@empresa.com"
                className="w-full glass border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-primary text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Contraseña</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full glass border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-primary text-white"
              />
            </div>
            <button className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-all">
              Ingresar
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4 py-4">
             <div className="flex-1 h-px bg-white/5"></div>
             <span className="text-xs text-slate-600 font-bold uppercase">O con</span>
             <div className="flex-1 h-px bg-white/5"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
             <button className="glass py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-all text-sm font-bold">
               <img src="https://www.google.com/favicon.ico" className="size-4" /> Google
             </button>
             <button className="glass py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-all text-sm font-bold">
               <span className="material-symbols-outlined text-sm">hub</span> Github
             </button>
          </div>
          
          <p className="mt-8 text-center text-sm text-slate-500">
            ¿No tienes cuenta? <Link to="/register" className="text-primary font-bold">Regístrate</Link>
          </p>
        </div>

        <div className="hidden lg:block relative bg-[#1a2332]">
           <img src="https://picsum.photos/seed/login/800/1000" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Login Art" />
           <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
           <div className="absolute bottom-12 left-12 right-12">
              <p className="text-white text-3xl font-black leading-tight mb-4">"El futuro del desarrollo de juegos está en la colaboración inteligente."</p>
              <p className="text-primary font-bold">Polo Gaming Labs</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
