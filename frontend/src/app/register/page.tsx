"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function RegisterPage() {
  const router = useRouter();

  const register = useAuthStore((state) => state.register);
  const googleLogin = useAuthStore((state) => state.googleLogin);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms of Service");
      return;
    }

    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
     console.log("Registration successful:", response);
      router.push("/dashboard");
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Registration failed"
      );
    }
  };

  const handleGoogleLogin = () => {
    googleLogin();
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-4 py-8 text-white">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[450px] w-[650px] -translate-x-1/2 rounded-full bg-rose-600/10 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-[-200px] right-[-150px] h-[400px] w-[400px] rounded-full bg-pink-600/[0.05] blur-[120px]" />

      {/* Register Card */}
      <div className="relative w-full max-w-md">

        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-rose-500/30 via-transparent to-pink-500/20 blur-sm" />

        <div className="relative rounded-3xl border border-white/10 bg-[#0a0a0a]/95 p-8 shadow-2xl backdrop-blur-xl sm:p-10">

          {/* Heading */}
          <div className="mb-8 flex flex-col items-center text-center">

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-500/10 text-2xl text-rose-400 shadow-[0_0_35px_rgba(244,63,94,0.15)]">
              ✦
            </div>

            <h1 className="text-2xl font-semibold tracking-tight">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-white/35">
              Start chatting with your documents on{" "}
              <span className="text-rose-400">DocuAI</span>
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-medium text-white/60"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-rose-400/40 focus:bg-rose-500/[0.03]"
              />
            </div>

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
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-rose-400/40 focus:bg-rose-500/[0.03]"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-medium text-white/60"
              >
                Password
              </label>

              <div className="relative">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 pr-14 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-rose-400/40"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/30 hover:text-rose-400"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-xs font-medium text-white/60"
              >
                Confirm password
              </label>

              <div className="relative">

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 pr-14 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-rose-400/40"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/30 hover:text-rose-400"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>

              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">

              <input
                id="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) =>
                  setAgreeTerms(e.target.checked)
                }
                className="mt-0.5 h-3.5 w-3.5 accent-rose-500"
              />

              <label
                htmlFor="terms"
                className="text-[11px] leading-5 text-white/30"
              >
                I agree to the{" "}
                <span className="text-rose-400">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-rose-400">
                  Privacy Policy
                </span>
              </label>

            </div>

            {/* Error */}
            {error && (
              <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
                {error}
              </p>
            )}

            {/* Register */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-rose-500 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(244,63,94,0.18)] transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading
                ? "Creating account..."
                : "Create account"}
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

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] py-3 text-sm text-white/60 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
          >
            <span className="font-semibold text-white">
              G
            </span>

            Continue with Google
          </button>

          {/* Login */}
          <p className="mt-7 text-center text-xs text-white/30">

            Already have an account?{" "}

            <a
              href="/login"
              className="font-medium text-rose-400 transition hover:text-rose-300"
            >
              Sign in
            </a>

          </p>

        </div>
      </div>
    </main>
  );
}