// Authentication utilities for TrendWatcher
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'trendwatcher-secret-key-change-in-production'
);

export interface UserPayload {
  id: string;
  email: string;
  role: 'user' | 'admin';
  subscription: 'free' | 'inner-circle';
  expiresAt?: number;
}

export async function createToken(payload: UserPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<UserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as UserPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(request: Request): string | null {
  const cookie = request.headers.get('cookie');
  if (!cookie) return null;
  
  const match = cookie.match(/auth_token=([^;]+)/);
  return match ? match[1] : null;
}

export function setAuthCookie(token: string): string {
  return `auth_token=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`;
}

export function clearAuthCookie(): string {
  return 'auth_token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0';
}

export function hasSubscription(user: UserPayload): boolean {
  return user.subscription === 'inner-circle';
}

export function isAdmin(user: UserPayload): boolean {
  return user.role === 'admin';
}
