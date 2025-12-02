import { GoogleGenAI } from "@google/genai";
import { Category } from "../types";

// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateOfferDescription = async (
  storeName: string,
  category: Category,
  keywords: string
): Promise<string> => {
  try {
    const prompt = `
      Write a catchy, short marketing offer description in Arabic for a business named "${storeName}" in Baku.
      Category: ${category}.
      Key details to include: ${keywords}.
      Keep it under 30 words. Make it exciting for tourists.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || '';
  } catch (error) {
    console.error("Gemini generation error:", error);
    // Fallback description if API fails or key is missing
    return `عرض رائع من ${storeName} في قسم ${category}. تفضلوا بزيارتنا!`;
  }
};