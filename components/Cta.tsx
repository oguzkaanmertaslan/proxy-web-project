
import React from 'react';

const Cta: React.FC = () => {
    return (
        <section className="py-20 relative overflow-hidden bg-gradient-to-br from-primary to-blue-700">
            <div className="absolute -top-40 -right-40 size-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 size-96 bg-white/5 rounded-full blur-3xl"></div>

            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">Gayrimenkulünüzü Değerinde Satın</h2>
                <p className="text-white/80 text-lg mb-8">
                    Profesyonel ekibimizle mülkünüzün gerçek değerini belirleyelim, en doğru alıcılarla buluşturalım.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="h-12 px-8 rounded-lg bg-white hover:bg-slate-100 text-primary font-bold transition-all shadow-lg">
                        Ücretsiz Ekspertiz
                    </button>
                    <button className="h-12 px-8 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold transition-all border border-white/30">
                        Bizimle İletişime Geçin
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Cta;

