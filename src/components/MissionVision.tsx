import { ArrowRight } from 'lucide-react'; 
import School from '../assets/School.webp'; // Placeholder image for the right side

const VisionImagePlaceholder = () => (
    // Container: Removed padding (p-8) and set a definite height (h-full/min-h-full)
    // to ensure the image takes up the space defined by the grid layout.
    <div className="bg-gray-100 rounded-3xl overflow-hidden h-full min-h-[350px]">
        <img 
            src={School} // Use the imported image path directly
            alt="Srijan Valley School Building" 
            // CHANGES: w-full and h-full ensures it fills the container. 
            // object-cover ensures it covers the entire area without white space, 
            // matching the professional look of the reference image.
            className="w-full h-full object-cover" 
        />
    </div>
);

const MissionVision = () => {
    const VISION_SUBHEAD_COLOR = 'text-orange-600';

    return (
        <section className="section-padding bg-background">
            <div style={{ marginTop: -150 }} className="section-container">
                {/* Vision and Image Grid */}
                {/* min-h-[400px] ensures the grid rows are tall enough for the image to fill. */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[400px]">
                    
                    {/* Left Column: Vision Content */}
                    <div className="space-y-6 lg:space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#293343]">
                            Our Vision for Future Leaders
                        </h2>
                        
                        {/* Sub-Headline Text */}
                        <p className={`text-xl font-bold ${VISION_SUBHEAD_COLOR}`}>
                            "Fluent. Analytical. Future-Ready. Personally Guided."
                        </p>
                        
                        {/* Body Text */}
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                            Empower every learner with fluent English communication, strong
                            mathematical thinking, academic excellence, real-world experiences,
                            and personal mentorship - nurturing leaders for tomorrow's India.
                        </p>

                        {/* Learn More Link */}
                        <a 
                            href="#philosophy" 
                            className="inline-flex items-center text-primary font-semibold hover:text-orange-700 transition-colors group"
                        >
                            Learn More About Our Philosophy
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    {/* Right Column: Image */}
                    <VisionImagePlaceholder />

                </div>
            </div>
        </section>
    );
};

export default MissionVision;