import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import MissionVision from '@/components/MissionVision';
import WhoItsFor from '@/components/WhoItsFor';
import NumbersSection from '@/components/NumbersSection';
import Benefits from '@/components/Benefits';
import Team from '@/components/Team';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Assuming AdmissionTicker is located at '@/components/AdmissionTicker'


const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* 1. The Ticker is placed at the very top */}

      {/* 2. Wrap all remaining content in a logical container to ensure proper vertical stacking
           and to cleanly follow the full-width ticker. */}
      <main className="relative z-10">
        <Header />
        <Hero />
        <WhyChooseUs />
        <MissionVision />
        <WhoItsFor />
        <NumbersSection />
        <Benefits />
        <Team />
        <Gallery />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

export default Index;