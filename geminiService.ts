
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

export const geminiService = {
  async getChatResponse(prompt: string, history: {role: 'user' | 'model', parts: {text: string}[]}[] = []) {
    // Initializing with process.env.API_KEY directly as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `Eres el "Arquitecto Senior" de Polo Gaming La Rioja. 
        Tu tono es moderno, profesional y entusiasta por el hardware de última generación. 
        Hablas español de manera clara pero técnica. 
        Ayudas a los usuarios a navegar el mercado actual de hardware y gaming.
        Al sugerir hardware, siempre incluye este bloque JSON al final:
        [BUILD_JSON]{"cpu": "Nombre", "gpu": "Nombre", "mb": "Nombre", "ram": "Nombre", "psu": "Nombre", "ssd": "Nombre"}[/BUILD_JSON]`,
        temperature: 0.7,
      },
    });
    return response.text;
  },

  async getMarketData() {
    // Initializing with process.env.API_KEY directly
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Actúa como un experto en hardware. Busca los 8 componentes de PC más populares y nuevos hoy. 
    Retorna un JSON array de objetos con: 
    "name" (string), 
    "priceUSD" (number), 
    "priceARS" (number), 
    "brand" (string), 
    "specs" (string resumido), 
    "status" (string: NEW, HOT o PRO),
    "sourceUrl" (string). 
    Base de datos: TechPowerUp, Amazon y Compragamer. 
    Responde SOLO el JSON.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
        },
      });
      
      // Using .text property directly
      return JSON.parse(response.text || "[]");
    } catch (error) {
      console.error("Market data fetch failed:", error);
      return [];
    }
  },

  // Added missing method to analyze images via Gemini 3 Flash
  async analyzeImage(prompt: string, base64Data: string, mimeType: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType } },
          { text: prompt }
        ]
      }
    });
    return response.text;
  },

  // Added missing method to analyze videos via Gemini 3 Flash
  async analyzeVideo(prompt: string, base64Data: string, mimeType: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType } },
          { text: prompt }
        ]
      }
    });
    return response.text;
  }
};
