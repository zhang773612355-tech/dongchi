import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import CertificatesSection from '@/components/CertificatesSection';
import ExhibitionGallery from '@/components/ExhibitionGallery';
import { getManagedSiteContent } from '@/lib/cms-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '资质与展会 | 河北东驰静电分选厂',
  description: '展示注册商标证、企业主体信息以及展会现场素材。'
};

export default async function CertificatesPage() {
  const content = await getManagedSiteContent('zh');

  return (
    <>
      <PageHero title="资质与展会" subtitle="以资质背书和参展记录增强工业客户合作信心。" />
      <CertificatesSection content={content} />
      <ExhibitionGallery content={content} />
    </>
  );
}
