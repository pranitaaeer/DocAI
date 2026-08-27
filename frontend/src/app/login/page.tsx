"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();

  const login = useAuthStore((state) => state.login);
  const googleLogin = useAuthStore(
    (state) => state.googleLogin
  );
  const isLoading = useAuthStore(
    (state) => state.isLoading
  );

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
    const result = await login({
        email,
        password,
      });
      router.push("/dashboard");
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
          "Invalid email or password."
      );
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-4 text-white">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[450px] w-[650px] -translate-x-1/2 rounded-full bg-rose-600/10 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-[-200px] left-[-150px] h-[400px] w-[400px] rounded-full bg-pink-600/[0.05] blur-[120px]" />

      {/* Login Card */}
      <div className="relative w-full max-w-md">

        {/* Glow Border */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-rose-500/30 via-transparent to-pink-500/20 blur-sm" />

        <div className="relative rounded-3xl border border-white/10 bg-[#0a0a0a]/95 p-8 shadow-2xl backdrop-blur-xl sm:p-10">

          {/* Logo */}
          <div className="mb-8 flex flex-col items-center text-center">

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-500/10 text-2xl text-rose-400 shadow-[0_0_35px_rgba(244,63,94,0.15)]">
              ✦
            </div>

            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-white/35">
              Sign in to continue to{" "}
              <span className="text-rose-400">
                DocuAI
              </span>
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium text-white/60"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-rose-400/40 focus:bg-rose-500/[0.03] focus:shadow-[0_0_20px_rgba(244,63,94,0.06)]"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-white/60"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-[11px] text-rose-400 transition hover:text-rose-300"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-rose-400/40 focus:bg-rose-500/[0.03] focus:shadow-[0_0_20px_rgba(244,63,94,0.06)]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/30 transition hover:text-rose-400"
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="h-3.5 w-3.5 accent-rose-500"
              />

              <label
                htmlFor="remember"
                className="text-xs text-white/35"
              >
                Remember me
              </label>
            </div>

            {/* Error */}
            {error && (
              <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
                {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-rose-500 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(244,63,94,0.18)] transition hover:bg-rose-400 hover:shadow-[0_0_35px_rgba(244,63,94,0.28)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading
                ? "Signing in..."
                : "Sign in"}
            </button>

          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/5" />

            <span className="text-[10px] uppercase tracking-widest text-white/20">
              or
            </span>

            <div className="h-px flex-1 bg-white/5" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={googleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] py-3 text-sm text-white/60 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
          >
            <span className="font-semibold text-white">
              G
            </span>

            Continue with Google
          </button>

          {/* Register */}
          <p className="mt-7 text-center text-xs text-white/30">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-rose-400 transition hover:text-rose-300"
            >
              Create account
            </a>
          </p>

        </div>
      </div>
    </main>
  );
}