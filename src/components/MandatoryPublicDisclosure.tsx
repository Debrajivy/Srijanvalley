import React from 'react';

const MandatoryPublicDisclosure = () => {
  // Data array based on your provided sequence and links
  const disclosures = [
    {
      id: 1,
      title: "No Objection Certificate (NOC)",
      link: "https://drive.google.com/file/d/1RWLTEKWFKRmWPHMOsPwNBV0r3HS5UGYf/preview"
    },
    {
      id: 2,
      title: "Recognition Certificate",
      link: "https://drive.google.com/file/d/1Cy044WMZGpoRns_AkgtJEA-f00uT1XFa/preview"
    },
    {
      id: 3,
      title: "Land Certificate",
      link: "https://drive.google.com/file/d/1j8YC-1hCO5HX_FuxkejtrPYUaT1a0QhQ/preview"
    },
    {
      id: 4,
      title: "Fire Safety Certificate",
      link: "https://drive.google.com/file/d/1WrI5ti5rnsus3kid-WdxpHKJzpmJujc_/preview"
    },
    {
      id: 5,
      title: "Building Plan by Architect",
      link: "https://drive.google.com/file/d/1bH5nKg6OJ2JQDSMNzgjkYSqNN-a39hls/preview"
    },
    {
      id: 6,
      title: "Building Safety Certificate",
      link: "https://drive.google.com/file/d/198Wa2SkX7qbKOVp17KJNT-fhVPBRf9VW/preview"
    },
    {
      id: 7,
      title: "Built-up Area Certificate",
      link: "https://drive.google.com/file/d/1PiZuPYPRnENX1HFZSxdtqCfs05NjXNIL/preview"
    },
    {
      id: 8,
      title: "Certificate of Registration of Society/Trust",
      link: "https://drive.google.com/file/d/1jRKUxsRuWvN--IOYvOgWynQdoSQP7CS4/preview"
    },
    {
      id: 9,
      title: "Safe Drinking Water and Sanitary Condition Certificate",
      link: "https://drive.google.com/file/d/156ZZ-V3mlRHnB9nYE1je28l-Gkd5cuKN/preview"
    },
    {
      id: 10,
      title: "Water Sample Test Report",
      link: "https://drive.google.com/file/d/1gRSy_Ec0wM_V2PXEcExeMZ2HGctzo83Q/preview"
    },
    // NEW ROWS ADDED BELOW
    {
      id: 11,
      title: "Fee Structure",
      link: "https://drive.google.com/file/d/1pKoCEEUO1foa_k5NxQnLxo0JQmVzKupV/preview"
    },
    {
      id: 12,
      title: "Annual Calendar",
      link: "https://drive.google.com/file/d/11O_ABsfIfLwNu7-Z5IZ4xV9tmkrX2YVG/preview"
    },
    {
      id: 13,
      title: "School Managing Committee",
      link: "https://drive.google.com/file/d/14WP0s8W59SSb5imAd3hFomNI2fZLqW23/preview"
    },
    {
      id: 14,
      title: "Parents Teachers Association",
      link: "https://drive.google.com/file/d/1Pa0l2iyg3QyYPGb8LE71v_tUkBtqlaFd/preview"
    },
    {
      id: 15,
      title: "Board Result",
      link: "#" // No download button, just a hash symbol
    },
    {
      id: 16,
      title: "Affiliation",
      link: "#" // No download button, just a hash symbol
    }
  ];

  return (
    // FIX 2: Added scroll-mt-20 to offset the fixed header height (h-20 = 5rem)
    <section 
      id="mandatory-public-disclosure" 
      className="section-padding bg-gray-50 min-h-screen scroll-mt-20"
    >
      <div className="section-container max-w-6xl mx-auto px-4 py-16" style={{marginTop:-100}}>
        
        {/* Page Title */}
        <div className="text-center mb-5">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Mandatory Disclosures
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1e293b] text-white">
                  <th className="py-4 px-6 font-semibold text-sm md:text-base w-20 text-center border-r border-slate-700">
                    Sr No.
                  </th>
                  <th className="py-4 px-6 font-semibold text-sm md:text-base border-r border-slate-700">
                    Mandatory Disclosures
                  </th>
                  <th className="py-4 px-6 font-semibold text-sm md:text-base w-40 text-center">
                    Download
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {disclosures.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className={`transition-colors hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                  >
                    <td className="py-4 px-6 text-center text-gray-700 font-medium">
                      {item.id}
                    </td>
                    <td className="py-4 px-6 text-gray-700 font-medium">
                      {item.title}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {/* Conditional rendering: If link is '#', show just a hash. Otherwise show the Download button */}
                      {item.link === '#' ? (
                        <span className="text-gray-700 font-bold text-lg">#</span>
                      ) : (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-[#d25411] hover:bg-[#d25411] text-white text-sm font-semibold py-2 px-6 rounded transition-colors duration-200 shadow-sm"
                        >
                          Download
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MandatoryPublicDisclosure;