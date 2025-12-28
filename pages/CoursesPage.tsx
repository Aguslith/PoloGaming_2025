
import React from 'react';

const COURSES = [
  { id: 1, title: 'Dominando Unreal Engine 5', instructor: 'Alex Chen', price: '$89', image: 'https://picsum.photos/seed/course1/400/250', tag: 'Desarrollo' },
  { id: 2, title: 'Optimización de C++ para Gaming', instructor: 'Marta Ruiz', price: '$120', image: 'https://picsum.photos/seed/course2/400/250', tag: 'Programación' },
  { id: 3, title: 'Diseño de Niveles AAA', instructor: 'Jean Luc', price: '$75', image: 'https://picsum.photos/seed/course3/400/250', tag: 'Diseño' },
  { id: 4, title: 'Gestión de Equipos Esports', instructor: 'David Pro', price: '$55', image: 'https://picsum.photos/seed/course4/400/250', tag: 'Negocios' },
  { id: 5, title: 'VFX con Houdini', instructor: 'Sara Smith', price: '$110', image: 'https://picsum.photos/seed/course5/400/250', tag: 'Arte' },
  { id: 6, title: 'Sistemas de Combate IA', instructor: 'Tom Hardy', price: '$95', image: 'https://picsum.photos/seed/course6/400/250', tag: 'IA' },
];

const CoursesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-2">Catálogo de Cursos</h1>
        <p className="text-slate-400">Mejora tus habilidades con formación de élite.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURSES.map(course => (
          <div key={course.id} className="glass rounded-2xl overflow-hidden group border border-white/5 hover:border-primary/30 transition-all flex flex-col">
            <div className="relative h-48 overflow-hidden">
               <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={course.title} />
               <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase rounded-lg shadow-lg">
                    {course.tag}
                  </span>
               </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
               <h3 className="text-xl font-bold mb-2">{course.title}</h3>
               <p className="text-xs text-slate-500 mb-6 flex items-center gap-2">
                 <span className="material-symbols-outlined text-sm">person</span> {course.instructor}
               </p>
               
               <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                 <span className="text-2xl font-black text-white">{course.price}</span>
                 <button className="px-5 py-2 bg-white/5 hover:bg-primary text-white text-sm font-bold rounded-lg transition-all border border-white/10">
                   Ver Curso
                 </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
