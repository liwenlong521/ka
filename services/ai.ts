import { GoogleGenAI } from "@google/genai";
import { AIAnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeFoodImage(base64Image: string): Promise<AIAnalysisResult> {
  // Remove data URL prefix if present for the API call
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: `Analyze this food image. Return a JSON object with the following fields:
            - foodName (string): A short, descriptive name of the dish (in Chinese if possible, or English).
            - portionSize (string): Estimated portion (e.g., "1 bowl", "200g").
            - calories (number): Estimated total calories.
            - protein (number): Estimated protein in grams.
            - carbs (number): Estimated carbohydrates in grams.
            - fat (number): Estimated fat in grams.
            - confidence (number): A number between 0 and 100 representing your confidence.
            
            Do not include Markdown formatting. Return only the JSON string.`
          }
        ]
      },
      config: {
        temperature: 0.4, // Lower temperature for more deterministic output
      }
    });

    const text = response.text || "{}";
    // Clean up any potential markdown code blocks provided by the model
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr) as AIAnalysisResult;
  } catch (error) {
    console.error("AI Analysis Failed:", error);
    // Return a fallback or throw error depending on how you want to handle UI
    throw new Error("Could not analyze image.");
  }
}