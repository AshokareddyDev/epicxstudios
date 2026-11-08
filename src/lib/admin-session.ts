import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";

const COOKIE = "epicx_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12;

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

export function passwordsMatch(input: string, expected: string) {
  return timingSafeEqual(digest(input), digest(expected));
}

function secret() {
  const value = process.env.ADMIN_SECRET;
  if (!value) return null;
  return value;
}

function sign(expires: number) {
  const key = secret();
  if (!key) return null;
  const payload = String(expires);
  const mac = createHmac("sha256", key).update(payload).digest("base64url");
  return `${payload}.${mac}`;
}

function readToken(token: string) {
  const key = secret();
  if (!key) return false;
  const [payload, mac] = token.split(".");
  if (!payload || !mac) return false;
  const expires = Number(payload);
  if (!Number.isFinite(expires) || expires < Date.now()) return false;
  const expected = createHmac("sha256", key).update(payload).digest("base64url");
  const left = Buffer.from(mac);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SECRET);
}

export async function isAdmin() {
  await connection();
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return false;
  return readToken(token);
}

export async function startAdminSession() {
  const token = sign(Date.now() + MAX_AGE_SECONDS * 1000);
  if (!token) return;
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
