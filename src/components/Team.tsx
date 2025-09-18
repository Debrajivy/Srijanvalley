import { GraduationCap, Award, Building2, Lightbulb } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'IAS Pramod Agrawal',
      role: 'Founder & Chairman',
      credentials: 'Ex-Chairman Coal India Ltd, IIT Mumbai & IIT Delhi',
      description: 'Leading educational vision with decades of administrative excellence and commitment to quality education.',
      icon: Award,
      gradient: 'bg-blue-600'
    },
    {
      name: 'Dr. Renu Agrawal',
      role: 'Academic Director',
      credentials: 'Ex-Senior Professor, Educational Excellence',
      description: 'Bringing years of academic experience and pedagogical expertise to curriculum development and teaching excellence.',
      icon: GraduationCap,
      gradient: 'bg-purple-600'
    },
    {
      name: 'Prateek Agrawal',
      role: 'Technology & Innovation Head',
      credentials: 'Data & AI Entrepreneur, MS Texas',
      description: 'Integrating cutting-edge technology and modern teaching methodologies to enhance learning experiences.',
      icon: Lightbulb,
      gradient: 'bg-green-600'
    },
    {
      name: 'Eeshani Agrawal',
      role: 'Student Development Head',
      credentials: 'Data & AI Entrepreneur, MS Texas',
      description: 'Focusing on holistic student development, career guidance, and preparing students for global opportunities.',
      icon: Building2,
      gradient: 'bg-cyan-600'
    }
  ];

  return (
    <section id="team" className="section-padding bg-gradient-to-b from-muted/30 to-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Our Distinguished
            <span className="text-primary ml-3">
              Leadership Team
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the accomplished professionals who are committed to shaping your child's future through excellence in education
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="academic-card group relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 ${member.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon & Role */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl ${member.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <member.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-accent">{member.role}</div>
                  </div>
                </div>
                
                {/* Name */}
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {member.name}
                </h3>
                
                {/* Credentials */}
                <p className="text-primary font-semibold mb-4">
                  {member.credentials}
                </p>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Leadership Values */}
        <div className="academic-card bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Education-First Leadership
          </h3>
          <p className="text-lg text-muted-foreground mb-6">
            Unlike institutions run by real estate developers, Srijan Valley is led by genuine educators 
            and accomplished professionals who understand the true value of quality education. Our leadership team 
            brings together decades of experience in academics, administration, and innovation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">IAS/IIT</div>
              <div className="text-sm text-muted-foreground">Alumni Leadership</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">40+</div>
              <div className="text-sm text-muted-foreground">Years Combined Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Education Focused</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;