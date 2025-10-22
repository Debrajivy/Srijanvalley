import { BookOpen, Users, Building2, Star } from 'lucide-react';
import FocusEducation from "../assets/FocusedEducation.webp";
import PersonalAttention from "../assets/PersonalAttention.webp";
import ModernInfrastructure from "../assets/ModernInfrastructure.webp";
import AdmissionTicker from './AdmissionTicker';
// Define the type for feature items to make mapping clearer
const featuresData = [
  {
    icon: BookOpen,
    image: FocusEducation,
    title: 'Focused Education',
    description: 'CBSE curriculum with exam prep orientation for competitive exams.',
  },
  {
    icon: Users,
    image: PersonalAttention,
    title: 'Personal Attention',
    description: '1:15 teacher-student ratio with dedicated 1:1 mentorship for every child.',
  },
  {
    icon: Building2,
    image: ModernInfrastructure,
    title: 'Modern Infrastructure',
    description: 'Smart classrooms, well-equipped labs, extensive library, cricket ground, and safe play areas.',
  }
];

const WhyChooseUs = () => {
  const PRIMARY_ORANGE_TEXT = 'text-orange-600';

  return (
    // Changed bg-gradient-to-b to a cleaner white background for simplicity with the new design
    <section id="about-us" className="section-padding bg-white">
      <div className="section-container">

        {/* Section Header & Ethos Text */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4">
            About
            <span className={PRIMARY_ORANGE_TEXT + " ml-3"}>
              Srijan Valley
            </span>
          </h2>

          <div className="max-w-4xl mx-auto space-y-4 text-lg text-gray-700 mt-10 p-6 bg-orange-50/50 rounded-2xl border-l-4 border-orange-500 shadow-md">
            <p className="font-semibold text-gray-800">
              Srijan Valley School is a nurturing space where learning goes beyond textbooks and classrooms. Rooted in the values of curiosity, creativity, and character, we strive to provide a balanced and future-ready education for every child.
            </p>
            <p>
              We believe that education is not just about academic excellence — it’s about shaping responsible, confident, and compassionate individuals. At Srijan Valley, students are encouraged to explore their talents, think critically, and grow into well-rounded global citizens.
            </p>
            <p className="italic text-sm text-gray-600">
              Our dedicated faculty, student-centered approach, and vibrant learning environment make Srijan Valley more than just a school — it’s a community where minds blossom and values grow strong.
            </p>
          </div>
        </div>

        <hr className="my-16 border-gray-200" />

        {/* --- Features Zig-Zag Layout --- */}
        <div className="space-y-20">
          {featuresData.map((feature, index) => {
            const Icon = feature.icon;
            // Determine if the image should be on the left (even index) or right (odd index)
            const isImageLeft = index % 2 === 0;

            return (
              <div
                key={index}
                // Grid layout with two columns, reversed for odd indices
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${!isImageLeft ? 'lg:grid-flow-col-dense' : ''}`}
              >

                {/* Image Section */}
                <div
                  className={`order-1 ${!isImageLeft ? 'lg:order-2' : 'lg:order-1'}`} // Swaps order for the zig-zag effect
                  data-aos={isImageLeft ? "fade-right" : "fade-left"}
                >
                  <div className="rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.01] border-4 border-orange-100">
                    <img
                      src={feature.image}
                      alt={feature.title + " illustration"}
                      // Adjustments for image display in the new layout
                      className="w-full h-auto object-cover max-h-96"
                    />
                  </div>
                </div>

                {/* Text Content Section */}
                <div
                  className={`order-2 p-4 ${!isImageLeft ? 'lg:order-1 lg:pr-10' : 'lg:order-2 lg:pl-10'}`} // Swaps order and adds padding
                  data-aos={isImageLeft ? "fade-left" : "fade-right"}
                >
                  <div className="flex items-center mb-4">
                    <Icon className={`w-8 h-8 ${PRIMARY_ORANGE_TEXT} mr-3`} />
                    <h3 className={`text-3xl font-bold text-gray-800`}>
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-orange-400 pl-4 py-1 bg-gray-50/50 rounded-r-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <hr className="my-16 border-gray-200" />
        <AdmissionTicker />
        {/* Leadership Callout - Uncommented for a stronger closing statement, referencing the header text */}
        {/* <div className="text-center py-10 bg-orange-600 rounded-3xl shadow-2xl">
          <p className="text-2xl md:text-3xl font-semibold text-white max-w-4xl mx-auto">
            Guided by <span className="font-extrabold underline decoration-white/50">IAS/IIT Alumni Leadership</span>, we are committed to setting new benchmarks in quality education.
          </p>
        </div> */}

      </div>
    </section>
  );
};

export default WhyChooseUs;