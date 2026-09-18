import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { Role } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'fng-beauty-super-secret-key-change-in-prod';

export interface TokenPayload {
  userId: string;
  email: string;
  role: Role;
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('fng_auth_token')?.value;

  if (!token) return null;
  return verifyToken(token);
}

export async function requireAuth(allowedRoles?: Role[]) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('NON_AUTHENTIFIE');
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    throw new Error('ACCES_REFUSE');
  }

  return user;
}
