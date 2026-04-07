import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createProduct } from '@/lib/cms-content';
import { getSessionCookieName, verifySessionToken } from '@/lib/admin-auth';

const extFromName = (name: string) => {
  const ext = path.extname(name).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return ext;
  return '.jpg';
};

const saveImage = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const ext = extFromName(file.name);
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;
  const dir = path.join(process.cwd(), 'public', 'uploads', 'products');
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), buffer);
  return `/uploads/products/${filename}`;
};

export async function POST(request: Request) {
  const token = cookies().get(getSessionCookieName())?.value;
  if (!verifySessionToken(token)) {
    return new NextResponse(null, { status: 303, headers: { Location: '/admin/login' } });
  }

  const formData = await request.formData();
  const name = String(formData.get('name') || '').trim();
  const note = String(formData.get('note') || '').trim();
  const files = formData.getAll('images').filter((item): item is File => item instanceof File && item.size > 0);

  if (!name || files.length === 0) {
    return new NextResponse(null, { status: 303, headers: { Location: '/admin?error=product_create' } });
  }

  const paths: string[] = [];
  for (const file of files) {
    paths.push(await saveImage(file));
  }

  await createProduct({ name, note, images: paths });
  return new NextResponse(null, { status: 303, headers: { Location: '/admin?updated=product_new' } });
}
