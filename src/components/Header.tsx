'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { SiteContent } from '@/data/site';

type HeaderProps = {
  content: SiteContent;
};

export default function Header({ content }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container-shell flex h-9 items-center justify-between text-[11px] text-slate-600 sm:text-xs">
          <p>{content.brand.company}</p>
          <p>
            商务联系：
            <a href={`tel:${content.contact.phone}`} className="font-semibold text-navy hover:text-accentGreen">
              {content.contact.phone}
            </a>
          </p>
        </div>
      </div>

      <div className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="leading-tight">
          <span className="block text-base font-semibold tracking-wide text-navy">{content.brand.name}</span>
          <span className="hidden text-[11px] uppercase tracking-[0.2em] text-slate-500 md:block">{content.brand.englishName}</span>
        </Link>

        <button
          className="rounded-md border border-slate-300 px-3 py-1 text-xs text-slate-700 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="切换导航"
        >
          菜单
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {content.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm tracking-wide transition ${
                  active ? 'text-navy' : 'text-slate-600 hover:text-navy'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-2 left-0 h-0.5 w-full origin-left bg-accentGreen transition-transform ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </Link>
            );
          })}
          <a
            href={`tel:${content.contact.phone}`}
            className="rounded-md bg-navy px-4 py-2 text-xs font-semibold text-white transition hover:bg-steel"
          >
            电话咨询
          </a>
        </nav>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="container-shell py-3">
            <div className="grid gap-2">
              {content.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-2 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={`tel:${content.contact.phone}`}
                className="mt-2 rounded-md bg-navy px-3 py-2 text-center text-sm font-semibold text-white"
              >
                电话联系
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
