
import React from 'react';
import { Search, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
    return (
        <section className="relative h-[600px] w-full overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFrYadSNqdkSutSyRXk3ln-vYciilQeaGzD5zEerXSkCbGz16opKQrAehimrb4loMl42h1jpJ7qbwdLcTWAgard-Muw9Q7yTmYHYtWvbDnEOJRrPsT52LvMd3G5I7s0Jg5rzJuGDxZZW-IdlSK6_eAt2Dyo0xCL9jN_yNf_z-3lJdYJUWPJvxyR8uES32NFma0GZhcoihKfj3A5xO19G77MzMpWdHtWn0GdWQnC_QhA6L3hTQQR35eZY_vOygk_tvXn3VMx3-EgBv2')" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/40"></div>
            </div>

            <div className="relative z-10 h-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm mb-6">
                        <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-white text-xs font-bold uppercase tracking-wide">Lüksün Yeni Adresi</span>
                    </div>
                    <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
                        Hayalinizdeki Evi <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Bugün Keşfedin</span>
                    </h1>
                    <p className="text-gray-300 text-lg sm:text-xl font-normal leading-relaxed mb-8 max-w-lg">
                        Proxy Gayrimenkul güvencesiyle en seçkin portföyler, modern yaşam alanları ve yatırım fırsatları sizi bekliyor.
                    </p>
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-2 rounded-xl flex flex-col sm:flex-row gap-2 max-w-xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input className="w-full h-12 pl-10 pr-4 rounded-lg bg-black/40 border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary text-sm" placeholder="Konum, proje veya emlak tipi..." type="text" />
                        </div>
                        <button className="h-12 px-8 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2">
                            <span>Ara</span>
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

