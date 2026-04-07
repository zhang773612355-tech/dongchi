import type { SiteContent } from '@/data/site';

type FooterProps = {
  content: SiteContent;
};

export default function Footer({ content }: FooterProps) {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-[#081a2d] text-white">
      <div className="container-shell py-12">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <h3 className="text-xl font-semibold tracking-wide">{content.brand.name}</h3>
            <p className="mt-2 text-sm text-slate-200">{content.brand.company}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">{content.brand.englishName}</p>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              东驰塑品聚焦再生塑料静电分选与加工，持续服务华北区域回收商、贸易商及下游颗粒厂客户。
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide text-slate-100">业务方向</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {content.services.slice(0, 4).map((item) => (
                <li key={item.title}>{item.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide text-slate-100">快速联系</h4>
            <p className="mt-3 text-sm text-slate-300">联系人：{content.contact.person}</p>
            <p className="mt-2 text-sm text-slate-300">电话：{content.contact.phone}</p>
            <p className="mt-2 text-sm text-slate-300">地址：{content.contact.address}</p>
            <a
              href={`tel:${content.contact.phone}`}
              className="mt-4 inline-flex rounded-md bg-accentGreen px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110"
            >
              一键拨号咨询
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-700 pt-5 text-xs text-slate-400">
          © {new Date().getFullYear()} {content.brand.company} · 河北东驰静电分选厂工业门户
        </div>
      </div>
    </footer>
  );
}
