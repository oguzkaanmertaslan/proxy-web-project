
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';
import Link from './Link';
import Logo from './Logo';

const NavLinks = ({ currentPath }: { currentPath: string }) => {
    const getLinkClass = (href: string) => {
        const baseClass = "text-sm font-medium transition-colors";
        const isActive = href === '/' ? currentPath === '/' : currentPath.startsWith(href);
        if (isActive) {
            return `${baseClass} text-primary`;
        }
        return `${baseClass} text-slate-600 hover:text-primary`;
    };

    return (
        <>
            <Link className={getLinkClass('/')} href="/">Ana Sayfa</Link>
            <Link className={getLinkClass('/portfoy')} href="/portfoy">Portföy</Link>
            <Link className={getLinkClass('/projeler')} href="/projeler">Projeler</Link>
            <Link className={getLinkClass('/hakkimizda')} href="/hakkimizda">Hakkımızda</Link>
            <Link className={getLinkClass('/iletisim')} href="/iletisim">İletişim</Link>
        </>
    );
};

const Header: React.FC = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const path = router.asPath;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="block">
                        <div className="flex items-center h-24 w-[400px] overflow-hidden">
                            <Logo width={400} height={100} className="w-full h-auto text-primary" />
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        <NavLinks currentPath={path} />
                    </nav>

                    <div className="flex items-center gap-4">
                        <button className="md:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-200">
                    <nav className="flex flex-col items-center gap-4 px-4 py-6">
                        <NavLinks currentPath={path} />
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;

