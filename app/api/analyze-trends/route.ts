import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { marketData } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Given the following market trends for a crop:
      ${JSON.stringify(marketData)}
      Suggest the best time to sell for maximum profit.
    `;

    const result = await model.generateContent(prompt);
    const advice = result.response.text();

    return NextResponse.json({ advice });
  } catch (error) {
    return NextResponse.json({ error: "AI analysis failed" }, { status: 500 });
  }
}
