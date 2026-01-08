
import React from 'react';
import { Flag, Eye } from 'lucide-react';

const MissionVision: React.FC = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
            <div className="bg-slate-50 p-12 md:p-20 flex flex-col justify-center gap-6 border-b md:border-b-0 md:border-r border-slate-200">
                <div className="size-16 rounded-xl bg-white shadow-md flex items-center justify-center text-primary mb-2">
                    <Flag size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Misyonumuz</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                    Müşterilerimizin beklentilerini en üst düzeyde karşılayarak, doğru yatırımlarla değer yaratmak. Etik değerlere bağlı, şeffaf ve sonuç odaklı bir yaklaşımla gayrimenkul sektöründe standartları yükseltmek.
                </p>
            </div>
            <div className="bg-white p-12 md:p-20 flex flex-col justify-center gap-6">
                <div className="size-16 rounded-xl bg-slate-50 shadow-md flex items-center justify-center text-primary mb-2">
                    <Eye size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Vizyonumuz</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                    Dijital dönüşümün gücünü kullanarak global gayrimenkul piyasasında öncü bir marka olmak. Sürdürülebilir yaşam alanları ve yenilikçi yatırım modelleri ile sektörün geleceğine yön vermek.
                </p>
            </div>
        </section>
    );
};

export default MissionVision;
