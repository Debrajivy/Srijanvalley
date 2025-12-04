"use client";
import React from 'react';
import { Newspaper, Video, Globe, Image as ImageIcon } from 'lucide-react';

// Import your media assets
import pressImage from '../assets/media.webp';
import m1 from '../assets/m1.webp';
import m2 from '../assets/m2.webp';
import m3 from '../assets/m3.webp';
import m4 from '../assets/m4.webp';
import new1 from "../assets/new1.jpeg";
import new2 from "../assets/new2.jpeg";
import new3 from "../assets/new3.jpeg";
import Db from "../assets/Db.jpeg";
import Dj from "../assets/Dj.jpeg"; 
import Hindusthan from "../assets/Hindusthan.jpeg";


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

    // --- Data for Press Coverage Images ---
    const pressCoverageImages = [
        {
            id: 1,
            image: pressImage,
            title: 'Dainik Bhaskar Feature',
            description: 'Award ceremony coverage in leading newspaper',
        },
        {
            id: 2,
            image: m1,
            title: 'School Infrastructure Feature',
            description: 'Showcasing our modern campus facilities',
        },
        {
            id: 3,
            image: m2,
            title: 'Academic Excellence Recognition',
            description: 'Highlighting student achievements and programs',
        },
        {
            id: 4,
            image: m3,
            title: 'Co-curricular Activities Coverage',
            description: 'Media coverage of extracurricular programs',
        },
        {
            id: 5,
            image: m4,
            title: 'Community Engagement Events',
            description: 'School events and community outreach programs',
        },
        {
            id: 6,
            image: new1,
            title: 'Dainik Jagran',
            description: '',
        },
        {
            id: 7,
            image: new2,
            title: 'Prabhat Khabar',
            description: '',
        },
        {
            id: 8,
            image: new3,
            title: 'Dainik Bhaskar',
            description: '',
        },
        {
            id: 9,
            image: Db,
            title: 'Dainik Bhaskar',
            description: '',
        },
        {
            id: 10,
            image: Dj,
            title: 'Dainik Jagran',
            description: '',
        },
        {
            id: 11,
            image: Hindusthan,
            title: 'Hindusthan',
            description: '',
        },
    ];

    // --- Data for Featured Media Gallery ---
    const mediaGallery = [
        {
            id: 1,
            image: m1,
            title: 'School Infrastructure Feature',
            description: 'Showcasing our modern campus facilities and learning environment',
        },
        {
            id: 2,
            image: m2,
            title: 'Academic Excellence Recognition',
            description: 'Highlighting student achievements and academic programs',
        },
        {
            id: 3,
            image: m3,
            title: 'Co-curricular Activities Coverage',
            description: 'Media coverage of our diverse extracurricular programs',
        },
        {
            id: 4,
            image: m4,
            title: 'Community Engagement Events',
            description: 'School events and community outreach programs featured in press',
        },
    ];

    return (
        <section id="media" style={{marginTop:-50}} className="py-6 sm:py-6 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- 1. Main Header --- */}
                <div className="text-center mb-12 sm:mb-16">
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

                {/* --- 2. Press Coverage Section with All Images --- */}
                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{ color: PRIMARY_COLOR }}>
                    Press Coverage
                </h3>
                
                {/* Grid layout for all press coverage images */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {pressCoverageImages.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-200 group"
                        >
                            <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
                                <img
                                    src={item.image as unknown as string}
                                    alt={item.title}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                            </div>
                            <div className="p-4 bg-white">
                                <h4 className="text-lg font-bold text-gray-900 mb-2 text-center">{item.title}</h4>
                                <p className="text-sm text-gray-600 text-center">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
}

export default Media;