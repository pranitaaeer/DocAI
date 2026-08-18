"use client";

import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="flex min-h-screen">

        {/* ================= SIDEBAR ================= */}
        <aside className="hidden w-[270px] flex-col border-r border-white/5 bg-[#080808] md:flex">

          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-white/5 px-6 py-5">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-400/20 bg-rose-500/10 text-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.15)]">
              ✦
            </div>

            <div>
              <h1 className="text-[16px] font-semibold tracking-wide">
                Docu<span className="text-rose-400">AI</span>
              </h1>

              <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                Intelligent workspace
              </p>
            </div>

          </div>

          {/* New Chat */}
          <div className="px-4 pt-5">

            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-300 transition hover:border-rose-400/40 hover:bg-rose-500/15 hover:shadow-[0_0_25px_rgba(244,63,94,0.12)]">

              <span className="text-lg">
                +
              </span>

              New conversation

            </button>

          </div>

          {/* Documents */}
          <div className="flex-1 px-4 pt-8">

            <div className="mb-3 flex items-center justify-between px-2">

              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                Your documents
              </p>

              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/30">
                2
              </span>

            </div>

            {/* Active Document */}
            <button className="mb-2 flex w-full items-center gap-3 rounded-xl border border-rose-400/15 bg-rose-500/[0.06] px-3 py-3 text-left transition hover:bg-rose-500/[0.09]">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-sm text-rose-400">
                ◈
              </div>

              <div className="min-w-0 flex-1">

                <p className="truncate text-xs font-medium text-white/80">
                  Resume.pdf
                </p>

                <p className="mt-1 text-[10px] text-white/25">
                  2.4 MB
                </p>

              </div>

            </button>

            {/* Second Document */}
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-white/[0.03]">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-sm text-white/30">
                ◈
              </div>

              <div className="min-w-0 flex-1">

                <p className="truncate text-xs font-medium text-white/50">
                  Project-notes.pdf
                </p>

                <p className="mt-1 text-[10px] text-white/20">
                  1.1 MB
                </p>

              </div>

            </button>

          </div>

          {/* User */}
          <div className="border-t border-white/5 p-4">

            <div className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-white/[0.03]">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-600 text-sm font-semibold">
                U
              </div>

              <div className="min-w-0 flex-1">

                <p className="truncate text-sm font-medium">
                  User
                </p>

                <p className="truncate text-[11px] text-white/30">
                  Personal workspace
                </p>

              </div>

              <button className="text-white/20 transition hover:text-white/60">
                •••
              </button>

            </div>

          </div>

        </aside>

        {/* ================= MAIN ================= */}
        <section className="relative flex min-w-0 flex-1 flex-col">

          {/* Background Glow */}
          <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-rose-600/[0.07] blur-[130px]" />

          {/* Header */}
          <header className="relative flex items-center justify-between border-b border-white/5 px-5 py-4 sm:px-7">

            <div className="flex min-w-0 items-center gap-3">

              <button className="rounded-lg p-2 text-white/40 transition hover:bg-white/5 hover:text-white md:hidden">
                ☰
              </button>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                ◈
              </div>

              <div className="min-w-0">

                <h2 className="truncate text-sm font-medium">
                  Resume.pdf
                </h2>

                <p className="text-[10px] text-white/25">
                  Document ready
                </p>

              </div>

            </div>

            <button className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-white/40 transition hover:border-rose-400/20 hover:text-rose-300">
              Document info
            </button>

          </header>

          {/* ================= CHAT ================= */}
          <div className="relative flex-1 overflow-y-auto px-4 py-8 sm:px-8">

            <div className="mx-auto max-w-3xl">

              {/* Welcome */}
              <div className="mb-12 flex flex-col items-center text-center">

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-500/10 text-xl text-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.12)]">
                  ✦
                </div>

                <h3 className="text-xl font-semibold">
                  Ask about your document
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-white/30">
                  Ask questions about Resume.pdf and get answers
                  based on its content.
                </p>

              </div>

              {/* User Message */}
              <div className="mb-7 flex justify-end">

                <div className="max-w-[80%] rounded-2xl rounded-br-md bg-rose-500 px-4 py-3 text-sm leading-6 text-white shadow-[0_0_25px_rgba(244,63,94,0.08)]">
                  What are the main technical skills mentioned in this resume?
                </div>

              </div>

              {/* AI Message */}
              <div className="mb-8 flex items-start gap-3">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-rose-400/15 bg-rose-500/10 text-sm text-rose-400">
                  ✦
                </div>

                <div className="max-w-[80%] rounded-2xl rounded-tl-md border border-white/7 bg-white/[0.025] px-4 py-4">

                  <p className="text-sm leading-7 text-white/65">
                    Based on the uploaded resume, the main technical
                    skills include Python, JavaScript, React.js, Flask,
                    REST APIs, Generative AI, Large Language Models,
                    PyTorch, CNN, LSTM, MongoDB and MySQL.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ================= INPUT ================= */}
          <div className="relative border-t border-white/5 bg-[#050505] px-4 py-4 sm:px-6">

            <div className="mx-auto max-w-3xl">

              <div className="flex items-end gap-3 rounded-2xl border border-white/10 bg-[#0b0b0b] px-4 py-2 transition focus-within:border-rose-400/30 focus-within:shadow-[0_0_30px_rgba(244,63,94,0.07)]">

                <button className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg text-white/30 transition hover:bg-white/5 hover:text-rose-400">
                  +
                </button>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={1}
                  placeholder="Ask anything about your document..."
                  className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent py-2.5 text-sm leading-5 text-white outline-none placeholder:text-white/25"
                />

                <button
                  disabled={!message.trim()}
                  className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500 text-sm text-white shadow-[0_0_18px_rgba(244,63,94,0.15)] transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-20"
                >
                  ↑
                </button>

              </div>

              <p className="mt-2 text-center text-[10px] text-white/15">
                AI responses are based on the uploaded document.
              </p>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}