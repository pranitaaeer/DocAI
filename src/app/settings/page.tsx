"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const user = useAuthStore((state) => state.user);
    const fetchMe = useAuthStore((state) => state.fetchMe);

    useEffect(() => {
        fetchMe();
    }, [fetchMe]);

    return (
        <main className="min-h-screen bg-[#050505] text-white">

            {/* Background Glow */}
            <div className="pointer-events-none fixed left-1/2 top-[-200px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-rose-600/[0.06] blur-[140px]" />

            <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8">

                {/* Header */}
                <div className="mb-8 flex items-center gap-4">

                    <Link
                        href="/dashboard"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition hover:border-rose-400/30 hover:bg-rose-500/10 hover:text-rose-400"
                    >
                        ←
                    </Link>

                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Settings
                        </h1>

                        <p className="mt-1 text-sm text-white/30">
                            Manage your DocuAI workspace
                        </p>
                    </div>
                </div>

                {/* Settings Layout */}
                <div className="grid gap-6 md:grid-cols-[220px_1fr]">

                    {/* Sidebar */}
                    <aside className="h-fit rounded-2xl border border-white/10 bg-[#0a0a0a]/90 p-2">

                        <SettingsTab
                            active={activeTab === "profile"}
                            onClick={() => setActiveTab("profile")}
                            icon="◉"
                            label="Profile"
                        />

                        <SettingsTab
                            active={activeTab === "security"}
                            onClick={() => setActiveTab("security")}
                            icon="◇"
                            label="Security"
                        />

                        <SettingsTab
                            active={activeTab === "appearance"}
                            onClick={() => setActiveTab("appearance")}
                            icon="◐"
                            label="Appearance"
                        />

                        <SettingsTab
                            active={activeTab === "ai"}
                            onClick={() => setActiveTab("ai")}
                            icon="✦"
                            label="AI Preferences"
                        />

                        <div className="my-2 h-px bg-white/5" />

                        <SettingsTab
                            active={activeTab === "account"}
                            onClick={() => setActiveTab("account")}
                            icon="⚙"
                            label="Account"
                        />

                    </aside>

                    {/* Content */}
                    <section className="rounded-2xl border border-white/10 bg-[#0a0a0a]/90 p-6 shadow-2xl sm:p-8">

                        {activeTab === "profile" && (
                            <ProfileSettings />
                        )}

                        {activeTab === "security" && (
                            <SecuritySettings />
                        )}

                        {activeTab === "appearance" && (
                            <AppearanceSettings />
                        )}

                        {activeTab === "ai" && (
                            <AISettings />
                        )}

                        {activeTab === "account" && (
                            <AccountSettings />
                        )}

                    </section>

                </div>
            </div>
        </main>
    );



    /* ================= TAB ================= */

    function SettingsTab({
        active,
        onClick,
        icon,
        label,
    }: {
        active: boolean;
        onClick: () => void;
        icon: string;
        label: string;
    }) {
        return (
            <button
                onClick={onClick}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${active
                    ? "bg-rose-500/10 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.06)]"
                    : "text-white/40 hover:bg-white/[0.03] hover:text-white/70"
                    }`}
            >
                <span className="w-5 text-center">
                    {icon}
                </span>

                {label}
            </button>
        );
    }


    /* ================= PROFILE ================= */

    function ProfileSettings() {


        return (
            <div>

                <SectionHeader
                    title="Profile"
                    description="Manage your personal information."
                />

                {/* Avatar */}
                <div className="mb-8 flex items-center gap-5">

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

                    <div>
                        <button className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/60 transition hover:border-rose-400/30 hover:text-rose-400">
                            Change avatar
                        </button>

                        <p className="mt-2 text-[11px] text-white/20">
                            JPG, PNG or WEBP. Max 2MB.
                        </p>
                    </div>

                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                    <Input
                        label="Full name"
                        value={user?.name}
                    />

                    <Input
                        label="Email address"
                        value={user?.email}
                        disabled
                    />

                </div>

                <div className="mt-6 flex justify-end">

                    <button className="rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(244,63,94,0.15)] transition hover:bg-rose-400">
                        Save changes
                    </button>

                </div>

            </div>
        );
    }


    /* ================= SECURITY ================= */

    function SecuritySettings() {
        return (
            <div>

                <SectionHeader
                    title="Security"
                    description="Keep your account secure."
                />

                <div className="space-y-5">

                    <Input
                        label="Current password"
                        type="password"
                        placeholder="••••••••"
                    />

                    <Input
                        label="New password"
                        type="password"
                        placeholder="••••••••"
                    />

                    <Input
                        label="Confirm new password"
                        type="password"
                        placeholder="••••••••"
                    />

                </div>

                <div className="mt-6 flex justify-end">

                    <button className="rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-semibold transition hover:bg-rose-400">
                        Update password
                    </button>

                </div>

            </div>
        );
    }


    /* ================= APPEARANCE ================= */

    function AppearanceSettings() {
        return (
            <div>

                <SectionHeader
                    title="Appearance"
                    description="Customize how DocuAI looks."
                />

                <div>

                    <p className="mb-3 text-xs font-medium text-white/50">
                        Theme
                    </p>

                    <div className="grid gap-4 sm:grid-cols-3">

                        <ThemeCard
                            title="Dark"
                            active
                        />

                        <ThemeCard
                            title="System"
                        />

                        <ThemeCard
                            title="Light"
                        />

                    </div>

                </div>

            </div>
        );
    }


    /* ================= AI ================= */

    function AISettings() {
        return (
            <div>

                <SectionHeader
                    title="AI Preferences"
                    description="Configure how DocuAI answers your questions."
                />

                <div className="space-y-6">

                    <div>

                        <label className="mb-2 block text-xs font-medium text-white/50">
                            AI Model
                        </label>

                        <select className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-rose-400/40">
                            <option className="bg-[#0a0a0a]">
                                GPT-OSS 120B
                            </option>

                            <option className="bg-[#0a0a0a]">
                                GPT-OSS 20B
                            </option>
                        </select>

                    </div>

                    <div className="rounded-xl border border-rose-400/10 bg-rose-500/[0.03] p-4">

                        <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                                ✦
                            </div>

                            <div>
                                <p className="text-sm font-medium">
                                    Document-aware AI
                                </p>

                                <p className="mt-1 text-xs text-white/30">
                                    Answers are generated using relevant
                                    sections from your uploaded documents.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }


    /* ================= ACCOUNT ================= */

    function AccountSettings() {
        return (
            <div>

                <SectionHeader
                    title="Account"
                    description="Manage your account."
                />

                <div className="rounded-xl border border-red-500/10 bg-red-500/[0.03] p-5">

                    <h3 className="text-sm font-medium text-red-400">
                        Danger zone
                    </h3>

                    <p className="mt-1 text-xs text-white/30">
                        Deleting your account will permanently remove
                        your documents, chats and account data.
                    </p>

                    <button className="mt-4 rounded-xl border border-red-500/20 px-4 py-2.5 text-xs text-red-400 transition hover:bg-red-500/10">
                        Delete account
                    </button>

                </div>

            </div>
        );
    }


    /* ================= HELPERS ================= */

    function SectionHeader({
        title,
        description,
    }: {
        title: string;
        description: string;
    }) {
        return (
            <div className="mb-8 border-b border-white/5 pb-6">

                <h2 className="text-lg font-semibold">
                    {title}
                </h2>

                <p className="mt-1 text-sm text-white/30">
                    {description}
                </p>

            </div>
        );
    }


    function Input({
        label,
        value,
        type = "text",
        placeholder,
        disabled = false,
    }: {
        label: string;
        value?: string;
        type?: string;
        placeholder?: string;
        disabled?: boolean;
    }) {
        return (
            <div>

                <label className="mb-2 block text-xs font-medium text-white/50">
                    {label}
                </label>

                <input
                    type={type}
                    defaultValue={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-rose-400/40 focus:bg-rose-500/[0.03] disabled:cursor-not-allowed disabled:opacity-40"
                />

            </div>
        );
    }


    function ThemeCard({
        title,
        active = false,
    }: {
        title: string;
        active?: boolean;
    }) {
        return (
            <button
                className={`rounded-xl border p-4 text-left transition ${active
                    ? "border-rose-400/40 bg-rose-500/10 shadow-[0_0_25px_rgba(244,63,94,0.08)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
            >

                <div className="mb-3 h-20 rounded-lg border border-white/10 bg-[#050505]" />

                <p className="text-xs font-medium">
                    {title}
                </p>

            </button>
        );
    }
}