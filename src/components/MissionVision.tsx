import { ArrowRight } from 'lucide-react';

// REVISED component for the responsive YouTube video
const YouTubeVideoEmbed = ({ videoId }) => (
    // The key change is using 'aspect-video' for a clean 16:9 ratio.
    // The grid parent handles the overall height context.
    <div className="bg-gray-100 rounded-3xl overflow-hidden">
        {/* Tailwind's aspect-video (16/9) class replaces the manual padding-bottom trick */}
        <div className="w-full aspect-video"> 
            <iframe
                className="w-full h-full" // Ensure iframe fills the aspect-video container
                // Set to autoplay=1 and mute=1 for best cross-browser performance
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
    const VISION_SUBHEAD_COLOR = 'text-orange-600';
    const YOUTUBE_VIDEO_ID = 'x4APmFTW46I';

    return (
        <section className="section-padding bg-background">
            <div style={{ marginTop: -150 }} className="section-container">
                {/* min-h-[400px] ensures the grid row is tall enough to give context to the video's width */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[400px]">

                    {/* Left Column: Vision Content */}
                    <div className="space-y-6 lg:space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#293343]">
                            Our Vision for Future Leaders
                        </h2>
                        
                        <p className={`text-xl font-bold ${VISION_SUBHEAD_COLOR}`}>
                            "Fluent. Analytical. Future-Ready. Personally Guided."
                        </p>
                        
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                            Empower every learner with fluent English communication, strong
                            mathematical thinking, academic excellence, real-world experiences,
                            and personal mentorship - nurturing leaders for tomorrow's India.
                        </p>

                        <a
                            href="#philosophy"
                            className="inline-flex items-center text-primary font-semibold hover:text-orange-700 transition-colors group"
                        >
                            Learn More About Our Philosophy
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    {/* Right Column: YouTube Video Embed */}
                    <YouTubeVideoEmbed videoId={YOUTUBE_VIDEO_ID} />

                </div>
            </div>
        </section>
    );
};

export default MissionVision;