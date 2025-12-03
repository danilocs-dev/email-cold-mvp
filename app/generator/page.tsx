"use client";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [resposta, setResposta] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResposta(null);
    setCopied(false);

    const form = e.target as HTMLFormElement;
    const data = {
      publico: form.publico.value,
      objetivo: form.objetivo.value,
      detalhes: form.detalhes.value,
      tamanho: form.tamanho.value,
    };

    const r = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await r.json();
    setResposta(json.email);
    setLoading(false);
  }

  function handleCopy() {
    if (!resposta) return;
    navigator.clipboard.writeText(resposta);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="bg-white max-w-md w-full rounded-xl shadow-lg p-8 border border-gray-200">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">EmailBot</h1>
        <p className="text-gray-600 mb-6">
          Generate professional emails ready to send — in seconds.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Who is the email for?
            </label>
            <input
              name="publico"
              className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Ex: small business owners, dentists..."
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              What is the goal of the email?
            </label>
            <input
              name="objetivo"
              className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Ex: offer my software, share a link..."
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Business details (type of company receiving the email)
            </label>
            <input
              name="detalhes"
              className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Ex: AI MVP development company"
            />
          </div>

          <div className="mb-20">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email length
            </label>
            <select
              name="tamanho"
              className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="curto"
            >
              <option value="curto">Short (45–70 words)</option>
              <option value="longo">Long (80–120 words)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg font-medium"
          >
            {loading ? "Generating..." : "Generate Email"}
          </button>
        </form>

        {resposta && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border text-gray-800 whitespace-pre-line">
            <h2 className="font-bold mb-2 text-gray-900">Generated email:</h2>
            <div className="mb-2">{resposta}</div>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
