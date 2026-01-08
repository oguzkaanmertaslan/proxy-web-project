import Head from 'next/head';

// SEO Yapılandırma Sabitleri
export const SEO_CONFIG = {
    siteName: 'Proxy Investment',
    siteUrl: 'https://proxyinvestment.com',
    defaultTitle: 'Proxy Investment | Gayrimenkul Yatırım Danışmanlığı',
    defaultDescription: 'Ankara ve Türkiye genelinde en karlı arsa, daire ve ticari gayrimenkul fırsatları.',
    defaultImage: 'https://proxyinvestment.com/logo.png',
    twitterHandle: '@proxyinvestment',
    locale: 'tr_TR',
};

// SEO Props Interface
interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    noIndex?: boolean;
    // İlan detay sayfaları için ek alanlar
    article?: {
        publishedTime?: string;
        modifiedTime?: string;
        author?: string;
    };
}

/**
 * SEO Component - Pages Router için yeniden kullanılabilir SEO bileşeni
 * 
 * Kullanım Örnekleri:
 * 
 * 1. Varsayılan (sadece title):
 *    <SEO title="Hakkımızda" />
 * 
 * 2. Özel description ile:
 *    <SEO title="İletişim" description="Bizimle iletişime geçin" />
 * 
 * 3. Dinamik ilan sayfası için:
 *    <SEO 
 *      title={`${listing.title} - ${listing.location}`}
 *      description={listing.description.slice(0, 160) + '...'}
 *      image={listing.coverImage}
 *      url={`https://proxyinvestment.com/portfoy/${listing.id}`}
 *    />
 * 
 * Not: Parent metadata'yı extend etmek için, bu component'i kullanmadan önce
 * _app.tsx'teki varsayılan Head içeriğini kontrol edin. Next.js aynı meta tag'leri
 * otomatik olarak üst yazar (override).
 */
export default function SEO({
    title,
    description = SEO_CONFIG.defaultDescription,
    image = SEO_CONFIG.defaultImage,
    url = SEO_CONFIG.siteUrl,
    type = 'website',
    noIndex = false,
    article,
}: SEOProps) {
    // Title template: "%s | Proxy Investment" veya varsayılan
    const fullTitle = title
        ? `${title} | ${SEO_CONFIG.siteName}`
        : SEO_CONFIG.defaultTitle;

    // Description'ı 160 karakterle sınırla
    const truncatedDescription = description.length > 160
        ? description.slice(0, 157) + '...'
        : description;

    return (
        <Head>
            {/* Temel Meta Etiketleri */}
            <title>{fullTitle}</title>
            <meta name="description" content={truncatedDescription} />
            <link rel="canonical" href={url} />

            {/* Robots */}
            {noIndex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content="index, follow" />
            )}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SEO_CONFIG.siteName} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={truncatedDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content={url} />
            <meta property="og:locale" content={SEO_CONFIG.locale} />

            {/* Makale türü için ek Open Graph etiketleri */}
            {article?.publishedTime && (
                <meta property="article:published_time" content={article.publishedTime} />
            )}
            {article?.modifiedTime && (
                <meta property="article:modified_time" content={article.modifiedTime} />
            )}
            {article?.author && (
                <meta property="article:author" content={article.author} />
            )}

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={truncatedDescription} />
            <meta name="twitter:image" content={image} />

            {/* Ek Meta Etiketleri */}
            <meta name="author" content={SEO_CONFIG.siteName} />
            <meta name="theme-color" content="#1e3a5f" />
        </Head>
    );
}

/**
 * İlan sayfaları için özel SEO helper fonksiyonu
 * 
 * Kullanım:
 * const seoProps = generateListingSEO(listing);
 * <SEO {...seoProps} />
 */
export function generateListingSEO(listing: {
    title: string;
    location: string;
    description?: string;
    price?: string;
    coverImage?: string;
    id: string | number;
    updatedAt?: string;
}) {
    const title = `${listing.title} - ${listing.location}`;

    // Fiyat ve kısa açıklama birleştir
    const priceText = listing.price ? `${listing.price} - ` : '';
    const descText = listing.description || 'Detaylı bilgi için ilanı inceleyin.';
    const description = `${priceText}${descText}`;

    return {
        title,
        description,
        image: listing.coverImage || SEO_CONFIG.defaultImage,
        url: `${SEO_CONFIG.siteUrl}/portfoy/${listing.id}`,
        type: 'article' as const,
        article: listing.updatedAt ? {
            modifiedTime: listing.updatedAt,
        } : undefined,
    };
}

/**
 * Proje sayfaları için özel SEO helper fonksiyonu
 */
export function generateProjectSEO(project: {
    title: string;
    location: string;
    description?: string;
    price?: string;
    coverImage?: string;
    id: string | number;
}) {
    const title = `${project.title} - ${project.location}`;

    const priceText = project.price ? `Başlangıç Fiyatı: ${project.price} - ` : '';
    const descText = project.description || 'Yatırım fırsatı için projeyi inceleyin.';
    const description = `${priceText}${descText}`;

    return {
        title,
        description,
        image: project.coverImage || SEO_CONFIG.defaultImage,
        url: `${SEO_CONFIG.siteUrl}/projeler/${project.id}`,
        type: 'article' as const,
    };
}
