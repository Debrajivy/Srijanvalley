import { MapPin, Phone, Mail, GraduationCap } from 'lucide-react';
import LogoFinal from '../assets/LogoFinal.webp';
import { useState } from 'react';
import ApplyNowForm from './ApplyNowForm'; // Import the ApplyNowForm component

const Footer = () => {
  const [showApplyForm, setShowApplyForm] = useState(false);

  const quickLinks = [
    // { name: 'Why Choose Us', href: '#why-us' },
    { name: 'Who It\'s For', href: '#who-its-for' },
    { name: 'Our Numbers', href: '#numbers' },
    { name: 'Benefits', 'href': '#benefits' },
    { name: 'Our Team', href: '#team' },
    { name: 'Gallery', href: '#gallery' },
  ];

  // Bing Maps URL
  const mapsUrl = 'https://www.bing.com/maps?where=G7FV%2BFRR+Sutiambe%2C+Chowk%2C+Pithauriya%2C+Ranchi%2C+Jharkhand+834006%2C+IN&cp=23.533201%7E85.295166&lvl=14.7';

  const handleLinkClick = (href: string) => {
    if (href === '#contact') {
      setShowApplyForm(true);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCloseForm = () => {
    setShowApplyForm(false);
  };

  return (
    <>
      {/* Background color set to #EDEDED and existing negative margin preserved. */}
      <footer style={{ backgroundColor: '#EDEDED', marginTop: -50 }} className="border-t border-border" >
        <div className="section-container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* School Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">

                <div className="inline-block">
                  <img
                    src={LogoFinal}
                    alt="Srijan Valley School Logo"
                    className="w-40 h-auto"
                  />

                  <h3 style={{ marginTop: -30 }} className="text-xl font-bold text-foreground">Srijan Valley School</h3>
                  <p className="text-sm text-muted-foreground">CBSE • English Medium</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Committed to providing excellence in education with a personal touch.
                Led by IAS/IIT alumni, we prepare students for competitive success and holistic development.
              </p>
              <div className="space-y-3">
                <div className="flex items-start text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-3 mt-1 text-primary flex-shrink-0" />
                  <div className="flex flex-col">
                    {/* Address Detail */}
                    <span>Pithoria, 10 minutes from Kanke Road, Ranchi, Jharkhand, India</span>
                    {/* VIEW ON MAP HYPERLINK */}
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors text-sm font-medium mt-1 inline-block"
                    >
                      View on Map
                    </a>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="w-4 h-4 mr-3 text-primary" />
                  <a href="tel:+917044406882" className="hover:text-primary transition-colors">
                    +91 7044406882
                  </a>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Mail className="w-4 h-4 mr-3 text-primary" />
                  <a href="mailto:info@srijanvalleyschool.com" className="hover:text-primary transition-colors">
                    info@srijanvalleyschool.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-foreground mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-muted-foreground hover:text-primary transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Info */}
            <div>
              <h4 className="text-lg font-bold text-foreground mb-6">Important</h4>
              <div className="space-y-4">
                <div className="academic-card p-5 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                  <h5 className="font-semibold text-foreground mb-2">Admissions Open</h5>
                  <p className="text-sm text-muted-foreground mb-3">
                    Limited seats available for the new academic session
                  </p>
                  <button
                    onClick={() => setShowApplyForm(true)}
                    className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-muted-foreground text-sm text-center md:text-left">
                © 2025 Srijan Valley School. All rights reserved.
              </p>
              {/* **MODIFIED FOR MOBILE RESPONSIVENESS** */}
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mt-4 md:mt-0 text-center md:text-left">
                <span className="text-sm text-muted-foreground">
                  IAS/IIT Alumni Led Institution
                </span>
                <span className="text-sm text-muted-foreground">
                  {/* CBSE Affiliated */}
                </span>
                <span className="text-sm text-muted-foreground">
                  English Medium
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Apply Now Form Modal */}
      {showApplyForm && (
        <ApplyNowForm onClose={handleCloseForm} isOpen={showApplyForm} /> 
 )}
    </>
  );
};

export default Footer;