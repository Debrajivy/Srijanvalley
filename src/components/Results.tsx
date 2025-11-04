"use client";
import React, { useState } from 'react';
import { Trophy, Users, Zap } from 'lucide-react'; // Icons for the tabs/results

const PRIMARY_COLOR = '#d2530f'; 
const TAB_ACTIVE_CLASS = `border-${PRIMARY_COLOR} text-${PRIMARY_COLOR}`;
const TAB_INACTIVE_CLASS = 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';

// --- Dummy Data ---
const intraSchoolResults = [
    { id: 1, competition: 'Annual Science Fair', winner: 'Grade IX - Pragyan House', date: 'Dec 2025', rank: 'Overall 1st' },
    { id: 2, competition: 'Inter-House Debate', winner: 'Ananya Sharma (Grade XI)', date: 'Oct 2025', rank: '1st Place' },
    { id: 3, competition: 'Rangoli Competition', winner: 'Class VI A', date: 'Sep 2025', rank: 'Best Design' },
];

const interSchoolResults = [
    { id: 1, competition: 'State Level Math Olympiad', winner: 'Rahul Verma', date: 'Jan 2026', rank: 'Top 10 Finalist' },
    { id: 2, competition: 'Regional Athletic Meet', winner: 'Girls 4x100m Relay Team', date: 'Nov 2025', rank: 'Silver Medal' },
    { id: 3, competition: 'National Coding Challenge', winner: 'Amit Singh', date: 'Aug 2025', rank: 'Rank 12' },
];

const Results = () => {
    const [activeTab, setActiveTab] = useState('intra'); // 'intra' or 'inter'

    const currentResults = activeTab === 'intra' ? intraSchoolResults : interSchoolResults;

    return (
        <section className="py-16 sm:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <p 
                        className="text-2xl sm:text-3xl font-extrabold uppercase tracking-widest" 
                        style={{ color: PRIMARY_COLOR }}
                    >
                        SRIJAN VALLEY
                    </p>
                    <h2 
                        className="mt-2 sm:mt-3 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl"
                        style={{ color: PRIMARY_COLOR }}
                    >
                        Competition Results 🏅
                    </h2>
                    <p className="mt-5 text-xl text-gray-700 max-w-4xl mx-auto">
                        Celebrating the accomplishments of our talented students in both internal and external competitions.
                    </p>
                </div>

                {/* --- Tab Navigation --- */}
                <div className="border-b border-gray-200 mb-10">
                    <nav className="-mb-px flex justify-center space-x-8" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('intra')}
                            className={`py-4 px-1 inline-flex items-center text-sm sm:text-lg font-medium border-b-2 transition-colors duration-200 ${
                                activeTab === 'intra' ? TAB_ACTIVE_CLASS : TAB_INACTIVE_CLASS
                            }`}
                            style={activeTab === 'intra' ? { borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR } : {}}
                        >
                            <Users className="w-5 h-5 mr-2" />
                            Intra-School Competitions
                        </button>
                        
                        <button
                            onClick={() => setActiveTab('inter')}
                            className={`py-4 px-1 inline-flex items-center text-sm sm:text-lg font-medium border-b-2 transition-colors duration-200 ${
                                activeTab === 'inter' ? TAB_ACTIVE_CLASS : TAB_INACTIVE_CLASS
                            }`}
                            style={activeTab === 'inter' ? { borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR } : {}}
                        >
                            <Zap className="w-5 h-5 mr-2" />
                            Inter-School Competitions
                        </button>
                    </nav>
                </div>

                {/* --- Results Content (Dynamic) --- */}
                <div className="max-w-5xl mx-auto">
                    {currentResults.length > 0 ? (
                        <div className="space-y-6">
                            {currentResults.map((result, index) => (
                                <div 
                                    key={result.id} 
                                    className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform duration-300 hover:scale-[1.02]"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold uppercase text-gray-500">{result.date}</p>
                                        <h3 className="text-xl font-bold text-gray-900 mt-1">{result.competition}</h3>
                                        <p className="text-base text-gray-700 mt-1">
                                            <span className="font-semibold" style={{ color: PRIMARY_COLOR }}>Winner/Achiever:</span> {result.winner}
                                        </p>
                                    </div>
                                    <div className="flex items-center ml-4">
                                        <Trophy className="w-8 h-8 mr-3" style={{ color: PRIMARY_COLOR }} />
                                        <span className="text-2xl font-extrabold text-gray-900">{result.rank}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-12 bg-white rounded-xl shadow-lg text-gray-600">
                            <p className="text-xl font-medium">No results published for this section yet.</p>
                            <p className="mt-2 text-sm">Check back soon for the latest achievements!</p>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}

export default Results;