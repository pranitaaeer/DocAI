import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const code = req.nextUrl.searchParams.get("code");

        if (!code) {
            return NextResponse.redirect(
                new URL("/login?error=google_auth_failed", req.url)
            );
        }

        const backendResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google/exchange`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
                cache: "no-store",
            }
        );

        if (!backendResponse.ok) {
            return NextResponse.redirect(
                new URL("/login?error=google_auth_failed", req.url)
            );
        }

        const data = await backendResponse.json();

        const response = NextResponse.redirect(
            new URL("/dashboard", req.url)
        );

        response.cookies.set("token", data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });

        return response;

    } catch (error) {
        console.error("Google callback API error:", error);

        return NextResponse.redirect(
            new URL("/login?error=google_auth_failed", req.url)
        );
    }
}
