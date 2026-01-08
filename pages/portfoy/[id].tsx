import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/detail/Breadcrumbs';
import TitleBlock from '@/components/detail/TitleBlock';
import Gallery from '@/components/detail/Gallery';
import DescriptionCard from '@/components/detail/DescriptionCard';
import MapCard from '@/components/detail/MapCard';
import PriceCard from '@/components/detail/PriceCard';
import SpecsCard from '@/components/detail/SpecsCard';
import AgentCard from '@/components/detail/AgentCard';
import DetailFooter from '@/components/detail/DetailFooter';
import SEO, { generateListingSEO } from '@/components/SEO';
import { ListingDetail } from '@/types';
import { fetchListingByUid } from '@/lib/api';

export default function ListingDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadListingDetail = async () => {
      if (!id || typeof id !== 'string') return;

      setLoading(true);
      setError(null);

      const data = await fetchListingByUid(id);

      if (data) {
        setListing(data);
      } else {
        setError('Aradığınız ilan bulunamadı veya yüklenirken bir sorun oluştu.');
      }

      setLoading(false);
    };

    loadListingDetail();
  }, [id]);

  const breadcrumbItems = [
    { label: 'Anasayfa', href: '/' },
    { label: 'Portföy', href: '/portfoy' },
    { label: listing?.location || 'Yükleniyor...' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="text-lg font-medium">Veriler Hazırlanıyor...</p>
      </div>
    );
  }

  if (error || !listing) {
    return <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center font-bold text-xl">{error || 'İlan bulunamadı.'}</div>;
  }

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col">
      {/* Dinamik SEO - Her ilan için özel metadata oluşturur */}
      <SEO
        {...generateListingSEO({
          title: listing.title,
          location: listing.location,
          description: listing.description.paragraphs.join(' '),
          price: listing.price,
          coverImage: listing.gallery.main,
          id: listing.listingId,
          updatedAt: listing.lastUpdated,
        })}
      />
      <Header />
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-[6.5rem] pb-6">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            <TitleBlock
              tags={listing.tags}
              title={listing.title}
              location={listing.location}
              listingId={listing.listingId}
              lastUpdated={listing.lastUpdated}
            />
            <Gallery mainImage={listing.gallery.main} thumbnails={listing.gallery.thumbnails} />
            <DescriptionCard
              paragraphs={listing.description.paragraphs}
              features={listing.description.features}
            />
            <MapCard image={listing.mapLocationImage} />
          </div>

          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24 space-y-4">
              <PriceCard price={listing.price} />
              <SpecsCard specs={listing.specs} />
              <AgentCard agent={listing.agent} />
            </div>
          </div>
        </div>
      </main>
      <DetailFooter />
    </div>
  );
}
