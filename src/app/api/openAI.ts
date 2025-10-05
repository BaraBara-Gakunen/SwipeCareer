import OpenAI from "openai";
import { MatchedCompany } from "@/types/types";
import { InstructionObject } from "./prompt";

export const makeESDraft = async (content: MatchedCompany): Promise<string> => {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, });
  
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: InstructionObject.content
    },
    {
      role: "user",
      content: InstructionObject.makePrompt(content).content
    }
  ];

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || "ES生成に失敗しました。";
};
