import { NextResponse } from 'next/server';
import { createSessionToken, getAdminCredentials, getSessionCookieName, getSessionMaxAge } from '@/lib/admin-auth';

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get('username') || '');
  const password = String(formData.get('password') || '');

  const creds = getAdminCredentials();
  if (username !== creds.username || password !== creds.password) {
    return NextResponse.redirect(new URL('/admin/login?error=1', request.url));
  }

  const token = createSessionToken(username);
  const res = NextResponse.redirect(new URL('/admin', request.url));
  res.cookies.set(getSessionCookieName(), token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: getSessionMaxAge()
  });

  return res;
}
