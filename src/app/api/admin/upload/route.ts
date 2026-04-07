import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSessionCookieName, verifySessionToken } from '@/lib/admin-auth';
import { updateImageOverride } from '@/lib/cms-content';

const extFromName = (name: string) => {
  const ext = path.extname(name).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return ext;
  return '.jpg';
};

const folderFromSlot = (slotKey: string) => {
  if (slotKey.startsWith('product:')) return 'products';
  if (slotKey.startsWith('certificate:')) return 'certificates';
  if (slotKey.startsWith('exhibition:')) return 'exhibition';
  if (slotKey.startsWith('factory:')) return 'factory';
  if (slotKey === 'contact:qr') return 'wechat';
  return 'misc';
};

export async function POST(request: Request) {
  const token = cookies().get(getSessionCookieName())?.value;
  if (!verifySessionToken(token)) {
    return new NextResponse(null, {
      status: 303,
      headers: { Location: '/admin/login' }
    });
  }

  const formData = await request.formData();
  const slotKey = String(formData.get('slotKey') || '');
  const file = formData.get('image');

  if (!slotKey || !(file instanceof File) || file.size === 0) {
    return new NextResponse(null, {
      status: 303,
      headers: { Location: '/admin?error=upload' }
    });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const folder = folderFromSlot(slotKey);
  const ext = extFromName(file.name);
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;

  const dir = path.join(process.cwd(), 'public', 'uploads', folder);
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, filename);
  await fs.writeFile(filePath, buffer);

  const publicPath = `/uploads/${folder}/${filename}`;
  await updateImageOverride(slotKey, publicPath);

  return new NextResponse(null, {
    status: 303,
    headers: { Location: `/admin?updated=${encodeURIComponent(slotKey)}` }
  });
}
