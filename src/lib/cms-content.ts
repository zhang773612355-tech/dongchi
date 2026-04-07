import fs from 'fs/promises';
import path from 'path';
import type { SiteContent } from '@/data/site';
import { getSiteContent } from '@/data/site';

const STORE_PATH = path.join(process.cwd(), 'data', 'admin-content.json');

type Overrides = {
  products?: Record<number, string>;
  certificates?: Record<number, string>;
  exhibitions?: Record<number, string>;
  factory?: {
    hero?: string;
    strength?: string;
  };
  contact?: {
    qr?: string;
  };
};

const ensureStoreDir = async () => {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
};

export const readOverrides = async (): Promise<Overrides> => {
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf8');
    return JSON.parse(raw) as Overrides;
  } catch {
    return {};
  }
};

const writeOverrides = async (data: Overrides) => {
  await ensureStoreDir();
  await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), 'utf8');
};

export const updateImageOverride = async (slotKey: string, imagePath: string) => {
  const data = await readOverrides();

  if (slotKey.startsWith('product:')) {
    const index = Number(slotKey.split(':')[1]);
    data.products = { ...(data.products || {}), [index]: imagePath };
  } else if (slotKey.startsWith('certificate:')) {
    const index = Number(slotKey.split(':')[1]);
    data.certificates = { ...(data.certificates || {}), [index]: imagePath };
  } else if (slotKey.startsWith('exhibition:')) {
    const index = Number(slotKey.split(':')[1]);
    data.exhibitions = { ...(data.exhibitions || {}), [index]: imagePath };
  } else if (slotKey === 'factory:hero') {
    data.factory = { ...(data.factory || {}), hero: imagePath };
  } else if (slotKey === 'factory:strength') {
    data.factory = { ...(data.factory || {}), strength: imagePath };
  } else if (slotKey === 'contact:qr') {
    data.contact = { ...(data.contact || {}), qr: imagePath };
  }

  await writeOverrides(data);
};

export const getManagedSiteContent = async (locale: 'zh' | 'en' = 'zh'): Promise<SiteContent> => {
  const base = structuredClone(getSiteContent(locale));
  const ov = await readOverrides();

  if (ov.products) {
    Object.entries(ov.products).forEach(([idx, image]) => {
      const i = Number(idx);
      if (base.products[i]) base.products[i].image = image;
    });
  }

  if (ov.certificates) {
    Object.entries(ov.certificates).forEach(([idx, image]) => {
      const i = Number(idx);
      if (base.certificates[i]) base.certificates[i].image = image;
    });
  }

  if (ov.exhibitions) {
    Object.entries(ov.exhibitions).forEach(([idx, image]) => {
      const i = Number(idx);
      if (base.exhibitions[i]) base.exhibitions[i].image = image;
    });
  }

  if (ov.factory?.hero) base.hero.bgImage = ov.factory.hero;
  if (ov.factory?.strength) base.strengths.image = ov.factory.strength;
  if (ov.contact?.qr) base.contact.qrImage = ov.contact.qr;

  return base;
};
