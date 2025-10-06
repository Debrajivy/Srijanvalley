import { Trophy, Palette, Heart } from 'lucide-react';

const WhoItsFor = () => {
    // Define the primary orange color classes
    const PRIMARY_ORANGE_BG = 'bg-orange-600';
    const PRIMARY_ORANGE_TEXT = 'text-orange-600';

    // The feature array retains the original color for potential list bullets or background flair,
    // but the icon and list dot colors will be overridden to orange.
    const studentProfiles = [
        {
            icon: Trophy,
            title: 'Academic Aspirant',
            description: 'Rigorous academics with focused preparation for JEE, NEET, and other competitive examinations.',
            features: ['Advanced CBSE curriculum', 'Competition-oriented coaching', 'Regular mock tests', 'Performance tracking'],
            color: 'bg-yellow-500' // Kept for the subtle background gradient/opacity
        },
        {
            icon: Palette,
            title: 'Creative Explorer',
            description: 'Nurturing artistic talents through comprehensive programs in arts, music, dance, and visual creativity.',
            features: ['Art & craft studios', 'Music & dance classes', 'Drama & theater', 'Creative writing workshops'],
            color: 'bg-purple-500' // Kept for the subtle background gradient/opacity
        },
        {
            icon: Heart,
            title: 'Well-Rounded Individual',
            description: 'Holistic development through sports, clubs, social service, and emotional intelligence building.',
            features: ['Sports & athletics', 'Leadership clubs', 'Community service', 'Life skills development'],
            color: 'bg-green-500' // Kept for the subtle background gradient/opacity
        }
    ];

    return (
        <section id="who-its-for" className="section-padding bg-gradient-to-b from-background to-muted/30">
            <div style={{ marginTop: -90 }} className="section-container">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        Who Is This
                        {/* CHANGED: Text color to primary orange */}
                        <span className={PRIMARY_ORANGE_TEXT + " ml-3"}> 
                            Perfect For?
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Every child is unique. Our programs are designed to nurture different types of learners and their individual strengths.
                    </p>
                </div>

                {/* Student Profiles Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {studentProfiles.map((profile, index) => (
                        <div 
                            key={index}
                            className="academic-card group relative overflow-hidden"
                        >
                            {/* Background Gradient (Uses original color, slightly dimmed) */}
                            <div className={`absolute inset-0 ${profile.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                            
                            {/* Content */}
                            <div className="relative z-10">
                                {/* Icon: CHANGED background to PRIMARY_ORANGE_BG */}
                                <div className={`w-16 h-16 rounded-2xl ${PRIMARY_ORANGE_BG} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {/* Icon is now WHITE text-white */}
                                    <profile.icon className="w-8 h-8 text-white" /> 
                                </div>
                                
                                {/* Title & Description */}
                                <h3 className="text-2xl font-bold text-foreground mb-4">
                                    {profile.title}
                                </h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {profile.description}
                                </p>
                                
                                {/* Features List */}
                                <ul className="space-y-3">
                                    {profile.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center text-muted-foreground">
                                            {/* CHANGED: List bullet color to primary orange */}
                                            <div className={`w-2 h-2 rounded-full ${PRIMARY_ORANGE_BG} mr-3`} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="academic-card bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 max-w-3xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                            Not sure which path fits your child?
                        </h3>
                        <p className="text-lg text-muted-foreground mb-6">
                            Our experienced counselors will help identify your child's strengths and guide you to the right program.
                        </p>
                        <button 
                            onClick={() => {
                                const element = document.querySelector('#contact');
                                if (element) element.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="btn-academic" // Assuming btn-academic is your orange button style
                        >
                            Schedule a Consultation
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhoItsFor;