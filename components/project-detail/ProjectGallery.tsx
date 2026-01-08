import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectGallery as GalleryType, ProjectTag, ProjectTagStyle } from '../../types';

interface ProjectGalleryProps {
    gallery: GalleryType;
    tags: ProjectTag[];
}

const tagStyles: Record<ProjectTagStyle, string> = {
  primary: 'bg-primary/90 text-white border-primary/20',
  secondary: 'bg-white/10 text-white border-white/20',
  green: 'bg-green-600/90 text-white',
  blue: 'bg-blue-500/90 text-white',
  purple: 'bg-purple-600/90 text-white',
  yellow: 'bg-yellow-600/90 text-white',
};

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ gallery, tags }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const allImages = [gallery.main, ...gallery.thumbnails];
    const totalImagesToShow = allImages.length; 

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="space-y-4">
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-border-dark shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-6 left-6 z-20 flex gap-2">
                    {tags.map(tag => (
                        <span key={tag.text} className={`backdrop-blur-sm text-sm font-bold px-4 py-1.5 rounded-full shadow-lg border ${tagStyles[tag.style]}`}>{tag.text}</span>
                    ))}
                </div>
                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" style={{ backgroundImage: `url('${allImages[currentIndex]}')` }}></div>
                <button onClick={handlePrev} className="absolute top-1/2 left-4 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center border border-white/10 transition-colors">
                    <ChevronLeft size={24} />
                </button>
                <button onClick={handleNext} className="absolute top-1/2 right-4 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center border border-white/10 transition-colors">
                    <ChevronRight size={24} />
                </button>
            </div>
            <div className="grid grid-cols-4 gap-2 md:gap-4">
                {gallery.thumbnails.map((thumbnail, index) => {
                    const imageIndex = index + 1; 
                    const isLastThumbnail = index === gallery.thumbnails.length - 1;
                    const isActive = currentIndex === imageIndex;

                    return (
                        <div key={index} onClick={() => setCurrentIndex(imageIndex)} className={`aspect-[4/3] rounded-lg overflow-hidden border-2 ${isActive ? 'border-primary' : 'border-border-dark'} cursor-pointer relative group transition-all`}>
                            <div className="w-full h-full bg-cover bg-center transition-opacity" style={{ backgroundImage: `url('${thumbnail}')` }}></div>
                            {!isActive && <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors"></div>}
                            {isLastThumbnail && gallery.totalCount > totalImagesToShow && (
                                <div className={`absolute inset-0 flex items-center justify-center ${!isActive ? 'bg-black/50' : ''}`}>
                                    <span className="text-white text-sm md:text-lg font-bold">+{gallery.totalCount - gallery.thumbnails.length} Foto</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectGallery;