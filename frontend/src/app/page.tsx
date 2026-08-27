import Link from "next/link";
import {FeatureCardProps,StepProps} from "../types/home.type"

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="relative z-20 border-b border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-400/20 bg-rose-500/10 text-lg text-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.15)]">
              ✦
            </div>

            <div>
              <h1 className="text-lg font-semibold tracking-wide">
                Docu<span className="text-rose-400">AI</span>
              </h1>

              <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                Intelligent workspace
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-white/40 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm text-white/40 transition hover:text-white"
            >
              How it works
            </a>

            <a
              href="#about"
              className="text-sm text-white/40 transition hover:text-white"
            >
              About
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-2 text-sm text-white/50 transition hover:text-white sm:block"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_25px_rgba(244,63,94,0.18)] transition hover:bg-rose-400 hover:shadow-[0_0_35px_rgba(244,63,94,0.28)]"
            >
              Get started
            </Link>
          </div>

        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative">

        {/* Background Glows */}
        <div className="pointer-events-none absolute left-1/2 top-[-150px] h-[550px] w-[750px] -translate-x-1/2 rounded-full bg-rose-600/[0.09] blur-[140px]" />

        <div className="pointer-events-none absolute left-[-200px] top-[250px] h-[400px] w-[400px] rounded-full bg-pink-600/[0.04] blur-[120px]" />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-24 text-center sm:pt-32">

          {/* Badge */}
          <div className="mb-7 flex items-center gap-2 rounded-full border border-rose-400/15 bg-rose-500/[0.06] px-4 py-2 text-xs text-rose-300 shadow-[0_0_25px_rgba(244,63,94,0.06)]">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
            AI-powered document intelligence
          </div>

          {/* Heading */}
          <h2 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Your documents.
            <br />

            <span className="bg-gradient-to-r from-rose-300 via-rose-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(244,63,94,0.2)]">
              Your questions.
            </span>

            <br />

            Intelligent answers.
          </h2>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/40 sm:text-lg">
            Upload your documents and have a conversation with them.
            DocuAI uses AI to understand your files and give you
            relevant, context-aware answers.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">

            <Link
              href="/register"
              className="group flex items-center gap-2 rounded-xl bg-rose-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(244,63,94,0.2)] transition hover:bg-rose-400 hover:shadow-[0_0_45px_rgba(244,63,94,0.3)]"
            >
              Start chatting
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <a
              href="#how-it-works"
              className="rounded-xl border border-white/10 bg-white/[0.02] px-7 py-3.5 text-sm font-medium text-white/50 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
            >
              See how it works
            </a>

          </div>

          {/* Small Trust Text */}
          <div className="mt-8 flex items-center gap-5 text-[11px] text-white/20">
            <span>✦ No complicated setup</span>
            <span className="hidden sm:block">•</span>
            <span>⚡ Fast AI responses</span>
          </div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="relative border-t border-white/5 px-6 py-24"
      >

        <div className="mx-auto max-w-6xl">

          {/* Section Heading */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
              Powerful features
            </p>

            <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to{" "}
              <span className="text-rose-400">
                understand your documents.
              </span>
            </h3>

            <p className="mt-4 text-sm leading-6 text-white/35">
              Built to make working with long and complex documents
              faster and easier.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            <FeatureCard
              icon="◈"
              title="PDF Understanding"
              description="Upload your PDF and let AI understand its content."
            />

            <FeatureCard
              icon="✦"
              title="Context-Aware AI"
              description="Get answers based on the relevant information in your document."
            />

            <FeatureCard
              icon="⌁"
              title="Semantic Search"
              description="Find meaningful information instead of relying only on keywords."
            />

            <FeatureCard
              icon="◉"
              title="Secure Workspace"
              description="Keep your documents and conversations inside your account."
            />

          </div>

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how-it-works"
        className="relative border-t border-white/5 px-6 py-24"
      >

        <div className="mx-auto max-w-6xl">

          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
              Simple workflow
            </p>

            <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">
              How <span className="text-rose-400">DocuAI</span> works
            </h3>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-4">

            <Step
              number="01"
              title="Upload"
              description="Upload your PDF or supported document."
            />

            <Step
              number="02"
              title="Understand"
              description="AI processes and understands your document."
            />

            <Step
              number="03"
              title="Ask"
              description="Ask questions about anything inside your document."
            />

            <Step
              number="04"
              title="Answer"
              description="Receive relevant answers powered by AI."
            />

          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section
        id="about"
        className="relative border-t border-white/5 px-6 py-24"
      >

        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-rose-400/15 bg-rose-500/[0.04] px-6 py-16 text-center">

          <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[350px] w-[500px] -translate-x-1/2 rounded-full bg-rose-500/10 blur-[100px]" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-500/10 text-xl text-rose-400">
              ✦
            </div>

            <h3 className="mt-6 text-3xl font-semibold sm:text-4xl">
              Ready to talk to your documents?
            </h3>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-white/35">
              Create your free account and start asking questions
              about your documents with AI.
            </p>

            <Link
              href="/register"
              className="mt-8 inline-flex rounded-xl bg-rose-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(244,63,94,0.18)] transition hover:bg-rose-400 hover:shadow-[0_0_40px_rgba(244,63,94,0.28)]"
            >
              Get started →
            </Link>
          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/5 px-6 py-8">

        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">

          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 text-xs text-rose-400">
              ✦
            </div>

            <span className="text-sm font-medium">
              Docu<span className="text-rose-400">AI</span>
            </span>
          </div>

          <p className="text-[11px] text-white/20">
            © 2026 DocuAI. Intelligent document conversations.
          </p>

        </div>

      </footer>

    </main>
  );
}

/* ================= FEATURE CARD ================= */

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group rounded-2xl border border-white/7 bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-rose-400/20 hover:bg-rose-500/[0.03] hover:shadow-[0_15px_40px_rgba(244,63,94,0.06)]">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-rose-400/15 bg-rose-500/[0.06] text-lg text-rose-400 transition group-hover:shadow-[0_0_20px_rgba(244,63,94,0.12)]">
        {icon}
      </div>

      <h4 className="mt-5 text-sm font-semibold">
        {title}
      </h4>

      <p className="mt-2 text-xs leading-5 text-white/30">
        {description}
      </p>

    </div>
  );
}

/* ================= STEP ================= */

function Step({ number, title, description }: StepProps) {
  return (
    <div className="relative text-center md:text-left">

      <div className="text-4xl font-semibold tracking-tight text-rose-400/20">
        {number}
      </div>

      <h4 className="mt-3 text-base font-semibold">
        {title}
      </h4>

      <p className="mt-2 text-sm leading-6 text-white/30">
        {description}
      </p>

    </div>
  );
}