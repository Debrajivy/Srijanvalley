import { Target, Eye, Phone } from 'lucide-react';

const MissionVision = () => {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Mission */}
          <div className="academic-card border-l-4 border-primary">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              "To inspire a love of learning through a holistic approach with a personal touch, 
              nurturing each child's unique potential and preparing them for academic excellence."
            </p>
          </div>

          {/* Vision */}
          <div className="academic-card border-l-4 border-accent">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center mr-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              "To empower students to become competitive, confident, and compassionate citizens 
              who contribute meaningfully to society and excel in their chosen fields."
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="academic-card bg-gradient-to-r from-green-50 to-blue-50 border border-primary/20 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Experience Excellence Firsthand
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Schedule a campus visit today and see how we're shaping tomorrow's leaders
            </p>
            <a 
              href="tel:+917079904000"
              className="btn-academic group inline-flex items-center"
            >
              <Phone className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Call 7079904000
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;