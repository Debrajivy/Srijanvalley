"use client";
import React from 'react';
import { Newspaper, Video, Globe, Image as ImageIcon } from 'lucide-react';

// Import your two media assets
import pressImage from '../assets/media.webp';

const PRIMARY_COLOR = '#d2530f';

const Media = () => {
    // --- Data for Press Clips (Newspaper/Online Mentions) ---
    const mediaClips = [
        {
            type: 'Print - Dainik Bhaskar',
            icon: <Newspaper className="w-6 h-6" style={{ color: PRIMARY_COLOR }} />,
            title: 'Students Excelling in Srijan Valley Awarded',
            snippet: 'An award ceremony for excellence in Science, Rangoli, Art & Craft, and English Handwriting Competitions at Srijan Valley School, Pithoria, featured in Dainik Bhaskar.',
            date: 'November 04, 2025',
            link: '#',
        },
        {
            type: 'Online',
            icon: <Globe className="w-6 h-6" style={{ color: PRIMARY_COLOR }} />,
            title: 'Srijan Valley School: A New Era of Education',
            snippet: 'Online coverage highlighting the 2+ Acre campus and modern infrastructure.',
            date: 'November 10, 2024',
            link: '#',
        },
        {
            type: 'Video',
            icon: <Video className="w-6 h-6" style={{ color: PRIMARY_COLOR }} />,
            title: 'Campus Tour and Student Interviews',
            snippet: 'Local channel coverage of the annual Science Exhibition and co-curricular activities.',
            date: 'December 5, 2024',
            link: '#',
        },
    ];

    // --- Data for Featured Events (from image_8dce46.png) ---



    return (
        <section id="media" style={{marginTop:-50}} className="py-6 sm:py-6 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- 1. Main Header --- */}
                <div className="text-center mb-12 sm:mb-16">
                    {/* Font size increased to text-2xl on mobile and text-3xl on desktop for prominence */}
                    <p className="text-2xl sm:text-3xl font-extrabold uppercase tracking-widest" style={{ color: PRIMARY_COLOR }}>
                        SRIJAN VALLEY
                    </p>
                    <h2
                        className="mt-2 sm:mt-3 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl"
                        style={{ color: PRIMARY_COLOR }}
                    >
                        Official Media & Recognition
                    </h2>
                    <p className="mt-5 text-xl text-gray-700 max-w-4xl mx-auto">
                        Showcasing our institutional excellence through recent press coverage, published articles, and noteworthy school highlights.
                    </p>
                </div>

                {/* --- 2. Featured Press Clipping (media.webp) --- */}
                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{ color: PRIMARY_COLOR }}>
                    Press Coverage
                </h3>
                <div className="flex justify-center mb-16">
                    <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden border-4" style={{ borderColor: PRIMARY_COLOR }}>

                        {/* 🎯 FIX APPLIED HERE: Using a standard div to contain the image */}
                        <div className="relative w-full p-4 sm:p-8 flex justify-center items-center bg-gray-100">
                            <img
                                src={pressImage as unknown as string}
                                alt="Dainik Bhaskar Newspaper Clipping on Srijan Valley School Awards"
                                // 🎯 Change: Remove h-xx classes. Use object-contain and set a max-height.
                                className="w-full h-auto max-h-[80vh] object-contain transition-transform duration-500 hover:scale-[1.01]"
                                style={{ maxWidth: '100%', maxHeight: '500px' }} // Explicit styling for control
                            />
                        </div>

                        <div className="p-4 sm:p-6 bg-gray-900 text-white">
                            <p className="text-sm sm:text-base font-medium">
                                {/* **Featured Article:** Students awarded for excellence in various competitions, as featured in Dainik Bhaskar. */}
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- 3. Full List of Press Clips --- */}
                {/* <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-24">
                    {mediaClips.map((clip, index) => (
                        <div
                            key={index}
                            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4"
                            style={{ borderTopColor: PRIMARY_COLOR }}
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                {clip.icon}
                                <span className="text-base font-medium uppercase text-gray-600">{clip.type}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {clip.title}
                            </h3>
                            <p className="text-gray-700 mb-4 text-sm line-clamp-3">
                                {clip.snippet}
                            </p>
                            <a
                                href={clip.link}
                                className="inline-flex items-center font-semibold transition-colors"
                                style={{ color: PRIMARY_COLOR }}
                            >
                                View Details
                                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </a>
                        </div>
                    ))}
                </div> */}

                {/* --- 4. School Event Highlight (image_8dce46.png) --- */}
                {/* <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{ color: PRIMARY_COLOR }}>
                    School Activity Highlights
                </h3> */}

                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredEvents.map((event, index) => (
                         <div 
                            key={index} 
                            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
                            style={{ borderTop: `4px solid ${PRIMARY_COLOR}` }}
                        >
                            <img
                                src={event.image as unknown as string} 
                                alt={event.title}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-5">
                                <p className="text-xs font-semibold uppercase mb-2" style={{ color: PRIMARY_COLOR }}>
                                    {event.type}
                                </p>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">
                                    {event.title}
                                </h4>
                                <p className="text-gray-700 mb-4 text-sm line-clamp-2">
                                    {event.snippet}
                                </p>
                                <a 
                                    href={event.link}
                                    className="text-sm font-semibold transition-colors"
                                    style={{ color: PRIMARY_COLOR }}
                                >
                                    See Gallery
                                </a>
                            </div>
                        </div>
                    ))}
                    <div className="p-6 flex items-center justify-center bg-gray-200 rounded-xl shadow-inner text-gray-700">
                        <p className="text-center font-medium">More event highlights coming soon!</p>
                    </div>
                </div> */}

            </div>
        </section>
    );
}

export default Media;