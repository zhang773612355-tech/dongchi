import { NextResponse } from 'next/server';
import { createSessionToken, getAdminCredentials, getSessionCookieName, getSessionMaxAge } from '@/lib/admin-auth';

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get('username') || '');
  const password = String(formData.get('password') || '');

  const creds = getAdminCredentials();
  if (username !== creds.username || password !== creds.password) {
    return new NextResponse(null, {
      status: 303,
      headers: { Location: '/admin/login?error=1' }
    });
  }

  const token = createSessionToken(username);
  const res = new NextResponse(null, {
    status: 303,
    headers: { Location: '/admin' }
  });
  const isHttps =
    request.headers.get('x-forwarded-proto') === 'https' || new URL(request.url).protocol === 'https:';
  res.cookies.set(getSessionCookieName(), token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isHttps,
    path: '/',
    maxAge: getSessionMaxAge()
  });

  return res;
}
