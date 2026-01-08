import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthProvider } from '@/contexts/AuthContext';

/**
 * Next.js App Component - Global Varsayılan SEO Ayarları
 * 
 * Bu dosyada tanımlanan Head içeriği, tüm sayfalarda varsayılan olarak geçerlidir.
 * Sayfa bazlı SEO için components/SEO.tsx bileşenini kullanın.
 * Next.js, aynı meta tag'leri otomatik olarak üst yazar (child overrides parent).
 * 
 * Title Template: "%s | Proxy Investment" (SEO.tsx'te uygulanır)
 * MetadataBase: https://proxyinvestment.com
 */
export default function App({ Component, pageProps }: AppProps) {
  const siteUrl = 'https://proxyinvestment.com';
  const siteName = 'Proxy Investment';
  const defaultTitle = 'Proxy Investment | Gayrimenkul Yatırım Danışmanlığı';
  const defaultDescription = 'Ankara ve Türkiye genelinde en karlı arsa, daire ve ticari gayrimenkul fırsatları.';
  const defaultImage = `${siteUrl}/logo.png`;

  return (
    <AuthProvider>
      <Head>
        {/* Temel Meta Etiketleri */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{defaultTitle}</title>
        <meta name="description" content={defaultDescription} />
        <meta name="author" content={siteName} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={siteUrl} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />

        {/* Open Graph / Facebook - Varsayılan Ayarlar */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={defaultTitle} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:image" content={defaultImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:locale" content="tr_TR" />

        {/* Twitter Card - Varsayılan Ayarlar */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@proxyinvestment" />
        <meta name="twitter:title" content={defaultTitle} />
        <meta name="twitter:description" content={defaultDescription} />
        <meta name="twitter:image" content={defaultImage} />

        {/* Tema ve Renk */}
        <meta name="theme-color" content="#1e3a5f" />
        <meta name="msapplication-TileColor" content="#1e3a5f" />

        {/* Font Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@400&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

