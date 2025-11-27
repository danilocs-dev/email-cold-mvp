import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { publico, objetivo } = await req.json();

    if (!publico || !objetivo) {
      return NextResponse.json(
        { error: "Dados incompletos" },
        { status: 400 }
      );
    }

    const prompt = `
Gere um cold email simples, humano e direto (40–70 palavras).

Público: ${publico}
Objetivo: ${objetivo}

Regras:
- Apenas 1 email.
- Sem listas.
- Sem múltiplas versões.
- Não explique nada.
- Não invente nomes.
- Tom humano, sem exagero, sem jargão.
- Apenas o texto do email.
`;

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "Você é um copywriter profissional. Gere cold emails realistas e diretos." },
        { role: "user", content: prompt }
      ],
      max_tokens: 200,
      temperature: 0.6,
    });

    return NextResponse.json({
      email: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("ERRO API:", error);
    return NextResponse.json(
      { error: "Erro ao gerar o email" },
      { status: 500 }
    );
  }
}
