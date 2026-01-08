
import React from 'react';
import { Phone } from 'lucide-react';

const CtaSection: React.FC = () => {
    return (
        <section className="relative py-24 px-6 md:px-20 overflow-hidden">
            <div 
                className="absolute inset-0 z-0 bg-cover bg-center" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC0IG522KpxSAMnGDWix3DXB6i101mVRHuM4DbRgFNC9TW5l1_chJgKFkE1lf9kcIpwHP1G8PO67ke8hCPYdQ-yAwDCvmrz1YLUZS-Le4BAs6SJK5jRJcV8hXXJvO3y87DAEM8Rc1fS0ROr0A7fx9UemUFDx4BfTcFdT2hhqS52i2Tn9Qz7RrWAX1LiFTSO7I_KpXXUySVLj_1uwi_02-XswCT3z-BO3Foqs-cCFKMQxizBBN-x8P4ZfeB1r3JI1Y1nl6F4q3AGSrVU')" }}
            ></div>
            <div className="absolute inset-0 z-10 bg-[#111318]/90"></div>
            <div className="relative z-20 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex flex-col gap-4 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Hayalinizdeki Yatırım İçin Hazır mısınız?</h2>
                    <p className="text-gray-300 text-lg max-w-xl">
                        Profesyonel ekibimizle tanışın, kahvemizi için ve size en uygun gayrimenkul fırsatlarını konuşalım.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105 flex items-center justify-center gap-2">
                        <Phone size={20} />
                        İletişime Geç
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold py-3 px-6 rounded-lg backdrop-blur-sm transition-colors">
                        Portföyü İncele
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
