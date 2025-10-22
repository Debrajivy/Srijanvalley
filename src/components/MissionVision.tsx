import { ArrowRight, Eye, Flag } from 'lucide-react';

// NOTE: YouTubeVideoEmbed component and its surrounding layout remain untouched per your previous instruction.
const YouTubeVideoEmbed = ({ videoId }) => (
    <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
        <div className="w-full aspect-video"> 
            <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&rel=0`} 
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    </div>
);

const MissionVision = () => {
    const PRIMARY_ORANGE_TEXT = 'text-orange-600';
    const YOUTUBE_VIDEO_ID = 'x4APmFTW46I'; // Example ID

    // --- Provided Content ---
    const VISION_CONTENT = {
        title: "Our Vision",
        icon: Eye,
        text: "At Srijan Valley School, our vision is to create a vibrant learning community where every child is empowered to discover their full potential — academically, emotionally, socially, and ethically. We envision a future where our students become lifelong learners, creative thinkers, and global citizens who are deeply rooted in values and equipped to lead with purpose, compassion, and integrity. We aim to be a center of excellence that nurtures not just intellect, but also imagination and inner strength — preparing children not just for a living, but for life itself.",
    };

    const MISSION_CONTENT = {
        title: "Our Mission",
        icon: Flag,
        commitmentIntro: "Our mission is to provide a holistic, inclusive, and forward-thinking education that fosters curiosity, confidence, and character in every child. We are committed to:",
        commitments: [
            // Note: I'm shortening the mission text items slightly for better visual balance,
            // but the core points are maintained.
            'Creating a safe and joyful environment for personal growth and emotional well-being.',
            'Encouraging inquiry-based learning, critical thinking, and exploration of ideas.',
            'Promoting creative expression, innovation, and independent thinking.',
            'Instilling strong moral values, empathy, and social responsibility.',
            'Embracing modern teaching tools and global best practices with cultural grounding.',
            'Building a strong partnership between school, parents, and the community.',
        ],
        conclusion: "At Srijan Valley, we believe that each child is unique — and our mission is to help them grow into confident, capable, and compassionate individuals ready to thrive in a changing world.",
    };

    // --- Component JSX ---
    return (
        <section id="mission-vision" className="section-padding bg-background">
            <div className="section-container">

                {/* --- VIDEO AND INTRO SECTION (PRESERVED) --- */}
                <div style={{ marginTop: -150 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[400px]">
                    <div className="space-y-6 lg:space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#293343]">
                            Excellence in Education
                        </h2>
                        <p className={`text-xl font-bold ${PRIMARY_ORANGE_TEXT}`}>
                            "Rooted in Values, Ready for the Future."
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                            Our guiding principles shape every lesson, every interaction, and every opportunity at Srijan Valley. We are dedicated to nurturing intellect, imagination, and inner strength, preparing children not just for a living, but for life itself.
                        </p>
                        <a
                            href="#mission-vision-detail"
                            className="inline-flex items-center text-primary font-semibold hover:text-orange-700 transition-colors group"
                        >
                            Read Our Full Commitment
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                    <YouTubeVideoEmbed videoId={YOUTUBE_VIDEO_ID} />
                </div>

                {/* --- SEPARATOR --- */}
                <hr className="my-16 border-t-2 border-orange-100" id="mission-vision-detail" />
                
                {/* --- VISION & MISSION Split-Card Section (SYMMETRICAL DESIGN) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* VISION Card (Left/Top) */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border-t-8 border-orange-500 flex flex-col justify-between h-full">
                        <div>
                            <div className="flex items-center mb-6">
                                <VISION_CONTENT.icon className={`w-8 h-8 ${PRIMARY_ORANGE_TEXT} mr-3`} />
                                <h3 className="text-3xl font-extrabold text-gray-800">
                                    {VISION_CONTENT.title}
                                </h3>
                            </div>
                            
                            {/* Modern Look: Boxed content for the Vision text */}
                            <div className="text-lg text-gray-700 leading-relaxed italic p-4 bg-orange-50/70 border-l-4 border-orange-600 rounded-lg shadow-inner">
                                {VISION_CONTENT.text}
                            </div>
                        </div>
                    </div>

                    {/* MISSION Card (Right/Bottom) */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border-t-8 border-gray-700 flex flex-col justify-between h-full">
                        <div>
                            <div className="flex items-center mb-6">
                                <MISSION_CONTENT.icon className="w-8 h-8 text-gray-700 mr-3" />
                                <h3 className="text-3xl font-extrabold text-gray-800">
                                    {MISSION_CONTENT.title}
                                </h3>
                            </div>

                            <p className="text-lg font-semibold text-gray-700 mb-4">
                                {MISSION_CONTENT.commitmentIntro}
                            </p>

                            {/* Mission Commitments - Using a more compact list style */}
                            <ul className="space-y-3">
                                {MISSION_CONTENT.commitments.map((commitment, index) => (
                                    <li 
                                        key={index} 
                                        className="flex items-start text-base text-gray-600 border-b border-dashed border-gray-100 pb-1"
                                    >
                                        <ArrowRight className={`w-4 h-4 mt-1 mr-3 flex-shrink-0 ${PRIMARY_ORANGE_TEXT}`} />
                                        <span>{commitment}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Conclusion is placed at the bottom, helping fill space and balance the card height */}
                        <p className="text-lg text-gray-600 mt-6 pt-4 border-t border-gray-200">
                            {MISSION_CONTENT.conclusion}
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default MissionVision;