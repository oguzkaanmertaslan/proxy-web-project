
import React from 'react';
import { MapPin, Heart, BedDouble, Bath, Square, ArrowRight } from 'lucide-react';
import { PortfolioProperty } from '../../types';
import Link from '../Link';

interface ListingCardProps {
    property: PortfolioProperty;
}

const ListingCard: React.FC<ListingCardProps> = ({ property }) => {
    const { image, location, title, price, rooms, baths, area, listingId } = property;

    return (
        <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${image}')` }}
                    aria-label={title}
                ></div>
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <MapPin size={14} />
                    {location}
                </div>
                <button className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-colors">
                    <Heart size={18} />
                </button>
                <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-primary transition-colors mb-2">{title}</h3>
                <div className="text-primary text-xl font-black mb-4">{price}</div>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-5 border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-1.5">
                        <BedDouble size={16} />
                        <span>{rooms}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Bath size={16} />
                        <span>{baths}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Square size={16} />
                        <span>{area}</span>
                    </div>
                </div>
                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">İlan No: {listingId}</span>
                    <Link href={`/portfoy/${listingId}`} className="text-sm font-bold text-primary hover:text-blue-600 flex items-center gap-1">
                        Detaylar <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;