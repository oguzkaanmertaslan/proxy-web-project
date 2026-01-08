
import React, { useState } from 'react';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryProps {
  mainImage: string;
  thumbnails: string[];
}

const Gallery: React.FC<GalleryProps> = ({ mainImage, thumbnails }) => {
  const allImages = [mainImage, ...thumbnails];
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = allImages.length;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      {/* Main Hero Image */}
      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg relative group">
        {/* Navigation Buttons */}
        <button 
          onClick={handlePrev} 
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 size-10 flex items-center justify-center bg-black/40 text-white rounded-full hover:bg-black/60 transition-opacity opacity-0 group-hover:opacity-100"
          aria-label="Önceki görsel"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={handleNext} 
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 size-10 flex items-center justify-center bg-black/40 text-white rounded-full hover:bg-black/60 transition-opacity opacity-0 group-hover:opacity-100"
          aria-label="Sonraki görsel"
        >
          <ChevronRight size={24} />
        </button>

        {/* Displayed Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-300"
          style={{ backgroundImage: `url('${allImages[currentIndex]}')` }}
          key={currentIndex}
        ></div>
        
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
          <Camera size={16} />
          {currentIndex + 1} / {totalImages}
        </div>
      </div>
      
      {/* Thumbnail Grid */}
      {thumbnails.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {thumbnails.slice(0, 4).map((thumb, index) => {
            const imageIndexInAll = index + 1;
            const isActive = currentIndex === imageIndexInAll;

            return (
              <div 
                key={index} 
                className={`aspect-[4/3] rounded-lg overflow-hidden cursor-pointer relative transition-all duration-300 border-2 ${isActive ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setCurrentIndex(imageIndexInAll)}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
                  style={{ backgroundImage: `url('${thumb}')` }}
                ></div>
                {!isActive && <div className="absolute inset-0 bg-black/50 hover:bg-black/30 transition-colors"></div>}
                
                {index === 3 && thumbnails.length > 4 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/50 transition-colors">
                    <span className="text-white font-bold text-lg">+{totalImages - 4}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Gallery;
