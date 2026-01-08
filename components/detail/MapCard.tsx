
import React from 'react';
import { MapPin } from 'lucide-react';

interface MapCardProps {
  image: string;
}

const MapCard: React.FC<MapCardProps> = ({ image }) => {
  return (
    <div className="bg-card-dark rounded-xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-border-dark">
        <h3 className="text-xl font-bold text-white">Konum</h3>
      </div>
      <div className="relative w-full h-64">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale opacity-80"
          style={{ backgroundImage: `url('${image}')` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-primary/90 text-white p-3 rounded-full shadow-xl">
            <MapPin size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapCard;
