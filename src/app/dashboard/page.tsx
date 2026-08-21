"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function Dashboard() {
    const [message, setMessage] = useState("");
    const user = useAuthStore((state) => state.user);
    const fetchMe = useAuthStore((state) => state.fetchMe);

    useEffect(() => {
        fetchMe();
    }, [fetchMe]);

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <div className="flex min-h-screen">

                {/* ================= SIDEBAR ================= */}
                <aside className="hidden w-[270px] flex-col border-r border-rose-500/10 bg-[#080808] md:flex">

                    {/* Logo */}
                    <div className="flex items-center gap-3 border-b border-white/5 px-6 py-5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.18)]">
                            ✦
                        </div>

                        <div>
                            <h1 className="text-[16px] font-semibold tracking-wide">
                                Docu<span className="text-rose-400">AI</span>
                            </h1>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                                Intelligent workspace
                            </p>
                        </div>
                    </div>

                    {/* New Chat */}
                    <Link
                        href="/dashboard"
                        className="group flex w-full items-center justify-center gap-2 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-300 transition hover:border-rose-400/40 hover:bg-rose-500/15 hover:shadow-[0_0_25px_rgba(244,63,94,0.12)]"
                    >
                        <span className="text-lg">+</span>
                        New conversation
                    </Link>

                    {/* Documents */}
                    <div className="flex-1 px-4 pt-8">

                        <div className="mb-3 flex items-center justify-between px-2">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                                Your documents
                            </p>

                            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/30">
                                0
                            </span>
                        </div>

                        <div className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center">
                            <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/30">
                                ◈
                            </div>

                            <p className="text-xs text-white/40">
                                No documents yet
                            </p>

                            <p className="mt-1 text-[10px] text-white/20">
                                Upload a PDF to get started
                            </p>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="border-t border-white/5 p-4">
                        <div className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-white/[0.03]">

                            {/* Avatar */}
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name || "User"}
                                    className="h-9 w-9 rounded-full object-cover"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-600 text-sm font-semibold">
                                    {user?.name?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}

                            {/* User Info */}
                            <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm font-medium text-white">
                                    {user?.name || "User"}
                                </p>

                                <p className="truncate text-[11px] text-white/30">
                                    {user?.email || "Personal workspace"}
                                </p>
                            </div>

                            <span className="cursor-pointer text-white/20 transition hover:text-white/50">
                                •••
                            </span>

                        </div>
                    </div>
                </aside>

                {/* ================= MAIN ================= */}
                <section className="relative flex min-w-0 flex-1 flex-col overflow-hidden">

                    {/* Background Glow */}
                    <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-rose-600/10 blur-[120px]" />

                    {/* Header */}
                    <header className="relative flex items-center justify-between border-b border-white/5 px-6 py-4">

                        <div className="flex items-center gap-3">
                            <button className="rounded-lg p-2 text-white/40 transition hover:bg-white/5 hover:text-white md:hidden">
                                ☰
                            </button>

                            <div>
                                <p className="text-sm font-medium">
                                    New conversation
                                </p>
                                <p className="text-[11px] text-white/30">
                                    Ask questions about your document
                                </p>
                            </div>
                        </div>

                        <button className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/50 transition hover:border-rose-400/20 hover:text-rose-300">
                            Settings
                        </button>
                    </header>

                    {/* ================= EMPTY STATE ================= */}
                    <div className="relative flex flex-1 flex-col items-center justify-center px-6">

                        {/* Icon */}
                        <div className="relative mb-7">

                            <div className="absolute inset-0 rounded-3xl bg-rose-500/20 blur-2xl" />

                            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-rose-400/20 bg-[#0c0c0c] text-3xl text-rose-400 shadow-[0_0_45px_rgba(244,63,94,0.12)]">
                                ✦
                            </div>
                        </div>

                        <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
                            Chat with your{" "}
                            <span className="text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.35)]">
                                documents
                            </span>
                        </h2>

                        <p className="mt-3 max-w-lg text-center text-sm leading-6 text-white/40">
                            Upload a PDF and let AI understand its content.
                            Ask questions, find information and get intelligent answers.
                        </p>

                        {/* Upload Card */}
                        <div className="group relative mt-9 w-full max-w-[520px]">

                            {/* Glow */}
                            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-rose-500/30 via-pink-500/10 to-rose-500/30 opacity-60 blur-sm transition group-hover:opacity-100" />

                            <div className="relative rounded-2xl border border-rose-500/20 bg-[#0a0a0a] p-8 text-center">

                                {/* Upload Icon */}
                                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-500/5 text-2xl text-rose-400">
                                    ↑
                                </div>

                                <h3 className="text-base font-medium">
                                    Upload your PDF
                                </h3>

                                <p className="mt-2 text-xs text-white/30">
                                    Drag & drop your document here or browse from your device
                                </p>

                                <button className="mt-6 rounded-xl bg-rose-500 px-6 py-3 text-sm font-medium text-white shadow-[0_0_25px_rgba(244,63,94,0.18)] transition hover:bg-rose-400 hover:shadow-[0_0_35px_rgba(244,63,94,0.28)]">
                                    Choose PDF
                                </button>

                                <p className="mt-4 text-[10px] text-white/20">
                                    PDF only • Maximum size 10MB
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* ================= INPUT ================= */}
                    <div className="relative border-t border-white/5 bg-[#050505] px-4 py-4 sm:px-6">

                        <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-white/10 bg-[#0b0b0b] px-4 py-2 transition focus-within:border-rose-400/30 focus-within:shadow-[0_0_30px_rgba(244,63,94,0.07)]">

                            <button className="text-lg text-white/30 transition hover:text-rose-400">
                                +
                            </button>

                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Ask anything about your document..."
                                className="flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/25"
                            />

                            <button
                                disabled={!message.trim()}
                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500 text-sm text-white shadow-[0_0_18px_rgba(244,63,94,0.15)] transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-20"
                            >
                                ↑
                            </button>

                        </div>

                        <p className="mt-2 text-center text-[10px] text-white/15">
                            AI can make mistakes. Verify important information.
                        </p>

                    </div>

                </section>
            </div>
        </main>
    );
}

