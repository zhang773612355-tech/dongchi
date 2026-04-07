import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ProductsGrid from '@/components/ProductsGrid';
import ContactSection from '@/components/ContactSection';
import { getManagedSiteContent } from '@/lib/cms-content';

export const metadata: Metadata = {
  title: '产品中心 | 河北东驰静电分选厂',
  description: 'ABS洗衣机上盖料、白色/黑色/花色 ABS 破碎料等产品展示。'
};

export default async function ProductsPage() {
  const content = await getManagedSiteContent('zh');

  return (
    <>
      <PageHero title="产品中心" subtitle="覆盖 ABS 多种颜色与应用场景，支持采购咨询与分选加工对接。" />
      <ProductsGrid content={content} subtitle="产品图可后续替换为真实拍摄图，当前为可配置占位图。" />
      <ContactSection content={content} />
    </>
  );
}
