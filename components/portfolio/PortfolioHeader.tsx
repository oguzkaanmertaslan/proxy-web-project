
import React, { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import Link from '../Link';
import Logo from '../Logo';

const NavLinks = () => (
    <>
        <Link className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="/">Ana Sayfa</Link>
        <Link className="text-primary text-sm font-bold border-b-2 border-primary py-1" href="/portfoy">Portföy</Link>
        <Link className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="/projeler">Projeler</Link>
        <Link className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="/hakkimizda">Hakkımızda</Link>
        <Link className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="/iletisim">İletişim</Link>
    </>
);

const PortfolioHeader: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return (
        <header className="w-full border-b border-border-dark bg-[#111318]/90 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
              <div className="flex items-center justify-between h-20">
                <Link href="/">
                    <Logo width={320} height={80} />
                </Link>
                
                <nav className="hidden lg:flex items-center gap-8">
                    <NavLinks />
                </nav>

                <div className="flex items-center gap-4">
                    <button className="hidden sm:flex text-slate-300 hover:text-white items-center gap-2">
                        <Heart size={20} />
                    </button>
                    <button className="bg-primary hover:bg-primary-hover text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-blue-900/20">
                        Giriş Yap
                    </button>
                    <button className="lg:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
              </div>
            </div>
             {isMenuOpen && (
                <div className="lg:hidden bg-card-dark border-t border-border-dark">
                    <nav className="flex flex-col items-center gap-4 px-4 py-6">
                        <NavLinks />
                    </nav>
                </div>
            )}
        </header>
    );
};

export default PortfolioHeader;
