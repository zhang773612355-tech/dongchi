'use client';

import { usePathname } from 'next/navigation';
import type { SiteContent } from '@/data/site';

type FloatingActionsProps = {
  content: SiteContent;
};

export default function FloatingActions({ content }: FloatingActionsProps) {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      <div className="fixed bottom-3 left-1/2 z-40 flex w-[calc(100%-1.5rem)] -translate-x-1/2 gap-2 rounded-xl border border-slate-200 bg-white/95 p-2 shadow-panel backdrop-blur md:hidden">
        <a
          href={`tel:${content.contact.phone}`}
          className="flex-1 rounded-md bg-navy px-3 py-2 text-center text-xs font-semibold text-white"
        >
          电话联系
        </a>
        <a
          href="#wechat"
          className="flex-1 rounded-md bg-accentGreen px-3 py-2 text-center text-xs font-semibold text-white"
        >
          微信咨询
        </a>
        <a
          href="/contact"
          className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-center text-xs font-semibold text-slate-700"
        >
          在线询盘
        </a>
      </div>

      <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        <a
          href={`tel:${content.contact.phone}`}
          className="rounded-md bg-navy px-3 py-2 text-center text-xs font-semibold text-white shadow-panel"
        >
          电话
        </a>
        <a
          href="#wechat"
          className="rounded-md bg-accentGreen px-3 py-2 text-center text-xs font-semibold text-white shadow-panel"
        >
          微信
        </a>
        <a
          href="/contact"
          className="rounded-md bg-white px-3 py-2 text-center text-xs font-semibold text-slate-700 shadow-panel"
        >
          询盘
        </a>
      </div>
    </>
  );
}
