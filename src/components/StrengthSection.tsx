import Image from 'next/image';
import type { SiteContent } from '@/data/site';

type StrengthSectionProps = {
  content: SiteContent;
};

export default function StrengthSection({ content }: StrengthSectionProps) {
  return (
    <section className="py-14 sm:py-16">
      <div className="container-shell">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#081a2d] to-[#143557] p-6 text-white shadow-panel sm:p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-wide sm:text-3xl">工厂实力</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-100 sm:text-base">{content.strengths.intro}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {content.strengths.stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur-sm">
                    <div className="text-xl font-semibold text-white">{stat.value}</div>
                    <div className="mt-1 text-xs text-slate-200">{stat.label}</div>
                  </div>
                ))}
              </div>

              <ul className="mt-6 space-y-3 text-sm text-slate-100">
                {content.strengths.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-accentOrange" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-h-72 overflow-hidden rounded-xl border border-white/20">
              <Image src={content.strengths.image} alt="工厂产线" fill className="object-cover" loading="lazy" sizes="50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081a2d]/65 to-transparent" />
              <p className="absolute bottom-3 left-3 rounded bg-white/15 px-3 py-2 text-xs text-slate-100 backdrop-blur-sm">
                多套静电分选设备 · 日产能力约100吨
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
