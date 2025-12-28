
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
}

const PCBuilderPage: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'SISTEMA DE ASISTENCIA POLO ONLINE. ¿QUÉ BUILD TIENES EN MENTE?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [parts, setParts] = useState<BuildParts>({
    cpu: 'Pendiente',
    gpu: 'Pendiente',
    mb: 'Pendiente',
    ram: 'Pendiente',
    psu: 'Pendiente',
    ssd: 'Pendiente'
  });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const parseBuildData = (text: string) => {
    const jsonMatch = text.match(/\[BUILD_JSON\](.*?)\[\/BUILD_JSON\]/s);
    if (jsonMatch && jsonMatch[1]) {
      try {
        const buildData = JSON.parse(jsonMatch[1]);
        setParts(prev => ({ ...prev, ...buildData }));
      } catch (e) {
        console.error("Error parsing build JSON", e);
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const prompt = `Act as an 8-bit themed PC architect from "Polo Tecnológico La Rioja". User wants: "${userText}". 
      Recommend parts and specs in a retro gaming style.
      IMPORTANT: ALWAYS include a JSON block at the very end of your response formatted exactly like this:
      [BUILD_JSON]{ "cpu": "NAME", "gpu": "NAME", "mb": "NAME", "ram": "NAME", "psu": "NAME", "ssd": "NAME" }[/BUILD_JSON]
      Respond in Spanish. If you don't know a part yet, preserve current values.`;
      
      const response = await geminiService.getChatResponse(prompt, messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })));
      const cleanedText = (response || "").replace(/\[BUILD_JSON\].*?\[\/BUILD_JSON\]/s, '').trim();
      
      setMessages(prev => [...prev, { role: 'model', text: cleanedText || "ERROR_SISTEMA" }]);
      if (response) parseBuildData(response);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "ERROR_CONEXION" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-white px-4 py-4 gap-4">
      {/* Sidebar - Dynamically updated parts */}
      <aside className="hidden lg:flex flex-col w-80 pixel-border p-6 space-y-8 bg-white overflow-y-auto">
        <h2 className="text-[10px] font-pixel text-primary border-b-4 border-black pb-4">TERMINAL.LOG</h2>
        <div className="space-y-6">
          <div className="p-4 bg-slate-100 border-4 border-black">
             <div className="flex justify-between items-center mb-3">
                <span className="text-[8px] font-pixel text-slate-500 uppercase">OS</span>
                <span className="text-[8px] font-pixel text-primary">RUNNING</span>
             </div>
             <p className="text-[10px] font-body text-black">MONITOR DE HARDWARE ACTIVO.</p>
          </div>
          
          <div className="space-y-4 pt-2">
             <StatusItem icon="memory" label="CPU" val={parts.cpu} />
             <StatusItem icon="view_in_ar" label="GPU" val={parts.gpu} />
             <StatusItem icon="developer_board" label="MB" val={parts.mb} />
             <StatusItem icon="analytics" label="RAM" val={parts.ram} />
             <StatusItem icon="power" label="PSU" val={parts.psu} />
             <StatusItem icon="storage" label="SSD" val={parts.ssd} />
          </div>
        </div>

        <button 
          onClick={() => setShow3D(true)}
          className="mt-auto pixel-button !w-full !flex !items-center !justify-center gap-2"
        >
          <span className="material-symbols-outlined">3d_rotation</span>
          VER 3D BUILD
        </button>
      </aside>

      {/* Main Terminal */}
      <main className="flex-1 flex flex-col pixel-border !bg-white">
        <header className="px-6 py-4 border-b-8 border-black flex items-center justify-between bg-primary text-white">
          <div className="flex items-center gap-4">
             <div className="size-6 bg-white border-2 border-black"></div>
             <h1 className="text-[10px] font-pixel">POLO_BUILDER_V2.0</h1>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 font-body text-sm bg-white">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xl p-4 border-4 shadow-[4px_4px_0_0_#000] ${
                m.role === 'user' ? 'border-primary bg-primary text-white' : 'border-black bg-white text-black'
              }`}>
                <div className="whitespace-pre-wrap font-pixel text-[8px] leading-relaxed">{m.text}</div>
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="text-[10px] font-pixel text-primary animate-pulse">CARGANDO...</div>
             </div>
          )}
        </div>

        <div className="p-6 border-t-8 border-black">
          <div className="flex gap-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="COMANDO..."
              className="flex-1 bg-white border-4 border-black px-4 py-3 outline-none text-black font-pixel text-[10px] focus:border-primary"
            />
            <button onClick={handleSend} disabled={loading} className="pixel-button">SEND</button>
          </div>
        </div>
      </main>

      {/* 3D Visualizer Modal */}
      {show3D && <PC3DViewer parts={parts} onClose={() => setShow3D(false)} />}
    </div>
  );
};

const StatusItem = ({ icon, label, val }: { icon: string, label: string, val: string }) => (
  <div className="flex items-center gap-3">
    <div className={`size-8 border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0_0_#000] ${val !== 'Pendiente' ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'}`}>
       <span className="material-symbols-outlined !text-sm">{icon}</span>
    </div>
    <div className="overflow-hidden">
      <div className="text-[7px] font-pixel text-slate-500 uppercase">{label}</div>
      <div className="text-[8px] font-pixel text-black truncate">{val}</div>
    </div>
  </div>
);

