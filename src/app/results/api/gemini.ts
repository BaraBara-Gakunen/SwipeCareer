import { GoogleGenAI } from "@google/genai";
import { makePrompt, Instruction } from "./prompt";
import { MatchedCompany } from "@/types/types";


export const makeESDraft = async (content: MatchedCompany): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY, });

  const response = await ai.models.generateContent
  ({
    model: "gemini-2.5-flash",
    contents: makePrompt(content),
    config: {
      thinkingConfig: { includeThoughts: false },
      temperature: 0.6,
      systemInstruction: Instruction,
    }
  });
  return response.text ? response.text : "";
};
