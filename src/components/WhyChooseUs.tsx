import { BookOpen, Users, Building2, Star } from 'lucide-react';
import FocusEducation from "../assets/FocusedEducation.webp";
import PersonalAttention from "../assets/PersonalAttention.webp";
import ModernInfrastructure from "../assets/ModernInfrastructure.webp";

const WhyChooseUs = () => {
  const PRIMARY_ORANGE_TEXT = 'text-orange-600';

  const features = [
    {
      image: FocusEducation, 
      title: 'Focused Education',
      description: 'CBSE curriculum with exam prep orientation for JEE, NEET, and competitive exams.',
    },
    {
      image: PersonalAttention,
      title: 'Personal Attention',
      description: '1:15 teacher-student ratio with dedicated 1:1 mentorship for every child.',
    },
    {
      image: ModernInfrastructure,
      title: 'Modern Infrastructure',
      description: 'Smart classrooms, well-equipped labs, extensive library, cricket ground, and safe play areas.',
    }
  ];

  return (
    <section id="why-us" className="section-padding bg-gradient-to-b from-muted/50 to-background">
      <div className="section-container" style={{ marginTop: -50 }}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Why Choose 
            <span className={PRIMARY_ORANGE_TEXT + " ml-3"}> 
              Srijan Valley?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Excellence in education with a personal touch, guided by IAS/IIT alumni leadership
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="rounded-3xl shadow-xl transition-all duration-500 transform hover:scale-[1.03] bg-white border border-gray-100 hover:shadow-2xl hover:border-orange-500 group overflow-hidden"
            >
              {/* 1. Image Container: Removed fixed height (h-40) and background color (bg-gray-50) */}
              <div className="w-full h-auto flex items-center justify-center rounded-t-3xl overflow-hidden">
                <img 
                  // 2. FIX: Ensure compatibility with Next.js image imports
                  src={feature.image}
                  alt={feature.title + " illustration"}
                  // 3. Image Styling: w-full and object-contain to display full image
                  className="w-full h-auto object-contain" 
                />
              </div>
              
              {/* Content: Retains padding and centering */}
              <div className="p-6 text-center">
                <h3 className={`text-2xl font-bold ${PRIMARY_ORANGE_TEXT} mb-4 transition-colors duration-300`}>
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              
            </div>
          ))}
        </div>

        {/* Leadership Callout is commented out */}
      </div>
    </section>
  );
};

export default WhyChooseUs;