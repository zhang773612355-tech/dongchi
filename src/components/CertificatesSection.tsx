'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { SiteContent } from '@/data/site';
import ImagePreviewModal from '@/components/ImagePreviewModal';

type CertificatesSectionProps = {
  content: SiteContent;
};

export default function CertificatesSection({ content }: CertificatesSectionProps) {
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section className="py-14 sm:py-16">
      <div className="container-shell">
        <h2 className="section-title">资质认证</h2>
        <p className="section-subtitle">注册商标证与企业主体信息用于增强工业采购合作的可信度。</p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {content.certificates.map((item) => (
            <article
              key={item.title}
              className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-panel transition hover:-translate-y-1"
            >
              <button
                type="button"
                className="relative block h-56 w-full overflow-hidden rounded-xl"
                onClick={() => setPreview({ src: item.image, alt: item.title })}
              >
                <Image src={item.image} alt={item.title} fill className="object-cover transition duration-300 group-hover:scale-105" loading="lazy" sizes="50vw" />
              </button>
              <h3 className="mt-4 text-base font-semibold tracking-wide text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</p>
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
