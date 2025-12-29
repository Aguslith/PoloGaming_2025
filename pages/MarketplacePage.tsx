
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { geminiService } from '../geminiService';

interface ComponentData {
  name: string;
  priceUSD: number;
  priceARS: number;
  brand: string;
  specs: string;
  status: string;
  sourceUrl: string;
  category?: string;
  tier?: 'alta' | 'media' | 'baja';
}

interface TierItem {
  name: string;
  priceUSD: number;
  priceARS: number;
}

interface TierData {
  cpu: { alta: TierItem; media: TierItem; baja: TierItem };
  gpu: { alta: TierItem; media: TierItem; baja: TierItem };
  mb: { alta: TierItem; media: TierItem; baja: TierItem };
  psu: { alta: TierItem; media: TierItem; baja: TierItem };
  storage: { alta: TierItem; media: TierItem; baja: TierItem };
  monitor: { alta: TierItem; media: TierItem; baja: TierItem };
}

const MarketplacePage: React.FC = () => {
  const navigate = useNavigate();
  const mainGridRef = useRef<HTMLDivElement>(null);
  
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [tiers, setTiers] = useState<TierData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [activeTier, setActiveTier] = useState<'ALL' | 'alta' | 'media' | 'baja'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const [selectedParts, setSelectedParts] = useState<Record<string, string>>({
    cpu: '', gpu: '', mb: '', ram: '', psu: '', ssd: '', monitor: '', peripheral: ''
  });

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [marketData, tierData] = await Promise.all([
          geminiService.getMarketData(),
          geminiService.getHardwareTiers()
        ]);
        if (marketData) setComponents(marketData);
        if (tierData) setTiers(tierData as TierData);
      } catch (err) {
        console.error("Market fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() || isSearching) return;
    setIsSearching(true);
    try {
      const result = await geminiService.searchComponent(searchQuery);
      if (result && result.name) {
        setComponents(prev => [result, ...prev.filter(c => c.name !== result.name)]);
        setFilter('ALL');
        setActiveTier('ALL');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePick = (item: any) => {
    const rawCat = (item.category || '').toLowerCase();
    const name = item.name.toLowerCase();
    
    let slot = 'ram';
    if (rawCat.includes('cpu') || name.includes('core') || name.includes('ryzen') || name.includes('athlon')) slot = 'cpu';
    else if (rawCat.includes('gpu') || name.includes('rtx') || name.includes('rx ') || name.includes('gtx')) slot = 'gpu';
    else if (rawCat.includes('mother') || name.includes('board') || name.includes('b650')) slot = 'mb';
    else if (rawCat.includes('psu') || name.includes('power') || name.includes('fuente')) slot = 'psu';
    else if (rawCat.includes('ssd') || rawCat.includes('storage') || name.includes('nvme')) slot = 'ssd';
    else if (rawCat.includes('monitor') || name.includes('hz') || name.includes('led') || name.includes('monitor')) slot = 'monitor';
    else if (rawCat.includes('peripheral') || name.includes('mouse') || name.includes('teclado') || name.includes('keyboard')) slot = 'peripheral';
    else if (rawCat.includes('ram') || name.includes('ddr')) slot = 'ram';

    setSelectedParts(prev => ({ ...prev, [slot]: item.name }));
  };

  const selectTier = (t: 'alta' | 'media' | 'baja') => {
    setActiveTier(t);
    setTimeout(() => {
        mainGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const sendToBuilder = () => {
    localStorage.setItem('POLO_DRAFT_BUILD', JSON.stringify(selectedParts));
    navigate('/pc-builder');
  };

  const categories = [
    { id: 'ALL', label: 'TODO EL HARDWARE' },
    { id: 'cpu', label: 'CPUs' },
    { id: 'gpu', label: 'GPUs' },
    { id: 'motherboard', label: 'MOTHERs' },
    { id: 'storage', label: 'DISCOS' },
    { id: 'monitor', label: 'MONITORES' },
    { id: 'peripheral', label: 'PERIFÉRICOS' },
  ];

  const filteredComponents = components.filter(c => {
    const matchesCat = filter === 'ALL' || (c.category || '').toLowerCase().includes(filter.toLowerCase());
    const matchesTier = activeTier === 'ALL' || c.tier === activeTier;
    return matchesCat && matchesTier;
  });

  const hasSelection = Object.values(selectedParts).some(v => v !== '');

  return (
    <div 
      className="max-w-full overflow-hidden bg-circuit-black min-h-screen relative pb-60"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <header className="mb-12 border-b-8 border-inferno-red pb-10 space-y-8">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h1 className="text-3xl md:text-5xl font-pixel mb-2 text-inferno-red uppercase tracking-tighter">MERCADO_DE_FIERROS</h1>
                <p className="text-[10px] font-pixel text-lava-orange tracking-widest uppercase">EL MEJOR PRECIO DE LA RIOJA AL MUNDO</p>
              </div>
              
              <div className="flex w-full md:w-auto gap-2">
                 <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="BUSCÁ LO QUE SEA..."
                  className="bg-black border-4 border-inferno-red px-4 py-2 text-[10px] font-pixel text-white focus:border-voltage-yellow outline-none w-full md:w-64"
                 />
                 <button onClick={handleSearch} disabled={isSearching} className="pixel-button !bg-inferno-red !py-2 !px-4">SCAN</button>
              </div>
           </div>

           <div className="flex flex-wrap gap-4 items-center">
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => { setFilter(cat.id); setActiveTier('ALL'); }}
                  className={`px-4 py-2 border-2 font-pixel text-[8px] transition-all ${
                    filter === cat.id ? 'bg-inferno-red border-black text-white' : 'bg-transparent border-inferno-red/30 text-lava-orange hover:border-inferno-red'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
           </div>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40">
             <div className="size-24 border-8 border-inferno-red border-t-voltage-yellow animate-spin mb-10"></div>
             <div className="text-xl font-pixel text-voltage-yellow animate-pulse tracking-widest text-center uppercase">SINCRONIZANDO PRECIOS GLOBALES...</div>
          </div>
        ) : (
          <div className="space-y-32">
            {tiers && (
              <section className="bg-circuit-black border-8 border-voltage-yellow p-12">
                <h2 className="text-3xl font-pixel text-voltage-yellow mb-16 text-center">GUÍA RÁPIDA DE NIVELES</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div onClick={() => selectTier('alta')} className="cursor-pointer hover:scale-105 transition-transform"><TierColumn title="GAMA ALTA" color="#DC2626" data={tiers} type="alta" /></div>
                  <div onClick={() => selectTier('media')} className="cursor-pointer hover:scale-105 transition-transform"><TierColumn title="GAMA MEDIA" color="#F97316" data={tiers} type="media" /></div>
                  <div onClick={() => selectTier('baja')} className="cursor-pointer hover:scale-105 transition-transform"><TierColumn title="GAMA BAJA" color="#FACC15" data={tiers} type="baja" /></div>
                </div>
              </section>
            )}

            <div ref={mainGridRef} className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-10 scroll-mt-32">
              {filteredComponents.map((item, idx) => (
                <MarketCard key={idx} item={item} onPick={() => handlePick(item)} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* TRAY */}
      <div className={`fixed bottom-0 left-0 right-0 z-[100] transition-transform duration-500 ${hasSelection ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-6">
           <div className="bg-circuit-black border-t-8 border-x-8 border-voltage-yellow p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                 <div className="flex-1 grid grid-cols-4 md:grid-cols-8 gap-2 w-full">
                    {Object.entries(selectedParts).map(([slot, name]) => (
                       <div key={slot} className={`p-2 border-2 flex flex-col gap-1 transition-all ${name ? 'bg-voltage-yellow/10 border-voltage-yellow' : 'bg-black border-heat-white/10 opacity-30'}`}>
                          <span className="text-[5px] font-pixel text-voltage-yellow uppercase">{slot}</span>
                          <span className="text-[7px] font-pixel text-white truncate">{name || '-'}</span>
                       </div>
                    ))}
                 </div>
                 
                 <div className="flex gap-4 w-full md:w-auto">
                    <button onClick={sendToBuilder} className="pixel-button !bg-voltage-yellow !text-black !py-4 !px-8">¡A CONSTRUIR!</button>
                    <button onClick={() => setSelectedParts({cpu:'', gpu:'', mb:'', ram:'', psu:'', ssd:'', monitor: '', peripheral: ''})} className="pixel-button !bg-black border-inferno-red !text-inferno-red">RESET</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const TierColumn: React.FC<{ title: string, color: string, data: any, type: 'alta' | 'media' | 'baja' }> = ({ title, color, data, type }) => {
  const cats = ['cpu', 'gpu', 'mb', 'storage', 'monitor'];
  return (
    <div className="flex flex-col gap-6 p-6 border-4" style={{ borderColor: color }}>
      <h3 className="text-[10px] font-pixel text-center py-2 text-black" style={{ backgroundColor: color }}>{title}</h3>
      <div className="space-y-4">
        {cats.map(c => {
          const item = data?.[c]?.[type];
          if (!item) return null;
          return (
            <div key={c} className="p-2 border border-heat-white/10">
              <div className="flex justify-between mb-1"><span className="text-[7px] font-pixel text-voltage-yellow">${item.priceUSD}</span></div>
              <p className="text-[8px] font-pixel text-heat-white/60 truncate">{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MarketCard: React.FC<{ item: ComponentData, onPick: () => void }> = ({ item, onPick }) => (
  <div className="pixel-border !bg-circuit-black p-4 border-inferno-red/40 flex flex-col group">
    <div className="flex justify-between mb-4">
       <span className="text-[8px] font-pixel text-lava-orange">{item.brand}</span>
       <span className="px-2 py-0.5 bg-voltage-yellow text-black font-pixel text-[6px]">{item.status}</span>
    </div>
    <h3 className="text-[9px] font-pixel mb-4 text-heat-white h-10 overflow-hidden">{item.name}</h3>
    <div className="bg-inferno-red/5 p-3 border border-inferno-red/20 mb-4 flex-1">
       <div className="flex justify-between text-[10px] font-pixel text-voltage-yellow mb-2"><span>${item.priceUSD}</span></div>
       <div className="text-[7px] font-pixel text-heat-white/40 uppercase">{item.category}</div>
    </div>
    <div className="flex gap-2">
      <button onClick={onPick} className="pixel-button !bg-inferno-red flex-1 !text-[8px]">AÑADIR</button>
      <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="pixel-button !bg-black border-white !text-white !px-3">
        <span className="material-symbols-outlined !text-sm">open_in_new</span>
      </a>
    </div>
  </div>
);

export default MarketplacePage;
