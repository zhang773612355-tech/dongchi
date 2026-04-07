import Image from 'next/image';
import type { SiteContent } from '@/data/site';

type HeroSectionProps = {
  content: SiteContent;
};

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#081a2d] via-[#0f2740] to-[#1d3e61] text-white">
      <div className="absolute inset-0 bg-industrial-grid bg-grid opacity-30" />
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accentGreen/20 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-accentOrange/20 blur-3xl" />

      <div className="container-shell relative grid gap-10 py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-20">
        <div>
          <p className="industrial-tag reveal-up">河北 · 再生塑料工业服务</p>
          <h1 className="reveal-up reveal-delay-1 mt-5 text-3xl font-semibold leading-tight tracking-wide sm:text-5xl">
            {content.hero.title}
          </h1>
          <p className="reveal-up reveal-delay-2 mt-4 text-lg text-slate-100">{content.hero.subtitle}</p>
          <p className="reveal-up reveal-delay-3 mt-5 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
            {content.hero.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/contact"
              className="rounded-md bg-accentGreen px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              {content.hero.ctaPrimary}
            </a>
            <a
              href={`tel:${content.contact.phone}`}
              className="rounded-md border border-slate-200/60 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              {content.hero.ctaPhone}
            </a>
            <a
              href="#wechat"
              className="rounded-md bg-accentOrange px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              {content.hero.ctaWechat}
            </a>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-100">
            <a href="/contact?source=expo" className="rounded border border-white/35 bg-white/10 px-3 py-1.5 hover:bg-white/20">
              展会客户快速入口
            </a>
            <span className="rounded border border-white/20 px-3 py-1.5">工作时段 30 分钟内优先响应</span>
          </div>

          <div className="mt-9 grid max-w-2xl gap-3 sm:grid-cols-3">
            {content.strengths.stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/25 bg-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section-frame relative overflow-hidden border-white/20 bg-white/10 p-3 backdrop-blur-sm">
          <div className="relative h-72 overflow-hidden rounded-xl sm:h-80 lg:h-[420px]">
            <Image
              src={content.hero.bgImage}
              alt="工厂实景"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
          <div className="mt-3 grid gap-2 text-xs text-slate-100 sm:grid-cols-2">
            <p className="rounded-md border border-white/20 bg-white/10 px-3 py-2">工厂实景与产线展示</p>
            <p className="rounded-md border border-white/20 bg-white/10 px-3 py-2">支持来厂考察与样料沟通</p>
          </div>
        </div>
      </div>
    </section>
  );
}
