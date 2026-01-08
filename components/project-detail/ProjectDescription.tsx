
import React from 'react';
import { FileText } from 'lucide-react';
import { ProjectInvestmentHighlight } from '../../types';

interface ProjectDescriptionProps {
    description: string[];
    highlights: ProjectInvestmentHighlight[];
}

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({ description, highlights }) => {
    return (
        <div className="bg-card-dark rounded-xl border border-border-dark p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <FileText className="text-primary" size={24} />
                Proje Detayları ve Yatırım Potansiyeli
            </h3>
            <div className="space-y-4 text-text-secondary leading-relaxed text-sm md:text-base">
                {description.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-border-dark">
                {highlights.map((highlight) => (
                    <div key={highlight.title} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <highlight.icon size={22} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm mb-1">{highlight.title}</h4>
                            <p className="text-text-secondary text-xs">{highlight.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectDescription;
