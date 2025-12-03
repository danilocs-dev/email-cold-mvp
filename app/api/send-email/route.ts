import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { publico, objetivo, detalhes, tamanho } = await req.json();

    if (!publico || !objetivo || !detalhes || !tamanho) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const lengthInstruction =
      tamanho === "curto"
        ? "The email must be short (about 4–5 lines)."
        : "The email can be more detailed (about 6–8 lines), but still concise, natural, and easy to read.";

    const prompt = `
You are a professional copywriter who writes cold emails that sound like a real person reaching out for the first time.

Follow this structure exactly:

1. Start with a short, casual greeting — like “Hi, hope you're doing well” or “Hey, hope you're having a good day.”
2. Make a general observation about the audience, but keep it vague and universal. NO specific facts, NO assumptions, NO invented details.
3. Present the sender’s intention (the goal) as something simple and new to the recipient. Do NOT say they already use anything or already do anything.
4. End with a light, low-pressure invitation to check it out or take a look.
5. The email must sound human, simple, warm, and conversational — NOT robotic and NOT corporate.
6. Do NOT use placeholders like [name], [city], [company], etc.
7. Do NOT add benefits, features, descriptions, or information that is NOT explicitly written in the “goal” or “business details” fields.
8. NEVER make claims about the recipient. The “business details” describes only what type of business they are — NOT their achievements, quality, revenue, product stage, skills, growth, or any specifics.
9. Use ONLY the information provided.

${lengthInstruction}

Provided information:
- Audience: ${publico}
- Goal: ${objetivo}
- Business details of the recipient (third person): ${detalhes}

Generate a natural cold email strictly following all rules above and using ONLY the provided information.


`;

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a professional copywriter who writes natural, direct, human cold emails.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 250,
      temperature: 0.6,
    });

    return NextResponse.json({
      email: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { error: "Failed to generate email" },
      { status: 500 }
    );
  }
}
