import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Protected routes
  const isProtectedRoute =
    pathname.startsWith("/dashboard");

  // Auth pages
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register";

  // User is NOT logged in
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  // User is already logged in
  if (isAuthPage && token) {
    return NextResponse.redirect(
      new URL("/dashboard", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/chat/:path*",
    "/settings",
    "/login",
    "/register",
  ],
};