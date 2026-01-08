
import React from 'react';
import { Phone, Mail } from 'lucide-react';

const OfficeInfo: React.FC = () => {
    return (
        <div className="w-full max-w-[1280px] px-4 sm:px-10 pb-10">
            <div className="bg-slate-50 rounded-xl p-8 shadow-sm border border-slate-200">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold leading-tight text-slate-900">Merkez Ofis İletişim</h2>
                        <p className="text-slate-600">Bize çalışma saatleri içerisinde aşağıdaki kanallardan hızlıca ulaşabilirsiniz.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-6 transition-all hover:border-primary/50">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
                                <Phone size={28} />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-base font-bold text-slate-900">Telefon &amp; WhatsApp</h3>
                                <a className="text-slate-600 hover:text-primary transition-colors" href="tel:+902125550000">+90 (212) 555 00 00</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-6 transition-all hover:border-primary/50">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
                                <Mail size={28} />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-base font-bold text-slate-900">E-posta</h3>
                                <a className="text-slate-600 hover:text-primary transition-colors" href="mailto:info@proxygayrimenkul.com">info@proxygayrimenkul.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfficeInfo;
