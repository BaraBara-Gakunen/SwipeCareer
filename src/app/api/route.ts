// if you want to test with mock data, 
// uncomment the import below and the relevant line in the POST function

import { NextRequest, NextResponse } from "next/server";
import { makeESDraft } from "./gemini";
// import { mockMatchedCompany } from "./mockObject";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const inputData = await req.json().then((data) => data.content);
    // const inputData = mockMatchedCompany;

    const es = await makeESDraft(inputData);
    console.debug("Generated ES: \r\n====================", es, "\r\n====================\r\n");
    return NextResponse.json({ success: true, es });

  } catch (error) {
    console.debug("Error in API route:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}
