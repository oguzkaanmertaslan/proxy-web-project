
import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';

interface PriceCardProps {
  price: string;
}

const PriceCard: React.FC<PriceCardProps> = ({ price }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <p className="text-slate-500 text-sm font-medium mb-1">Satış Fiyatı</p>
      <div className="flex items-baseline gap-2 mb-6">
        <h2 className="text-3xl font-bold text-primary">{price}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
          <Phone size={20} />
          Hemen Ara
        </button>
        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
          <MessageSquare size={20} />
          WhatsApp
        </button>
      </div>
    </div>
  );
};

export default PriceCard;

