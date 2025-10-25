import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import LogoFinal from '../assets/LogoFinal.webp';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // This state is no longer used for styling but is kept in case you need it later.
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // const navItems = [
  //   { name: 'Why Us', href: '#why-us' },
  //   { name: "Who It's For", href: '#who-its-for' },
  //   { name: 'Numbers', href: '#numbers' },
  //   { name: 'Benefits', href: '#benefits' },
  //   { name: 'Team', href: '#team' },
  //   { name: 'Gallery', href: '#gallery' },
  //   { name: 'Contact', href: '#contact' },
  // ];
  const navItems = [
    { name: 'About us', href: '#about-us' },
    { name: "Our Visionary", href: '#mission-vision' },
    { name: 'Benefits', href: '#benefits' },
    // { name: 'Curriculum & Activities', href: '#curriculum-activities' },
    { name: 'Our Team', href: '#team' },
    { name: 'Events', href: '#events' },
    // { name: 'Events ', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      // CHANGE 1: Set a permanent white background with a bottom border and shadow.
      className="fixed top-0 left-0 right-0 z-[90] transition-all duration-300 bg-white shadow-md border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo and School Name Section (Left Side) */}
          <div className="flex items-center space-x-3">
            <div className="w-24 h-24 flex items-center justify-center flex-shrink-0">
              <img
                src={LogoFinal}
                alt="Srijan Valley School Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex-col hidden sm:flex">
              {/* CHANGE 2: Set permanent black/gray text colors. */}
              <h1 className="text-lg font-bold text-gray-900">Srijan Valley School</h1>
              <p className="text-xs text-gray-600"> English Medium</p>
            </div>
            <div className="flex-col sm:hidden">
              <h1 className="text-lg font-bold text-gray-900">Srijan Valley School</h1>
            </div>
          </div>

          {/* Desktop Navigation (Hidden on Mobile) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                // CHANGE 3: Set permanent dark text color for nav links.
                className="text-gray-700 hover:text-primary transition-colors duration-300 font-medium text-sm"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop Apply Button */}
          <div className="hidden lg:block flex-shrink-0">
            <button
              onClick={() => handleNavClick('#contact')}
              className="btn-academic"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button (FAR RIGHT) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            // CHANGE 4: Set permanent black color for the mobile menu icon.
            className="lg:hidden p-2 text-black hover:text-primary transition-colors z-[100]"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu (No changes needed here as it already has a light theme) */}
      <div
        className={`lg:hidden fixed top-0 h-screen w-4/5 max-w-xs bg-background border-l border-border shadow-2xl transition-transform duration-300 z-[95] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } right-0`}
      >
        <div className="flex justify-between items-center p-4 h-20 bg-background/95 border-b border-border shadow-sm">
          <span className="text-xl font-bold text-foreground">Menu</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-orange-500 hover:text-orange-600 p-2"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="py-2 overflow-y-auto h-[calc(100vh-5rem)]">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className="block w-full text-left px-6 py-4 text-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200"
            >
              {item.name}
            </button>
          ))}
          <div className="px-6 pt-6">
            <button
              onClick={() => handleNavClick('#contact')}
              className="btn-academic w-full justify-center"
            >
              Apply Now
            </button>
          </div>
        </nav>
      </div>

      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[94] transition-opacity duration-300"
        />
      )}
    </header>
  );
};

export default Header;