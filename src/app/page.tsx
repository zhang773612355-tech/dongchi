import HeroSection from '@/components/HeroSection';
import ProductCarousel from '@/components/ProductCarousel';
import ServicesSection from '@/components/ServicesSection';
import ProductsGrid from '@/components/ProductsGrid';
import StrengthSection from '@/components/StrengthSection';
import CertificatesSection from '@/components/CertificatesSection';
import ExhibitionGallery from '@/components/ExhibitionGallery';
import ContactSection from '@/components/ContactSection';
import { getManagedSiteContent } from '@/lib/cms-content';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const content = await getManagedSiteContent('zh');

  return (
    <>
      <HeroSection content={content} />
      <ProductCarousel content={content} />
      <ServicesSection content={content} />
      <ProductsGrid content={content} />
      <StrengthSection content={content} />
      <CertificatesSection content={content} />
      <ExhibitionGallery content={content} />
      <ContactSection content={content} />
    </>
  );
}
