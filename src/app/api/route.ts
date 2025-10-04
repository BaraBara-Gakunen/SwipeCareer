import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  const content = await req.json();
  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY,
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: content.content,
    config: {
      temperature: 0.7,
    }
  });

  return NextResponse.json({ text: response.text });
}
