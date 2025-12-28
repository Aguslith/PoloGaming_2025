
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../geminiService';

const FloatingAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'POLO AI ONLINE. ¿CÓMO PODEMOS AYUDARTE?' }
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
      setMessages(prev => [...prev, { role: 'model', text: response || "ERROR_SISTEMA" }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "ERROR_CONEXION" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="w-80 sm:w-96 h-[450px] mb-6 pixel-border !bg-white flex flex-col shadow-2xl overflow-hidden border-8">
          <div className="bg-primary p-4 border-b-8 border-black flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined !text-xl">psychology</span>
              <span className="text-[8px] font-pixel">POLO_ASSISTANT</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 bg-white">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 border-4 shadow-[2px_2px_0_0_#000] ${
                  m.role === 'user' ? 'border-primary bg-primary text-white' : 'border-black bg-white text-black'
                }`}>
                  <p className="text-[8px] font-pixel leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="text-[8px] font-pixel text-primary animate-pulse">PROCESANDO...</div>
              </div>
            )}
          </div>

          <div className="p-4 border-t-8 border-black bg-white">
            <div className="flex gap-4">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="INPUT..."
                className="flex-1 bg-white border-4 border-black px-3 py-2 text-[8px] font-pixel focus:border-primary outline-none text-black"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="pixel-button !py-2 !px-3"
              >
                <span className="material-symbols-outlined !text-sm">send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="size-20 bg-primary border-8 border-black text-white flex items-center justify-center shadow-[8px_8px_0_0_#000] hover:scale-110 active:translate-x-2 active:translate-y-2 transition-all"
      >
        <span className="material-symbols-outlined !text-[48px]">{isOpen ? 'close' : 'smart_toy'}</span>
      </button>
    </div>
  );
};

export default FloatingAI;
