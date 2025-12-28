
import React, { useState } from 'react';

interface EventDetail {
  id: string;
  title: string;
  date: string;
  fullDate: string;
  category: 'ESPORTS' | 'DEV' | 'WORKSHOP';
  description: string;
  prizes: string[];
  registration: 'ABIERTA' | 'CUPOS_LIMITADOS' | 'CERRADA' | 'PRÓXIMAMENTE';
  clauses: string[];
  access: 'TODO PÚBLICO' | 'SÓLO PROFESIONALES' | 'ESTUDIANTES';
  location: string;
}

const EVENTS_DATA: EventDetail[] = [
  {
    id: '1',
    title: 'JAM POLO GAMING 2024',
    date: '15 DIC',
    fullDate: '15 de Diciembre, 10:00 AM',
    category: 'DEV',
    description: 'La maratón de desarrollo de videojuegos más grande de La Rioja. Crea un prototipo funcional en 48hs bajo una temática sorpresa.',
    prizes: [
      '1er Puesto: Ar$ 500.000 + Kit Periféricos Pro',
      '2do Puesto: Beca completa Desarrollo en Unreal Engine',
      '3er Puesto: Mentoría con expertos de la industria'
    ],
    registration: 'ABIERTA',
    clauses: [
      'Participación individual o equipos de hasta 4 personas.',
      'Apto para todo público (menores con autorización).',
      'Uso obligatorio de motores de juego estándar (Unity/UE/Godot).',
      'Los assets deben ser originales o con licencia comercial.'
    ],
    access: 'TODO PÚBLICO',
    location: 'HUB POLO GAMING - Presencial/Virtual'
  },
  {
    id: '2',
    title: 'COPA HUB: VALORANT 5V5',
    date: '10 ENE',
    fullDate: '10 de Enero, 18:00 PM',
    category: 'ESPORTS',
    description: 'Torneo relámpago de Valorant para la comunidad riojana. Demuestra tu puntería en el mapa principal del Polo.',
    prizes: [
      'Bolsa de premios: 25.000 VP para el equipo ganador',
      'Trofeo Físico Polo Gaming',
      'Skins Exclusivas para el MVP'
    ],
    registration: 'CUPOS_LIMITADOS',
    clauses: [
      'Residencia comprobable en la provincia de La Rioja.',
      'Rango mínimo: Platino 1.',
      'Prohibido el uso de software de terceros (Anti-cheat activo).',
      'Inscripción gratuita pero requiere validación de identidad.'
    ],
    access: 'SÓLO PROFESIONALES',
    location: 'SALA PRO - POLO GAMING'
  },
  {
    id: '3',
    title: 'MASTERCLASS: OPTIMIZACIÓN GPU',
    date: '22 ENE',
    fullDate: '22 de Enero, 15:00 PM',
    category: 'WORKSHOP',
    description: 'Aprende a exprimir cada FPS de tu hardware con técnicas avanzadas de overclocking y configuración de drivers.',
    prizes: [
      'Sorteo de una GPU RTX 4060 entre los asistentes',
      'Certificado de asistencia avalado por el Polo Tecnológico',
      'Cupones de descuento en tiendas asociadas'
    ],
    registration: 'PRÓXIMAMENTE',
    clauses: [
      'Sin requisitos previos de conocimiento.',
      'Cupo presencial de 50 personas.',
      'Transmisión vía Twitch para todo público.',
      'Se requiere traer notebook para las prácticas.'
    ],
    access: 'TODO PÚBLICO',
    location: 'AUDITORIO CENTRAL'
  }
];

const EventsPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-cyber-black min-h-screen">
      {/* Header Estilo Terminal */}
      <div className="mb-20 border-l-8 border-primary pl-8 py-4">
        <h1 className="text-5xl md:text-8xl font-modern font-black tracking-tighter glow-text uppercase">
          Briefing de Misiones
        </h1>
        <p className="text-primary font-pixel text-[12px] mt-4 tracking-[0.4em] animate-pulse">
          SISTEMA DE EVENTOS Y COMPETENCIAS ONLINE. SELECCIONA TU OBJETIVO.
        </p>
      </div>

      {/* Grid de Eventos */}
      <div className="grid gap-10">
        {EVENTS_DATA.map(event => (
          <div 
            key={event.id} 
            className="group relative glass border-2 border-white/5 hover:border-primary/50 transition-all duration-500 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Fecha y Categoría */}
              <div className="md:w-72 bg-gradient-to-br from-primary to-red-900 p-10 flex flex-col items-center justify-center text-center">
                 <div className="px-3 py-1 bg-black/40 text-white font-pixel text-[8px] mb-4 border border-white/20">
                   {event.category}
                 </div>
                 <span className="text-5xl font-modern font-black text-white glow-text">{event.date.split(' ')[0]}</span>
                 <span className="text-xl font-modern font-bold text-white/80">{event.date.split(' ')[1]}</span>
                 <div className="mt-6 text-[8px] font-pixel text-black font-bold bg-white/90 px-2 py-1">
                   {event.access}
                 </div>
              </div>
              
              {/* Info Principal */}
              <div className="p-10 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <h3 className="text-3xl font-modern font-bold tracking-wider group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <div className={`px-4 py-2 text-[10px] font-pixel border-2 ${
                      event.registration === 'ABIERTA' ? 'border-green-500 text-green-500' :
                      event.registration === 'CUPOS_LIMITADOS' ? 'border-yellow-500 text-yellow-500' :
                      'border-primary text-primary'
                    }`}>
                      INSCRIPCIÓN: {event.registration}
                    </div>
                  </div>
                  <p className="text-white/50 font-body text-lg leading-relaxed mb-8 max-w-2xl">
                    {event.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-6 items-center border-t border-white/10 pt-8">
                  <div className="flex items-center gap-2 text-white/40 font-pixel text-[10px]">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    {event.location}
                  </div>
                  <button 
                    onClick={() => setSelectedEvent(event)}
                    className="ml-auto px-10 py-4 bg-primary text-white font-pixel text-[10px] hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(255,0,51,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                  >
                    VER DETALLES COMPLETOS
                  </button>
                </div>
              </div>
            </div>
            
            {/* Overlay decorativo de escaneo */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 bg-[linear-gradient(rgba(255,0,51,0.1)_1px,transparent_1px)] bg-[length:100%_4px] animate-scanline"></div>
          </div>
        ))}
      </div>

      {/* Modal de Detalles Estilo "Briefing" */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl animate-crt-on">
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto glass border-4 border-primary shadow-[0_0_50px_rgba(255,0,51,0.4)] flex flex-col custom-scrollbar">
            
            {/* Header Modal */}
            <div className="bg-primary p-6 flex items-center justify-between sticky top-0 z-10 border-b-4 border-black">
              <div className="flex items-center gap-4">
                 <span className="material-symbols-outlined text-white !text-3xl">assignment_late</span>
                 <h2 className="text-xl md:text-2xl font-modern font-black text-white tracking-widest uppercase">
                   {selectedEvent.title} // DATOS_MISIÓN
                 </h2>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="size-12 flex items-center justify-center hover:bg-black/20 text-white transition-colors"
              >
                <span className="material-symbols-outlined !text-4xl">close</span>
              </button>
            </div>

            <div className="p-8 md:p-16 grid lg:grid-cols-2 gap-16">
              {/* Columna Izquierda: Briefing & Premios */}
              <div className="space-y-12">
                <section>
                  <h4 className="text-primary font-pixel text-[12px] mb-6 flex items-center gap-2">
                    <span className="size-2 bg-primary"></span> OBJETIVO_GENERAL
                  </h4>
                  <p className="text-white/80 font-body text-xl leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </section>

                <section className="bg-white/5 p-8 border-l-4 border-primary">
                  <h4 className="text-primary font-pixel text-[12px] mb-8 uppercase tracking-widest">
                    Recompensas_De_Victoria
                  </h4>
                  <div className="space-y-6">
                    {selectedEvent.prizes.map((prize, i) => (
                      <div key={i} className="flex items-center gap-6 group/prize">
                        <div className="size-12 border-2 border-primary flex items-center justify-center font-pixel text-primary text-[10px] group-hover/prize:bg-primary group-hover/prize:text-white transition-colors">
                          0{i+1}
                        </div>
                        <span className="text-lg font-modern font-bold text-white tracking-wide">{prize}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Columna Derecha: Cláusulas e Inscripción */}
              <div className="space-y-12">
                <section className="glass border-white/10 p-8">
                  <h4 className="text-white font-pixel text-[12px] mb-8 border-b border-white/10 pb-4">
                    TÉRMINOS_Y_CONDICIONES
                  </h4>
                  <ul className="space-y-6">
                    {selectedEvent.clauses.map((clause, i) => (
                      <li key={i} className="flex gap-4 items-start text-white/60 font-body">
                        <span className="material-symbols-outlined text-primary !text-lg">verified_user</span>
                        <span className="text-base">{clause}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="p-8 border-4 border-white flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-pixel text-white/40">ESTADO DE INSCRIPCIÓN</span>
                    <span className="text-primary font-pixel text-[12px]">{selectedEvent.registration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-pixel text-white/40">FECHA LÍMITE</span>
                    <span className="text-white font-pixel text-[12px]">{selectedEvent.date}</span>
                  </div>
                  <button className="mt-4 w-full py-6 bg-primary text-white font-pixel text-[14px] hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(255,0,51,0.5)]">
                    INICIAR_SOLICITUD_DE_ACCESO
                  </button>
                  <p className="text-[8px] font-pixel text-white/30 text-center">
                    AL HACER CLIC ACEPTAS LAS CLÁUSULAS DE SEGURIDAD DEL POLO GAMING HUB.
                  </p>
                </div>
              </div>
            </div>

            {/* Decoración de fondo */}
            <div className="absolute bottom-0 right-0 p-10 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined !text-[200px] text-white">security</span>
            </div>
          </div>
        </div>
      )}

      {/* CTA Final */}
      <div className="mt-32 p-12 glass border-2 border-primary/20 text-center relative overflow-hidden group">
         <div className="relative z-10">
           <h2 className="text-3xl font-modern font-black mb-6 tracking-[0.2em] group-hover:text-primary transition-colors">¿QUIERES LANZAR TU PROPIO EVENTO?</h2>
           <p className="text-white/40 mb-10 max-w-xl mx-auto font-body text-lg">Si eres una organización o desarrollador local, puedes usar nuestra infraestructura para tus torneos o lanzamientos.</p>
           <button className="px-12 py-5 border-4 border-primary text-primary font-modern font-bold tracking-widest hover:bg-primary hover:text-white transition-all transform hover:skew-x-2">
             SOLICITAR_CANAL_DE_OPERACIÓN
           </button>
         </div>
         <div className="absolute inset-0 bg-primary/5 -skew-y-3 translate-y-20 group-hover:translate-y-0 transition-transform duration-700"></div>
      </div>
    </div>
  );
};

export default EventsPage;
