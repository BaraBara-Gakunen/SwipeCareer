import { NextRequest, NextResponse } from "next/server";
import { makeESDraft } from "./openAI";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const inputData = body.company || body.content;
    
    if (!inputData) {
      return NextResponse.json(
        { success: false, error: "No company data provided" },
        { status: 400 }
      );
    }

    const es = await makeESDraft(inputData);
    
    return NextResponse.json({ success: true, es });

  } catch (error) {
    if (error instanceof Error) {
      console.error("エラーメッセージ:", error.message);
      console.error("スタックトレース:", error.stack);
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}
