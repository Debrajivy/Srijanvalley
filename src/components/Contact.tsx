import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Application Submitted Successfully!",
        description: "We'll contact you within 24 hours to discuss admission details.",
      });
      setFormData({ parentName: '', email: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Location',
      details: ['Pithoria, Ranchi', 'Jharkhand, India', '10 minutes from Kanke Road'],
      action: { text: 'See on Map', link: '#' }
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 7044406882', 'Admissions Hotline', 'Monday to Saturday'],
      action: { text: 'Call Now', link: 'tel:+917044406882' }
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@srijanvalleyschool.com', 'Quick Response Guaranteed', 'Within 24 hours'],
      action: { text: 'Send Email', link: 'mailto:info@srijanvalleyschool.com' }
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Saturday: 8 :30 AM to 2:30 PM'],
      action: null
    }
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-muted/30 to-background">
      <div style={{marginTop:-90}} className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
         
            <span className="text-primary ml-3">
              Contact Us
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to secure your child's future? Get in touch with us today. Limited seats available for the new academic session.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="academic-card bg-primary text-white">
              {/* <h3 className="text-2xl font-bold mb-4"> Admissions Closing Soon!</h3> */}
              <p className="text-lg mb-4">
                Don't miss this opportunity to give your child the best education. 
                Our limited seats are filling up fast for the upcoming academic year.
              </p>
              <div className="flex items-center text-yellow-200">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-semibold">Apply before seats are full!</span>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="academic-card">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mr-4">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground">{info.title}</h4>
                  </div>
                  <div className="space-y-1 mb-4">
                    {info.details.map((detail, detailIndex) => (
                      <p 
                        key={detailIndex} 
                        className={`${detailIndex === 0 ? 'text-foreground font-semibold' : 'text-muted-foreground'} text-sm`}
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                  {info.action && (
                    <a 
                      href={info.action.link}
                      className="inline-flex items-center text-primary hover:text-accent transition-colors text-sm font-medium"
                    >
                      {info.action.text}
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <div className="academic-card">
            <h3 className="text-2xl font-bold text-foreground mb-6">Submit Your Application</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="parentName" className="block text-sm font-semibold text-foreground mb-2">
                  Parent's Name *
                </label>
                <input
                  type="text"
                  id="parentName"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Message / Requirements
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none"
                  placeholder="Tell us about your child's grade, interests, or any specific requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-academic w-full group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Submit Application
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-muted-foreground text-sm mb-4">
                Prefer to call? Our admissions team is ready to help
              </p>
              <a 
                href="tel:+917044406882"
                className="btn-secondary-academic"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call 7044406882
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;