import Head from 'next/head';
import Logo from '@/components/Logo';
import { Mail, Phone, MapPin, Instagram, Clock } from 'lucide-react';

export default function ComingSoonPage() {
  return (
    <>
      <Head>
        <title>Proxy Investment | Yakında Hizmetinizdeyiz</title>
        <meta name="description" content="Proxy Investment - Premium gayrimenkul danışmanlığı. Yakında sizlerle buluşuyoruz." />
      </Head>

      <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden font-outfit">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/3 to-transparent rounded-full blur-3xl"></div>
        </div>

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        ></div>

        {/* Main content */}
        <main className="relative flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-3xl w-full text-center">
            {/* Logo */}
            <div className="flex justify-center mb-12">
              <Logo width={360} height={90} className="text-primary" />
            </div>

            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-8">
              <Clock size={18} className="text-primary" />
              <span className="text-sm font-medium text-primary">Yakında Açılıyor</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Yakında <span className="text-primary">Hizmetinizdeyiz</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Web sitemiz üzerinde yenilikler yapıyoruz. Premium gayrimenkul danışmanlık hizmetlerimizle 
              çok yakında sizlerle buluşacağız.
            </p>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {/* Phone Card */}
              <a 
                href="tel:+905070530640" 
                className="group flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Phone size={22} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Telefon</p>
                  <p className="text-sm font-semibold text-slate-800">+90 (507) 053 06 40</p>
                </div>
              </a>

              {/* Email Card */}
              <a 
                href="mailto:info.hyproxy@gmail.com" 
                className="group flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Mail size={22} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">E-posta</p>
                  <p className="text-sm font-semibold text-slate-800">info.hyproxy@gmail.com</p>
                </div>
              </a>

              {/* Location Card */}
              <div className="group flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl">
                  <MapPin size={22} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Konum</p>
                  <p className="text-sm font-semibold text-slate-800">Ankara, Türkiye</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4">
              <a 
                href="https://www.instagram.com/proxy.investment/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-100 text-slate-600 hover:text-primary hover:border-primary/20 hover:shadow-lg transition-all duration-300"
              >
                <Instagram size={22} />
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative py-6 text-center">
          <p className="text-sm text-slate-500">
            © 2025 Proxy Investment. Tüm hakları saklıdır.
          </p>
        </footer>
      </div>
    </>
  );
}
