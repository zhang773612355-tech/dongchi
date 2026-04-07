import { NextResponse } from 'next/server';
import { getSessionCookieName } from '@/lib/admin-auth';

export async function POST(request: Request) {
  const res = NextResponse.redirect(new URL('/admin/login', request.url));
  res.cookies.set(getSessionCookieName(), '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0)
  });
  return res;
}
