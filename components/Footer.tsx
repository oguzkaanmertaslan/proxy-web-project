
import React from 'react';
import { Globe, Rss, Share2, MapPin, Phone, Mail } from 'lucide-react';
import Link from './Link';
import Logo from './Logo';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <Link href="/" className="block">
                            <Logo width={240} height={60} className="opacity-90 hover:opacity-100 transition-opacity" />
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Modern yaşamın kapılarını aralayan, güven ve kalite odaklı gayrimenkul çözümleri. Hayallerinizi inşa ediyoruz.
                        </p>
                        <div className="flex gap-4">
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><Globe size={20} /></a>
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><Rss size={20} /></a>
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><Share2 size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-slate-900 font-bold mb-4">Hızlı Erişim</h3>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li><Link className="hover:text-primary transition-colors" href="/">Ana Sayfa</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/portfoy">Portföy</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/projeler">Projeler</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/hakkimizda">Hakkımızda</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-slate-900 font-bold mb-4">İletişim</h3>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-primary mt-0.5" size={20} />
                                <span>Güçlükaya Mah. Acıpayam Sok. No:2/7<br />Keçiören, Ankara, Türkiye</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-primary" size={20} />
                                <span>+90 (507) 053 06 40</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-primary" size={20} />
                                <span>info.hyproxy@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    <a 
                        href="https://www.google.com/maps/dir/?api=1&destination=Güçlükaya+Mah.+Acıpayam+Sok.+No:2/7+Keçiören+Ankara+Türkiye"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-lg overflow-hidden border border-slate-200 h-48 bg-slate-100 hover:shadow-lg transition-shadow cursor-pointer"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.5!2d32.845!3d39.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU4JzQ4LjAiTiAzMsKwNTAnNDIuMCJF!5e0!3m2!1str!2str!4v1704000000000!5m2!1str!2str"
                            className="w-full h-full border-0 pointer-events-none"
                            title="Proxy Gayrimenkul Konum"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </a>
                </div>

                <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">© 2025 Proxy Gayrimenkul. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

