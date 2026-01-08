
import React from 'react';
import { MapPin } from 'lucide-react';
import { Project, ProjectTag } from '../../types';
import Link from '../Link';

const tagStyles = {
  primary: 'bg-primary/90 text-white',
  secondary: 'bg-white/10 text-white border border-white/20',
  green: 'bg-green-600/90 text-white',
  blue: 'bg-blue-500/90 text-white',
  purple: 'bg-purple-600/90 text-white',
  yellow: 'bg-yellow-600/90 text-white',
};

const ProjectTagPill: React.FC<{ tag: ProjectTag }> = ({ tag }) => (
  <span className={`backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${tagStyles[tag.style]}`}>
    {tag.text}
  </span>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const { id, image, tags, location, title, price, details } = project;

  return (
    <article className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
        <div 
          className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700 ease-out" 
          style={{ backgroundImage: `url('${image}')` }}
        ></div>
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          {tags.map((tag) => <ProjectTagPill key={tag.text} tag={tag} />)}
        </div>
        <div className="absolute bottom-4 left-4 z-20 text-white">
          <div className="flex items-center gap-1.5">
            <MapPin size={18} />
            <span className="text-sm font-medium">{location}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-slate-900 text-xl font-bold leading-tight group-hover:text-primary transition-colors">{title}</h3>
          <div className="text-right flex-shrink-0">
            <p className="text-slate-500 text-xs font-medium mb-1">Başlangıç</p>
            <p className="text-primary text-lg font-bold">{price}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-slate-100">
          {details.map((detail) => (
            <div key={detail.label} className="flex flex-col gap-1">
              <span className="text-slate-500 text-xs flex items-center gap-1.5">
                <detail.icon size={14} />
                {detail.label}
              </span>
              <span className={`text-slate-700 text-sm font-medium ${detail.label === 'Teslim Durumu' ? 'text-green-600' : ''}`}>
                {detail.value}
              </span>
            </div>
          ))}
        </div>
        <Link 
          href={`/projeler/${id}`}
          className="w-full mt-auto flex items-center justify-center rounded-lg h-10 bg-primary/10 hover:bg-primary text-primary hover:text-white text-sm font-bold transition-all duration-300">
          Detaylı Bilgi
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
