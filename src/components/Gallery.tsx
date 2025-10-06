import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
// Imported local image assets
import Bench from "../assets/Bench.webp";
import Building from "../assets/Building.webp";
import Class from "../assets/Class.webp";
import School from "../assets/School.webp";
import Student from "../assets/Student.webp";
import StudentScience from "../assets/StudentScience.webp";

const Gallery = () => {
 const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
 // Gallery images with descriptions - UPDATED to use local imports
 const galleryImages = [
  {
   src: Class, // Use the imported image path directly
   alt: "Modern Classroom",
   title: "Modern Classrooms",
   description: "Clean, spacious classrooms designed for focused learning."
  },
  {
   src: StudentScience,
   alt: "Student in Science Lab",
   title: "Hands-on Science Labs",
   description: "Equipped labs for practical learning and experimentation."
  },
  {
   src: Building,
   alt: "School Building and Campus",
   title: "State-of-the-Art Campus",
   description: "Our impressive main building and vast, safe campus area."
  },
  {
   src: Student,
   alt: "Student Study Time",
   title: "Focused Individual Study",
   description: "Encouraging a quiet, dedicated environment for academic growth."
  },
  {
   src: School,
   alt: "School Gate and Entrance",
   title: "Grand School Entrance",
   description: "A welcoming and secure entry point for all students."
  },
  {
   src: Bench,
   alt: "Outdoor Seating Area",
   title: "Relaxing Outdoor Spaces",
   description: "Safe and green areas for students to relax and socialize."
  },
  
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

 // Define the primary color class
 const PRIMARY_ORANGE_TEXT = 'text-orange-600';

 return (
  <section id="gallery" className="section-padding bg-background">
   <div style={{marginTop:-90}} className="section-container">
    {/* Section Header */}
    <div className="text-center mb-16">
     <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
      Campus
      <span className={PRIMARY_ORANGE_TEXT + " ml-3"}> {/* Replaced text-primary with text-orange-600 for consistency */}
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
         // Use the updated src from the galleryImages array
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
     <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      {/* Close Button */}
      <button 
       onClick={closeLightbox}
       className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
      >
       <X size={32} />
      </button>

      {/* Navigation Buttons */}
      <button 
       onClick={() => navigateImage('prev')}
       className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
      >
       <ChevronLeft size={32} />
      </button>
      <button 
       onClick={() => navigateImage('next')}
       className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
      >
       <ChevronRight size={32} />
      </button>

      {/* Image */}
      <div className="max-w-4xl max-h-full">
       <img 
        src={galleryImages[selectedImage].src}
        alt={galleryImages[selectedImage].alt}
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
       // Replaced btn-academic with explicit orange styling for consistency
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