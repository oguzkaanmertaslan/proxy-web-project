
import React from 'react';
import { ShieldCheck, BrainCircuit, TrendingUp } from 'lucide-react';

const values = [
    {
        icon: ShieldCheck,
        title: 'Güven ve Şeffaflık',
        description: 'Tüm süreçlerimizde açıklık ilkesini benimsiyor, müşterilerimizle uzun vadeli güven ilişkileri kuruyoruz. Gizli maliyet yok, sürpriz yok.',
    },
    {
        icon: BrainCircuit,
        title: 'Uzmanlık & Deneyim',
        description: 'Bölgesel piyasa hakimiyetimiz ve teknik bilgimizle, yatırımınızın değerini en doğru şekilde analiz ediyor ve yönetiyoruz.',
    },
    {
        icon: TrendingUp,
        title: 'Yenilikçilik',
        description: 'Geleneksel emlakçılık anlayışını teknolojiyle birleştiriyor, dijital pazarlama ve veri analitiği ile fark yaratıyoruz.',
    },
];

const ValuesSection: React.FC = () => {
    return (
        <section className="py-20 px-4 md:px-10 bg-slate-50">
            <div className="max-w-[1100px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Değerlerimiz</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">Bizi biz yapan ve her adımımızda bize rehberlik eden temel prensiplerimiz.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map(value => (
                        <div key={value.title} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-primary/50 transition-colors group shadow-sm hover:shadow-md">
                            <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <value.icon size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ValuesSection;
