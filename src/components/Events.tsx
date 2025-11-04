
"use client";
import React, { useState } from "react";
// Added ChevronLeft, ChevronRight for the new multiple-image lightbox
import { Maximize, X, ChevronLeft, ChevronRight } from "lucide-react";

// --- 1. Asset Imports (Existing and NEW) ---
// Note: In a real Next.js/React project, you MUST ensure these files exist
// at the specified paths relative to the component or adjust the import.
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

// --- NEW RANGOLI ASSETS (11 Images - Removed Rangoli2) ---
import Rangoli1 from "../assets/Rangoli1.webp";
import Rangoli3 from "../assets/Rangoli3.webp";
import Rangoli4 from "../assets/Rangoli4.webp";
import Rangoli5 from "../assets/Rangoli5.webp";
import Rangoli6 from "../assets/Rangoli6.webp";
import Rangoli7 from "../assets/Rangoli7.webp";
import Rangoli8 from "../assets/Rangoli8.webp";
import Rangoli9 from "../assets/Rangoli9.webp";
import Rangoli10 from "../assets/Rangoli10.webp";
import Rangoli11 from "../assets/Rangoli11.webp";
import Rangoli12 from "../assets/Rangoli12.webp";


// --- Configuration (Existing) ---
const COLOR_PRIMARY = "#ea590e";
const COLOR_BLACK = "text-black";
const COLOR_GRAY = "text-gray-700";
const COLOR_LIGHTGRAY_BG = "#f5f5f5";

// --- 2. Event Data Structure (Updated Photo Interface) ---
interface Photo {
    id: number;
    url: string;
    description: string;
    // Added optional caption for more detailed lightboxes
    caption?: string;
}

interface Event {
    id: number;
    category: string;
    title: string;
    previewPhoto: string;
    description: string;
    photos: Photo[];
}

