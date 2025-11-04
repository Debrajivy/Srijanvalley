"use client";
import React, { useState, useEffect, useRef } from 'react';
import { X } from "lucide-react";

// ===============================================
// 1. Helper Components for Form Fields
// ===============================================

// Input Box Component
interface InputProps { 
    label: string; 
    name: string; 
    type: string; 
    required?: boolean; 
    placeholder?: string; 
    pattern?: string; 
}
const InputBox: React.FC<InputProps> = ({ label, name, type, required, placeholder, pattern }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
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
interface SelectProps { 
    label: string; 
    name: string; 
    required?: boolean; 
    options: string[]; 
}
const SelectBox: React.FC<SelectProps> = ({ label, name, required, options }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
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

// ===============================================
// 2. Admission Form Components (Minimal & Single Section)
// ===============================================

// The admission banner content
const AdmissionHeaderImage: React.FC = () => (
    <div className="bg-orange-600 text-white p-3 text-center rounded-t-xl" >
        <h2 className="text-xl sm:text-xl md:text-xl font-bold mb-1 leading-tight">
            <span className="block">Admissions are open for the session 2026–27 :</span>
        </h2>
        <p className="text-sm sm:text-base font-medium mt-2">For classes - pre-nursery, nursery, KG and Standard 1-7</p>
    </div>
);

// The core logic of the simplified, single-section form
const AdmissionFormContent: React.FC = () => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder submission logic
        alert('Admission Inquiry Submitted! We will contact you shortly.');
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div style={{marginTop:-70}} className="p-4 sm:p-6">
            <p className="mb-6 text-sm text-gray-600 text-center">
                Please provide the following <strong>9 essential details</strong> to register your interest.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                <section className="bg-white p-4 sm:p-6 rounded-lg shadow-inner border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4 text-orange-600">Admission Inquiry Details</h2>

                    {/* Row 1: Student Name & Class */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <InputBox label="Student’s Full Name" name="student_name" type="text" required />
                        <SelectBox label="Class Applying For" name="apply_class" required options={["Pre-Nursery", "Nursery", "KG", "Std I", "Std II", "Std III", "Std IV", "Std V", "Std VI", "Std VII"]} />
                    </div>

                    {/* Row 2: DOB & Guardian Name (Required) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <InputBox label="Date of Birth (dd-mm-yyyy)" name="dob" type="date" required />
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
                        {/* Empty div for layout symmetry on desktop */}
                        <div className="hidden md:block"></div>
                    </div>

                </section>

                <div className="flex justify-center pt-4">
                    <button type="submit" className="w-full max-w-xs bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-150 shadow-md">
                        Submit Inquiry
                    </button>
                </div>
            </form>
        </div>
    );
};


// ===============================================
// 3. Main Popup Component (Exported)
// ===============================================

interface AdmissionPopupProps { 
    isOpen: boolean; 
    onClose: () => void; 
}

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

export default AdmissionPopup;