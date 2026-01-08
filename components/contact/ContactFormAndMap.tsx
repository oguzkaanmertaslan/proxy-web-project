
import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

const ContactFormAndMap: React.FC = () => {
    return (
        <div className="w-full max-w-[1280px] px-4 sm:px-10 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-bold text-slate-900">Bize Yazın</h2>
                        <p className="text-slate-600">Sorularınız, görüşleriniz veya randevu talepleriniz için formu doldurun.</p>
                    </div>
                    <form className="flex flex-col gap-4 mt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-slate-700" htmlFor="name">Adınız Soyadınız</label>
                                <input className="h-11 rounded-lg border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-primary w-full border" id="name" placeholder="Örn: Ali Veli" type="text" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-slate-700" htmlFor="phone">Telefon Numaranız</label>
                                <input className="h-11 rounded-lg border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-primary w-full border" id="phone" placeholder="05XX XXX XX XX" type="tel" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700" htmlFor="email">E-posta Adresiniz</label>
                            <input className="h-11 rounded-lg border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-primary w-full border" id="email" placeholder="ornek@email.com" type="email" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700" htmlFor="message">Mesajınız</label>
                            <textarea className="rounded-lg border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-primary w-full resize-none p-3 border" id="message" placeholder="Size nasıl yardımcı olabiliriz?" rows={4}></textarea>
                        </div>
                        <button className="mt-2 flex h-11 w-full sm:w-auto sm:self-start items-center justify-center rounded-lg bg-primary px-8 text-sm font-bold text-white hover:bg-primary-hover transition-colors" type="button">
                            Mesajı Gönder
                        </button>
                    </form>
                </div>

                <div className="flex flex-col gap-4 h-full min-h-[400px]">
                    <div className="w-full h-full min-h-[300px] bg-slate-200 rounded-xl overflow-hidden relative shadow-inner">
                        <img alt="Map showing office location in Istanbul city center" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVeThl0TKk2csp0WDt_tbhWED6q0UbpJ0-0Xz-CWa6Mq9zRkoi33Xp_NhocAyGCM_vClOZTVnpvq4dihg86HLhugDFk-mohGtkz_oiDaqQwuu0IfnAnPGXmAsa2WbGLNlTe-2PBa3AZuZQXBeulj-BYxjCrv3txGY2y7fRcrfmkJS3fm_MGBdp2yLLNph6p5QYjMi9kkHfwhBiJA8y30aTbAuNVRFzknAUE8JCtV9sYPEDAAGbQ7qa_0UBo1X22nEmC0LzyO5ADvKv" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white p-3 rounded-full shadow-lg animate-bounce">
                                <MapPin className="text-primary text-3xl" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                        <MapPin className="text-primary mt-1 shrink-0" />
                        <div>
                            <p className="font-bold text-slate-900">Ofis Adresi</p>
                            <p className="text-sm text-slate-600 mt-1">Levent Mahallesi, Büyükdere Caddesi No:123, 34330 Beşiktaş/İstanbul</p>
                            <a className="text-sm font-medium text-primary mt-2 inline-flex items-center hover:underline" href="#">
                                Yol Tarifi Al
                                <ArrowRight size={16} className="ml-1" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactFormAndMap;
