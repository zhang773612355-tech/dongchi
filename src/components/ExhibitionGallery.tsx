'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { SiteContent } from '@/data/site';
import ImagePreviewModal from '@/components/ImagePreviewModal';

type ExhibitionGalleryProps = {
  content: SiteContent;
};

export default function ExhibitionGallery({ content }: ExhibitionGalleryProps) {
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section className="py-14 sm:py-16">
      <div className="container-shell">
        <div className="section-frame overflow-hidden bg-gradient-to-b from-white to-slate-50 p-6 sm:p-8">
          <h2 className="section-title">参展展示</h2>
          <p className="section-subtitle">通过展会海报与现场展位素材，展示品牌曝光与客户沟通能力。</p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {content.exhibitions.map((item) => (
              <article key={item.title} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-panel">
                <button
                  type="button"
                  className="relative block h-56 w-full overflow-hidden"
                  onClick={() => setPreview({ src: item.image, alt: item.title })}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    loading="lazy"
                    sizes="33vw"
                  />
                </button>
                <div className="p-4">
                  <h3 className="text-base font-semibold tracking-wide text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
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
