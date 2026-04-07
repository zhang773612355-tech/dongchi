import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { getManagedSiteContent } from '@/lib/cms-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '关于我们 | 河北东驰静电分选厂',
  description: '了解河北东驰静电分选厂的企业主体、产线能力与服务定位。'
};

export default async function AboutPage() {
  const content = await getManagedSiteContent('zh');

  return (
    <>
      <PageHero
        title="关于我们"
        subtitle="任丘市东驰塑料制品有限公司，长期服务再生塑料行业客户，聚焦 ABS / PS 静电分选。"
      />
      <section className="bg-white py-14 sm:py-16">
        <div className="container-shell grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="section-title">企业简介</h2>
            <p className="section-subtitle">
              河北东驰静电分选厂（东驰塑品）以再生塑料分选加工为核心，面向回收商、贸易商、颗粒厂和家电拆解客户，提供稳定的 ABS / PS 分选服务。
            </p>
            <div className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
              <p>公司主体：{content.brand.company}</p>
              <p>联系人：{content.contact.person}</p>
              <p>联系电话：{content.contact.phone}</p>
              <p>工厂地址：{content.contact.address}</p>
            </div>
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-xl border border-slate-200 shadow-panel">
            <Image src={content.strengths.image} alt="工厂设备" fill className="object-cover" loading="lazy" sizes="50vw" />
          </div>
        </div>
      </section>
    </>
  );
}
