import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { publico, objetivo, detalhes, tamanho } = await req.json();

    if (!publico || !objetivo || !detalhes || !tamanho) {
      return NextResponse.json(
        { error: "Dados incompletos" },
        { status: 400 }
      );
    }

    const instrucoesTamanho =
      tamanho === "curto"
        ? "O email deve ter no máximo 4–5 linhas."
        : "O email pode ser um pouco mais detalhado, com 6–8 linhas, mas ainda direto e natural.";

    const prompt = `
Você é um copywriter que escreve cold emails como se fosse alguém real contatando uma empresa ou pessoa pela primeira vez.

Use este padrão:

1. Saudação curta e pessoal, sem formalidade — tipo “Oi, tudo bem?” ou “Olá, tudo bem?”.
2. Faça uma observação sobre o público de forma genérica, **sem inventar nada sobre eles**.
3. Apresente a sua proposta **como novidade para o público**, mostrando o que você oferece. Não diga que eles já têm algo.
4. Termine com um convite leve para conhecer ou testar.
5. O email deve ser humano, natural, sem jargões e sem promessas exageradas.
6. Não use placeholders como [nome], [bairro], [cidade], nem dados fictícios.
7. Não adicione serviços, funcionalidades ou ofertas que NÃO estejam explicitamente descritas no objetivo OU nos detalhes. Se a informação não estiver exatamente nos campos enviados, não invente, não expanda e não adicione nada.


${instrucoesTamanho}

Informações fornecidas:
- Público: ${publico}
- Objetivo: ${objetivo}
- Detalhes sobre o negócio do destinatário (em terceira pessoa): ${detalhes}

Gere um cold email seguindo estritamente esse padrão e usando apenas as informações fornecidas.
`;

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "Você é um copywriter profissional. Gere cold emails naturais, humanos e diretos.",
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
    console.error("ERRO API:", error);
    return NextResponse.json(
      { error: "Erro ao gerar o email" },
      { status: 500 }
    );
  }
}
