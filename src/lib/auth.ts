import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { ADMIN_COOKIE_NAME } from "@/lib/auth-constants";

const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getSecret() {
  if (!process.env.AUTH_SECRET && process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET must be configured in production.");
  }

  return process.env.AUTH_SECRET || "development-only-secret";
}

function sign(value: string) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

function createToken(profileId: number) {
  const expiresAt = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = `${profileId}.${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

function parseToken(token?: string) {
  if (!token) return null;

  const [profileId, expiresAt, signature] = token.split(".");
  if (!profileId || !expiresAt || !signature) return null;

  const payload = `${profileId}.${expiresAt}`;
  const expected = sign(payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  if (Number(expiresAt) < Date.now()) return null;

  return Number(profileId);
}

export async function loginAdmin(username: string, password: string) {
  const profile = await prisma.profile.findUnique({ where: { username } });

  if (!profile || !verifyPassword(password, profile.passwordHash)) {
    return false;
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, createToken(profile.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE_SECONDS,
    path: "/",
  });

  return true;
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const profileId = parseToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!profileId) return null;

  return prisma.profile.findUnique({ where: { id: profileId } });
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
