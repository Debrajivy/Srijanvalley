import { BookOpen, Users, Building2, Star } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Focused Education',
      description: 'CBSE curriculum with exam prep orientation for JEE, NEET, and competitive exams.',
      gradient: 'bg-blue-500'
    },
    {
      icon: Users,
      title: 'Personal Attention',
      description: '1:15 teacher-student ratio with dedicated 1:1 mentorship for every child.',
      gradient: 'bg-accent'
    },
    {
      icon: Building2,
      title: 'Modern Infrastructure',
      description: 'Smart classrooms, well-equipped labs, extensive library, cricket ground, and safe play areas.',
      gradient: 'bg-green-500'
    }
  ];

  return (
    <section id="why-us" className="section-padding bg-gradient-to-b from-muted/50 to-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Why Choose 
            <span className="text-primary ml-3">
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
              className="academic-card group"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Leadership Callout */}
        {/* <div className="academic-card bg-primary text-white max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Star className="w-8 h-8 text-yellow-300 mr-3" />
            <h3 className="text-2xl md:text-3xl font-bold">Distinguished Leadership</h3>
            <Star className="w-8 h-8 text-yellow-300 ml-3" />
          </div>
          <p className="text-xl leading-relaxed">
            Led by <strong>IAS Pramod Agrawal</strong> (Ex-Chairman, Coal India Ltd) and other 
            distinguished IIT/IAS alumni - ensuring your child learns from the best.
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default WhyChooseUs;