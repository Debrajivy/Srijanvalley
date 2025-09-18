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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
    </div>
  );
};

export default Index;
