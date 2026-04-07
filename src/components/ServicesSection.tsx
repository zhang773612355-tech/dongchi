import type { SiteContent } from '@/data/site';

type ServicesSectionProps = {
  content: SiteContent;
};

export default function ServicesSection({ content }: ServicesSectionProps) {
  return (
    <section className="py-14 sm:py-16">
      <div className="container-shell">
        <div className="section-frame overflow-hidden bg-gradient-to-b from-white to-slate-50 p-6 sm:p-8">
          <h2 className="section-title">主营业务</h2>
          <p className="section-subtitle">聚焦再生塑料分选与加工，为采购、供货、代工场景提供工业级稳定服务。</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {content.services.map((service, index) => (
              <article
                key={service.title}
                className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-panel"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accentGreen">0{index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-navy">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
