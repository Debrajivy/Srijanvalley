"use client";
import React, { useState } from "react";
import { Maximize, X } from "lucide-react";

// --- 1. Asset Imports (Existing) ---
import ScienceExhibition from "../assets/ScienceExhibition.webp"; 
import ScienceExhibition2 from "../assets/ScienceExhibition2.webp"; 
import IndependenceDay1 from "../assets/IndependenceDay1.webp"; 
import IndependenceDay2 from "../assets/IndependenceDay2.webp"; 
import IndependenceDay3 from "../assets/IndependenceDay3.webp"; 
import IndependenceDay4 from "../assets/IndependenceDay4.webp"; 
import SciencePresentation1 from "../assets/SciencePresentation1.webp"; 
import StudentEnvironment from "../assets/StudentEnvironment.webp"; 
import Carrom1 from "../assets/Carrom1.webp"; 
import Carrom2 from "../assets/Carrom2.webp"; 


// --- Configuration (Existing) ---
const COLOR_PRIMARY = "#ea590e"; 
const COLOR_BLACK = "text-black";
const COLOR_GRAY = "text-gray-700";
const COLOR_LIGHTGRAY_BG = "#f5f5f5"; 

// --- 2. Event Data Structure (Existing) ---
interface Photo {
  id: number;
  url: string; 
  description: string;
}

interface Event {
  id: number;
  category: string;
  title: string;
  previewPhoto: string; 
  description: string; 
  photos: Photo[]; 
}

// --- 3. Actual Event Data (Existing) ---
const EVENTS: Event[] = [
  // --- INDEPENDENCE DAY (4 Events) ---
  {
    id: 1,
    category: "Independence Day",
    title: "Flag Hoisting Ceremony",
    previewPhoto: IndependenceDay1, 
    description: "The official ceremony featuring the national flag hoisting by the principal.",
    photos: [
      { id: 101, url: IndependenceDay1, description: "Flag Hoisting Ceremony in progress." },
    ],
  },
  {
    id: 2,
    category: "Independence Day",
    title: "Patriotic Cultural Drill",
    previewPhoto: IndependenceDay2, 
    description: "Students performing a spirited and synchronized patriotic drill.",
    photos: [
      { id: 201, url: IndependenceDay2, description: "Students in a formation for the cultural drill." },
    ],
  },
  {
    id: 3,
    category: "Independence Day",
    title: "Student Patriotic Speech",
    previewPhoto: IndependenceDay3, 
    description: "The entire student body gathered for the ceremonial flag salute.", 
    photos: [
      { id: 301, url: IndependenceDay3, description: "Students gathered for the ceremonial flag salute." },
    ],
  },
  {
    id: 4,
    category: "Independence Day",
    title: "Guest & Student Speeches",
    previewPhoto: IndependenceDay4, 
    description: "Inspirational speeches delivered by students and special guests.",
    photos: [
      { id: 401, url: IndependenceDay4, description: "A senior student delivering a patriotic speech." },
    ],
  },
  
  // --- SCIENCE EXHIBITION (3 Events) ---
  {
    id: 5,
    category: "Science Exhibition",
    title: "Sustainable Habitat Model Expo",
    previewPhoto: ScienceExhibition, 
    description: "Display of intricate and creative working models on sustainable living.",
    photos: [
      { id: 501, url: ScienceExhibition, description: "A detailed model of a sustainable habitat." },
    ],
  },
  {
    id: 6,
    category: "Science Exhibition",
    title: "Project Research Presentation",
    previewPhoto: SciencePresentation1, 
    description: "Students explaining their research and innovative solutions to the visitors.",
    photos: [
      { id: 601, url: SciencePresentation1, description: "Students explaining their physics project to the visitors." },
    ],
  },
  {
    id: 7, 
    category: "Science Exhibition",
    title: "Primary Shapes & Counting Exhibit", 
    previewPhoto: ScienceExhibition2, 
    description: "Young students showcasing their basic concepts of shapes and counting to visitors.",
    photos: [
      { id: 701, url: ScienceExhibition2, description: "Students presenting a chart on geometric shapes." },
    ],
  },
  
  // --- INDOOR GAMES (2 Events) ---
  {
    id: 8, 
    category: "Indoor Games",
    title: "Carrom Tournament - Semi-Finals",
    previewPhoto: Carrom1, 
    description: "Students competing intensely in the semi-finals of the annual carrom tournament.",
    photos: [
      { id: 801, url: Carrom1, description: "Students focused on the carrom board." },
    ],
  },
  {
    id: 9, 
    category: "Indoor Games",
    title: "Board Game Club Meeting",
    previewPhoto: Carrom2, 
    description: "A snapshot from the weekly indoor board game club meeting.",
    photos: [
      { id: 901, url: Carrom2, description: "Students enjoying a friendly game of carrom." },
    ],
  },
  
  // --- ENVIRONMENT PRESENTATION (1 Event) ---
  {
    id: 10, 
    category: "Environment Presentation",
    title: "Go Green: Environment Awareness Day",
    previewPhoto: StudentEnvironment, 
    description: "Students presented on sustainability, conservation, and climate action.",
    photos: [
      { id: 1001, url: StudentEnvironment, description: "Student presenters focusing on conservation strategies." },
    ],
  },
];

