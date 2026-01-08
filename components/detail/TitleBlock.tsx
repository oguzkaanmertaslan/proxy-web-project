
import React from 'react';
import { MapPin } from 'lucide-react';
import { ListingDetail } from '../../types';

type TitleBlockProps = Pick<ListingDetail, 'tags' | 'title' | 'location' | 'listingId' | 'lastUpdated'>;

const TitleBlock: React.FC<TitleBlockProps> = ({ tags, title, location, listingId, lastUpdated }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {tags.map((tag, index) => (
          <span key={index} className={`
            ${tag.type === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}
            text-xs font-bold px-2 py-1 rounded border
          `}>
            {tag.text}
          </span>
        ))}
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{title}</h1>
      <div className="flex items-center gap-2 text-text-secondary text-sm">
        <MapPin size={18} />
        <span>{location}</span>
        <span className="mx-2">•</span>
        <span>İlan No: {listingId}</span>
        <span className="mx-2">•</span>
        <span>Son Güncelleme: {lastUpdated}</span>
      </div>
    </div>
  );
};

export default TitleBlock;
