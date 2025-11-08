// Team.tsx

import { GraduationCap, Award, Building2, Lightbulb } from 'lucide-react';
// Assuming these imports correctly point to your image assets
import Promad from "../assets/Pramod.webp";
import Renu from "../assets/Renu.webp";
import Prateek from "../assets/Prateek.webp";
import Eeshani from "../assets/Eeshani.webp"; 
import Seema from "../assets/Seema.jpeg"; // Assuming the Principal's image is named Seema.webp

const PRINCIPAL_MESSAGE = {
    name: 'Seema Chitlangia',
    role: 'Principal, Srijan Valley School',
    image: Seema, // Use the actual image path
    message: [
        "It is with great enthusiasm that I welcome you to Srijan Valley School, a place where learning is joyful, values are nurtured, and excellence is pursued in every classroom and corner.",
        "We believe that education is not just about books and exams, but about preparing young minds for life. Our mission is to create a safe, inclusive, and stimulating environment where every child feels valued, empowered, and inspired to reach their full potential.",
        "At Srijan Valley, our focus is on developing well-rounded individuals — learners who are not only academically sound but also emotionally intelligent, socially responsible, and morally grounded. We integrate modern teaching techniques with a strong foundation of Indian values and culture, aiming for a perfect balance between tradition and innovation.",
        "I am proud to lead a dedicated team of educators who bring passion, commitment, and care into every aspect of school life. Together with the unwavering support of our parents, we strive to make education a meaningful and life-changing experience for every child who walks through our gates.",
        "As Principal, I invite you to be an active part of our journey. Let us work together to nurture confident, curious, and compassionate learners who are ready to face the world with courage and character."
    ]
};

const teamMembers = [
    {
        name: 'Pramod Agrawal',
        role: 'Founder & Director',
        credentials: 'Ex-Chairman Coal India Ltd, IIT Mumbai & IIT Delhi',
        description: 'Leading educational vision with decades of administrative excellence and commitment to quality education.',
        image: Promad,
        gradient: 'bg-blue-600',
        message: [
            "Srijan Valley School is a place where we believe that every child is full of potential and deserves an environment that nurtures curiosity, creativity, and confidence.",
            "At Srijan Valley, we are committed to providing holistic education that balances academics with values, discipline with freedom, and learning with joy. Our dedicated team of educators works passionately to create a safe, stimulating, and inclusive atmosphere where children not only excel in studies but also grow as compassionate and responsible individuals.",
            "We believe that education is a partnership between the school, the child, and the parents. With the trust and support of the parents , we strive every day to shape a brighter future for our students , empowering them to think critically, communicate effectively, and lead with integrity."
        ]
    },
    {
        name: 'Dr. Renu Agrawal',
        role: 'Academic Director',
        credentials: 'Ex-Senior Professor, Educational Excellence',
        description: 'Bringing years of academic experience and pedagogical expertise to curriculum development and teaching excellence.',
        image: Renu,
        gradient: 'bg-purple-600',
        message: [
            "Education is the most powerful tool for personal growth and societal transformation. As a Trustee of Srijan Valley School, I feel honored to be part of an institution that is committed to providing not just literacy, but true education that shapes minds, hearts, and futures.",
            "In today’s fast-changing world, knowledge alone is not enough. Children need to develop the ability to think critically, communicate effectively, adapt to challenges, and most important , act with empathy and integrity. True education goes beyond textbooks . It teaches us , how to live with purpose and responsibility.",
            "At Srijan Valley, we believe in nurturing the child intellectually, emotionally, socially, and morally. Our aim is to provide an environment where students are inspired to dream big, work hard, and grow into responsible global citizens who contribute meaningfully to the society."
        ]
    },
    {
        name: 'Prateek Agrawal',
        role: 'Trustee', // Role updated to match message context
        credentials: 'Data & AI Entrepreneur, MS Texas (USA), Computer Engineer', 
        description: 'Integrating cutting-edge technology and modern teaching methodologies to enhance learning experiences.',
        image: Prateek,
        gradient: 'bg-green-600',
        message: [
            "Srijan Valley School is a place where education is not limited to the pages of textbooks, but is a journey of discovery, growth, and transformation.",
            "In today’s competitive and fast-changing world, the role of education has expanded far beyond academics. At Srijan Valley, we believe that a truly successful education is one that builds strong character, cultivates confidence, and empowers children with the life skills they need to face challenges with courage and resilience.",
            "Our mission is to help each child grow into a well-rounded individual — someone who is academically capable, emotionally intelligent, socially responsible, and morally grounded. We understand that every child is unique, and so we strive to create a learning environment that nurtures each student’s personality, talents, and potential."
        ]
    },
    {
        name: 'Eeshani Agrawal',
        role: 'Student Development Head',
        credentials: 'Data & AI Entrepreneur, MS Texas (USA), Civil Engineer', 
        description: 'Focusing on holistic student development, career guidance, and preparing students for global opportunities.',
        image: Eeshani,
        gradient: 'bg-cyan-600',
        message: null // As requested, no message for Eeshani Agrawal
    }
];

