
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../geminiService';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface BuildParts {
  cpu: string;
  gpu: string;
  mb: string;
  ram: string;
  psu: string;
  ssd: string;
  monitor: string;
  peripheral: string;
}

const PCBuilderPage: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'POLO ARCHITECT SYSTEM v2. LISTO PARA ANALIZAR TU SETUP COMPLETO.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [parts, setParts] = useState<BuildParts>({
    cpu: 'Pendiente', gpu: 'Pendiente', mb: 'Pendiente', ram: 'Pendiente', psu: 'Pendiente', ssd: 'Pendiente', monitor: 'Pendiente', peripheral: 'Pendiente'
  });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const draft = localStorage.getItem('POLO_DRAFT_BUILD');
    if (draft) {
      const parsed = JSON.parse(draft);
      setParts(prev => ({ ...prev, ...Object.fromEntries(Object.entries(parsed).map(([k,v]) => [k, v || 'Pendiente'])) }));
      localStorage.removeItem('POLO_DRAFT_BUILD');
      setMessages(prev => [...prev, { role: 'model', text: '¡LISTO CHANGO! TRAJE TODO LO QUE ELEGISTE EN EL MARKET. ¿HACEMOS UN SCAN DE COMPATIBILIDAD?' }]);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || loading) return;
    
    if (!customPrompt) setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setLoading(true);

    try {
      const response = await geminiService.getChatResponse(textToSend, messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })));
      setMessages(prev => [...prev, { role: 'model', text: response || "ERROR_SYSTEM" }]);
      if (response) parseBuildData(response);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "ERROR_CONEXION" }]);
    } finally {
      setLoading(false);
    }
  };

  const getIAAdvice = async () => {
    setLoading(true);
    try {
      const advice = await geminiService.getCompatibilityAdvice(parts);
      setMessages(prev => [...prev, { role: 'model', text: advice || "FALLA" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "ERROR_IA" }]);
    } finally {
      setLoading(false);
    }
  };

  const parseBuildData = (text: string) => {
    const jsonMatch = text.match(/\[BUILD_JSON\](.*?)\[\/BUILD_JSON\]/s);
    if (jsonMatch && jsonMatch[1]) {
      try {
        const buildData = JSON.parse(jsonMatch[1]);
        setParts(prev => ({ ...prev, ...buildData }));
      } catch (e) { console.error(e); }
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-circuit-black px-4 py-4 gap-4">
      {/* Sidebar - Ahora con Scroll y más slots */}
      <aside className="hidden lg:flex flex-col w-96 pixel-border !bg-circuit-black border-inferno-red p-6 space-y-6 overflow-y-auto custom-scrollbar">
        <header className="flex items-center gap-4 border-b-4 border-inferno-red pb-4">
           <span className="material-symbols-outlined text-voltage-yellow !text-3xl">terminal</span>
           <h2 className="text-[10px] font-pixel text-heat-white uppercase">CONFIGURACIÓN</h2>
        </header>
        
        <div className="space-y-3">
          <PartSlot icon="memory" label="CPU" val={parts.cpu} color="#DC2626" />
          <PartSlot icon="view_in_ar" label="GPU" val={parts.gpu} color="#F97316" />
          <PartSlot icon="developer_board" label="MOTHER" val={parts.mb} color="#FACC15" />
          <PartSlot icon="analytics" label="RAM" val={parts.ram} color="#FAFAFA" />
          <PartSlot icon="power" label="PSU" val={parts.psu} color="#DC2626" />
          <PartSlot icon="storage" label="SSD" val={parts.ssd} color="#F97316" />
          <PartSlot icon="monitor" label="MONITOR" val={parts.monitor} color="#3B82F6" />
          <PartSlot icon="mouse" label="PERIFÉRICOS" val={parts.peripheral} color="#22C55E" />
        </div>

        <div className="pt-4 space-y-3">
          <button onClick={getIAAdvice} disabled={loading} className="pixel-button !bg-voltage-yellow !text-black !w-full !py-3 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">psychology</span>
            <span className="text-[8px]">ANALIZAR COMPATIBILIDAD</span>
          </button>
          <button onClick={() => setShow3D(true)} className="pixel-button !bg-inferno-red !w-full !py-3 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">3d_rotation</span>
            <span className="text-[8px]">VER SETUP 3D</span>
          </button>
        </div>
      </aside>

      {/* Main Terminal */}
      <main className="flex-1 flex flex-col pixel-border !bg-circuit-black border-lava-orange">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xl p-6 border-4 shadow-[8px_8px_0_0_#000] ${
                m.role === 'user' ? 'border-inferno-red bg-inferno-red text-white' : 'border-lava-orange bg-circuit-black text-heat-white'
              }`}>
                <div className="whitespace-pre-wrap font-cyber text-sm leading-relaxed">{m.text}</div>
              </div>
            </div>
          ))}
          {loading && <div className="text-[10px] font-pixel text-voltage-yellow animate-pulse p-6">SISTEMA_PROCESANDO...</div>}
        </div>

        <div className="p-8 border-t-8 border-lava-orange bg-black/40">
          <div className="flex gap-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="PREGUNTALE AL ARQUITECTO RIOJANO..."
              className="flex-1 bg-circuit-black border-4 border-lava-orange px-6 py-4 outline-none text-heat-white font-cyber text-lg focus:border-voltage-yellow"
            />
            <button onClick={() => handleSend()} disabled={loading} className="pixel-button !bg-voltage-yellow !text-black !px-12">SEND</button>
          </div>
        </div>
      </main>

      {show3D && <PC3DVisualizer parts={parts} onClose={() => setShow3D(false)} />}
    </div>
  );
};

const PartSlot = ({ icon, label, val, color }: { icon: string, label: string, val: string, color: string }) => {
  const active = val !== 'Pendiente';
  return (
    <div className={`p-3 border-2 transition-all ${active ? 'bg-heat-white/5' : 'border-heat-white/5 opacity-40'}`} style={{ borderColor: active ? color : '' }}>
       <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined !text-lg" style={{ color: active ? color : '#555' }}>{icon}</span>
          <span className="text-[6px] font-pixel text-heat-white/40">{label}</span>
       </div>
       <div className="text-[8px] font-pixel text-heat-white truncate">{val}</div>
    </div>
  );
};

const PC3DVisualizer: React.FC<{ parts: BuildParts, onClose: () => void }> = ({ parts, onClose }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x09090B);
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(15, 12, 18);
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dLight = new THREE.DirectionalLight(0xffffff, 1);
    dLight.position.set(10, 10, 10);
    scene.add(dLight);
    
    const group = new THREE.Group();
    scene.add(group);

    const createVoxel = (w: number, h: number, d: number, color: number, pos: [number, number, number]) => {
      const geometry = new THREE.BoxGeometry(w, h, d);
      const material = new THREE.MeshStandardMaterial({ color });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...pos);
      group.add(mesh);
    };

    // Gabinete
    createVoxel(6, 8, 8, 0x111111, [0, 0, 0]);
    // Monitor
    if (parts.monitor !== 'Pendiente') createVoxel(8, 5, 0.2, 0x3B82F6, [0, 0, 6]);
    // Periféricos
    if (parts.peripheral !== 'Pendiente') createVoxel(6, 0.1, 2, 0x22C55E, [0, -3.5, 6]);

    const animate = () => {
      requestAnimationFrame(animate);
      group.rotation.y += 0.005;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [parts]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95">
      <div className="pixel-border !bg-circuit-black border-inferno-red w-full max-w-5xl h-[80vh] flex flex-col">
        <header className="bg-inferno-red p-4 flex items-center justify-between text-white font-pixel text-[10px]">
           <span>VISTA_DEL_SETU_v2.0</span>
           <button onClick={onClose} className="material-symbols-outlined">close</button>
        </header>
        <div className="flex-1 relative" ref={mountRef}></div>
      </div>
    </div>
  );
};

export default PCBuilderPage;
