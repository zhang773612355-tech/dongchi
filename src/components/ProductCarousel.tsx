'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { SiteContent } from '@/data/site';

type ProductCarouselProps = {
  content: SiteContent;
};

export default function ProductCarousel({ content }: ProductCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = content.products.length;

  useEffect(() => {
    if (total <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [total]);

  if (total === 0) return null;

  return (
    <section className="py-10 sm:py-12">
      <div className="container-shell">
        <div className="section-frame overflow-hidden bg-white p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-wide text-navy sm:text-2xl">产品轮播</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveIndex((prev) => (prev - 1 + total) % total)}
                className="rounded border border-slate-300 px-3 py-1 text-xs text-slate-700"
                aria-label="上一张"
              >
                上一张
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((prev) => (prev + 1) % total)}
                className="rounded border border-slate-300 px-3 py-1 text-xs text-slate-700"
                aria-label="下一张"
              >
                下一张
              </button>
            </div>
          </div>

          <div className="relative h-64 overflow-hidden rounded-xl bg-slate-100 sm:h-80 lg:h-[420px]">
            {content.products.map((product, index) => (
              <div
                key={product.name}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 80vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081a2d]/65 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-md bg-white/90 p-3">
                  <p className="text-base font-semibold text-navy">{product.name}</p>
                  <p className="mt-1 text-xs text-slate-600">{product.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {content.products.map((product, index) => (
              <button
                type="button"
                key={product.name}
                onClick={() => setActiveIndex(index)}
                className={`rounded-full px-3 py-1 text-xs transition ${
                  index === activeIndex ? 'bg-navy text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {product.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
