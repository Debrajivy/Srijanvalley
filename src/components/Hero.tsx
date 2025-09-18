import { Phone, Calendar } from 'lucide-react';
import heroImage from '@/assets/srijan.webp';

const Hero = () => {
  const handleApplyClick = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVisitClick = () => {
    window.location.href = 'tel:+917079904000';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Minimal Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content */}
      <div className="relative z-10 section-container text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Secure Your Child's
            <div style={{marginTop:10}}>
            <span className="block text-primary" style={{backgroundColor:'white',color:'brown', height:'auto', padding:20, textAlign:'center', alignItems:'center'}}>
              Future at Srijan Valley
            </span>

            </div>
          </h1>
          
          {/* Subheading */}
          <div className="text-xl md:text-2xl lg:text-3xl mb-8 space-y-2">
            <p className="font-semibold">IAS / IIT Alumni Promoted</p>
            <p className="text-accent font-medium" style={{color:'white'}}>CBSE Affiliated • 100% English Medium School</p>
            <p className="text-lg md:text-xl">Pithoriya, Ranchi</p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={handleApplyClick}
              className="btn-academic group"
            >
              <span>Apply Now</span>
              <div className="ml-2 transform group-hover:scale-110 transition-transform">
                📚
              </div>
            </button>
            
            {/* <button 
              onClick={handleVisitClick}
              className="btn-secondary-academic group"
            >
              <Calendar className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              <span>Book a Visit</span>
            </button> */}
          </div>
          
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-primary mb-2">2+</div>
              <div className="text-sm">Acres Campus</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-primary mb-2">1:15</div>
              <div className="text-sm">Teacher-Student Ratio</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-primary mb-2">1:1</div>
              <div className="text-sm">Personal Mentorship</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;