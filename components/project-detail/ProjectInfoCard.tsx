
import React from 'react';
import { MapPin, Phone, Download } from 'lucide-react';
import { ProjectDetail } from '../../types';
import Link from '../Link';

type ProjectInfoCardProps = Pick<ProjectDetail, 'title' | 'location' | 'summary'>;

const ProjectInfoCard: React.FC<ProjectInfoCardProps> = ({ title, location, summary }) => {
    return (
        <div className="bg-card-dark rounded-xl border border-border-dark p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-8 -mt-8 blur-xl"></div>
            <div className="relative z-10">
                <h1 className="text-3xl font-black text-white leading-tight mb-2">{title}</h1>
                <div className="flex items-center gap-1.5 text-text-secondary mb-6">
                    <MapPin size={20} />
                    <span className="text-base font-medium">{location}</span>
                    <Link href="#" className="text-primary text-xs ml-2 hover:underline">(Haritada Göster)</Link>
                </div>
                <div className="flex flex-col gap-1 mb-6 p-4 bg-border-dark/30 rounded-lg border border-border-dark">
                    <span className="text-text-secondary text-sm font-medium">Başlangıç Fiyatı</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-white">{summary.price}</span>
                        {summary.discount && (
                            <span className="text-sm text-green-400 font-medium">{summary.discount}</span>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                    {summary.items.map(item => (
                        <div key={item.label} className="flex flex-col">
                            <span className="text-text-secondary text-xs font-medium uppercase tracking-wider mb-1">{item.label}</span>
                            <div className="flex items-center gap-2 text-white font-semibold">
                                <item.icon className="text-primary" size={20} />
                                {item.value}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-3">
                    <button className="w-full h-12 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-base shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                        <Phone size={20} />
                        Bilgi ve Randevu Al
                    </button>
                    <button className="w-full h-12 rounded-lg bg-border-dark/50 hover:bg-border-dark/80 text-white font-bold text-base border border-white/10 transition-all flex items-center justify-center gap-2">
                        <Download size={20} />
                        E-Katalog İndir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectInfoCard;
