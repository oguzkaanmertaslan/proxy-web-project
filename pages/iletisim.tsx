import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactHero from '@/components/contact/ContactHero';
import OfficeInfo from '@/components/contact/OfficeInfo';
import ContactFormAndMap from '@/components/contact/ContactFormAndMap';

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white text-slate-900 font-body">
            <Header />
            <main className="flex-grow pt-20 flex flex-col items-center">
                <ContactHero />
                <OfficeInfo />
                <ContactFormAndMap />
            </main>
            <Footer />
        </div>
    );
}