const PC3DViewer: React.FC<{ parts: BuildParts, onClose: () => void }> = ({ parts, onClose }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(6, 6, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 1 : 1); // Maintain pixelated look
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dLight = new THREE.DirectionalLight(0xff0000, 1.2);
    dLight.position.set(10, 10, 10);
    scene.add(dLight);

    const group = new THREE.Group();
    scene.add(group);

    const createBoxPart = (w: number, h: number, d: number, color: number, name: string, pos: [number, number, number], transparent = false) => {
      const geometry = new THREE.BoxGeometry(w, h, d);
      const material = new THREE.MeshStandardMaterial({ 
        color, 
        transparent, 
        opacity: transparent ? 0.3 : 1,
        roughness: 1,
        metalness: 0
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...pos);
      mesh.userData = { label: name };
      
      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 }));
      mesh.add(line);
      
      group.add(mesh);
      return mesh;
    };

    // Case
    createBoxPart(4, 6, 6, 0xffffff, "Gabinete: Mid Tower", [0, 0, 0], true);
    // Motherboard
    createBoxPart(0.2, 5, 5, 0x1a1a1a, `Motherboard: ${parts.mb}`, [-1.8, 0, 0]);
    // CPU Cooler (Pixelated Block)
    createBoxPart(1.2, 1.2, 1.2, 0xcc0000, `CPU: ${parts.cpu}`, [-1.1, 1, 0]);
    // GPU
    createBoxPart(3, 1, 4, 0x000000, `GPU: ${parts.gpu}`, [0, -1, 0]);
    // RAM
    createBoxPart(0.4, 3, 0.2, 0xff0000, `RAM: ${parts.ram}`, [-1.2, 1, 1.5]);
    createBoxPart(0.4, 3, 0.2, 0xff0000, `RAM: ${parts.ram}`, [-1.2, 1, 1.8]);
    // PSU
    createBoxPart(2, 2, 2, 0x111111, `PSU: ${parts.psu}`, [1, -2, 2]);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(group.children, true);

      if (intersects.length > 0) {
        let target = intersects[0].object;
        while(target.parent && !target.userData.label && target.parent !== group) {
            target = target.parent;
        }
        if (target.userData.label) {
            setHoveredLabel(target.userData.label);
        } else {
            setHoveredLabel(null);
        }
      } else {
        setHoveredLabel(null);
      }
    };

    const handleResize = () => {
        if (!mountRef.current) return;
        const newW = mountRef.current.clientWidth;
        const newH = mountRef.current.clientHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [parts]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
      <div className="pixel-border !bg-white w-full max-w-5xl h-[85vh] flex flex-col relative animate-crt-on">
        <header className="bg-primary p-4 border-b-8 border-black flex items-center justify-between text-white">
           <span className="font-pixel text-[10px] tracking-widest">POLO_3D_BUILD_VISUALIZER</span>
           <button onClick={onClose} className="material-symbols-outlined hover:rotate-90 transition-transform">close</button>
        </header>
        
        <div className="flex-1 relative bg-black overflow-hidden" ref={mountRef}>
           <div className="absolute top-6 left-6 p-4 bg-white/10 border-2 border-white/20 font-pixel text-[7px] text-white/60 space-y-2 pointer-events-none z-10">
              <p className="text-primary font-bold">INSTRUCCIONES:</p>
              <p>BOTON IZQ: ROTAR CÁMARA</p>
              <p>SCROLL: ZOOM +/-</p>
              <p>HOVER: IDENTIFICAR COMPONENTE</p>
           </div>

           {hoveredLabel && (
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pixel-border !bg-black text-white p-6 font-pixel text-[10px] pointer-events-none z-20 border-white shadow-[0_0_20px_rgba(255,0,0,0.5)]">
                <div className="text-primary mb-2 text-[8px] uppercase">COMPONENTE DETECTADO</div>
                {hoveredLabel}
             </div>
           )}
           
           <div className="absolute bottom-6 right-6 font-pixel text-[6px] text-primary/40">RENDER_MODE: PIXEL_8BIT_LEGACY</div>
        </div>

        <footer className="p-6 border-t-8 border-black bg-white flex justify-between items-center">
           <div className="flex gap-4">
              <div className="h-6 w-12 bg-primary border-4 border-black"></div>
              <div className="h-6 w-12 bg-black border-4 border-black"></div>
              <div className="h-6 w-12 bg-slate-300 border-4 border-black"></div>
           </div>
           <div className="text-right">
              <span className="font-pixel text-[8px] text-black">POLO TECNOLÓGICO LA RIOJA</span>
              <p className="font-pixel text-[6px] text-slate-400 mt-1">SISTEMA_VIRTUAL_READY</p>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default PCBuilderPage;
