"use client"
import heroImage from '@/assets/srijan.webp';

import { ArrowRight, Calendar, Users, Award, BookOpen } from "lucide-react"

const Hero = () => {
  const handleApplyClick = () => {
    const element = document.querySelector("#contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleVisitClick = () => {
    window.location.href = "tel:+917079904000"
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-800/60 to-gray-500/80" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 sm:space-y-10 lg:space-y-12">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-block">
                <div style={{marginTop:30}} className="flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Award className="w-4 h-4" />
                  <span >IAS / IIT Alumni Promoted</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-white mb-2">Secure Your Child's</span>
                <span className="block text-orange-500">Future at Srijan Valley</span>
              </h1>

              <div className="space-y-2 text-white max-w-3xl mx-auto">
                <p className="text-lg sm:text-xl md:text-2xl font-medium">
                  CBSE Affiliated • 100% English Medium School
                </p>
                <p className="text-base sm:text-lg text-gray-200">Pithoriya, Ranchi</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button
                onClick={handleApplyClick}
                className="group w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* <button
                onClick={handleVisitClick}
                className="w-full sm:w-auto bg-white hover:bg-gray-100 text-gray-900 font-semibold px-8 py-4 rounded-xl transition-all duration-300 border-2 border-white hover:border-orange-500 flex items-center justify-center gap-3 text-lg shadow-md hover:shadow-lg"
              >
                <Calendar className="w-5 h-5 text-orange-600" />
                <span>Book a Visit</span>
              </button> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto pt-8 sm:pt-12">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 hover:bg-white transition-all duration-300 hover:shadow-xl group">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                    <BookOpen className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-5xl font-bold text-orange-600">2+</div>
                  <div className="text-base text-gray-700 font-medium">Acres Campus</div>
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 hover:bg-white transition-all duration-300 hover:shadow-xl group">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                    <Users className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-5xl font-bold text-orange-600">1:15</div>
                  <div className="text-base text-gray-700 font-medium">Teacher-Student Ratio</div>
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 hover:bg-white transition-all duration-300 hover:shadow-xl group">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                    <Award className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-5xl font-bold text-orange-600">1:1</div>
                  <div className="text-base text-gray-700 font-medium">Personal Mentorship</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