// --- Principal Message Component ---
const PrincipalMessage = ({ member, PRIMARY_ORANGE_TEXT }) => (
    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12 mb-16 border-t-8 border-orange-500">
        <h3 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
            From the Principal’s Desk
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Image & Signature Block */}
            <div className="lg:col-span-1 flex flex-col items-center text-center p-4">
                <div className="w-48 h-48 mb-4 border-4 border-orange-200 shadow-lg rounded-xl overflow-hidden">
                    <img
                        src={member.image.src || member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="mt-4">
                    <h4 className="text-2xl font-bold text-gray-800">{member.name}</h4>
                    <p className={`text-lg font-medium ${PRIMARY_ORANGE_TEXT}`}>{member.role}</p>
                </div>
            </div>

            {/* Message Content */}
            <div className="lg:col-span-2 space-y-4 text-lg text-gray-700 leading-relaxed border-l-4 border-orange-400 pl-6 py-2">
                {member.message.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                ))}
            </div>
        </div>
    </div>
);


const Team = () => {
    // Define primary orange color constants
    const PRIMARY_ORANGE_TEXT = 'text-orange-600';

    return (
        <section id="team" className="section-padding bg-gradient-to-b from-muted/30 to-background">
            <div style={{ marginTop: -90 }} className="section-container">
                
                {/* 1. PRINCIPAL'S MESSAGE SECTION */}

                {/* 2. MAIN LEADERSHIP SECTION HEADER */}
                <div className="text-center mb-16 pt-8">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        Our Distinguished
                        <span className={PRIMARY_ORANGE_TEXT + " ml-3"}>
                            Leadership Team
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Meet the accomplished professionals who are committed to shaping your child's future through excellence in education
                    </p>
                </div>
                

                {/* 3. TEAM GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className={`academic-card group relative p-6 bg-white border border-gray-100 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl`}
                        >
                            {/* Background Pattern */}
                            <div className={`absolute inset-0 ${member.gradient} opacity-5 rounded-xl group-hover:opacity-10 transition-opacity duration-300`} />
                            
                            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start">
                                {/* Image Container */}
                                <div className="w-40 h-40 flex-shrink-0 mb-6 sm:mb-0 sm:mr-8 p-1 bg-white shadow-xl border-2 border-gray-100 group-hover:border-orange-500 transition-all duration-300 rounded-lg">
                                    <img
                                        src={member.image.src || member.image}
                                        alt={member.name}
                                        className="w-full h-full object-contain rounded-lg"
                                    />
                                </div>

                                {/* Content Block */}
                                <div className="text-center sm:text-left flex-grow">
                                    <div className={`text-sm font-medium ${PRIMARY_ORANGE_TEXT} mb-1`}>{member.role}</div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">
                                        {member.name}
                                    </h3>
                                    <p className={PRIMARY_ORANGE_TEXT + " font-semibold mb-4 text-base"}>
                                        {member.credentials}
                                    </p>
                                    
                                    {/* Displaying Message or Description */}
                                    {member.message ? (
                                        <div className="space-y-3 mt-4 text-gray-700 text-sm leading-relaxed border-l-2 border-orange-300 pl-3">
                                            {member.message.map((paragraph, pIdx) => (
                                                <p key={pIdx} className="italic">{paragraph.length > 150 ? paragraph.substring(0, 150) + '...' : paragraph}</p>
                                            ))}
                                            <p className="font-semibold text-right pt-2">— {member.name}</p>
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground leading-relaxed mt-4">
                                            {member.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <PrincipalMessage member={PRINCIPAL_MESSAGE} PRIMARY_ORANGE_TEXT={PRIMARY_ORANGE_TEXT} />

                {/* 4. Leadership Values Callout */}
                <div className="academic-card bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 max-w-4xl mx-auto text-center p-8 rounded-2xl">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                        Education-First Leadership
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                        Unlike institutions run by real estate developers, Srijan Valley is led by genuine educators
                        and accomplished professionals who understand the true value of quality education. Our leadership team
                        brings together decades of experience in academics, administration, and innovation.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        {/* ... Value Metrics ... */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;