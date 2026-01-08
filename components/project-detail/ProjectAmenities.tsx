
import React from 'react';
import { Waves, CheckCircle } from 'lucide-react';

interface ProjectAmenitiesProps {
    amenities: string[];
}

const ProjectAmenities: React.FC<ProjectAmenitiesProps> = ({ amenities }) => {
    return (
        <div className="bg-card-dark rounded-xl border border-border-dark p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Waves className="text-primary" size={24} />
                Sosyal Olanaklar
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3">
                {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors">
                        <CheckCircle className="text-green-500" size={20} />
                        <span className="text-sm">{amenity}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectAmenities;
