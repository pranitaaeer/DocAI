
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

async function proxyRequest(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    if (!BACKEND_URL) {
      return NextResponse.json(
        { message: "Backend URL is not configured" },
        { status: 500 }
      );
    }

    const { path } = await context.params;
    const endpoint = path.join("/");
    const url = new URL(`${BACKEND_URL}/${endpoint}`);

    req.nextUrl.searchParams.forEach((value, key) => {
      url.searchParams.append(key, value);
    });

    const token = req.cookies.get("token")?.value;

    const headers = new Headers();

    const contentType = req.headers.get("content-type");

    if (contentType) {
      headers.set("Content-Type", contentType);
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const body =
      req.method === "GET" || req.method === "HEAD"
        ? undefined
        : await req.arrayBuffer();

    const backendResponse = await fetch(url.toString(), {
      method: req.method,
      headers,
      body,
      cache: "no-store",
    });

    const responseBody = await backendResponse.arrayBuffer();

    return new NextResponse(responseBody, {
      status: backendResponse.status,
      headers: {
        "Content-Type":
          backendResponse.headers.get("content-type") ||
          "application/json",
      },
    });
  } catch (error) {
    console.error("Backend proxy error:", error);

    return NextResponse.json(
      { message: "Backend request failed" },
      { status: 500 }
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
