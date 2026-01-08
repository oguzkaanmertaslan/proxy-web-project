
import React from 'react';
import { ListingSpec } from '../../types';
import { Info, Square } from 'lucide-react';

interface SpecsCardProps {
  specs: ListingSpec[];
}

const SpecsCard: React.FC<SpecsCardProps> = ({ specs }) => {
  const hasSpecs = specs && specs.length > 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h3 className="text-lg font-bold mb-4 text-slate-900 border-b border-slate-200 pb-3">İlan Özellikleri</h3>
      
      {hasSpecs ? (
        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          {specs.map((spec, index) => (
            <div key={index} className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">{spec.label}</span>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <spec.icon className="text-primary" size={20} />
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-center gap-2">
          <Square className="text-slate-300" size={32} />
          <p className="text-sm text-slate-400">Bu ilana ait teknik özellik verisi <br/> henüz sisteme girilmemiş.</p>
        </div>
      )}
    </div>
  );
};

export default SpecsCard;

