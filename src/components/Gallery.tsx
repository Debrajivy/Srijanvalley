import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Gallery images with descriptions
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop",
      alt: "Modern Smart Classroom",
      title: "Smart Classrooms",
      description: "Interactive digital boards and modern learning environment"
    },
    {
      src: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
      alt: "Science Laboratory",
      title: "Advanced Science Labs",
      description: "Well-equipped physics, chemistry, and biology laboratories"
    },
    {
      src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
      alt: "School Library",
      title: "Extensive Library",
      description: "Vast collection of books and digital resources"
    },
    {
      src: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
      alt: "Cricket Ground",
      title: "Sports Facilities",
      description: "Cricket ground and various outdoor sports facilities"
    },
    {
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
      alt: "Computer Lab",
      title: "Computer Laboratory",
      description: "Modern computers and technology learning center"
    },
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      alt: "School Campus",
      title: "Beautiful Campus",
      description: "2+ acres of green, safe, and inspiring learning environment"
    },
    {
      src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop",
      alt: "Art Studio",
      title: "Creative Arts Studio",
      description: "Dedicated spaces for art, craft, and creative expression"
    },
    {
      src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=600&fit=crop",
      alt: "Music Room",
      title: "Music & Performance",
      description: "Music rooms and auditorium for cultural activities"
    },
    {
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
      alt: "Students in Activity",
      title: "Active Learning",
      description: "Students engaged in hands-on learning activities"
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

  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Campus
            <span className="text-primary ml-3">
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
              className="btn-academic"
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