// --- 4. Lightbox (Modal) Component (FIXED FOR RESPONSIVENESS) ---

interface LightboxProps {
  event: Event | null;
  onClose: () => void;
}

const EventLightbox: React.FC<LightboxProps> = ({ event, onClose }) => {
  if (!event || event.photos.length === 0) return null;

  const currentPhotoUrl = (event.photos[0].url as any)?.src || event.photos[0].url; 
  const currentDescription = event.photos[0].description;

  return (
    <div 
      // Ensure the modal covers the whole screen and has a high z-index
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-black bg-opacity-95 backdrop-blur-sm" 
      onClick={onClose}
    >
      {/* The modal body: 
        - w-full on mobile
        - max-w-2xl (approx 50%) on large screens
        - h-full on mobile, h-[90vh] on larger screens
      */}
      <div 
        className="relative w-full h-full sm:h-[90vh] sm:max-w-2xl bg-white rounded-none sm:rounded-lg shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Ensure high contrast and visible close button */}
        <div className="flex justify-between items-center p-3 z-10" style={{ backgroundColor: COLOR_PRIMARY }}>
          <h3 className="text-lg font-bold text-white truncate">{event.title}</h3>
          <button onClick={onClose} className="p-1 text-white hover:text-gray-200 bg-transparent transition-colors">
            <X className="w-6 h-6" /> {/* Slightly larger icon for easier clicking */}
          </button>
        </div>

        {/* Photo Display Area - Added flex-grow and padding-2 for buffer */}
        <div className="relative flex-grow flex items-center justify-center bg-gray-900 p-2">
          {/* Main Image - object-contain prevents cutoff */}
          <img
            src={currentPhotoUrl} 
            alt={event.title}
            // Use h-full and w-full in this context to ensure it maximizes space within the container
            className="max-h-full max-w-full object-contain" 
          />
        </div>

        {/* Description Area (Simplified) */}
        <div className="p-3 bg-gray-50 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700">
            {currentDescription}
          </p>
        </div>
      </div>
    </div>
  );
};


// --- 5. Main Events Page Component (No changes needed) ---

const Events: React.FC = () => {
  // Dynamically get categories 
  const categories = ["All", ...Array.from(new Set(EVENTS.map(e => e.category)))];
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = EVENTS.filter(event => 
    activeCategory === "All" || event.category === activeCategory
  );

  return (
    <div 
      className="py-12 sm:py-16 md:py-20" 
      style={{ backgroundColor: COLOR_LIGHTGRAY_BG }} 
    >
      
      {/* section-container implementation: max-w-6xl retained for the 3-column grid */}
      <div className="px-4 mx-auto max-w-7xl md:max-w-4xl lg:max-w-6xl"> 
      
        {/* Header Section */}
        <header className="text-center mb-10 md:mb-16">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${COLOR_BLACK} mb-3`}>
            Srijan Valley School <span style={{ color: COLOR_PRIMARY }}>Event Gallery</span>
          </h1>
          <p className={`text-lg ${COLOR_GRAY}`}>
            Moments of learning, creativity, and celebration from our vibrant school life.
          </p>
        </header>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-12 border-b border-gray-300 pb-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'text-white shadow-md'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
              style={{ 
                backgroundColor: activeCategory === category ? COLOR_PRIMARY : undefined,
                color: activeCategory === category ? 'white' : 'black',
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid: lg:grid-cols-3 is still used. (10 items = 3 + 3 + 3 + 1 rows) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-200"
              onClick={() => setSelectedEvent(event)}
            >
              {/* Image Area: Aspect ratio container with object-contain to prevent image cutoff */}
              <div className="relative w-full aspect-video overflow-hidden"> 
                <img
                  src={(event.previewPhoto as any)?.src || event.previewPhoto} 
                  alt={event.title}
                  className="w-full h-full object-contain bg-gray-100 group-hover:scale-[1.03] transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Maximize className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Content Area */}
              <div className="p-4">
                <span className="text-xs font-medium uppercase tracking-wider rounded px-2 py-0.5" style={{ color: COLOR_PRIMARY, backgroundColor: '#fbe7d5' }}>
                  {event.category}
                </span>
                <h3 className={`text-xl font-bold ${COLOR_BLACK} mt-2 mb-1`}>{event.title}</h3>
                <p className={`text-sm ${COLOR_GRAY} line-clamp-1`}>
                  {event.description}
                </p>
              </div>
            </div>
          ))}
          
          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500">
              No events found in the selected category.
            </div>
          )}
        </section>
      </div>

      {/* Lightbox Modal */}
      <EventLightbox 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </div>
  );
}

export default Events;