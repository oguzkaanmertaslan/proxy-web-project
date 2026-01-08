
import React from 'react';
import Link from '../Link';

const DetailFooter: React.FC = () => {
    return (
        <footer className="mt-12 border-t border-border-dark bg-[#111318] py-8 px-10">
            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <Link href="/" className="block">
                    <div className="w-[240px] h-[60px]">
                         <img 
                            src="/logo.png" 
                            alt="Proxy Logo" 
                            className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity" 
                        />
                    </div>
                </Link>
                <p className="text-sm text-slate-400 font-medium">© 2024 Proxy Gayrimenkul. Tüm hakları saklıdır.</p>
            </div>
        </footer>
    );
};

export default DetailFooter;
