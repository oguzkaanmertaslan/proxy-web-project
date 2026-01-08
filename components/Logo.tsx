
import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", width = 320, height = 80 }) => {
  return (
    <div 
      className={`flex items-center justify-start ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <img 
        src="/logo.png" 
        alt="Proxy Real Estate & Investment"
        className="max-w-full max-h-full object-contain object-left"
      />
    </div>
  );
};

export default Logo;
