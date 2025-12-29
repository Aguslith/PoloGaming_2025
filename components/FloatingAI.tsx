
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../geminiService';

const FloatingAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'POLO_AI_CONNECTED. ¿REQUERIMIENTO DE DATOS?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const response = await geminiService.getChatResponse(userText, history);
      setMessages(prev => [...prev, { role: 'model', text: response || "ERROR_SYSTEM_RESPONSE" }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "LINK_FAILURE_DETECTED" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] mb-8 pixel-border !bg-dark-void border-neon-blue flex flex-col shadow-[0_0_50px_rgba(59,130,246,0.2)] overflow-hidden border-8 animate-boot-anim">
          <div className="bg-neon-blue/10 p-6 border-b-8 border-neon-blue flex items-center justify-between text-neon-blue">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined !text-2xl animate-spin-slow">smart_toy</span>
              <span className="text-[10px] font-pixel tracking-widest uppercase">POLO_CORE_IA</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 border-4 shadow-[4px_4px_0_0_#000] ${
                  m.role === 'user' ? 'border-neon-purple bg-neon-purple text-white' : 'border-neon-blue bg-black/40 text-soft-white'
                }`}>
                  <p className="text-[10px] font-pixel leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="text-[10px] font-pixel text-neon-green animate-pulse">CARGANDO_DATOS...</div>
              </div>
            )}
          </div>

          <div className="p-6 border-t-8 border-neon-blue bg-black/40">
            <div className="flex gap-4">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="DATOS..."
                className="flex-1 bg-transparent border-4 border-neon-purple px-4 py-3 text-[10px] font-pixel focus:border-neon-green outline-none text-soft-white placeholder:text-slate-700"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="pixel-button !bg-neon-blue !py-2 !px-4"
              >
                <span className="material-symbols-outlined !text-xl">bolt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="size-24 bg-neon-purple border-8 border-black text-white flex items-center justify-center shadow-[12px_12px_0_0_#3B82F6] hover:scale-110 active:translate-x-3 active:translate-y-3 transition-all relative group"
      >
        <div className="absolute inset-0 bg-neon-blue/20 group-hover:bg-neon-blue/40 transition-colors"></div>
        <span className="material-symbols-outlined !text-[56px] relative z-10">{isOpen ? 'close' : 'psychology'}</span>
      </button>
    </div>
  );
};

export default FloatingAI;
