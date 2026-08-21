"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function DocumentInfoPage() {
  const params = useParams();
  const documentId = params.id as string;

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* Background Glow */}
      <div className="pointer-events-none fixed left-1/2 top-[-200px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-rose-600/[0.07] blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-10">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">

          <div>
            <Link
              href="/dashboard"
              className="mb-4 inline-flex items-center gap-2 text-xs text-white/30 transition hover:text-rose-400"
            >
              ← Back to workspace
            </Link>

            <h1 className="text-2xl font-semibold tracking-tight">
              Document <span className="text-rose-400">Info</span>
            </h1>

            <p className="mt-2 text-sm text-white/30">
              View information about your uploaded document.
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-rose-400/20 bg-rose-500/10 text-xl text-rose-400">
            ◈
          </div>

        </div>

        {/* Main Card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/90 shadow-2xl backdrop-blur-xl">

          {/* Top Glow */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />

          <div className="p-6 sm:p-8">

            {/* Document Header */}
            <div className="flex flex-col gap-5 border-b border-white/5 pb-7 sm:flex-row sm:items-center">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-500/10 text-2xl text-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.12)]">
                PDF
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-medium">
                  Document name
                </h2>

                <p className="mt-1 truncate text-xs text-white/30">
                  document@example.pdf
                </p>
              </div>

              {/* Status */}
              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-400">
                Ready
              </div>

            </div>

            {/* Information Grid */}
            <div className="grid gap-4 pt-7 sm:grid-cols-2">

              <InfoCard
                label="File name"
                value="document@example.pdf"
              />

              <InfoCard
                label="File type"
                value="PDF Document"
              />

              <InfoCard
                label="File size"
                value="2.4 MB"
              />

              <InfoCard
                label="Status"
                value="Ready for chat"
              />

              <InfoCard
                label="Uploaded"
                value="21 Aug 2026"
              />

              <InfoCard
                label="Document ID"
                value={documentId}
              />

            </div>

            {/* Processing */}
            <div className="mt-7 rounded-xl border border-white/5 bg-white/[0.02] p-5">

              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">
                    AI Processing
                  </h3>

                  <p className="mt-1 text-xs text-white/30">
                    Your document is processed and ready for questions.
                  </p>
                </div>

                <span className="text-xs text-emerald-400">
                  ● Ready
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500" />
              </div>

            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              <Link
                href={`/dashboard?documentId=${documentId}`}
                className="flex flex-1 items-center justify-center rounded-xl bg-rose-500 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(244,63,94,0.15)] transition hover:bg-rose-400 hover:shadow-[0_0_35px_rgba(244,63,94,0.25)]"
              >
                Open conversation
              </Link>

              <button
                type="button"
                className="rounded-xl border border-white/10 bg-white/[0.02] px-6 py-3 text-sm text-white/50 transition hover:border-red-400/20 hover:bg-red-500/[0.05] hover:text-red-400"
              >
                Delete document
              </button>

            </div>

          </div>
        </div>

      </div>
    </main>
  );
}


/* ================= INFO CARD ================= */

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-rose-400/10 hover:bg-rose-500/[0.02]">

      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">
        {label}
      </p>

      <p className="mt-2 truncate text-sm text-white/70">
        {value}
      </p>

    </div>
  );
}