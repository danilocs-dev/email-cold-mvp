import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, subject, message } = body;

    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    // Simulação de IA melhorando o email
    const improvedMessage = `AI improved version:\n\n${message}`;

    // Simulação de envio de email
    console.log("Sending email to:", email);
    console.log("Subject:", subject);
    console.log("Message:", improvedMessage);

    return NextResponse.json({
      success: true,
      improvedMessage,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
