"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast"; 

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const user = useAuthStore((state) => state.user);
    const fetchMe = useAuthStore((state) => state.fetchMe);
    const changePassword = useAuthStore((state) => state.changePassword);
    const changeAvatar = useAuthStore((state) => state.changeAvatar);

    // Profile Form State
    const [name, setName] = useState(user?.name || "");

    // Security Form State
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // File input ref for avatar
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchMe();
    }, [fetchMe]);

    useEffect(() => {
        if (user?.name) setName(user.name);
    }, [user]);

    // Avatar Change Handler
    const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate file type
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPG, PNG or WEBP images are allowed.");
        e.target.value = "";
        return;
    }

    // Max 2MB
    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
        toast.error("Image size must be less than 2MB.");
        e.target.value = "";
        return;
    }

    try {
        await changeAvatar(file);

        toast.success("Avatar updated successfully!");
    } catch (error: any) {
        console.error("Avatar upload error:", error);

        toast.error(
            error?.response?.data?.message ||
            "Failed to update avatar"
        );
    } finally {
        // Same file ko dobara select karne ki permission
        e.target.value = "";
    }
};

    // Password Change Handler
    const handlePasswordUpdate = async () => {
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        try {
            await changePassword({ currentPassword, newPassword });
            alert("Password updated successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            alert(error?.response?.data?.message || "Failed to update password");
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white">
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
                        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
                        <p className="mt-1 text-sm text-white/30">Manage your DocuAI workspace</p>
                    </div>
                </div>

                {/* Settings Layout */}
                <div className="grid gap-6 md:grid-cols-[220px_1fr]">
                    {/* Sidebar */}
                    <aside className="h-fit rounded-2xl border border-white/10 bg-[#0a0a0a]/90 p-2">
                        <SettingsTab active={activeTab === "profile"} onClick={() => setActiveTab("profile")} icon="◉" label="Profile" />
                        <SettingsTab active={activeTab === "security"} onClick={() => setActiveTab("security")} icon="◇" label="Security" />
                        <SettingsTab active={activeTab === "appearance"} onClick={() => setActiveTab("appearance")} icon="◐" label="Appearance" />
                        <SettingsTab active={activeTab === "ai"} onClick={() => setActiveTab("ai")} icon="✦" label="AI Preferences" />
                        <div className="my-2 h-px bg-white/5" />
                        <SettingsTab active={activeTab === "account"} onClick={() => setActiveTab("account")} icon="⚙" label="Account" />
                    </aside>

                    {/* Content Section */}
                    <section className="rounded-2xl border border-white/10 bg-[#0a0a0a]/90 p-6 shadow-2xl sm:p-8">
                        {activeTab === "profile" && <ProfileSettings />}
                        {activeTab === "security" && <SecuritySettings />}
                        {activeTab === "appearance" && <AppearanceSettings />}
                        {activeTab === "ai" && <AISettings />}
                        {activeTab === "account" && <AccountSettings />}
                    </section>
                </div>
            </div>
        </main>
    );

    function SettingsTab({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: string; label: string }) {
        return (
            <button
                onClick={onClick}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                    active ? "bg-rose-500/10 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.06)]" : "text-white/40 hover:bg-white/[0.03] hover:text-white/70"
                }`}
            >
                <span className="w-5 text-center">{icon}</span>
                {label}
            </button>
        );
    }

    function ProfileSettings() {
    const isLoading = useAuthStore((state) => state.isLoading);

    return (
        <div>
            <SectionHeader
                title="Profile"
                description="Manage your personal information."
            />

            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
            />

            {/* Avatar */}
            <div className="mb-8 flex items-center gap-5">
                {user?.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.name || "User"}
                        className="h-16 w-16 rounded-full object-cover border border-white/10"
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-600 text-lg font-semibold">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                )}

                <div>
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={() => fileInputRef.current?.click()}
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/60 transition hover:border-rose-400/30 hover:text-rose-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? "Uploading..." : "Change avatar"}
                    </button>

                    <p className="mt-2 text-[11px] text-white/20">
                        JPG, PNG or WEBP. Max 2MB.
                    </p>
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-xs font-medium text-white/50">
                        Full name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400/40"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-xs font-medium text-white/50">
                        Email address
                    </label>

                    <input
                        type="text"
                        value={user?.email || ""}
                        disabled
                        className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none opacity-40"
                    />
                </div>
            </div>
        </div>
    );
}

    function SecuritySettings() {
        return (
            <div>
                <SectionHeader title="Security" description="Keep your account secure." />

                <div className="space-y-5">
                    <div>
                        <label className="mb-2 block text-xs font-medium text-white/50">Current password</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400/40"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-xs font-medium text-white/50">New password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400/40"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-xs font-medium text-white/50">Confirm new password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400/40"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button 
                        onClick={handlePasswordUpdate}
                        className="rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-semibold transition hover:bg-rose-400"
                    >
                        Update password
                    </button>
                </div>
            </div>
        );
    }

    function AppearanceSettings() {
    return (
        <div className="max-w-3xl p-6 text-white">
            <h2 className="text-lg font-semibold mb-1">Appearance</h2>
            <p className="mb-6 text-xs text-white/50">Customize how DocuAI looks.</p>
            
            <p className="mb-3 text-xs font-medium text-white/50">Theme</p>
            <div className="grid gap-4 sm:grid-cols-3">
                <ThemeCard title="Dark" active />
                <ThemeCard title="System" />
                <ThemeCard title="Light" />
            </div>
        </div>
    );
}

function ThemeCard({ title, active }: { title: string; active?: boolean }) {
    return (
        <div
            className={`cursor-pointer rounded-2xl border p-4 transition ${
                active
                    ? "border-rose-500 bg-rose-500/5 shadow-lg shadow-rose-500/10"
                    : "border-white/10 bg-[#080808] hover:border-white/20"
            }`}
        >
            {/* Mini UI Preview Box representing the theme */}
            <div className="mb-3 h-24 w-full rounded-xl overflow-hidden border border-white/10 p-2 flex flex-col gap-2">
                {title === "Dark" && (
                    <div className="h-full w-full bg-[#050505] rounded-lg p-2.5 flex flex-col gap-2 border border-white/5">
                        <div className="w-1/2 h-2 bg-white/20 rounded-full"></div>
                        <div className="w-3/4 h-2 bg-white/10 rounded-full"></div>
                        <div className="mt-auto flex gap-1.5 items-center">
                            <div className="w-3.5 h-3.5 rounded-full bg-rose-500/40"></div>
                            <div className="w-10 h-2 bg-white/10 rounded-full"></div>
                        </div>
                    </div>
                )}
                {title === "Light" && (
                    <div className="h-full w-full bg-gray-100 rounded-lg p-2.5 flex flex-col gap-2 border border-gray-300">
                        <div className="w-1/2 h-2 bg-gray-400 rounded-full"></div>
                        <div className="w-3/4 h-2 bg-gray-300 rounded-full"></div>
                        <div className="mt-auto flex gap-1.5 items-center">
                            <div className="w-3.5 h-3.5 rounded-full bg-rose-500"></div>
                            <div className="w-10 h-2 bg-gray-300 rounded-full"></div>
                        </div>
                    </div>
                )}
                {title === "System" && (
                    <div className="h-full w-full bg-gradient-to-r from-[#050505] to-gray-200 rounded-lg p-2.5 flex flex-col gap-2 border border-white/10">
                        <div className="w-1/2 h-2 bg-white/40 rounded-full"></div>
                        <div className="w-3/4 h-2 bg-gray-400 rounded-full"></div>
                        <div className="mt-auto flex gap-1.5 items-center">
                            <div className="w-3.5 h-3.5 rounded-full bg-rose-500/70"></div>
                            <div className="w-10 h-2 bg-gray-400 rounded-full"></div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Title and Active check */}
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">{title}</span>
                {active && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white">
                        ✓
                    </span>
                )}
            </div>
        </div>
    );
}

    function AISettings() {
        return (
            <div>
                <SectionHeader title="AI Preferences" description="Configure how DocuAI answers your questions." />
                <div className="space-y-6">
                    <div>
                        <label className="mb-2 block text-xs font-medium text-white/50">AI Model</label>
                        <select className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-rose-400/40">
                            <option className="bg-[#0a0a0a]">GPT-OSS 120B</option>
                            <option className="bg-[#0a0a0a]">GPT-OSS 20B</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    function AccountSettings() {
        return (
            <div>
                <SectionHeader title="Account" description="Manage your account." />
                <div className="rounded-xl border border-red-500/10 bg-red-500/[0.03] p-5">
                    <h3 className="text-sm font-medium text-red-400">Danger zone</h3>
                    <p className="mt-1 text-xs text-white/30">Deleting your account will permanently remove your documents, chats and account data.</p>
                    <button className="mt-4 rounded-xl border border-red-500/20 px-4 py-2.5 text-xs text-red-400 transition hover:bg-red-500/10">
                        Delete account
                    </button>
                </div>
            </div>
        );
    }

    function SectionHeader({ title, description }: { title: string; description: string }) {
        return (
            <div className="mb-8 border-b border-white/5 pb-6">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="mt-1 text-sm text-white/30">{description}</p>
            </div>
        );
    }

    
}