
import React, { useEffect, useState } from 'react';
import { geminiService } from '../geminiService';

interface ComponentData {
  name: string;
  priceUSD: number;
  priceARS: number;
  brand: string;
  specs: string;
  status: string;
  sourceUrl: string;
}

const MarketplacePage: React.FC = () => {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await geminiService.getMarketData();
      if (data && Array.isArray(data)) {
        setComponents(data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-cyber-black">
      <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6 border-l-4 border-primary pl-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-modern font-black tracking-tighter">MERCADO_ACTUAL</h1>
          <p className="text-primary font-pixel text-[10px] mt-2 tracking-widest">LIVE DATA FEED: COMPRAGAMER / AMAZON / NEWEGG</p>
        </div>
        <div className="flex gap-4">
           <div className="px-4 py-2 glass text-[10px] font-pixel text-green-400">STATUS: ONLINE</div>
           <div className="px-4 py-2 glass text-[10px] font-pixel text-primary">SCAN_MODE: ACTIVE</div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32">
           <div className="size-20 border-4 border-primary border-t-transparent rounded-full animate-spin mb-8 shadow-[0_0_20px_rgba(255,0,51,0.5)]"></div>
           <p className="text-xl font-modern tracking-[0.5em] animate-pulse">SYNCING_MARKET_DATABASE</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {components.map((item, idx) => (
            <ModernMarketCard key={idx} item={item} />
          ))}
        </div>
      )}

      <div className="mt-20 glass p-8 border-t-4 border-primary">
         <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
               <h3 className="text-xl font-modern font-bold mb-4">TENDENCIAS DE HARDWARE</h3>
               <p className="text-white/40 text-sm">Nuestro sistema de IA analiza diariamente las variaciones de stock y precio para que tomes la mejor decisión de compra.</p>
            </div>
            <div className="flex gap-10">
               <TrendItem label="RTX 40-SERIES" value="+2.4%" color="text-primary" />
               <TrendItem label="RYZEN 7000" value="-5.1%" color="text-green-400" />
               <TrendItem label="DDR5 RAM" value="ESTABLE" color="text-blue-400" />
            </div>
         </div>
      </div>
    </div>
  );
};

// Fixed the Type error by using React.FC which includes definition for common props like 'key'
const ModernMarketCard: React.FC<{ item: ComponentData }> = ({ item }) => (
  <div className="cyber-card p-6 flex flex-col h-full group">
    <div className="flex justify-between items-start mb-6">
      <div className="text-[10px] font-pixel text-primary bg-primary/10 px-2 py-1 border border-primary/20">
        {item.status}
      </div>
      <div className="text-[8px] font-pixel text-white/30">{item.brand}</div>
    </div>

    <h3 className="text-lg font-modern font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{item.name}</h3>
    <p className="text-[10px] text-white/40 mb-6 font-body h-12 overflow-hidden">{item.specs}</p>

    <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-pixel text-white/50">USD</span>
        <span className="text-2xl font-modern font-black">${item.priceUSD}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-pixel text-primary/50">ARS</span>
        <span className="text-sm font-modern text-primary font-bold">${item.priceARS?.toLocaleString()}</span>
      </div>
      
      <a 
        href={item.sourceUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full text-center py-3 border border-white/10 hover:border-primary hover:bg-primary transition-all text-[10px] font-pixel"
      >
        VER_TIENDA
      </a>
    </div>
  </div>
);

const TrendItem = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="text-center">
    <p className="text-[8px] font-pixel text-white/40 mb-2">{label}</p>
    <p className={`text-xl font-modern font-black ${color}`}>{value}</p>
  </div>
);

export default MarketplacePage;
