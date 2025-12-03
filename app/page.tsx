"use client";

import Link from "next/link";

export default function Landing() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-10 border border-gray-200">
        
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Generate professional cold emails in seconds
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A simple tool that creates natural, human-sounding emails ready to send — no fluff, no generic templates.
          </p>

          <Link
            href="/generator"
            className="inline-block mt-8 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl font-medium transition"
          >
            Start now
          </Link>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
            <h3 className="font-semibold text-gray-900 mb-1">Fast</h3>
            <p className="text-sm text-gray-600">Generate a ready-to-send email in under 5 seconds.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
            <h3 className="font-semibold text-gray-900 mb-1">Professional</h3>
            <p className="text-sm text-gray-600">Human tone, direct, and never robotic.</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
            <h3 className="font-semibold text-gray-900 mb-1">Personalized</h3>
            <p className="text-sm text-gray-600">
              Emails based exactly on the goal and audience you provide.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-12">
          Experimental project — more tools coming soon.
        </p>
      </div>
    </main>
  );
}
