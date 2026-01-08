import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from '@/components/about/AboutHero';
import IntroSection from '@/components/about/IntroSection';
import MissionVision from '@/components/about/MissionVision';
import ValuesSection from '@/components/about/ValuesSection';
import CtaSection from '@/components/about/CtaSection';

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white text-slate-900 font-body">
            <Header />
            <main className="flex-grow pt-20">
                <AboutHero />
                <IntroSection />
                <MissionVision />
                <ValuesSection />
                <CtaSection />
            </main>
            <Footer />
        </div>
    );
}

