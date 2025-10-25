// AdmissionTicker.tsx

import React from 'react';

// Marquee Animation Keyframes - Essential for the scrolling effect
const marqueeKeyframes = `
    @keyframes marquee {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
    }
`;

const marqueeStyle: React.CSSProperties = {
    animation: 'marquee 20s linear infinite', // Adjust '20s' for speed
};

const AdmissionTicker: React.FC = () => {
    
    // The admission text content
    const admissionText = "Admissions are open for the session 2026–27 : | For classes - pre-nursery, nursery, KG and Standard 1-7";
    
    return (
        // 🎯 FINAL FIX: Using 'w-full' ensures it takes up all available space, 
        // and the negative margins (-mx-4, etc.) forcefully pull it into the padding area, 
        // making it edge-to-edge relative to the viewport.
        <div className="w-full bg-orange-700 text-white py-2 overflow-hidden mb-6 -mx-4 sm:-mx-6 lg:-mx-8"> 
            
            {/* Inject Keyframes */}
            <style>{marqueeKeyframes}</style>

            <div className="whitespace-nowrap flex" style={marqueeStyle}>
                {/* Duplicate content 3 times for continuous, seamless scrolling */}
                <span className="text-sm sm:text-lg font-semibold uppercase tracking-wider px-12 flex-shrink-0">
                    {admissionText} &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;
                </span>
                <span className="text-sm sm:text-lg font-semibold uppercase tracking-wider px-12 flex-shrink-0">
                    {admissionText} &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;
                </span>
                <span className="text-sm sm:text-lg font-semibold uppercase tracking-wider px-12 flex-shrink-0">
                    {admissionText} &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;
                </span>
            </div>
        </div>
    );
};

export default AdmissionTicker;