import { useEffect, useRef, useState } from 'react';
import { MapPin, Users, UserCheck, Calendar } from 'lucide-react';

// Define primary colors for consistency across the site
const PRIMARY_ORANGE_BG = 'bg-orange-600';
const PRIMARY_ORANGE_TEXT = 'text-orange-600';

const NumbersSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Note: The 'color' property in stats is no longer used for icons/numbers,
  // but is kept for the subtle background effect if desired.
  const stats = [
    {
      icon: MapPin,
      number: 2,
      suffix: '+',
      label: 'Acres Campus',
      description: 'Spacious, green campus for holistic development',
      color: 'bg-green-500' // Used for background flair only
    },
    {
      icon: Users,
      number: 15,
      prefix: '1:',
      label: 'Teacher-Student Ratio',
      description: 'Ensuring personalized attention for every child',
      color: 'bg-blue-500' // Used for background flair only
    },
    {
      icon: UserCheck,
      number: 1,
      prefix: '1:',
      label: 'Personal Mentorship',
      description: 'Dedicated mentorship for every student',
      color: 'bg-accent' // Used for background flair only
    },
    {
      icon: Calendar,
      number: 10,
      label: 'Minutes from Kanke Road',
      description: 'Convenient location in Pithoria, Ranchi',
      color: 'bg-purple-500' // Used for background flair only
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Updated AnimatedNumber component definition to handle potential TypeScript context (if applicable)
  const AnimatedNumber = ({ value, prefix = '', suffix = '' }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [isVisible, value]);

    return (
      <span className="text-4xl md:text-5xl lg:text-6xl font-bold">
        {prefix}{displayValue}{suffix}
      </span>
    );
  };

  return (
    <section id="numbers" ref={sectionRef} className="section-padding bg-gradient-to-b from-muted/30 to-background">
      <div style={{ marginTop: -90 }} className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Srijan Valley in
            {/* CHANGED: Text color to primary orange */}
            <span className={PRIMARY_ORANGE_TEXT + " ml-3"}> 
              Numbers
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The facts and figures that make us the preferred choice for quality education in Ranchi
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="academic-card text-center group relative overflow-hidden"
            >
              {/* Background Effect (Uses original mixed color for subtle flair) */}
              <div className={`absolute inset-0 ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon: CHANGED background to PRIMARY_ORANGE_BG */}
                <div className={`w-16 h-16 mx-auto rounded-2xl ${PRIMARY_ORANGE_BG} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {/* Icon is now WHITE text-white */}
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Number: CHANGED text color to PRIMARY_ORANGE_TEXT */}
                <div className={PRIMARY_ORANGE_TEXT + " mb-4"}>
                  <AnimatedNumber 
                    value={stat.number} 
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                
                {/* Label */}
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {stat.label}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="academic-card bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Excellence in Every Aspect
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              From our meticulously designed campus to our carefully maintained student-teacher ratios, 
              every number reflects our commitment to providing the best educational experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  const element = document.querySelector('#gallery');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary-academic"
              >
                Explore Campus
              </button>
              <button 
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-academic"
              >
                Schedule a Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NumbersSection;