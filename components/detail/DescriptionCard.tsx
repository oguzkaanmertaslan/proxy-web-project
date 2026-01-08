
import React from 'react';
import { Info } from 'lucide-react';

interface DescriptionCardProps {
  paragraphs: string[];
  features: string[];
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({ paragraphs, features }) => {
  const hasDescription = paragraphs && paragraphs.length > 0 && paragraphs[0] !== "";
  const hasFeatures = features && features.length > 0;

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-slate-200">
      <h3 className="text-xl font-bold mb-4 text-slate-900">İlan Açıklaması</h3>
      <div className="text-slate-600 leading-relaxed space-y-4">
        {hasDescription ? (
          paragraphs.map((p, i) => <p key={i}>{p}</p>)
        ) : (
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 italic text-slate-500">
            <Info size={20} className="text-primary shrink-0" />
            <p>Bu ilan için henüz detaylı bir açıklama metni girilmemiştir.</p>
          </div>
        )}
        
        <h4 className="font-bold text-slate-900 pt-2">Öne Çıkan Özellikler:</h4>
        {hasFeatures ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-none">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 before:content-['•'] before:text-primary before:font-bold">
                {feature}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-400 italic">Ek özellik bilgisi bulunmamaktadır.</p>
        )}
      </div>
    </div>
  );
};

export default DescriptionCard;

