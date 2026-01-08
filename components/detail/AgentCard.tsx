
import React from 'react';
import { Star } from 'lucide-react';
import { ListingDetail } from '../../types';

interface AgentCardProps {
  agent: ListingDetail['agent'];
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <div className="bg-card-dark rounded-xl p-6 shadow-sm border border-border-dark flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div 
            className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-primary"
            style={{ backgroundImage: `url('${agent.avatar}')` }}
          ></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-card-dark rounded-full"></div>
        </div>
        <div className="flex flex-col">
          <h4 className="font-bold text-lg text-white">{agent.name}</h4>
          <span className="text-sm text-slate-400">{agent.title}</span>
          <div className="flex gap-1 mt-1">
            {[...Array(agent.rating)].map((_, i) => (
              <Star key={i} className="text-yellow-400" size={16} fill="currentColor" />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors border border-slate-600">
          Danışmanın Diğer İlanları
        </button>
      </div>
    </div>
  );
};

export default AgentCard;
