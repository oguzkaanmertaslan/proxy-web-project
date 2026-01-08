
import React from 'react';
import { Search } from 'lucide-react';
import Link from '../Link';

const Logo = () => (
    <Link href="/" className="flex items-center gap-4">
        <div className="h-16 w-64">
            <img 
                src="/logo.png" 
                alt="Proxy Real Estate & Investment Logo" 
                className="h-full w-full object-contain" 
            />
        </div>
    </Link>
);

const DetailHeader: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-border-dark bg-[#111318] px-10 py-3 shadow-sm">
            <div className="flex items-center gap-8">
                <Logo />
                <div className="hidden lg:flex items-center gap-9">
                    <Link className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="/">Ana Sayfa</Link>
                    <Link className="text-primary text-sm font-bold border-b-2 border-primary py-1" href="/portfoy">Portföy</Link>
                    <Link className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="/projeler">Projeler</Link>
                    <Link className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="/hakkimizda">Hakkımızda</Link>
                    <Link className="text-slate-300 hover:text-primary text-sm font-medium transition-colors" href="/iletisim">İletişim</Link>
                </div>
            </div>
            <div className="flex flex-1 justify-end gap-8">
                <div className="hidden md:flex items-center h-10 w-full max-w-64 rounded-lg bg-[#282e39] border border-border-dark">
                    <div className="text-text-secondary flex items-center justify-center pl-4">
                        <Search size={20} />
                    </div>
                    <input className="form-input flex w-full flex-1 bg-transparent focus:outline-0 focus:ring-0 border-none text-white h-full placeholder:text-text-secondary pl-2 text-sm" placeholder="İlan ara..." />
                </div>
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-primary-hover transition-colors text-white text-sm font-bold">
                    <span className="truncate">Giriş Yap</span>
                </button>
            </div>
        </header>
    );
};

export default DetailHeader;
