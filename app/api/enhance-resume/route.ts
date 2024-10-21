import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@clerk/nextjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a professional resume writer. Enhance the given resume to make it more appealing to employers. Improve the language, structure, and content without adding false information.",
        },
        { role: "user", content: `Enhance the following resume:\n\n${prompt}` },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const enhancedResume = completion.choices[0].message.content;

    if (!enhancedResume) {
      throw new Error("No result returned from AI");
    }

    return NextResponse.json({ result: enhancedResume });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to enhance resume. Please try again later." },
      { status: 500 },
    );
  }
}
