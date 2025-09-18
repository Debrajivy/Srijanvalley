import { Users, GraduationCap, Building, Clock, Award, Heart } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: Users,
      title: 'Personal Attention',
      description: 'Small class sizes with 1:15 teacher-student ratio ensuring every child receives individual focus and guidance.',
      points: ['Individual learning plans', 'Regular parent-teacher meetings', 'Personalized feedback system']
    },
    {
      icon: GraduationCap,
      title: 'Expert Leadership',
      description: 'Institution led by distinguished IAS/IIT alumni, not real estate developers - education is our core expertise.',
      points: ['IAS Pramod Agrawal leadership', 'Academic excellence focus', 'Professional education approach']
    },
    {
      icon: Building,
      title: 'Modern Infrastructure',
      description: 'State-of-the-art facilities designed specifically for comprehensive learning and development.',
      points: ['Smart classrooms with digital boards', 'Well-equipped science & computer labs', 'Extensive library with digital resources', 'Cricket ground & sports facilities']
    }
  ];

  const additionalFeatures = [
    { icon: Clock, title: 'Extended Learning', description: 'After-school tutoring and doubt-clearing sessions' },
    { icon: Award, title: 'Competitive Edge', description: 'Special coaching for JEE, NEET, and olympiads' },
    { icon: Heart, title: 'Holistic Care', description: 'Focus on emotional and social development' }
  ];

  return (
    <section id="benefits" className="section-padding bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Why We're 
            <span className="text-primary ml-3">
              Different
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover what sets Srijan Valley School apart from other educational institutions in Ranchi
          </p>
        </div>

        {/* Main Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="academic-card group">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {benefit.description}
              </p>
              
              {/* Feature Points */}
              <ul className="space-y-3">
                {benefit.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {additionalFeatures.map((feature, index) => (
            <div key={index} className="academic-card text-center border border-primary/10">
              <div className="w-12 h-12 mx-auto rounded-xl bg-accent flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">{feature.title}</h4>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="academic-card bg-primary text-white max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Give Your Child the Best?
            </h3>
            <p className="text-xl leading-relaxed mb-8">
              Join hundreds of families who have trusted us with their children's future. 
              Limited seats available - secure your child's spot today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Apply Now - Admissions Closing Soon!
              </button>
              <a 
                href="tel:+917079904000"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-300"
              >
                Book a School Tour
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;