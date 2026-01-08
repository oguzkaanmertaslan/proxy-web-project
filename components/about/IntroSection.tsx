
import React from 'react';

const stats = [
    { value: '10+', label: 'Yıllık Tecrübe' },
    { value: '2.5k', label: 'Mutlu Müşteri' },
    { value: '500+', label: 'Portföy' },
    { value: '24', label: 'Ödül & Başarı' },
];

const IntroSection: React.FC = () => {
    return (
        <section className="py-16 md:py-24 px-4 md:px-10 flex justify-center bg-white">
            <div className="max-w-[960px] w-full flex flex-col items-center text-center gap-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                    Biz Kimiz?
                </div>
                <h2 className="text-slate-900 text-3xl md:text-4xl font-bold leading-tight max-w-2xl">
                    Gayrimenkulde Güvenin ve Modern Çözümlerin Adresi
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
                    Proxy Gayrimenkul olarak, 10 yılı aşkın süredir sektörde güven inşa ediyoruz. Şeffaf hizmet anlayışımız, teknolojik altyapımız ve alanında uzman kadromuzla, gayrimenkul ihtiyaçlarınıza profesyonel ve yenilikçi çözümler sunuyoruz. Sadece ev değil, yaşam alanları ve karlı bir gelecek sunmayı hedefliyoruz.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full mt-8 border-t border-slate-200 pt-12">
                    {stats.map(stat => (
                        <div key={stat.label} className="flex flex-col items-center gap-2">
                            <span className="text-4xl md:text-5xl font-black text-primary">{stat.value}</span>
                            <span className="text-sm font-medium text-slate-500">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IntroSection;
