import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ServicesSection from '@/components/ServicesSection';
import StrengthSection from '@/components/StrengthSection';
import { getManagedSiteContent } from '@/lib/cms-content';

export const metadata: Metadata = {
  title: '业务范围 | 河北东驰静电分选厂',
  description: 'ABS / PS 静电分选、再生塑料分选加工与原料采购业务介绍。'
};

export default async function ServicesPage() {
  const content = await getManagedSiteContent('zh');

  return (
    <>
      <PageHero title="业务范围" subtitle="围绕分选加工、采购合作、稳定供需三大方向，构建再生塑料服务能力。" />
      <ServicesSection content={content} />
      <StrengthSection content={content} />
    </>
  );
}
