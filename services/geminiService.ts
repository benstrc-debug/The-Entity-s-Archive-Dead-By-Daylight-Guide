
import { GoogleGenAI, Type } from "@google/genai";
import { PerkDetails, PerkCategory } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getPerkDeepDive(perkName: string): Promise<Partial<PerkDetails>> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the Dead by Daylight perk: "${perkName}". Provide extremely detailed technical information including hidden mechanics, frame data if applicable, synergies, and a situational quiz.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hiddenMechanics: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Deep technical details or hidden stats not in the game description."
          },
          usageSteps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Step-by-step guide to mastering the perk."
          },
          bestCaseScenario: {
            type: Type.STRING,
            description: "The ideal moment to use this perk."
          },
          untoldTips: {
            type: Type.STRING,
            description: "Pro-tips that the game doesn't tell you."
          },
          quiz: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctIndex: { type: Type.NUMBER },
                explanation: { type: Type.STRING }
              },
              required: ["question", "options", "correctIndex", "explanation"]
            }
          }
        },
        required: ["hiddenMechanics", "usageSteps", "bestCaseScenario", "untoldTips", "quiz"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return {};
  }
}
