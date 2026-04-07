import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

const SESSION_COOKIE = 'admin_session';
const MAX_AGE_SECONDS = 60 * 60 * 12;

const getSecret = () => process.env.ADMIN_SESSION_SECRET || 'dongchi-admin-secret-change-me';

const b64url = (input: string) => Buffer.from(input, 'utf8').toString('base64url');
const unb64url = (input: string) => Buffer.from(input, 'base64url').toString('utf8');

export const getAdminCredentials = () => ({
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'dongchi123'
});

const sign = (data: string) => createHmac('sha256', getSecret()).update(data).digest('base64url');

export const createSessionToken = (username: string) => {
  const payload = JSON.stringify({ u: username, exp: Date.now() + MAX_AGE_SECONDS * 1000 });
  const encoded = b64url(payload);
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
};

export const verifySessionToken = (token?: string | null) => {
  if (!token) return false;
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return false;

  const expected = sign(encoded);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  if (!timingSafeEqual(a, b)) return false;

  try {
    const payload = JSON.parse(unb64url(encoded)) as { u: string; exp: number };
    if (!payload?.u || !payload?.exp) return false;
    return payload.exp > Date.now();
  } catch {
    return false;
  }
};

export const isAdminAuthed = () => {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
};

export const getSessionCookieName = () => SESSION_COOKIE;
export const getSessionMaxAge = () => MAX_AGE_SECONDS;
