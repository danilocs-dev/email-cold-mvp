"use client";

import Link from "next/link";

export default function Landing() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-10 border border-gray-200">
        
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Gere cold emails profissionais em segundos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Uma ferramenta simples que cria emails naturais, humanos e prontos para enviar — sem enrolação, sem copiar templates prontos.
          </p>

          <Link
            href="/generator"
            className="inline-block mt-8 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl font-medium transition"
          >
            Começar agora
          </Link>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
            <h3 className="font-semibold text-gray-900 mb-1">Rápido</h3>
            <p className="text-sm text-gray-600">Gere um email pronto em menos de 5 segundos.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
            <h3 className="font-semibold text-gray-900 mb-1">Profissional</h3>
            <p className="text-sm text-gray-600">Texto humano, direto e sem parecer robótico.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
            <h3 className="font-semibold text-gray-900 mb-1">Personalizado</h3>
            <p className="text-sm text-gray-600">Email baseado exatamente no objetivo e público que você enviar.</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-12">
          Projeto experimental — mais ferramentas em breve.
        </p>
      </div>
    </main>
  );
}
    