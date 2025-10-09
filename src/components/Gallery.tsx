import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
// Imported local image assets
import Bench from "../assets/Bench.webp";
import Building from "../assets/Building.webp";
import Class from "../assets/Class.webp";
import School from "../assets/School.webp";
import Student from "../assets/Student.webp";
import StudentScience from "../assets/StudentScience.webp";
import ModernInfrastructure from "../assets/ModernInfrastructure.webp";
import ModernClassroomStudy from "../assets/ModernClassroomStudy.jpg";
import Indoorgames from "../assets/Indoorgames.jpg";
import SchoolEvents from "../assets/SchoolEvents.jpg";
import PlayGround from "../assets/PlayGround.jpg";
import Activity from "../assets/Activity.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Gallery images with descriptions
  const galleryImages = [
    {
      src: ModernInfrastructure,
      alt: "Modern Infrastructure",
      title: "Modern Infrastructures",
      description: "Spacious, clean, and well-maintained indoor facilities that support a wide range of academic and recreational activities."
    },
    {
      src: School,
      alt: "School Gate and Entrance",
      title: "Grand School Entrance",
      description: "A welcoming and secure entry point for all students."
    },
    {
      src: ModernClassroomStudy, // Suggested image variable name
      alt: "Students focused on individual work at ergonomic desks in a bright classroom.",
      title: "Our Academics",
      description: "Bright, modern classrooms with comfortable desks designed to maximize student focus and learning."
    },
    {
      src: Indoorgames, // Placeholder: Use a relevant variable name for the photo of children playing carrom.
      alt: "Children playing carrom and engaging in indoor games.",
      title: "Games & Strategic Play",
      description: "Dedicated indoor recreation zones for tabletop games like carrom , fostering strategic thinking, discipline, and social interaction."
    },
    {
      src: SchoolEvents, // Placeholder: Use the variable name for your Independence Day image
      alt: "Students and staff participating in the flag hoisting ceremony and cultural programs.",
      title: "School Events", // The requested overall title
      description: "Independence Day is celebrated with a flag hoisting ceremony and patriotic programs, instilling national pride in all students."
    },
    {
      src: PlayGround, // Placeholder: Use the variable name for your PlayGround image
      alt: "Students actively playing on the school playground with various sports equipment.",
      title: "Play & Sports Facilities", // A short, easy-to-understand title
      description: "Spacious sports facilities where students engage in play and games to support their physical and mental development."
    },
    {
      src: Activity, // Placeholder for your general activity image
      alt: "Students participating in various recreational and extracurricular activities.",
      title: "Student Activities", // The easiest title
      description: "A wide range of co-curricular and recreational activities support holistic development, encouraging creativity, social skills, and fun."
    }


  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;

    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  const PRIMARY_ORANGE_TEXT = 'text-orange-600';

  return (
    <section id="gallery" className="section-padding bg-background">
      <div style={{ marginTop: -90 }} className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Campus
            <span className={PRIMARY_ORANGE_TEXT + " ml-3"}>
              Gallery
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Take a virtual tour of our state-of-the-art facilities, modern classrooms, and vibrant learning spaces
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="academic-card p-0 overflow-hidden group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-lg font-bold mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-200">{image.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          // Lightbox Container: Increased z-index from z-50 to z-[999] (Tailwind custom value) 
          // to guarantee it sits above all other elements.
          <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center p-4">

            {/* Close Button - FIX: Ensure z-index is high */}
            <button
              onClick={closeLightbox}
              // Changed z-10 to z-[1000] (higher than the main container) 
              // and added 'cursor-pointer' for visual feedback.
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-[1000] cursor-pointer"
            >
              <X size={32} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-[1000]"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-[1000]"
            >
              <ChevronRight size={32} />
            </button>

            {/* Image */}
            {/* The image container remains on a lower z-index layer than the controls */}
            <div className="max-w-4xl max-h-full relative z-50">
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                // IMPORTANT: Use object-contain to ensure the image doesn't block controls
                className="max-w-full max-h-full object-contain"
              />
              {/* Image Info */}
              <div className="text-center mt-4 text-white">
                <h3 className="text-xl font-bold mb-2">{galleryImages[selectedImage].title}</h3>
                <p className="text-gray-300">{galleryImages[selectedImage].description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="academic-card bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              See It for Yourself
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Pictures tell a story, but experiencing our campus firsthand will show you why
              Srijan Valley is the right choice for your child's education.
            </p>
            <button
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-orange-700 transition-colors duration-300`}
            >
              Schedule Campus Visit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;