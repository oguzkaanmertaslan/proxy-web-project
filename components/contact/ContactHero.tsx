
import React from 'react';

const ContactHero: React.FC = () => {
    return (
        <div className="w-full max-w-[1280px] px-4 sm:px-10 py-12 sm:py-20">
            <div className="flex flex-col gap-4 text-center sm:text-left max-w-3xl">
                <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em] text-slate-900">
                    Proxy Gayrimenkul ile İletişime Geçin
                </h1>
                <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed">
                    Hayalinizdeki eve ulaşmak için ekibimizle tanışın, ofisimizi ziyaret edin veya bize hemen bir mesaj gönderin.
                </p>
            </div>
        </div>
    );
};

export default ContactHero;
