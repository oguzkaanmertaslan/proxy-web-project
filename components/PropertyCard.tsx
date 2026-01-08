
import React from 'react';
import { Heart, MapPin } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
    property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    const { status, image, title, price, location, features } = property;
    const isForSale = status === 'Satılık';

    return (
        <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
            <div className="relative aspect-[4/3] overflow-hidden">
                <div className={`absolute top-3 left-3 z-10 text-white text-xs font-bold px-3 py-1.5 rounded ${isForSale ? 'bg-primary' : 'bg-slate-600'}`}>
                    {status}
                </div>
                <div className="absolute top-3 right-3 z-10">
                    <button className="size-8 rounded-full bg-black/50 hover:bg-white hover:text-red-500 text-white flex items-center justify-center backdrop-blur-sm transition-colors">
                        <Heart size={20} />
                    </button>
                </div>
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={image} alt={title} />
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-slate-900 text-lg font-bold truncate pr-4">{title}</h3>
                    <p className="text-primary font-bold whitespace-nowrap">{price}</p>
                </div>
                <div className="flex items-center gap-1 text-slate-500 text-sm mb-4">
                    <MapPin size={16} />
                    <span className="truncate">{location}</span>
                </div>
                <div className="grid grid-cols-3 border-t border-slate-200 pt-4 gap-2">
                    {features.map((feature, index) => (
                        <div key={index} className={`flex flex-col items-center gap-1 ${index > 0 ? 'border-l border-slate-200' : ''}`}>
                            <feature.icon className="text-slate-400" size={20} />
                            <span className="text-slate-700 text-xs font-medium">{feature.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;