// --- 3. Actual Event Data (New Rangoli Section Added) ---
const EVENTS: Event[] = [
    // --- INDEPENDENCE DAY (4 Events) ---
    {
        id: 1,
        category: "Independence Day",
        title: "Flag Hoisting Ceremony & Speeches",
        previewPhoto: IndependenceDay1,
        description: "The core ceremony featuring the national flag hoisting and...",
        photos: [
            { id: 101, url: IndependenceDay1, description: "Flag Hoisting Ceremony in progress with guests." },
        ],
    },
    {
        id: 2,
        category: "Independence Day",
        title: "Cultural Performances & Drill",
        previewPhoto: IndependenceDay2,
        description: "Students presenting spirited patriotic drills and traditional...",
        photos: [
            { id: 201, url: IndependenceDay2, description: "Students in a formation for the cultural drill." },
        ],
    },
    {
        id: 3,
        category: "Independence Day",
        title: "Student Patriotic Speech",
        previewPhoto: IndependenceDay3,
        description: "A talented student delivering an inspirational speech.",
        photos: [
            { id: 301, url: IndependenceDay3, description: "A student delivers a patriotic speech to the audience." },
        ],
    },
    {
        id: 4,
        category: "Independence Day",
        title: "Guest of Honour Speeches",
        previewPhoto: IndependenceDay4,
        description: "Inspirational addresses delivered by special guests and faculty.",
        photos: [
            { id: 401, url: IndependenceDay4, description: "A guest of honour delivering an address." },
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

    // --- INTER HOUSE RANGOLI COMPETITION (11 Individual Events) ---
    {
        id: 11,
        category: "Inter House Rangoli Competition",
        title: "Team One - Floral Rangoli",
        previewPhoto: Rangoli1,
        description: "Team one working on their floral-themed Rangoli.",
        photos: [{ id: 1101, url: Rangoli1, description: "Team one working on their floral-themed Rangoli." }],
    },
    {
        id: 12,
        category: "Inter House Rangoli Competition",
        title: "Judging the Designs",
        previewPhoto: Rangoli3,
        description: "Judges assessing the complexity of the design.",
        photos: [{ id: 1102, url: Rangoli3, description: "Judges assessing the complexity of the design." }],
    },
    {
        id: 13,
        category: "Inter House Rangoli Competition",
        title: "Adding Final Touches",
        previewPhoto: Rangoli4,
        description: "Students carefully adding finishing touches to their artwork.",
        photos: [{ id: 1103, url: Rangoli4, description: "Students carefully adding finishing touches to their artwork." }],
    },
    {
        id: 14,
        category: "Inter House Rangoli Competition",
        title: "Geometric Design Showcase",
        previewPhoto: Rangoli5,
        description: "A bird's-eye view of a completed geometric Rangoli.",
        photos: [{ id: 1104, url: Rangoli5, description: "A bird's-eye view of a completed geometric Rangoli." }],
    },
    {
        id: 15,
        category: "Inter House Rangoli Competition",
        title: "Proud House Team",
        previewPhoto: Rangoli6,
        description: "Another team proudly standing next to their creation.",
        photos: [{ id: 1105, url: Rangoli6, description: "Another team proudly standing next to their creation." }],
    },
    {
        id: 16,
        category: "Inter House Rangoli Competition",
        title: "Traditional Motif Rangoli",
        previewPhoto: Rangoli7,
        description: "A traditional Indian motif beautifully executed with colored powder.",
        photos: [{ id: 1106, url: Rangoli7, description: "A traditional Indian motif beautifully executed with colored powder." }],
    },
    {
        id: 17,
        category: "Inter House Rangoli Competition",
        title: "Focused Creativity",
        previewPhoto: Rangoli8,
        description: "The concentration and focus of a student during the competition.",
        photos: [{ id: 1107, url: Rangoli8, description: "The concentration and focus of a student during the competition." }],
    },
    {
        id: 18,
        category: "Inter House Rangoli Competition",
        title: "Detailed Shading Work",
        previewPhoto: Rangoli9,
        description: "A section of the design featuring intricate shading.",
        photos: [{ id: 1108, url: Rangoli9, description: "A section of the design featuring intricate shading." }],
    },
    {
        id: 19,
        category: "Inter House Rangoli Competition",
        title: "Final Rangoli Presentation",
        previewPhoto: Rangoli10,
        description: "Final presentation of the house Rangoli entries.",
        photos: [{ id: 1109, url: Rangoli10, description: "Final presentation of the house Rangoli entries." }],
    },
    {
        id: 20,
        category: "Inter House Rangoli Competition",
        title: "Decorative Diyas in Rangoli",
        previewPhoto: Rangoli11,
        description: "Creative use of diyas and other decorations.",
        photos: [{ id: 1110, url: Rangoli11, description: "Creative use of diyas and other decorations." }],
    },
    {
        id: 21,
        category: "Inter House Rangoli Competition",
        title: "Modern Abstract Rangoli",
        previewPhoto: Rangoli12,
        description: "An abstract design showcasing modern Rangoli art.",
        photos: [{ id: 1111, url: Rangoli12, description: "An abstract design showcasing modern Rangoli art." }],
    },

    // --- END NEW SECTION ---


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

// --- 4. Lightbox (Modal) Component (UPDATED for multiple photos) ---

interface LightboxProps {
    event: Event | null;
    onClose: () => void;
}

const EventLightbox: React.FC<LightboxProps> = ({ event, onClose }) => {
    // State to manage the currently displayed photo index
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    if (!event || event.photos.length === 0) return null;

    const photos = event.photos;
    const currentPhoto = photos[currentPhotoIndex];

    // Logic to handle next/previous
    const hasMultiplePhotos = photos.length > 1;
    const isFirstPhoto = currentPhotoIndex === 0;
    const isLastPhoto = currentPhotoIndex === photos.length - 1;

    const goToNext = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    const goToPrev = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
    };

    // Helper to extract the image URL correctly from the imported object
    const currentPhotoUrl = (currentPhoto.url as any)?.src || currentPhoto.url;

    // Use the photo's description, which is more detailed, for the lightbox footer
    const currentDescription = currentPhoto.description;

    return (
        <div
            // Reset index when opening a new event
            key={event.id}
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-black bg-opacity-95 backdrop-blur-sm"
            onClick={onClose} // Close on backdrop click
        >
            {/* The modal body */}
            <div
                className="relative w-full h-full sm:h-[90vh] sm:max-w-4xl bg-white rounded-none sm:rounded-lg shadow-2xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                {/* Header - Ensures X icon is visible */}
                <div className="flex justify-between items-center p-3 z-10" style={{ backgroundColor: COLOR_PRIMARY }}>
                    <h3 className="text-lg font-bold text-white truncate">{event.title}</h3>
                    <button onClick={onClose} className="p-1 text-white hover:text-gray-200 bg-transparent transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Photo Display Area - object-contain prevents cutoff */}
                <div className="relative flex-grow flex items-center justify-center bg-gray-900 p-2">
                    <img
                        src={currentPhotoUrl}
                        alt={event.title}
                        className="max-h-full max-w-full object-contain"
                    />

                    {/* Navigation Buttons (visible only if multiple photos exist) */}
                    {hasMultiplePhotos && (
                        <>
                            {/* Previous Button */}
                            <button
                                onClick={goToPrev}
                                disabled={isFirstPhoto}
                                className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 mx-2 bg-black/50 hover:bg-black/70 rounded-full transition-opacity ${isFirstPhoto ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
                            >
                                <ChevronLeft className="w-8 h-8 text-white" />
                            </button>

                            {/* Next Button */}
                            <button
                                onClick={goToNext}
                                disabled={isLastPhoto}
                                className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 mx-2 bg-black/50 hover:bg-black/70 rounded-full transition-opacity ${isLastPhoto ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
                            >
                                <ChevronRight className="w-8 h-8 text-white" />
                            </button>
                        </>
                    )}
                </div>

                {/* Description Area (Simplified) */}
                <div className="p-3 bg-gray-50 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700">
                        {currentDescription}
                    </p>
                    {hasMultiplePhotos && (
                        <p className="text-xs text-gray-500 mt-1 text-right">
                            Photo {currentPhotoIndex + 1} of {photos.length}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};


// --- 5. Main Events Page Component (No Changes Needed Here) ---

const Events: React.FC = () => {
    // Dynamically get categories (will now include the new category)
    const categories = ["All", ...Array.from(new Set(EVENTS.map(e => e.category)))];
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const filteredEvents = EVENTS.filter(event =>
        // Correct filter logic
        activeCategory === "All" || event.category === activeCategory
    );

    return (
        <div
            // *** 🔑 FIX FOR NAVIGATION: The required ID is set here ***
            id="events"
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
                            className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ${activeCategory === category
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

                {/* Events Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredEvents.map(event => (
                        <div
                            key={event.id}
                            // This onClick opens the lightbox modal
                            onClick={() => setSelectedEvent(event)}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-200"
                        >
                            {/* Image Area */}
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