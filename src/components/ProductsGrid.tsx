'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { SiteContent } from '@/data/site';
import ImagePreviewModal from '@/components/ImagePreviewModal';

type ProductsGridProps = {
  content: SiteContent;
  title?: string;
  subtitle?: string;
};

export default function ProductsGrid({ content, title = '产品中心', subtitle }: ProductsGridProps) {
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section className="py-14 sm:py-16">
      <div className="container-shell">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle ?? '聚焦 ABS 多品类破碎料，支持按场景选型、按需求沟通供货。'}</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.products.map((product) => (
            <article
              key={product.name}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-panel transition hover:-translate-y-1"
            >
              <button
                type="button"
                className="relative block h-56 w-full overflow-hidden"
                onClick={() => setPreview({ src: product.image, alt: product.name })}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081a2d]/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 rounded bg-white/90 px-2 py-1 text-[11px] font-semibold text-navy">点击预览</span>
              </button>
              <div className="p-5">
                <h3 className="text-base font-semibold tracking-wide text-navy">{product.name}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{product.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ImagePreviewModal
        open={Boolean(preview)}
        src={preview?.src ?? ''}
        alt={preview?.alt ?? ''}
        onClose={() => setPreview(null)}
      />
    </section>
  );
}
