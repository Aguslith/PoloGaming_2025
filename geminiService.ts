
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

export const geminiService = {
  // Chatbot de consejos - Mantiene el tono Riojano solicitado
  async getChatResponse(prompt: string, history: {role: 'user' | 'model', parts: {text: string}[]}[] = []) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `Sos el "Arquitecto de Hardware" del Polo Tecnológico La Rioja. 
        MANDATORIO: Hablá siempre como un riojano de pura cepa (meta, chuña, chango, vinito, caluroso, chaya). 
        Solo usá este tono para dar consejos de hardware y responder dudas. 
        Si el usuario sugiere hardware, incluí al final el bloque JSON:
        [BUILD_JSON]{"cpu": "Nombre", "gpu": "Nombre", "mb": "Nombre", "ram": "Nombre", "psu": "Nombre", "ssd": "Nombre", "monitor": "Nombre", "peripherals": "Nombre"}[/BUILD_JSON]`,
        temperature: 0.9,
      },
    });
    return response.text;
  },

  // Análisis de compatibilidad - Tono Riojano
  async getCompatibilityAdvice(parts: any) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Analizame esta build chango, decime si va a andar bien o si es un desastre:
    CPU: ${parts.cpu}
    GPU: ${parts.gpu}
    Mother: ${parts.mb}
    RAM: ${parts.ram}
    Fuente: ${parts.psu}
    Disco: ${parts.ssd}
    Monitor: ${parts.monitor}
    Periféricos: ${parts.peripherals}
    
    Usá metáforas riojanas para explicar cuellos de botella.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
    return response.text;
  },

  // Mercado - Tono Técnico y Rápido (Flash)
  async getMarketData() {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Generame una lista MASIVA de 40 componentes de PC. 
    REQUISITO: Mezclá hardware legendario antiguo (2010-2020) con lo más nuevo (2024-2025). 
    Incluí: CPUs, GPUs, Motherboards, RAMs, PSUs, SSDs, Monitores y Periféricos (Teclados/Mouse).
    Fuentes: amazon.com, hardgamers.com.ar, fullh4rd.com.ar.
    Retorná un JSON array de objetos con: 
    "name", "priceUSD", "priceARS", "brand", "specs" (resumen corto), "status" (NEW, CLASSIC, SALE, LEGENDARY), "sourceUrl", 
    "category" (cpu, gpu, motherboard, ram, psu, storage, monitor, peripheral), 
    "tier" (alta, media, baja). 
    Respondé SOLO el JSON. NO USES TONO RIOJANO AQUÍ, SÉ TÉCNICO Y RÁPIDO.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
        },
      });
      return JSON.parse(response.text || "[]");
    } catch (error) {
      console.error("Market data fetch failed:", error);
      return [];
    }
  },

  async searchComponent(query: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Buscame específicamente "${query}" en tiendas reales. 
    Retorná JSON con: "name", "priceUSD", "priceARS", "brand", "specs", "sourceUrl", "category", "tier".
    Respondé SOLO el JSON. Rápido.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
        },
      });
      return JSON.parse(response.text || "{}");
    } catch (e) {
      return null;
    }
  },

  async getHardwareTiers() {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Dame una matriz de hardware en 3 niveles (Alta, Media, Baja). 
    Incluí: "cpu", "gpu", "mb", "psu", "storage", "monitor".
    Respondé SOLO el JSON técnico estructurado.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
        },
      });
      return JSON.parse(response.text || "{}");
    } catch (e) {
      return null;
    }
  },

  // Análisis de imagen - Tono Riojano
  async analyzeImage(prompt: string, base64: string, mimeType: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [{ inlineData: { data: base64, mimeType } }, { text: prompt + " (Respondé como riojano)" }],
      },
    });
    return response.text;
  },

  // Análisis de video - Tono Riojano
  async analyzeVideo(prompt: string, base64: string, mimeType: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [{ inlineData: { data: base64, mimeType } }, { text: prompt + " (Respondé como riojano)" }],
      },
    });
    return response.text;
  }
};
