
import React from 'react';
import Link from '../Link';

const AboutHero: React.FC = () => {
    return (
        <div 
            className="relative w-full h-[400px] md:h-[500px] bg-cover bg-center flex items-center justify-center" 
            style={{ backgroundImage: "linear-gradient(rgba(16, 22, 34, 0.7), rgba(16, 22, 34, 0.9)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCIiC3-3kwcGuUAaAAjCJHuF8B-9FQmPeY5xzRuz2Tcdl06_mjQShuc1YF8RDavNI14esE7d5cnLdwlEndR1WCFHR00zayt6hTSNRA3Aam0uuDVSXRjKm8kXrrzP9tsDs_MMmv_FSbYJDoV7j4q2Y71HIUaIh22oSWes7lm_aV4NQc4XyCyKAKOoQW5vc-9CLOdWgP9pWrAU0XkLSrPZ_NkOrQ3eyFHJfn5-eVXCduCAu4pdveupPg9skzoGbSFCr1G8f7tCtlMuwsq')" }}
        >
            <div className="text-center px-4 max-w-4xl flex flex-col items-center gap-6">
                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">Hakkımızda</h1>
                <div className="flex flex-wrap gap-2 items-center justify-center bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                    <Link className="text-text-secondary hover:text-white text-sm font-medium transition-colors" href="/">Anasayfa</Link>
                    <span className="text-text-secondary text-sm font-medium">/</span>
                    <span className="text-white text-sm font-medium">Hakkımızda</span>
                </div>
            </div>
        </div>
    );
};

export default AboutHero;
