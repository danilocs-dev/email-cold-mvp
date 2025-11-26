"use client";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [resposta, setResposta] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResposta(null);

    const form = e.target as HTMLFormElement;
    const data = {
      empresa: form.empresa.value,
      produto: form.produto.value,
      publico: form.publico.value,
    };

    const r = await fetch("/api/gerar-email", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const json = await r.json();
    setResposta(json.email);
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="bg-white max-w-md w-full rounded-xl shadow-lg p-8 border border-gray-200">
        
        <h1 className="text-2xl font-bold mb-4 text-gray-900">
          Gerador de Cold Email com IA
        </h1>

        <p className="text-gray-600 mb-6">
          Gere emails de prospecção prontos para enviar em segundos.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Nome da empresa
            </label>
            <input
                name="empresa"
                className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Ex: Loja XPTO"
              />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Seu produto ou serviço
            </label>
            <input
              name="produto"
              className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Ex: Automação de vendas"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Público-alvo do cliente
            </label>
            <input
              name="publico"
              className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Ex: Pequenas empresas"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg font-medium"
          >
            {loading ? "Gerando..." : "Gerar Email"}
          </button>
        </form>

        {resposta && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border text-gray-800 whitespace-pre-line">
            <h2 className="font-bold mb-2 text-gray-900">Email gerado:</h2>
            {resposta}
          </div>
        )}
      </div>
    </main>
  );
}
