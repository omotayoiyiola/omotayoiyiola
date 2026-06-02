import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/auth-constants";

function getSecret() {
  if (!process.env.AUTH_SECRET && process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET must be configured in production.");
  }

  return process.env.AUTH_SECRET || "development-only-secret";
}

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function safeCompare(a: string, b: string) {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return result === 0;
}

async function sign(value: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return bytesToHex(new Uint8Array(signature));
}

async function hasValidAdminToken(token?: string) {
  if (!token) return false;

  const [profileId, expiresAt, signature] = token.split(".");
  if (!profileId || !expiresAt || !signature) return false;
  if (!Number.isFinite(Number(profileId)) || Number(expiresAt) < Date.now()) {
    return false;
  }

  const payload = `${profileId}.${expiresAt}`;
  const expected = await sign(payload);
  return safeCompare(signature, expected);
}

function applySecurityHeaders(response: NextResponse, pathname: string) {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin") ||
    pathname === "/dashboard"
  ) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  if (process.env.NODE_ENV === "production") {
    response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }

  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return applySecurityHeaders(NextResponse.next(), pathname);
  }

  if (!(await hasValidAdminToken(request.cookies.get(ADMIN_COOKIE_NAME)?.value))) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    const response = NextResponse.redirect(url);
    response.cookies.delete(ADMIN_COOKIE_NAME);
    return applySecurityHeaders(response, pathname);
  }

  return applySecurityHeaders(NextResponse.next(), pathname);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
