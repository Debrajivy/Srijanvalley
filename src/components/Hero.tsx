"use client"
import heroImage from '@/assets/srijan.webp';
import { ArrowRight, Users, Award, BookOpen, X } from "lucide-react";
import React, { useState, useEffect, useRef } from 'react';

// ===============================================
// 1. Admission Form Components (Minimal & Single Section)
// ===============================================

// Web App URL for Google Apps Script
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzdihIB3IfKSr5SQg11ct79ycrnLv9QjqDVitMMlUxykN0fo0AVcIlIAFWKxz13Oscu/exec';

// The admission banner content
const AdmissionHeaderImage: React.FC = () => (
  <div className="bg-orange-600 text-white p-3 text-center rounded-t-xl">
    <h2 className="text-xl sm:text-xl md:text-xl font-bold mb-1 leading-tight">
      <span className="block">Admissions are open for the session 2026–27 :</span>
    </h2>
    <p className="text-sm sm:text-base font-medium mt-2">For classes - pre-nursery, nursery, KG and Standard 1-7</p>
  </div>
);

// The core logic of the simplified, single-section form
const AdmissionFormContent: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setMessage('');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Prepare data for Google Apps Script
    const submissionData = {
      StudentName: formData.get('student_name'),
      ClassApplyingFor: formData.get('apply_class'),
      DateOfBirth: formData.get('dob'),
      GuardianName: formData.get('guardian_name'),
      Gender: formData.get('gender'),
      CurrentSchool: formData.get('current_school'),
      MobileNumber: formData.get('mobile'),
      Locality: formData.get('locality'),
      Email: formData.get('email')
    };

    try {
      const response = await fetch(WEB_APP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(submissionData as any).toString()
      });

      const result = await response.json();

      if (result.result === 'success') {
        setSubmitStatus('success');
        setMessage('Admission Inquiry Submitted Successfully! We will contact you shortly.');
        form.reset();
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setMessage('Failed to submit form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{marginTop:-70}} className="p-4 sm:p-6">
      <p className="mb-6 text-sm text-gray-600 text-center">Please provide the following <strong>9 essential details</strong> to register your interest.</p>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
          {message}
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>

        {/* Single Section for All Details */}
        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-inner border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-orange-600">Admission Inquiry Details</h2>

          {/* Row 1: Student Name & Class */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputBox label="Student's Full Name" name="student_name" type="text" required />
            <SelectBox label="Class Applying For" name="apply_class" required options={["Pre-Nursery", "Nursery", "KG", "Std I", "Std II", "Std III", "Std IV", "Std V", "Std VI", "Std VII"]} />
          </div>

          {/* Row 2: DOB & Guardian Name (Required) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputBox label="Date of Birth" name="dob" type="date" required />
            <InputBox label="Guardian/Father's Name" name="guardian_name" type="text" required />
          </div>

          {/* Row 3: Gender & Current School (Optional) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <SelectBox label="Gender" name="gender" required options={["Female", "Male", "Other"]} />
            <InputBox label="Current School (if any)" name="current_school" type="text" />
          </div>

          {/* Row 4: Contact & Locality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputBox label="Primary Mobile Number" name="mobile" type="tel" placeholder="10-digit number" pattern="[0-9]{10}" required />
            <InputBox label="Residential Locality/Area" name="locality" type="text" placeholder="e.g., Pithoria / Kanke" required />
          </div>

          {/* Row 5: Email (Final Field) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputBox label="Email Address" name="email" type="email" />
            <div className="hidden md:block"></div>
          </div>

        </section>

        <div className="flex justify-center pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full max-w-xs font-semibold px-8 py-3 rounded-lg transition duration-150 shadow-md flex items-center justify-center gap-2 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-orange-600 hover:bg-orange-700 transform hover:scale-105'
            } text-white`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              'Submit Inquiry'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// --- Helper Components for Clean TSX ---

// Input Box Component
interface InputProps { label: string; name: string; type: string; required?: boolean; placeholder?: string; pattern?: string; }
const InputBox: React.FC<InputProps> = ({ label, name, type, required, placeholder, pattern }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
    <input
      name={name}
      type={type}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 transition-colors"
      required={required}
      placeholder={placeholder}
      pattern={pattern}
    />
  </div>
);

// Select Box Component
interface SelectProps { label: string; name: string; required?: boolean; options: string[]; }
const SelectBox: React.FC<SelectProps> = ({ label, name, required, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
    <select
      name={name}
      className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-orange-500 focus:border-orange-500 transition-colors"
      required={required}
      defaultValue=""
    >
      <option value="" disabled>Select</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

// 2. Main Popup Component
interface AdmissionPopupProps { isOpen: boolean; onClose: () => void; }
const AdmissionPopup: React.FC<AdmissionPopupProps> = ({ isOpen, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    if (isOpen) { document.addEventListener('keydown', handleEscape); }
    return () => { document.removeEventListener('keydown', handleEscape); };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto bg-black bg-opacity-70 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        ref={popupRef}
        className="relative w-full max-w-lg mx-4 bg-white rounded-xl shadow-2xl transform transition-all duration-300"
        onClick={e => e.stopPropagation()}
      >
        <AdmissionHeaderImage />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-20"
          aria-label="Close Admission Form"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-0 max-h-[90vh] sm:max-h-[80vh] overflow-y-auto">
          <AdmissionFormContent />
        </div>
      </div>
    </div>
  );
};

// ===============================================
// 3. Main Hero Component
// ===============================================

const Hero: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleApplyClick = () => {
    setIsPopupOpen(true);
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${(heroImage as any)?.src || heroImage})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-800/60 to-gray-500/80" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 sm:space-y-10 lg:space-y-12">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-block">
                <div style={{ marginTop: 30 }} className="flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Award className="w-4 h-4" />
                  <span>IAS / IIT Alumni Promoted</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-white mb-2">Secure Your Child's</span>
                <span className="block text-orange-500">Future at Srijan Valley</span>
              </h1>

              <div className="space-y-2 text-white max-w-3xl mx-auto">
                <p className="text-lg sm:text-xl md:text-2xl font-medium">
                  English Medium School
                </p>
                <p className="text-base sm:text-lg text-gray-200">Pithoria, Ranchi</p>
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

      {/* Admission Popup Component */}
      <AdmissionPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </section>
  )
}

export default Hero