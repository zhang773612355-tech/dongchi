import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { getManagedSiteContent } from '@/lib/cms-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  metadataBase: new URL('https://dongchi.example.com'),
  title: '河北东驰静电分选厂 | 再生塑料分选加工',
  description:
    '河北东驰静电分选厂专注 ABS / PS 静电分选、再生塑料分选加工与原料采购，日产能力约100吨，服务华北地区再生塑料行业客户。',
  openGraph: {
    title: '河北东驰静电分选厂 | 再生塑料分选加工',
    description:
      '河北东驰静电分选厂专注 ABS / PS 静电分选、再生塑料分选加工与原料采购，日产能力约100吨，服务华北地区再生塑料行业客户。',
    type: 'website',
    locale: 'zh_CN'
  }
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = await getManagedSiteContent('zh');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: content.brand.company,
    alternateName: [content.brand.name, content.brand.englishName],
    telephone: content.contact.phone,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: content.contact.phone,
        contactType: 'sales'
      }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: content.contact.address,
      addressRegion: '河北省',
      addressCountry: 'CN'
    }
  };

  return (
    <html lang="zh-CN">
      <body>
        <Header content={content} />
        <main>{children}</main>
        <Footer content={content} />
        <FloatingActions content={content} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
