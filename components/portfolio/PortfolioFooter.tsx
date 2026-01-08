
import React from 'react';
import Link from '../Link';

const PortfolioFooter: React.FC = () => {
    return (
        <footer className="border-t border-border-dark bg-[#0c1017] py-8 mt-auto">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
                <p>© 2024 Proxy Gayrimenkul. Tüm hakları saklıdır.</p>
                <div className="flex gap-6">
                    <Link className="hover:text-primary transition-colors" href="#">Gizlilik Politikası</Link>
                    <Link className="hover:text-primary transition-colors" href="#">Kullanım Şartları</Link>
                </div>
            </div>
        </footer>
    );
};

export default PortfolioFooter;
