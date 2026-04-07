import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContactSection from '@/components/ContactSection';
import { getManagedSiteContent } from '@/lib/cms-content';

export const metadata: Metadata = {
  title: '联系我们 | 河北东驰静电分选厂',
  description: '电话、微信、在线表单三种方式快速发起询盘。'
};

export default async function ContactPage({
  searchParams
}: {
  searchParams?: { source?: string };
}) {
  const content = await getManagedSiteContent('zh');
  const source = searchParams?.source;

  return (
    <>
      <PageHero title="联系我们" subtitle="欢迎咨询分选加工、原料采购、长期供需合作。" />
      <ContactSection content={content} source={source} />
    </>
  );
}
