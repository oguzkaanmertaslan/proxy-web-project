import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedProperties from '@/components/FeaturedProperties';
import Projects from '@/components/Projects';
import Cta from '@/components/Cta';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white overflow-x-hidden font-outfit">
      <Header />
      <Hero />
      <FeaturedProperties />
      <Projects />
      <Cta />
      <Footer />
    </div>
  );
}
