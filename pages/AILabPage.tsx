
import React, { useState } from 'react';
import { geminiService } from '../geminiService';

const AILabPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prompt, setPrompt] = useState('¿Qué puedes decirme sobre este contenido multimedia en el contexto del gaming?');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);
    }
  };

  const handleAnalyze = async () => {
    if (!file || !preview) return;
    setIsAnalyzing(true);
    setResult('');

    try {
      const base64Data = preview.split(',')[1];
      const mimeType = file.type;
      
      let response = "";
      if (mimeType.startsWith('image/')) {
        response = await geminiService.analyzeImage(prompt, base64Data, mimeType);
      } else if (mimeType.startsWith('video/')) {
        response = await geminiService.analyzeVideo(prompt, base64Data, mimeType);
      } else {
        response = "Tipo de archivo no soportado.";
      }
      
      setResult(response || "No se pudo obtener información.");
    } catch (e) {
      setResult("Error al analizar el archivo.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-black mb-4">Polo AI Lab</h1>
        <p className="text-slate-400">Sube imágenes de tus builds, capturas de pantalla o videos de gameplay para análisis profesional.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="glass border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:border-primary/50 transition-all">
            {preview ? (
              <div className="relative w-full">
                {file?.type.startsWith('video/') ? (
                  <video src={preview} controls className="w-full rounded-xl max-h-64 object-contain" />
                ) : (
                  <img src={preview} className="w-full rounded-xl max-h-64 object-contain" />
                )}
                <button 
                  onClick={() => { setFile(null); setPreview(null); }}
                  className="absolute -top-4 -right-4 size-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            ) : (
              <>
                <div className="size-16 bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-4 group-hover:text-primary transition-all">
                  <span className="material-symbols-outlined !text-[40px]">upload_file</span>
                </div>
                <p className="font-bold text-white mb-1">Haz clic para subir un archivo</p>
                <p className="text-xs text-slate-500">Imágenes (JPG, PNG) o Videos (MP4)</p>
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400">Instrucción para la IA</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full glass border-white/10 rounded-xl p-4 text-sm focus:ring-1 focus:ring-primary outline-none"
              rows={3}
            />
          </div>

          <button 
            onClick={handleAnalyze}
            disabled={!file || isAnalyzing}
            className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-xl transition-all disabled:opacity-30 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <div className="size-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                Analizando...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">analytics</span>
                Iniciar Análisis
              </>
            )}
          </button>
        </div>

        <div className="glass rounded-2xl p-8 flex flex-col min-h-[400px]">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
             <span className="material-symbols-outlined text-primary">terminal</span>
             <h2 className="font-bold uppercase tracking-widest text-sm">Resultado del Análisis</h2>
          </div>
          
          <div className="flex-1 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
            {result ? result : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600">
                <span className="material-symbols-outlined !text-[48px] mb-2">find_in_page</span>
                <p>Sube un archivo y haz clic en analizar para ver los resultados aquí.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AILabPage;
