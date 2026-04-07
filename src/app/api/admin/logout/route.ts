import { NextResponse } from 'next/server';
import { getSessionCookieName } from '@/lib/admin-auth';

export async function POST(request: Request) {
  const res = new NextResponse(null, {
    status: 303,
    headers: { Location: '/admin/login' }
  });
  const isHttps =
    request.headers.get('x-forwarded-proto') === 'https' || new URL(request.url).protocol === 'https:';
  res.cookies.set(getSessionCookieName(), '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: isHttps,
    path: '/',
    expires: new Date(0)
  });
  return res;
}
