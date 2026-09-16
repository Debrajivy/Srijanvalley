"use client";
import React, { useState } from "react";
// Added ChevronLeft, ChevronRight for the new multiple-image lightbox
import { Award, CalendarRange, Maximize, X, ChevronLeft, ChevronRight, BookOpenCheck, CalendarDays, Medal, Trophy,Play  } from "lucide-react";

// --- 1. Asset Imports (Existing and NEW) ---
// Note: In a real Next.js/React project, you MUST ensure these files exist
// at the specified paths relative to the component or adjust the import.
import ScienceExhibition from "../assets/ScienceExhibition.webp";
import ScienceExhibition2 from "../assets/ScienceExhibition2.webp";
import IndependenceDay1 from "../assets/IndependenceDay1.webp";
import IndependenceDay2 from "../assets/IndependenceDay2.webp";
import IndependenceDay3 from "../assets/IndependenceDay3.webp";
import IndependenceDay4 from "../assets/IndependenceDay4.webp";
import SciencePresentation1 from "../assets/SciencePresentation1.webp";
import StudentEnvironment from "../assets/StudentEnvironment.webp";
import Carrom1 from "../assets/Carrom1.webp";
import Carrom2 from "../assets/Carrom2.webp";
import mhc1 from "../assets/mhc1.jpeg";
import mhc2 from "../assets/mch2.jpeg";
import mhc3 from "../assets/mch3.jpeg";
import Db from "../assets/Db.jpeg";
import Dj from "../assets/Dj.jpeg";
import Hindusthan from "../assets/Hindusthan.jpeg";
import Hsc1 from "../assets/Hsc1.jpeg";
import Hsc2 from "../assets/Hsc2.jpeg";
import Hsc3 from "../assets/Hsc3.jpeg";
import Hsc4 from "../assets/Hsc4.jpeg";
import Hsc5 from "../assets/Hsc5.jpeg";
import ksc1 from "../assets/ksc1.jpeg";
import ksc2 from "../assets/ksc2.jpeg";
import ksc3 from "../assets/ksc3.jpeg";
import ksc4 from "../assets/ksc4.jpeg";
import ksc5 from "../assets/ksc5.jpeg";
import svrc from "../assets/svrc.jpeg";
import ptm1 from "../assets/ptm1.jpeg";
import ptm2 from "../assets/ptm2.jpeg";
import ptm3 from "../assets/ptm3.jpeg";
import ptm4 from "../assets/ptm4.jpeg";
import ptm5 from "../assets/ptm5.jpeg";
import ptm6 from "../assets/ptm6.jpeg";
import ptm7 from "../assets/ptm7.jpeg";
import ptm8 from "../assets/ptm8.jpeg";
import indc1 from "../assets/indc1.jpeg";
import indc2 from "../assets/indc2.jpeg";
import indc3 from "../assets/indc3.jpeg";
import indc4 from "../assets/indc4.jpeg";
import indc5 from "../assets/indc5.jpeg";
import indc6 from "../assets/indc6.jpeg";
import indc7 from "../assets/indc7.jpeg";
import simg1 from "../assets/simg1.jpeg";
import simg2 from "../assets/simg2.jpeg";

// --- NEW RANGOLI ASSETS (11 Images - Removed Rangoli2) ---
import Rangoli1 from "../assets/Rangoli1.webp";
import Rangoli3 from "../assets/Rangoli3.webp";
import Rangoli4 from "../assets/Rangoli4.webp";
import Rangoli5 from "../assets/Rangoli5.webp";
import Rangoli6 from "../assets/Rangoli6.webp";
import Rangoli7 from "../assets/Rangoli7.webp";
import Rangoli8 from "../assets/Rangoli8.webp";
import Rangoli9 from "../assets/Rangoli9.webp";
import Rangoli10 from "../assets/Rangoli10.webp";
import Rangoli11 from "../assets/Rangoli11.webp";
import Rangoli12 from "../assets/Rangoli12.webp";

// --- NEW CATEGORY ASSETS ---
import cd1 from "../assets/cd1.webp";
import cd2 from "../assets/cd2.webp";
import cd3 from "../assets/cd3.webp";
import cd4 from "../assets/cd4.webp";
import cd5 from "../assets/cd5.webp";
import cd6 from "../assets/cd6.webp";
import fd1 from "../assets/fd1.webp";
import fd2 from "../assets/fd2.webp";
import fd3 from "../assets/fd3.webp";
import fd4 from "../assets/fd4.webp";
import pd1 from "../assets/pd1.webp";
import pd2 from "../assets/pd2.webp";
import pd3 from "../assets/pd3.webp";
import pd4 from "../assets/pd4.webp";
import pd5 from "../assets/pd5.webp";
import pd6 from "../assets/pd6.webp";
import fancy1 from "../assets/fancy1.jpeg";
import fancy2 from "../assets/fancy2.jpeg";
import fancy3 from "../assets/fancy3.jpeg";
import fancy4 from "../assets/fancy4.jpeg";
import fancy5 from "../assets/fancy5.jpeg";
import fancy6 from "../assets/fancy6.jpeg";
import fancy7 from "../assets/fancy7.jpeg";
import fancy8 from "../assets/fancy8.jpeg";
import sow1 from "../assets/sow1.jpeg";
import sow2 from "../assets/sow2.jpeg";
import sow3 from "../assets/sow3.jpeg";
import sow4 from "../assets/sow4.jpeg";
import sow5 from "../assets/sow5.jpeg";
import sow6 from "../assets/sow6.jpeg";
import ifc1 from "../assets/ifc1.jpeg";
import ifc2 from "../assets/ifc2.jpeg";
import ifc3 from "../assets/ifc3.jpeg";
import ifc4 from "../assets/ifc4.jpeg";
import ifc5 from "../assets/ifc5.jpeg";
import ifc6 from "../assets/ifc6.jpeg";
import ifc7 from "../assets/ifc7.jpeg";
import ifc8 from "../assets/ifc8.jpeg";
import ifc9 from "../assets/ifc9.jpeg";
import ifc10 from "../assets/ifc10.jpeg";
import hindidiwas1 from "../assets/hindidiwas1.jpeg";
import hindidiwas2 from "../assets/hindidiwas2.jpeg";
import hindidiwas3 from "../assets/hindidiwas3.jpeg";
import hindidiwas4 from "../assets/hindidiwas4.jpeg";

// --- Configuration (Existing) ---
const COLOR_PRIMARY = "#ea590e";
const COLOR_BLACK = "text-black";
const COLOR_GRAY = "text-gray-700";
const COLOR_LIGHTGRAY_BG = "#f5f5f5";

// --- 2. Event Data Structure (Updated Photo Interface) ---
interface Photo {
    id: number;
    url: string;
    description: string;
    // Added optional caption for more detailed lightboxes
    caption?: string;
}

interface Event {
    id: number;
    category: string;
    title: string;
    previewPhoto: string;
    description: string;
    photos: Photo[];
    dateLocation?: string;
    details?: string[];
}

const HANDWRITING_WINNERS = [
    { className: "One", student: "Srikant Yadav", rank: 1 },
    { className: "Two", student: "Nayrya Anam", rank: 1 },
    { className: "Three", student: "Priyanshu Thakur", rank: 1 },
    { className: "Four", student: "Akshay Keshri", rank: 1 },
    { className: "Five", student: "Yas Raj Keshri", rank: 1 },
    { className: "Six", student: "Pari Kumari", rank: 1 },
    { className: "Seven", student: "Yog Maya Mishra", rank: 1 },
];

const SPELLATHON_RESULTS = [
    { className: "I", first: "Saanvi Kumari", second: "Pihu Kumari", third: "Shivansh" },
    { className: "II", first: "Nayra Anam", second: "Arnav Singh", third: "Simran Kachhap" },
];

const UNIT_TEST_II_ROUTINE = [
    { date: "01/08", subjects: ["Maths", "Hindi", "EVS", "EVS", "Hindi", "Maths", "English"] },
    { date: "03/08", subjects: ["English", "Maths", "English", "Hindi", "English", "Science", "Maths"] },
    { date: "04/08", subjects: ["EVS", "English", "Hindi", "English", "Maths", "SST", "Science"] },
    { date: "05/08", subjects: ["Hindi", "EVS", "Maths", "Maths", "EVS", "English", "Hindi"] },
    { date: "06/08", subjects: ["—", "—", "—", "—", "—", "Hindi", "SST"] },
];

type ScheduleType = "regular" | "test" | "exam" | "holiday" | "activity";

const JULY_2026_SCHEDULE: Array<{ date: string; day: string; event: string; type: ScheduleType }> = [
    { date: "01 July", day: "Wed", event: "Regular Classes", type: "regular" },
    { date: "02 July", day: "Thu", event: "Regular Classes", type: "regular" },
    { date: "03 July", day: "Fri", event: "Regular Classes", type: "regular" },
    { date: "04 July", day: "Sat", event: "Regular Classes & Unit Test (Std I–VII)", type: "test" },
    { date: "05 July", day: "Sun", event: "Sunday", type: "holiday" },
    { date: "06 July", day: "Mon", event: "Regular Classes & Unit Test (Std I–VII)", type: "test" },
    { date: "07 July", day: "Tue", event: "Regular Classes & Unit Test (Std I–VII)", type: "test" },
    { date: "08 July", day: "Wed", event: "Regular Classes & Unit Test (Std I–VII)", type: "test" },
    { date: "09 July", day: "Thu", event: "Regular Classes & Unit Test (Std VI & VII)", type: "test" },
    { date: "10 July", day: "Fri", event: "Regular Classes", type: "regular" },
    { date: "11 July", day: "Sat", event: "2nd Saturday (Holiday)", type: "holiday" },
    { date: "12 July", day: "Sun", event: "Sunday", type: "holiday" },
    { date: "13 July", day: "Mon", event: "Regular Classes", type: "regular" },
    { date: "14 July", day: "Tue", event: "Regular Classes", type: "regular" },
    { date: "15 July", day: "Wed", event: "Regular Classes & Spell-O-Thon Competition (Std I & II)", type: "activity" },
    { date: "16 July", day: "Thu", event: "Holiday (Rath Yatra)", type: "holiday" },
    { date: "17 July", day: "Fri", event: "Regular Classes", type: "regular" },
    { date: "18 July", day: "Sat", event: "English Essay Writing Competition (Std III–VII) & कविता गुंजन (Pre-Primary Classes)", type: "activity" },
    { date: "19 July", day: "Sun", event: "Sunday", type: "holiday" },
    { date: "20 July", day: "Mon", event: "Regular Classes", type: "regular" },
    { date: "21 July", day: "Tue", event: "Regular Classes", type: "regular" },
    { date: "22 July", day: "Wed", event: "Regular Classes", type: "regular" },
    { date: "23 July", day: "Thu", event: "Regular Classes", type: "regular" },
    { date: "24 July", day: "Fri", event: "Regular Classes", type: "regular" },
    { date: "25 July", day: "Sat", event: "कविता गुंजन (Std I–II)", type: "activity" },
    { date: "26 July", day: "Sun", event: "Sunday", type: "holiday" },
    { date: "27 July", day: "Mon", event: "Regular Classes", type: "regular" },
    { date: "28 July", day: "Tue", event: "Regular Classes", type: "regular" },
    { date: "29 July", day: "Wed", event: "Regular Classes", type: "regular" },
    { date: "30 July", day: "Thu", event: "Regular Classes", type: "regular" },
    { date: "31 July", day: "Fri", event: "Regular Classes", type: "regular" },
];

const AUGUST_2026_SCHEDULE: Array<{ date: string; day: string; event: string; type: ScheduleType }> = [
    { date: "01 August", day: "Sat", event: "Regular Classes, Hindi Handwriting Competition (Std I–VII) & Unit Test (Classes I–VII)", type: "test" },
    { date: "02 August", day: "Sun", event: "Holiday", type: "holiday" },
    { date: "03 August", day: "Mon", event: "Regular Classes & Unit Test (Classes I–VII)", type: "test" },
    { date: "04 August", day: "Tue", event: "Regular Classes & Unit Test (Classes I–VII)", type: "test" },
    { date: "05 August", day: "Wed", event: "Regular Classes & Unit Test (Classes I–VII)", type: "test" },
    { date: "06 August", day: "Thu", event: "Regular Classes & Unit Test (Classes VI–VII)", type: "test" },
    { date: "07 August", day: "Fri", event: "Regular Classes", type: "regular" },
    { date: "08 August", day: "Sat", event: "Holiday (2nd Saturday)", type: "holiday" },
    { date: "09 August", day: "Sun", event: "Holiday", type: "holiday" },
    { date: "10 August", day: "Mon", event: "Regular Classes", type: "regular" },
    { date: "11 August", day: "Tue", event: "Regular Classes", type: "regular" },
    { date: "12 August", day: "Wed", event: "Regular Classes", type: "regular" },
    { date: "13 August", day: "Thu", event: "Regular Classes", type: "regular" },
    { date: "14 August", day: "Fri", event: "Regular Classes", type: "regular" },
    { date: "15 August", day: "Sat", event: "Independence Day Celebration", type: "activity" },
    { date: "16 August", day: "Sun", event: "Holiday", type: "holiday" },
    { date: "17 August", day: "Mon", event: "Regular Classes", type: "regular" },
    { date: "18 August", day: "Tue", event: "Regular Classes", type: "regular" },
    { date: "19 August", day: "Wed", event: "Spell-O-Thon (Nursery–K.G.) & Hindi Elocution Competition (Std I–III)", type: "activity" },
    { date: "20 August", day: "Thu", event: "Regular Classes", type: "regular" },
    { date: "21 August", day: "Fri", event: "Regular Classes", type: "regular" },
    { date: "22 August", day: "Sat", event: "Inter House Debate Competition — Hindi & English (Std IV–V)", type: "activity" },
    { date: "23 August", day: "Sun", event: "Holiday", type: "holiday" },
    { date: "24 August", day: "Mon", event: "Regular Classes", type: "regular" },
    { date: "25 August", day: "Tue", event: "Holiday (Milad un Nabi)", type: "holiday" },
    { date: "26 August", day: "Wed", event: "Regular Classes", type: "regular" },
    { date: "27 August", day: "Thu", event: "Regular Classes", type: "regular" },
    { date: "28 August", day: "Fri", event: "Holiday (Raksha Bandhan)", type: "holiday" },
    { date: "29 August", day: "Sat", event: "Drawing Competition (Std Pre-Nursery–VII)", type: "activity" },
    { date: "30 August", day: "Sun", event: "Holiday", type: "holiday" },
    { date: "31 August", day: "Mon", event: "Regular Classes", type: "regular" },
];

const SEPTEMBER_2026_SCHEDULE: Array<{ date: string; day: string; event: string; type: ScheduleType }> = [
    { date: "01 September", day: "Tue", event: "Regular Classes", type: "regular" },
    { date: "02 September", day: "Wed", event: "Inter-House Debate Competition (Std IV & V)", type: "activity" },
    { date: "03 September", day: "Thu", event: "Regular Classes", type: "regular" },
    { date: "04 September", day: "Fri", event: "Holiday (Janmashtami)", type: "holiday" },
    { date: "05 September", day: "Sat", event: "Teachers' Day Celebration", type: "activity" },
    { date: "06 September", day: "Sun", event: "Holiday", type: "holiday" },
    { date: "07 September", day: "Mon", event: "Regular Classes", type: "regular" },
    { date: "08 September", day: "Tue", event: "Regular Classes", type: "regular" },
    { date: "09 September", day: "Wed", event: "Elocution Competition (Std I, II & III)", type: "activity" },
    { date: "10 September", day: "Thu", event: "Regular Classes", type: "regular" },
    { date: "11 September", day: "Fri", event: "Regular Classes", type: "regular" },
    { date: "12 September", day: "Sat", event: "Holiday (2nd Saturday)", type: "holiday" },
    { date: "13 September", day: "Sun", event: "Holiday", type: "holiday" },
    { date: "14 September", day: "Mon", event: "Regular Classes & Celebration of Hindi Diwas", type: "activity" },
    { date: "15 September", day: "Tue", event: "Regular Classes", type: "regular" },
    { date: "16 September", day: "Wed", event: "Mid-Term Exam", type: "exam" },
    { date: "17 September", day: "Thu", event: "Holiday (Vishwakarma Puja)", type: "holiday" },
    { date: "18 September", day: "Fri", event: "Mid-Term Exam", type: "exam" },
    { date: "19 September", day: "Sat", event: "Mid-Term Exam", type: "exam" },
    { date: "20 September", day: "Sun", event: "Holiday", type: "holiday" },
    { date: "21 September", day: "Mon", event: "Mid-Term Exam", type: "exam" },
    { date: "22 September", day: "Tue", event: "Mid-Term Exam", type: "exam" },
    { date: "23 September", day: "Wed", event: "Holiday (Karma Puja Celebration)", type: "holiday" },
    { date: "24 September", day: "Thu", event: "Regular Classes & Exam of Std VI & VII", type: "exam" },
    { date: "25 September", day: "Fri", event: "Regular Classes & Exam of Std VI & VII", type: "exam" },
    { date: "26 September", day: "Sat", event: "Regular Classes", type: "regular" },
    { date: "27 September", day: "Sun", event: "Holiday", type: "holiday" },
    { date: "28 September", day: "Mon", event: "Regular Classes", type: "regular" },
    { date: "29 September", day: "Tue", event: "Regular Classes", type: "regular" },
    { date: "30 September", day: "Wed", event: "Hindi Essay Writing Competition (Std IV–VII)", type: "activity" },
];

// --- 3. Actual Event Data (New Categories Added) ---
const EVENTS: Event[] = [
    {
        id: 133,
        category: "Inter-School Hindi Recitation Competition",
        title: "Young Voices Shine at the Hindi Recitation Competition",
        previewPhoto: simg1,
        description: "Nayra Anam of Standard II and Jiya Kumari of Nursery represented Srijan Valley School with confidence, clarity and enthusiasm.",
        dateLocation: "International Library and Cultural Centre, Ranchi",
        details: [
            "Srijan Valley School proudly participated in an Inter-School Hindi Recitation Competition organised by the International Library and Cultural Centre, Ranchi.",
            "Nayra Anam of Standard II and Jiya Kumari of Nursery represented the school in the competition. Both young participants presented their poems with great confidence, clarity and enthusiasm. Their expressions, voice modulation and overall presentation were highly appreciated by the audience.",
            "The school congratulates Nayra Anam and Jiya Kumari for their commendable performances and wishes them continued success in all their future endeavours.",
        ],
        photos: [
            { id: 6501, url: simg1, description: "Nayra Anam and Jiya Kumari participating in the Inter-School Hindi Recitation Competition at the International Library and Cultural Centre, Ranchi." },
            { id: 6502, url: simg2, description: "Nayra Anam and Jiya Kumari with their certificates after their commendable Hindi recitation performances." },
        ],
    },
    // --- INTER-HOUSE DEBATE COMPETITION & PRIZE DISTRIBUTION CEREMONY ---
    ...[indc1, indc2, indc3, indc4, indc5, indc6, indc7].map((photo, index): Event => ({
        id: 125 + index,
        category: "Inter-House Debate & Prize Distribution",
        title: "Inter-House Debate Competition & Prize Distribution Ceremony",
        previewPhoto: photo,
        description: "Celebrating confident debate performances and the achievements of the English Handwriting and Spell-o-Thon competition winners.",
        dateLocation: "25 July 2026 | Srijan Valley School",
        details: [
            "Srijan Valley School successfully organized an Inter-House Debate Competition on 25th July 2026 on the topic, “Examinations are Necessary for Students.” Students from all houses participated with remarkable enthusiasm, confidence, and well-prepared arguments, making the event highly engaging and thought-provoking.",
            "Rose House emerged as the Winner (For the Motion), while Jasmine House secured the Winner (Against the Motion) title with their outstanding performances.",
            "The day also witnessed the Prize Distribution Ceremony for the winners of the English Handwriting Competition and Spell-o-Thon Competition. The prizes were presented to the students by Director Sri Pramod Agrawal and Academic Director Mrs. Renu Agrawal, who congratulated the winners and encouraged all students to continue striving for excellence.",
            "The event concluded on a joyful note, celebrating confidence, communication skills, and academic excellence.",
        ],
        photos: [
            {
                id: 6401 + index,
                url: photo,
                description: [
                    "Students presenting their arguments during the Inter-House Debate Competition.",
                    "Young speakers participating with confidence and well-prepared arguments.",
                    "Rose House celebrating its winning performance for the motion.",
                    "Jasmine House being recognized for its winning performance against the motion.",
                    "Winners receiving prizes during the Prize Distribution Ceremony.",
                    "Director Sri Pramod Agrawal and Academic Director Mrs. Renu Agrawal congratulating the students.",
                    "Celebrating confidence, communication skills, and academic excellence at Srijan Valley School.",
                ][index],
            },
        ],
    })),

    // --- PARENT-TEACHER MEETING & ART EXHIBITION ---
    ...[ptm1, ptm2, ptm3, ptm4, ptm5, ptm6, ptm7, ptm8].map((photo, index): Event => ({
        id: 117 + index,
        category: "Parent-Teacher Meeting & Art Exhibition",
        title: "Parent-Teacher Meeting & Art & Craft Exhibition",
        previewPhoto: photo,
        description: "Parents met teachers to review academic progress while celebrating the creativity and talent displayed in the student Art & Craft Exhibition.",
        dateLocation: "22 July 2026 | Srijan Valley School, Amba Toli, Pithoria, Ranchi",
        details: [
            "Srijan Valley School successfully conducted the Parent-Teacher Meeting (PTM) for the First Unit Test on 22nd July 2026. Parents interacted with teachers, reviewed their children’s answer scripts, and discussed their academic progress.",
            "A major highlight of the event was the Art & Craft Exhibition, featuring creative artworks and innovative projects prepared by the students. The exhibition was inaugurated by Mrs. Munni Devi, Mukhiya of Pithoria Panchayat, and was widely appreciated by the parents for showcasing the students’ creativity and talent.",
            "Mrs. Renu Agrawal, Academic Director, emphasized that such co-curricular activities play a vital role in nurturing creativity, confidence, and the overall personality development of children.",
            "The programme was a great success and reflected the school’s commitment to academic excellence and holistic education through the active partnership of parents and teachers.",
        ],
        photos: [
            {
                id: 6301 + index,
                url: photo,
                description: [
                    "Parent-Teacher Meeting and Art & Craft Exhibition at Srijan Valley School.",
                    "Parents interacting with teachers and reviewing their children’s academic progress.",
                    "Students’ creative artwork and craft projects displayed at the exhibition.",
                    "Mrs. Munni Devi, Mukhiya of Pithoria Panchayat, inaugurating the exhibition.",
                    "Parents appreciating the creativity and talent showcased by the students.",
                    "Innovative projects prepared by students for the Art & Craft Exhibition.",
                    "Moments from the successful Parent-Teacher Meeting and exhibition.",
                    "Celebrating academic excellence, creativity, and the partnership between parents and teachers.",
                ][index],
            },
        ],
    })),

    // --- INTER-SCHOOL READING COMPETITION ---
    {
        id: 116,
        category: "Inter-School Reading Competition",
        title: "Khyati Singh Shines at Inter-School Reading Competition",
        previewPhoto: svrc,
        description: "Khyati Singh of Class V impressed the audience with her clear pronunciation, voice modulation, fluency, and confident presentation.",
        photos: [
            {
                id: 6201,
                url: svrc,
                description: "Khyati Singh of Class V representing Srijan Valley School at the Inter-School Reading Competition organised by the International Library and Cultural Centre on 8 July 2026.",
            },
        ],
    },

    // --- INDEPENDENCE DAY (4 Events) ---
    {
        id: 1,
        category: "Independence Day",
        title: "Flag Hoisting Ceremony & Speeches",
        previewPhoto: IndependenceDay1,
        description: "The core ceremony featuring the national flag hoisting and...",
        photos: [
            { id: 101, url: IndependenceDay1, description: "Flag Hoisting Ceremony in progress with guests." },
        ],
    },
    {
        id: 2,
        category: "Independence Day",
        title: "Cultural Performances & Drill",
        previewPhoto: IndependenceDay2,
        description: "Students presenting spirited patriotic drills and traditional...",
        photos: [
            { id: 201, url: IndependenceDay2, description: "Students in a formation for the cultural drill." },
        ],
    },
    {
        id: 3,
        category: "Independence Day",
        title: "Student Patriotic Speech",
        previewPhoto: IndependenceDay3,
        description: "A talented student delivering an inspirational speech.",
        photos: [
            { id: 301, url: IndependenceDay3, description: "A student delivers a patriotic speech to the audience." },
        ],
    },
    {
        id: 4,
        category: "Independence Day",
        title: "Guest of Honour Speeches",
        previewPhoto: IndependenceDay4,
        description: "Inspirational addresses delivered by special guests and faculty.",
        photos: [
            { id: 401, url: IndependenceDay4, description: "A guest of honour delivering an address." },
        ],
    },

    // --- SCIENCE EXHIBITION (3 Events) ---
    {
        id: 5,
        category: "Science Exhibition",
        title: "Sustainable Habitat Model Expo",
        previewPhoto: ScienceExhibition,
        description: "Display of intricate and creative working models on sustainable living.",
        photos: [
            { id: 501, url: ScienceExhibition, description: "A detailed model of a sustainable habitat." },
        ],
    },
    {
        id: 6,
        category: "Science Exhibition",
        title: "Project Research Presentation",
        previewPhoto: SciencePresentation1,
        description: "Students explaining their research and innovative solutions to the visitors.",
        photos: [
            { id: 601, url: SciencePresentation1, description: "Students explaining their physics project to the visitors." },
        ],
    },
    {
        id: 7,
        category: "Science Exhibition",
        title: "Primary Shapes & Counting Exhibit",
        previewPhoto: ScienceExhibition2,
        description: "Young students showcasing their basic concepts of shapes and counting to visitors.",
        photos: [
            { id: 701, url: ScienceExhibition2, description: "Students presenting a chart on geometric shapes." },
        ],
    },

    // --- INTER HOUSE RANGOLI COMPETITION (11 Individual Events) ---
    {
        id: 11,
        category: "Inter House Rangoli Competition",
        title: "Team One - Floral Rangoli",
        previewPhoto: Rangoli1,
        description: "Team one working on their floral-themed Rangoli.",
        photos: [{ id: 1101, url: Rangoli1, description: "Team one working on their floral-themed Rangoli." }],
    },
    {
        id: 12,
        category: "Inter House Rangoli Competition",
        title: "Judging the Designs",
        previewPhoto: Rangoli3,
        description: "Doctors assessing the complexity of the design.",
        photos: [{ id: 1102, url: Rangoli3, description: "Doctors assessing the complexity of the design." }],
    },
    {
        id: 13,
        category: "Inter House Rangoli Competition",
        title: "Adding Final Touches",
        previewPhoto: Rangoli4,
        description: "Students carefully adding finishing touches to their artwork.",
        photos: [{ id: 1103, url: Rangoli4, description: "Students carefully adding finishing touches to their artwork." }],
    },
    {
        id: 14,
        category: "Inter House Rangoli Competition",
        title: "Geometric Design Showcase",
        previewPhoto: Rangoli5,
        description: "A bird's-eye view of a completed geometric Rangoli.",
        photos: [{ id: 1104, url: Rangoli5, description: "A bird's-eye view of a completed geometric Rangoli." }],
    },
    {
        id: 15,
        category: "Inter House Rangoli Competition",
        title: "Proud House Team",
        previewPhoto: Rangoli6,
        description: "Another team proudly standing next to their creation.",
        photos: [{ id: 1105, url: Rangoli6, description: "Another team proudly standing next to their creation." }],
    },
    {
        id: 16,
        category: "Inter House Rangoli Competition",
        title: "Traditional Motif Rangoli",
        previewPhoto: Rangoli7,
        description: "A traditional Indian motif beautifully executed with colored powder.",
        photos: [{ id: 1106, url: Rangoli7, description: "A traditional Indian motif beautifully executed with colored powder." }],
    },
    {
        id: 17,
        category: "Inter House Rangoli Competition",
        title: "Focused Creativity",
        previewPhoto: Rangoli8,
        description: "The concentration and focus of a student during the competition.",
        photos: [{ id: 1107, url: Rangoli8, description: "The concentration and focus of a student during the competition." }],
    },
    {
        id: 18,
        category: "Inter House Rangoli Competition",
        title: "Detailed Shading Work",
        previewPhoto: Rangoli9,
        description: "A section of the design featuring intricate shading.",
        photos: [{ id: 1108, url: Rangoli9, description: "A section of the design featuring intricate shading." }],
    },
    {
        id: 19,
        category: "Inter House Rangoli Competition",
        title: "Final Rangoli Presentation",
        previewPhoto: Rangoli10,
        description: "Final presentation of the house Rangoli entries.",
        photos: [{ id: 1109, url: Rangoli10, description: "Final presentation of the house Rangoli entries." }],
    },
    {
        id: 20,
        category: "Inter House Rangoli Competition",
        title: "Decorative Diyas in Rangoli",
        previewPhoto: Rangoli11,
        description: "Creative use of diyas and other decorations.",
        photos: [{ id: 1110, url: Rangoli11, description: "Creative use of diyas and other decorations." }],
    },
    {
        id: 21,
        category: "Inter House Rangoli Competition",
        title: "Modern Abstract Rangoli",
        previewPhoto: Rangoli12,
        description: "An abstract design showcasing modern Rangoli art.",
        photos: [{ id: 1111, url: Rangoli12, description: "An abstract design showcasing modern Rangoli art." }],
    },

    // --- PRIZE DISTRIBUTION CEREMONY (6 Events) ---
    {
        id: 22,
        category: "Prize Distribution Ceremony",
        title: "Academic Excellence Awards",
        previewPhoto: pd1,
        description: "Students receiving awards for outstanding academic performance.",
        photos: [{ id: 2201, url: pd1, description: "Top academic performers receiving their certificates and trophies." }],
    },
    {
        id: 23,
        category: "Prize Distribution Ceremony",
        title: "Sports Achievement Recognition",
        previewPhoto: pd2,
        description: "Celebrating the achievements of our young athletes.",
        photos: [{ id: 2202, url: pd2, description: "Sports champions receiving medals and certificates." }],
    },
    {
        id: 24,
        category: "Prize Distribution Ceremony",
        title: "Cultural Event Winners",
        previewPhoto: pd3,
        description: "Awarding participants who excelled in cultural activities.",
        photos: [{ id: 2203, url: pd3, description: "Winners of various cultural competitions receiving their prizes." }],
    },
    {
        id: 25,
        category: "Prize Distribution Ceremony",
        title: "Special Guest Presenting Awards",
        previewPhoto: pd4,
        description: "Distinguished guests honoring our students' achievements.",
        photos: [{ id: 2204, url: pd4, description: "Special guest presenting awards to deserving students." }],
    },
    {
        id: 26,
        category: "Prize Distribution Ceremony",
        title: "Group Photo with Award Winners",
        previewPhoto: pd5,
        description: "Memorable group photograph of all the award recipients.",
        photos: [{ id: 2205, url: pd5, description: "All award winners posing for a group photograph." }],
    },
    {
        id: 27,
        category: "Prize Distribution Ceremony",
        title: "Principal's Address to Winners",
        previewPhoto: pd6,
        description: "Principal addressing and congratulating the award winners.",
        photos: [{ id: 2206, url: pd6, description: "Principal delivering an inspirational speech to the winners." }],
    },

    // --- FANCY DRESS COMPETITION (4 Events) ---
    {
        id: 28,
        category: "Fancy Dress Competition at International Library and Cultural Centre",
        title: "Traditional Costume Presentations",
        previewPhoto: fd1,
        description: "Students showcasing traditional attire from different cultures.",
        photos: [{ id: 2801, url: fd1, description: "Young students in beautiful traditional costumes on stage." }],
    },
    {
        id: 29,
        category: "Fancy Dress Competition at International Library and Cultural Centre",
        title: "Creative Character Portrayals",
        previewPhoto: fd2,
        description: "Innovative and creative character representations by students.",
        photos: [{ id: 2802, url: fd2, description: "Students portraying various historical and fictional characters." }],
    },
    {
        id: 30,
        category: "Fancy Dress Competition at International Library and Cultural Centre",
        title: "Doctors Evaluating Performances",
        previewPhoto: fd3,
        description: "Expert judges assessing the participants' presentations.",
        photos: [{ id: 2803, url: fd3, description: "Doctors carefully evaluating each participant's performance." }],
    },
    {
        id: 31,
        category: "Fancy Dress Competition at International Library and Cultural Centre",
        title: "Confident Stage Performances",
        previewPhoto: fd4,
        description: "Students demonstrating confidence and poise on stage.",
        photos: [{ id: 2804, url: fd4, description: "Young participants confidently performing on the grand stage." }],
    },

    // --- CHILDREN'S DAY CELEBRATION (6 Events) ---
    {
        id: 32,
        category: "Children's Day Celebration",
        title: "Special Assembly Program",
        previewPhoto: cd1,
        description: "Teachers organizing special activities for students.",
        photos: [{ id: 3201, url: cd1, description: "Teachers performing for students during Children's Day assembly." }],
    },
    {
        id: 33,
        category: "Children's Day Celebration",
        title: "Cultural Performances by Teachers",
        previewPhoto: cd2,
        description: "Teachers entertaining students with various performances.",
        photos: [{ id: 3202, url: cd2, description: "Faculty members presenting cultural programs for students." }],
    },
    {
        id: 34,
        category: "Children's Day Celebration",
        title: "Fun Games and Activities",
        previewPhoto: cd3,
        description: "Students participating in exciting games and competitions.",
        photos: [{ id: 3203, url: cd3, description: "Students enjoying fun games organized by teachers." }],
    },
    {
        id: 35,
        category: "Children's Day Celebration",
        title: "Pandit Nehru Memorial Performance",
        previewPhoto: cd4,
        description: "Showcasing the pandit Nehru memorial performance.",
        photos: [{ id: 3204, url: cd4, description: "Students performing their special talents on stage." }],
    },
    {
        id: 36,
        category: "Children's Day Celebration",
        title: "Distribution of Treats and Gifts",
        previewPhoto: cd5,
        description: "Students receiving special treats and gifts.",
        photos: [{ id: 3205, url: cd5, description: "Distribution of sweets and gifts to all students." }],
    },
    {
        id: 37,
        category: "Children's Day Celebration",
        title: "Group Celebrations and Photos",
        previewPhoto: cd6,
        description: "Memorable moments from the celebrations.",
        photos: [{ id: 3206, url: cd6, description: "Students celebrating together and posing for photographs." }],
    },

    // --- INDOOR GAMES (2 Events) ---
    {
        id: 8,
        category: "Indoor Games",
        title: "Carrom Tournament - Semi-Finals",
        previewPhoto: Carrom1,
        description: "Students competing intensely in the semi-finals of the annual carrom tournament.",
        photos: [
            { id: 801, url: Carrom1, description: "Students focused on the carrom board." },
        ],
    },
    {
        id: 9,
        category: "Indoor Games",
        title: "Board Game Club Meeting",
        previewPhoto: Carrom2,
        description: "A snapshot from the weekly indoor board game club meeting.",
        photos: [
            { id: 901, url: Carrom2, description: "Students enjoying a friendly game of carrom." },
        ],
    },

    // --- ENVIRONMENT PRESENTATION (1 Event) ---
    {
        id: 10,
        category: "Environment Presentation",
        title: "Go Green: Environment Awareness Day",
        previewPhoto: StudentEnvironment,
        description: "Students presented on sustainability, conservation, and climate action.",
        photos: [
            { id: 1001, url: StudentEnvironment, description: "Student presenters focusing on conservation strategies." },
        ],
    },
    {
        id: 38, // Changed from 11 to 38
        category: "Medical Health Camp",
        title: "Medical & Health Camp",
        previewPhoto: mhc1,
        description: "",
        photos: [
            { id: 3801, url: mhc1, description: "" },
        ],
    },
    {
        id: 39, // Changed from 12 to 39
        category: "Health Screening School Children",
        title: "Health Screening School Children",
        previewPhoto: mhc2,
        description: "",
        photos: [
            { id: 3901, url: mhc2, description: "" },
        ],
    },
    // --- HINDI SPEECH COMPETITION (6 Events) ---
    {
        id: 41,
        category: "Hindi Speech Competition",
        title: "Confident Oratory Skills",
        previewPhoto: Hsc1,
        description: "The aim of the Hindi speech competition is to develop students' confidence in speaking the language.",
        photos: [
            { id: 4101, url: Hsc1, description: "Student demonstrating confident oratory skills on stage." },
        ],
    },
    {
        id: 42,
        category: "Hindi Speech Competition",
        title: "Creative Expression",
        previewPhoto: Hsc2,
        description: "It encourages them to express their thoughts clearly and creatively.",
        photos: [
            { id: 4201, url: Hsc2, description: "Student creatively expressing thoughts during the speech competition." },
        ],
    },
    {
        id: 43,
        category: "Hindi Speech Competition",
        title: "Pronunciation Practice",
        previewPhoto: Hsc3,
        description: "Helps in improving their pronunciation and vocabulary.",
        photos: [
            { id: 4301, url: Hsc3, description: "Student focusing on proper pronunciation during the speech." },
        ],
    },
    {
        id: 44,
        category: "Hindi Speech Competition",
        title: "Communication Skills Development",
        previewPhoto: Hsc4,
        description: "Enhances overall communication skills in Hindi.",
        photos: [
            { id: 4401, url: Hsc4, description: "Student developing communication skills through speech delivery." },
        ],
    },
    {
        id: 45,
        category: "Hindi Speech Competition",
        title: "Thoughtful Content Delivery",
        previewPhoto: Hsc5,
        description: "Students expressing their thoughts clearly in Hindi.",
        photos: [
            { id: 4501, url: Hsc5, description: "Student delivering thoughtful content to the audience." },
        ],

    },
    {
        id: 46,
        category: "A Fancy Dress Competition",
        title: "A Fancy Dress Competition",
        previewPhoto: fancy1,
        description: "A Fancy Dress Competition was organized today at Srijan Valley School for students of Nursery, KG, Class I and II. The children participated with great enthusiasm and confidence. Parents of students also enjoyed the programme.",
        photos: [
            { id: 4601, url: fancy1, description: "A Fancy Dress Competition was organized today at Srijan Valley School for students of Nursery, KG, Class I and II. The children participated with great enthusiasm and confidence. Parents of students also enjoyed the programme." },
        ],

    },
    {
        id: 47,
        category: "A Fancy Dress Competition",
        title: "A Fancy Dress Competition",
        previewPhoto: fancy3,
        description: "A Fancy Dress Competition was organized today at Srijan Valley School for students of Nursery, KG, Class I and II. The children participated with great enthusiasm and confidence. Parents of students also enjoyed the programme.",
        photos: [
            { id: 4601, url: fancy3, description: "A Fancy Dress Competition was organized today at Srijan Valley School for students of Nursery, KG, Class I and II. The children participated with great enthusiasm and confidence. Parents of students also enjoyed the programme." },
        ],

    },
    {
        id: 48,
        category: "A Fancy Dress Competition",
        title: "A Fancy Dress Competition",
        previewPhoto: fancy7,
        description: "A Fancy Dress Competition was organized today at Srijan Valley School for students of Nursery, KG, Class I and II. The children participated with great enthusiasm and confidence. Parents of students also enjoyed the programme.",
        photos: [
            { id: 4601, url: fancy7, description: "A Fancy Dress Competition was organized today at Srijan Valley School for students of Nursery, KG, Class I and II. The children participated with great enthusiasm and confidence. Parents of students also enjoyed the programme." },
        ],

    },
    {
        id: 49,
        category: "A Fancy Dress Competition",
        title: "A Fancy Dress Competition",
        previewPhoto: fancy6,
        description: "A Fancy Dress Competition was organized today at Srijan Valley School for students of Nursery, KG, Class I and II. The children participated with great enthusiasm and confidence. Parents of students also enjoyed the programme.",
        photos: [
            { id: 4601, url: fancy6, description: "A Fancy Dress Competition was organized today at Srijan Valley School for students of Nursery, KG, Class I and II. The children participated with great enthusiasm and confidence. Parents of students also enjoyed the programme." },
        ],
    },
    {
        id: 50,
        category: "Educational Visit",
        title: "Visit to Space on Wheels",
        previewPhoto: sow1,
        description: "Students of Classes IV, V, and VI at Srijan Valley School visited the 'Space on Wheels' bus today, embarking on an exciting journey through space science and technology.",
        photos: [
            {
                "id": 4602,
                "url": sow1,
                "description": "Students of Srijan Valley School arriving at the 'Space on Wheels' mobile exhibition bus."
            }
        ]
    },
    {
        id: 51,
        category: "Educational Visit",
        title: "Visit to Space on Wheels",
        previewPhoto: sow2,
        description: "The exhibition provided a practical learning experience, allowing children to explore detailed models of various planets and our solar system.",
        photos: [
            {
                "id": 4603,
                "url": sow2,
                "description": "Young learners exploring detailed models and displays related to the planets."
            }
        ]
    },
    {
        "id": 52,
        "category": "Educational Visit",
        "title": "Visit to Space on Wheels",
        "previewPhoto": sow3,
        "description": "Curiosity was at an all-time high as students studied satellite technology and the mechanics of space exploration during their visit.",
        "photos": [
            {
                "id": 4604,
                "url": sow3,
                "description": "Students showing great interest in the satellite models and space science displays."
            }
        ]
    },
    {
        "id": 53,
        "category": "Educational Visit",
        "title": "Visit to Space on Wheels",
        "previewPhoto": sow4,
        "description": "The 'Space on Wheels' initiative brought complex astronomical concepts to life, making science both accessible and enjoyable for Classes IV to VI.",
        "photos": [
            {
                "id": 4605,
                "url": sow4,
                "description": "An informative session where students learned about the history of space missions."
            }
        ]
    },
    {
        "id": 54,
        "category": "Educational Visit",
        "title": "Visit to Space on Wheels",
        "previewPhoto": sow5,
        "description": "Students actively participated in the interactive displays, asking insightful questions about life in space and modern satellite communication.",
        "photos": [
            {
                "id": 4606,
                "url": sow5,
                "description": "Students participating and asking questions during the interactive learning experience."
            }
        ]
    },
    {
        "id": 55,
        "category": "Educational Visit",
        "title": "Visit to Space on Wheels",
        "previewPhoto": sow6,
        "description": "This memorable visit to the mobile space lab enhanced the students' knowledge and sparked a newfound interest in celestial science.",
        "photos": [
            {
                "id": 4607,
                "url": sow6,
                "description": "The visit concluded as a truly memorable and educational experience for all Srijan Valley students."
            }
        ]
    },

    {
        "id": 101,
        "category": "Inaugural and facilitation ceremony",
        "title": "Grand Opening Ceremony",
        "previewPhoto": ifc1,
        "description": "The academic year commenced with a prestigious lamp-lighting ceremony, marking a new chapter of excellence and growth.",
        "photos": [
            {
                "id": 5001,
                "url": ifc1,
                "description": "Dignitaries and faculty members lighting the ceremonial lamp to signify the beginning of the journey."
            }
        ]
    },
    {
        "id": 102,
        "category": "Inaugural and facilitation ceremony",
        "title": "Annual Excellence Awards",
        "previewPhoto": ifc2,
        "description": "A proud moment for Srijan Valley as we honored our top achievers for their outstanding academic and co-curricular performance.",
        "photos": [
            {
                "id": 5002,
                "url": ifc2,
                "description": "Students receiving gold medals and certificates of merit during the facilitation segment."
            }
        ]
    },
    {
        "id": 103,
        "category": "Inaugural and facilitation ceremony",
        "title": "Investiture Ceremony",
        "previewPhoto": ifc3,
        "description": "The newly elected student council took their oaths, promising to lead with integrity and uphold the school's values.",
        "photos": [
            {
                "id": 5003,
                "url": ifc3,
                "description": "The Head Boy and Head Girl being pinned with their badges of office."
            }
        ]
    },
    {
        "id": 104,
        "category": "Inaugural and facilitation ceremony",
        "title": "Science Wing Inauguration",
        "previewPhoto": ifc4,
        "description": "Cutting the ribbon for our state-of-the-art laboratory, designed to foster innovation and hands-on learning for future scientists.",
        "photos": [
            {
                "id": 5004,
                "url": ifc4,
                "description": "Chief guest officially opening the new Science and Technology block."
            }
        ]
    },
    {
        "id": 105,
        "category": "Inaugural and facilitation ceremony",
        "title": "Teacher Appreciation Gala",
        "previewPhoto": ifc5,
        "description": "A heart-warming ceremony dedicated to facilitating our educators for their tireless commitment and dedication to student success.",
        "photos": [
            {
                "id": 5005,
                "url": ifc5,
                "description": "Senior faculty members being felicitated with mementos for their years of service."
            }
        ]
    },
    {
        "id": 106,
        "category": "Inaugural and facilitation ceremony",
        "title": "Sports Complex Dedication",
        "previewPhoto": ifc6,
        "description": "Celebrating the launch of our indoor sports arena, providing students with world-class facilities for physical development.",
        "photos": [
            {
                "id": 5006,
                "url": ifc6,
                "description": "The inaugural match played by the school team to celebrate the new facility."
            }
        ]
    },
    {
        "id": 107,
        "category": "Inaugural and facilitation ceremony",
        "title": "Alumni Recognition Meet",
        "previewPhoto": ifc7,
        "description": "Distinguished alumni returned to their alma mater to be facilitated for their remarkable professional achievements.",
        "photos": [
            {
                "id": 5007,
                "url": ifc7,
                "description": "Former students sharing their success stories during the facilitation session."
            }
        ]
    },
    {
        "id": 108,
        "category": "Inaugural and facilitation ceremony",
        "title": "Cultural Fest Inauguration",
        "previewPhoto": ifc8,
        "description": "The annual cultural extravaganza was kicked off with a vibrant display of traditional music and dance.",
        "photos": [
            {
                "id": 5008,
                "url": ifc8,
                "description": "Performers showcasing a welcome dance at the start of the ceremony."
            }
        ]
    },
    {
        "id": 109,
        "category": "Inaugural and facilitation ceremony",
        "title": "Literary Club Launch",
        "previewPhoto": ifc9,
        "description": "Inaugurating a new platform for budding writers and orators to express their creativity and sharpen their linguistic skills.",
        "photos": [
            {
                "id": 5009,
                "url": ifc9,
                "description": "Students presenting their first anthology during the club's inauguration."
            }
        ]
    },
    {
        "id": 110,
        "category": "Inaugural and facilitation ceremony",
        "title": "Community Service Awards",
        "previewPhoto": ifc10,
        "description": "Recognizing the selfless efforts of students who contributed significantly to social causes and community welfare.",
        "photos": [
            {
                "id": 5010,
                "url": ifc10,
                "description": "Volunteers receiving certificates of appreciation for their social impact work."
            }
        ]
    },

    // --- KIDS SUMMER CAMP (5 Events) ---
    {
        id: 111,
        category: "Kids Summer Camp",
        title: "Summer Camp Opening Day",
        previewPhoto: ksc1,
        description: "An exciting start to the Kids Summer Camp with enthusiastic young participants ready for a fun-filled experience.",
        photos: [{ id: 6101, url: ksc1, description: "Students gathered on the opening day of the Kids Summer Camp." }],
    },
    {
        id: 112,
        category: "Kids Summer Camp",
        title: "Creative Activities & Crafts",
        previewPhoto: ksc2,
        description: "Children exploring their creativity through arts, crafts, and hands-on activities during the summer camp.",
        photos: [{ id: 6102, url: ksc2, description: "Kids engaging in creative crafts and art activities at the summer camp." }],
    },
    {
        id: 113,
        category: "Kids Summer Camp",
        title: "Outdoor Games & Sports",
        previewPhoto: ksc3,
        description: "Students enjoying outdoor games and sports activities, building teamwork and physical fitness.",
        photos: [{ id: 6103, url: ksc3, description: "Children participating in outdoor games and sports during the summer camp." }],
    },
    {
        id: 114,
        category: "Kids Summer Camp",
        title: "Fun Learning Sessions",
        previewPhoto: ksc4,
        description: "Engaging learning sessions that made education enjoyable and interactive for all camp participants.",
        photos: [{ id: 6104, url: ksc4, description: "Students taking part in fun and interactive learning activities at the camp." }],
    },
    {
        id: 115,
        category: "Kids Summer Camp",
        title: "Closing Ceremony & Celebrations",
        previewPhoto: ksc5,
        description: "A joyful closing ceremony celebrating the achievements and memories made during the Kids Summer Camp.",
        photos: [{ id: 6105, url: ksc5, description: "Children and staff celebrating at the closing ceremony of the Kids Summer Camp." }],
    },

    {
        id: 116,
        category: "Kids Summer Camp",
        title: "Summer Camp Opening Day",
        previewPhoto: ksc1,
        description: "An exciting start to the Kids Summer Camp with enthusiastic young participants ready for a fun-filled experience.",
        photos: [{ id: 6101, url: ksc1, description: "Students gathered on the opening day of the Kids Summer Camp." }],
    },
    // --- HINDI DIWAS CELEBRATION (1 Event) ---
    // --- HINDI DIWAS CELEBRATION (4 Events) ---
    {
        id: 117,
        category: "Hindi Diwas",
        title: "Lamp Lighting & Saraswati Vandana",
        previewPhoto: hindidiwas1,
        description: "The Hindi Diwas celebration commenced with the ceremonial lighting of the lamp and Saraswati Vandana.",
        photos: [{ id: 6106, url: hindidiwas1, description: "Ceremonial lighting of the lamp and Saraswati Vandana." }],
    },
    {
        id: 118,
        category: "Hindi Diwas",
        title: "Director's Address on Hindi Heritage",
        previewPhoto: hindidiwas2,
        description: "School Director Dr. Renu Agarwal highlighted the importance of Hindi and its rich literary heritage.",
        photos: [{ id: 6107, url: hindidiwas2, description: "School Director Dr. Renu Agarwal addressing the students." }],
    },
    {
        id: 119,
        category: "Hindi Diwas",
        title: "Student Speeches & Recitations",
        previewPhoto: hindidiwas3,
        description: "Students presented engaging speeches, poem recitations, and Kabir's Dohas with confidence.",
        photos: [{ id: 6108, url: hindidiwas3, description: "Students presenting speeches and reciting poems and Kabir's Dohas." }],
    },
    {
        id: 120,
        category: "Hindi Diwas",
        title: "Cultural Performances & Conclusion",
        previewPhoto: hindidiwas4,
        description: "Colourful performances reflected the students' love for Hindi, concluding the celebration on an inspiring note.",
        photos: [{ id: 6109, url: hindidiwas4, description: "Students giving colourful cultural performances on stage." }],
    }
    // --- UNUSED ASSETS - You may want to categorize these separately ---
    // These imports haven't been used in your events array yet:
    // import Db from "../assets/Db.jpeg";
    // import Dj from "../assets/Dj.jpeg"; 
    // import Hindusthan from "../assets/Hindusthan.jpeg";
];

const HandwritingCompetitionResult: React.FC = () => (
    <section className="mb-14 overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_16px_45px_rgba(208,81,15,0.10)] md:mb-20">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#c84e10] via-[#df5b15] to-[#f07a27] px-5 py-8 text-white sm:px-8 md:px-10 md:py-10">
            <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-white/10" aria-hidden="true" />
            <div className="absolute -bottom-20 right-24 h-40 w-40 rounded-full border-[28px] border-white/10" aria-hidden="true" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-3xl">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur-sm">
                        <Trophy className="h-4 w-4" />
                        Competition Result
                    </div>
                    <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">
                        English Handwriting Competition
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-orange-50 sm:text-base">
                        Srijan Valley School successfully organised the competition for students of Classes I to VII to encourage neat handwriting and strengthen their writing skills.
                    </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 self-start rounded-xl border border-white/25 bg-white/15 px-4 py-3 backdrop-blur-sm md:self-center">
                    <CalendarDays className="h-5 w-5" />
                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-wider text-orange-100">Held on</p>
                        <p className="font-bold">18 May 2026</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="p-4 sm:p-7 md:p-9">
            <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#d0510f]">
                    <Medal className="h-5 w-5" />
                </span>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">Our Class Champions</h3>
                    <p className="text-sm text-gray-500">First-place winners from each class</p>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200">
                <div className="hidden grid-cols-[80px_1fr_2fr_100px] bg-gray-900 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white sm:grid">
                    <span>Sl. No.</span>
                    <span>Class</span>
                    <span>Student Name</span>
                    <span className="text-center">Rank</span>
                </div>
                <div className="divide-y divide-gray-100">
                    {HANDWRITING_WINNERS.map((winner, index) => (
                        <div
                            key={winner.student}
                            className="grid grid-cols-[42px_1fr_auto] items-center gap-3 px-4 py-4 transition-colors hover:bg-orange-50/60 sm:grid-cols-[80px_1fr_2fr_100px] sm:px-5"
                        >
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600 sm:block sm:h-auto sm:w-auto sm:bg-transparent sm:text-sm">
                                {index + 1}
                            </span>
                            <div>
                                <span className="text-xs font-medium uppercase tracking-wide text-gray-400 sm:hidden">Class </span>
                                <span className="text-sm font-semibold text-gray-700">{winner.className}</span>
                            </div>
                            <div className="col-start-2 row-start-2 sm:col-start-3 sm:row-start-1">
                                <span className="text-sm font-bold text-gray-900 sm:text-base">{winner.student}</span>
                            </div>
                            <span className="col-start-3 row-span-2 row-start-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 ring-1 ring-inset ring-amber-200 sm:col-start-4 sm:row-span-1">
                                <Trophy className="h-3.5 w-3.5" /> {winner.rank}st
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 rounded-xl border border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 px-5 py-4 text-center">
                <p className="font-semibold text-gray-800">
                    Heartiest congratulations to all the winners for their excellent performance!
                </p>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    We also appreciate the enthusiastic participation of all our students.
                </p>
            </div>
        </div>
    </section>
);

const UnitTestIIRoutine: React.FC = () => (
    <section className="mb-14 overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_16px_45px_rgba(208,81,15,0.10)] md:mb-20">
        <div className="bg-gradient-to-br from-[#c84e10] via-[#df5b15] to-[#f07a27] px-5 py-8 text-white sm:px-8 md:px-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
                        <CalendarRange className="h-4 w-4" />
                        Examination Schedule
                    </div>
                    <h2 className="text-2xl font-extrabold sm:text-3xl md:text-4xl">Routine for Unit Test-II</h2>
                    <p className="mt-3 text-sm text-orange-50 sm:text-base">Classes I to VII</p>
                </div>
                <div className="rounded-xl border border-white/25 bg-white/15 px-4 py-3">
                    <p className="text-xs uppercase tracking-wider text-orange-100">Issued on</p>
                    <p className="font-bold">20 July 2026</p>
                </div>
            </div>
        </div>

        <div className="p-4 sm:p-7 md:p-9">
            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full min-w-[720px] border-collapse text-left">
                    <thead className="bg-gray-900 text-white">
                        <tr>
                            <th className="px-4 py-3 text-sm">Date</th>
                            {["I", "II", "III", "IV", "V", "VI", "VII"].map((className) => (
                                <th key={className} className="px-4 py-3 text-sm">Class {className}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {UNIT_TEST_II_ROUTINE.map((row) => (
                            <tr key={row.date} className="hover:bg-orange-50/60">
                                <td className="whitespace-nowrap px-4 py-4 font-bold text-[#d0510f]">{row.date}</td>
                                {row.subjects.map((subject, index) => (
                                    <td key={`${row.date}-${index}`} className={`px-4 py-4 text-sm font-medium ${subject === "—" ? "text-gray-300" : "text-gray-800"}`}>{subject}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-5 rounded-xl bg-orange-50 px-5 py-4 text-sm leading-6 text-gray-700">
                <p>• The test will be conducted in the zero period for 50 minutes.</p>
                <p>• Regular classes will be conducted after the test.</p>
            </div>
        </div>
    </section>
);

const SpellathonCompetitionResult: React.FC = () => (
    <section className="mb-14 overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_16px_45px_rgba(208,81,15,0.10)] md:mb-20">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#c84e10] via-[#df5b15] to-[#f07a27] px-5 py-8 text-white sm:px-8 md:px-10 md:py-10">
            <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-white/10" aria-hidden="true" />
            <div className="absolute -bottom-20 right-24 h-40 w-40 rounded-full border-[28px] border-white/10" aria-hidden="true" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-3xl">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur-sm">
                        <BookOpenCheck className="h-4 w-4" />
                        Competition Result
                    </div>
                    <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">
                        Spell-O-Thon Competition
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-orange-50 sm:text-base">
                        Celebrating the Class I and II winners for their excellent performance in the Spell-O-Thon competition.
                    </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 self-start rounded-xl border border-white/25 bg-white/15 px-4 py-3 backdrop-blur-sm md:self-center">
                    <CalendarDays className="h-5 w-5" />
                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-wider text-orange-100">Held on</p>
                        <p className="font-bold">15 July 2026</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="p-4 sm:p-7 md:p-9">
            <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#d0510f]">
                    <Medal className="h-5 w-5" />
                </span>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">Spell-O-Thon Champions</h3>
                    <p className="text-sm text-gray-500">First, second and third-place winners</p>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200">
                <div className="hidden grid-cols-[90px_repeat(3,1fr)] bg-gray-900 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white sm:grid">
                    <span>Class</span>
                    <span>First</span>
                    <span>Second</span>
                    <span>Third</span>
                </div>
                <div className="divide-y divide-gray-100">
                    {SPELLATHON_RESULTS.map((result, index) => {
                        const showClass = index === 0 || SPELLATHON_RESULTS[index - 1].className !== result.className;
                        return (
                            <div
                                key={`${result.className}-${index}`}
                                className="grid grid-cols-[52px_1fr] gap-x-3 gap-y-2 px-4 py-4 transition-colors hover:bg-orange-50/60 sm:grid-cols-[90px_repeat(3,1fr)] sm:items-center sm:px-5"
                            >
                                <span className="row-span-3 flex h-9 w-9 items-center justify-center self-center rounded-lg bg-orange-50 text-sm font-bold text-[#d0510f] sm:row-span-1 sm:h-auto sm:w-auto sm:justify-start sm:bg-transparent sm:text-gray-800">
                                    {showClass ? result.className : (
                                        <>
                                            <span className="sm:hidden">{result.className}</span>
                                            <span className="hidden sm:inline">—</span>
                                        </>
                                    )}
                                </span>
                                {[
                                    { label: "First", value: result.first, color: "text-amber-700" },
                                    { label: "Second", value: result.second, color: "text-slate-600" },
                                    { label: "Third", value: result.third, color: "text-orange-700" },
                                ].map((place) => (
                                    <div key={place.label} className="flex min-w-0 items-baseline gap-2 sm:block">
                                        <span className={`w-14 shrink-0 text-[11px] font-bold uppercase tracking-wide sm:hidden ${place.color}`}>{place.label}</span>
                                        <span className={`text-sm font-semibold ${place.value === "—" ? "text-gray-300" : "text-gray-800"}`}>{place.value}</span>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-6 rounded-xl border border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 px-5 py-4 text-center">
                <p className="font-semibold text-gray-800">
                    Congratulations to all the winners!
                </p>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    We appreciate every participant for their enthusiastic involvement.
                </p>
            </div>
        </div>
    </section>
);

const SCHEDULE_TYPE_STYLES: Record<ScheduleType, { label: string; className: string }> = {
    regular: { label: "Classes", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
    test: { label: "Unit Test", className: "bg-blue-50 text-blue-700 ring-blue-200" },
    exam: { label: "Examination", className: "bg-violet-50 text-violet-700 ring-violet-200" },
    holiday: { label: "Holiday", className: "bg-gray-100 text-gray-600 ring-gray-200" },
    activity: { label: "Activity", className: "bg-orange-50 text-[#c84e10] ring-orange-200" },
};

interface MonthlyActivityScheduleProps {
    month: string;
    schedule: Array<{ date: string; day: string; event: string; type: ScheduleType }>;
    note?: string;
}

const MonthlyActivitySchedule: React.FC<MonthlyActivityScheduleProps> = ({ month, schedule, note }) => (
    <section className="mb-14 overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_16px_45px_rgba(208,81,15,0.10)] md:mb-20">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#c84e10] via-[#df5b15] to-[#f07a27] px-5 py-8 text-white sm:px-8 md:px-10 md:py-10">
            <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-white/10" aria-hidden="true" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur-sm">
                        <CalendarRange className="h-4 w-4" />
                        Monthly Planner
                    </div>
                    <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">
                        Activity Schedule for {month} 2026
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-orange-50 sm:text-base">
                        Classes, unit tests, holidays, competitions, and student activities planned for the month.
                    </p>
                </div>
                <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl border border-white/25 bg-white/15 backdrop-blur-sm">
                    <span className="text-xs font-bold uppercase tracking-widest text-orange-100">{month}</span>
                    <span className="text-2xl font-extrabold">2026</span>
                </div>
            </div>
        </div>

        <div className="p-4 sm:p-7 md:p-9">
            <div className="mb-5 flex flex-wrap gap-2" aria-label="Schedule categories">
                {(Object.keys(SCHEDULE_TYPE_STYLES) as ScheduleType[]).map((type) => (
                    <span key={type} className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${SCHEDULE_TYPE_STYLES[type].className}`}>
                        {SCHEDULE_TYPE_STYLES[type].label}
                    </span>
                ))}
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200">
                <div className="hidden grid-cols-[110px_80px_1fr_100px] bg-gray-900 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white sm:grid">
                    <span>Date</span>
                    <span>Day</span>
                    <span>Event</span>
                    <span>Type</span>
                </div>
                <div className="divide-y divide-gray-100">
                    {schedule.map((item) => (
                        <div
                            key={item.date}
                            className={`grid grid-cols-[76px_1fr] items-center gap-x-3 gap-y-2 px-4 py-3 sm:grid-cols-[110px_80px_1fr_100px] sm:px-5 ${item.type === "holiday" ? "bg-gray-50/80" : "hover:bg-orange-50/50"}`}
                        >
                            <span className="text-sm font-bold text-gray-900">{item.date}</span>
                            <span className="hidden text-sm font-medium text-gray-500 sm:block">{item.day}</span>
                            <div className="min-w-0">
                                <span className="mr-2 text-xs font-medium text-gray-400 sm:hidden">{item.day}</span>
                                <span className={`text-sm font-medium leading-6 ${item.type === "holiday" ? "text-gray-500" : "text-gray-700"}`}>{item.event}</span>
                            </div>
                            <span className={`col-start-2 w-fit rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset sm:col-start-4 ${SCHEDULE_TYPE_STYLES[item.type].className}`}>
                                {SCHEDULE_TYPE_STYLES[item.type].label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                {note || "Schedule updates, examinations, activities, and published results will be shared on the website as they become available."}
            </p>
        </div>
    </section>
);

const HindiRecitationCompetitionFeature: React.FC = () => {
    const videoUrl = "https://drive.google.com/file/d/1EWuiuMdSfSLrhS_whvbaSjuiyfZMiEhT/preview";
    const [expandedImage, setExpandedImage] = useState<{ src: string; alt: string } | null>(null);

    return (
        <section className="mb-14 overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_16px_45px_rgba(208,81,15,0.10)] md:mb-20">
            <div className="grid lg:grid-cols-[minmax(320px,0.9fr)_1.1fr]">
                <div className="relative min-h-[500px] overflow-hidden bg-gray-950 sm:min-h-[620px] lg:min-h-[680px]">
                    <iframe
                        className="absolute inset-0 h-full w-full"
                        src={videoUrl}
                        title="Hindi Recitation Competition at the International Library and Cultural Centre"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                    />
                </div>

                <div className="flex flex-col justify-center px-5 py-9 sm:px-8 md:px-10 lg:py-12">
                    <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#d0510f] ring-1 ring-inset ring-orange-100">
                        <Award className="h-4 w-4" />
                        Student Achievement
                    </div>
                    <h2 className="text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
                        Inter-School <span className="text-[#d0510f]">Hindi Recitation Competition</span>
                    </h2>
                    <p className="mt-3 text-sm font-semibold text-gray-500">International Library and Cultural Centre, Ranchi</p>

                    <div className="mt-6 space-y-4 text-sm leading-7 text-gray-600 sm:text-base">
                        <p>Srijan Valley School proudly participated in an Inter-School Hindi Recitation Competition organised by the International Library and Cultural Centre, Ranchi.</p>
                        <p><strong className="font-bold text-gray-900">Nayra Anam of Standard II</strong> and <strong className="font-bold text-gray-900">Jiya Kumari of Nursery</strong> represented the school. Both young participants presented their poems with great confidence, clarity and enthusiasm. Their expressions, voice modulation and overall presentation were highly appreciated by the audience.</p>
                    </div>

                    <div className="mt-7 grid grid-cols-2 gap-3">
                        {[
                            { src: simg1, alt: "Students at the Hindi Recitation Competition" },
                            { src: simg2, alt: "Nayra Anam and Jiya Kumari holding their certificates" },
                        ].map((image) => (
                            <button
                                key={image.src}
                                type="button"
                                onClick={() => setExpandedImage(image)}
                                className="group relative flex h-32 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm sm:h-40 lg:h-44"
                                aria-label={`Expand ${image.alt}`}
                            >
                                <img src={image.src} alt={image.alt} className="h-full w-full object-contain" />
                                <span className="absolute right-2 top-2 rounded-full bg-black/65 p-2 text-white">
                                    <Maximize className="h-4 w-4" />
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-7 rounded-xl border border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 px-5 py-4">
                        <p className="font-semibold leading-6 text-gray-800">The school congratulates Nayra Anam and Jiya Kumari for their commendable performances and wishes them continued success in all their future endeavours.</p>
                    </div>
                </div>
            </div>

            {expandedImage && (
                <div
                    className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 p-2 sm:p-6"
                    onClick={() => setExpandedImage(null)}
                    role="dialog"
                    aria-modal="true"
                >
                    <button type="button" onClick={() => setExpandedImage(null)} className="absolute right-3 top-3 z-10 rounded-full bg-white p-2.5 text-gray-900" aria-label="Close expanded image">
                        <X className="h-6 w-6" />
                    </button>
                    <img src={expandedImage.src} alt={expandedImage.alt} className="max-h-[96vh] max-w-full object-contain" onClick={(event) => event.stopPropagation()} />
                </div>
            )}
        </section>
    );
};

const ReadingCompetitionFeature: React.FC = () => {
    const videoId = "s1EHo8zu7mk";

    return (
        <section className="mb-14 overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_16px_45px_rgba(208,81,15,0.10)] md:mb-20">
            <div className="grid lg:grid-cols-[minmax(300px,0.72fr)_1.28fr]">
                <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden bg-gray-950 sm:min-h-[650px] lg:min-h-[620px]">
                    <iframe
                        className="absolute inset-0 h-full w-full"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&controls=1&rel=0`}
                        title="Khyati Singh at the Inter-School Reading Competition"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>

                <div className="relative flex flex-col justify-center overflow-hidden px-5 py-9 sm:px-8 md:px-10 lg:py-12">
                    <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange-50" aria-hidden="true" />
                    <div className="relative">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#d0510f] ring-1 ring-inset ring-orange-100">
                            <Award className="h-4 w-4" />
                            Student Achievement
                        </div>
                        <h2 className="text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
                            Srijan Valley School Shines at the <span className="text-[#d0510f]">Inter-School Reading Competition</span>
                        </h2>

                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-600">
                            <CalendarDays className="h-4 w-4 text-[#d0510f]" />
                            8 July 2026
                        </div>

                        <div className="mt-6 space-y-4 text-sm leading-7 text-gray-600 sm:text-base">
                            <p>
                                We are delighted to share that <strong className="font-bold text-gray-900">Khyati Singh of Class V</strong>, Srijan Valley School, participated in the Inter-School Reading Competition organised by the International Library and Cultural Centre.
                            </p>
                            <p>
                                Khyati displayed excellent reading skills through clear pronunciation, proper voice modulation, fluency, and confidence. Her expressive reading and impressive presentation captivated the audience and earned appreciation from everyone present.
                            </p>
                        </div>

                        <div className="mt-7 rounded-xl border border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 px-5 py-4">
                            <p className="font-semibold leading-6 text-gray-800">
                                We are proud of her commendable performance and wish Khyati the very best for all her future endeavours. May she continue to bring laurels to the school!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
const HindiDiwasFeature: React.FC = () => {
    const videos = [
        { id: "1bsLjBAng_Vh9bMoqS1yyZyJhhIGcSPJY", title: "Lamp Lighting & Saraswati Vandana" },
        { id: "1gkmv6aKtiGaWzkCiRXuyFGnSdmS6AG0b", title: "Speeches & Poems by Students" },
        { id: "1bsLjBAng_Vh9bMoqS1yyZyJhhIGcSPJY", title: "Kabir's Dohas Performance" },
    ];

    return (
        <section className="mb-14 overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_16px_45px_rgba(208,81,15,0.10)] md:mb-20">
            <div className="grid lg:grid-cols-[minmax(300px,0.72fr)_1.28fr]">
                {/* Left Column: 3 Short Videos in Horizontal Grid */}
                <div className="relative flex flex-col items-center justify-center gap-3 overflow-hidden bg-gray-950 p-4 sm:min-h-[650px] lg:min-h-[620px]">
                    {videos.map((video, index) => (
                        <div
                            key={`${video.id}-${index}`}
                            className="group relative w-full overflow-hidden rounded-xl bg-black shadow-lg ring-1 ring-white/10"
                        >
                            <div className="relative aspect-video w-full">
                                <iframe
                                    className="absolute inset-0 h-full w-full"
                                    src={`https://drive.google.com/file/d/${video.id}/preview`}
                                    title={video.title}
                                    allow="autoplay; encrypted-media; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
                                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-white/90">
                                    <Play className="h-3 w-3 fill-white" />
                                    {video.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column: Content */}
                <div className="relative flex flex-col justify-center overflow-hidden px-5 py-9 sm:px-8 md:px-10 lg:py-12">
                    <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange-50" aria-hidden="true" />
                    <div className="relative">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#d0510f] ring-1 ring-inset ring-orange-100">
                            <Award className="h-4 w-4" />
                            School Event
                        </div>
                        <h2 className="text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
                            Hindi Diwas Celebrated with <span className="text-[#d0510f]">Enthusiasm</span> at Srijan Valley School
                        </h2>

                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-600">
                            <CalendarDays className="h-4 w-4 text-[#d0510f]" />
                            14 September 2026
                        </div>

                        <div className="mt-6 space-y-4 text-sm leading-7 text-gray-600 sm:text-base">
                            <p>
                                Srijan Valley School celebrated Hindi Diwas with great enthusiasm and fervour. The programme began with the ceremonial lighting of the lamp and Saraswati Vandana.
                            </p>
                            <p>
                                School Director <strong className="font-bold text-gray-900">Dr. Renu Agarwal</strong> highlighted the importance of Hindi and its rich literary heritage.
                            </p>
                            <p>
                                Students presented an engaging programme featuring speeches, poems, and Kabir's Dohas. Their confident and colourful performances reflected their love and respect for the Hindi language.
                            </p>
                        </div>

                        <div className="mt-7 rounded-xl border border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 px-5 py-4">
                            <p className="font-semibold leading-6 text-gray-800">
                                The celebration concluded on an inspiring note, fostering pride in Hindi among the students.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const SmartClassesFeature: React.FC = () => {
    const videoId = "1epvo5n4IWw6kKDCjU7gZlwshDCsaltNH";
    const videoSrc = `https://drive.google.com/file/d/${videoId}/preview`;

    return (
        <section className="mb-14 overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_16px_45px_rgba(208,81,15,0.10)] md:mb-20">
            <div className="grid lg:grid-cols-[minmax(300px,0.72fr)_1.28fr]">
                {/* Left Column: Video Embed */}
                <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden bg-gray-950 sm:min-h-[650px] lg:min-h-[620px]">
                    <iframe
                        className="absolute inset-0 h-full w-full"
                        src={videoSrc}
                        title="Smart Classes at Srijan Valley School"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                {/* Right Column: Content */}
                <div className="relative flex flex-col justify-center overflow-hidden px-5 py-9 sm:px-8 md:px-10 lg:py-12">
                    <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange-50" aria-hidden="true" />
                    <div className="relative">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#d0510f] ring-1 ring-inset ring-orange-100">
                            <Award className="h-4 w-4" />
                            School Initiative
                        </div>
                        <h2 className="text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
                            Smart Classes Introduced at <span className="text-[#d0510f]">Srijan Valley School</span>
                        </h2>

                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-600">
                            <CalendarDays className="h-4 w-4 text-[#d0510f]" />
                            14 September 2026
                        </div>

                        <div className="mt-6 space-y-4 text-sm leading-7 text-gray-600 sm:text-base">
                            <p>
                                प्रिय अभिभावकगण, हमें यह बताते हुए हर्ष हो रहा है कि <strong className="font-bold text-gray-900">Srijan Valley School</strong> में विद्यार्थियों के लिए स्मार्ट क्लासेस की शुरुआत की गई है।
                            </p>
                            <p>
                                आधुनिक तकनीक और डिजिटल माध्यमों के सहयोग से बच्चों को विषयों को अधिक रोचक, सरल एवं प्रभावी ढंग से समझने का अवसर मिलेगा। हमारा उद्देश्य शिक्षा को ज्ञानवर्धक होने के साथ-साथ आनंददायक और अनुभवात्मक बनाना है।
                            </p>
                        </div>

                        <div className="mt-7 rounded-xl border border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 px-5 py-4">
                            <p className="font-semibold leading-6 text-gray-800">
                                हमें विश्वास है कि यह पहल विद्यार्थियों के सीखने के अनुभव को और समृद्ध करेगी।
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
// --- 4. Lightbox (Modal) Component (UPDATED for multiple photos) ---

interface LightboxProps {
    event: Event | null;
    onClose: () => void;
}

const EventLightbox: React.FC<LightboxProps> = ({ event, onClose }) => {
    // State to manage the currently displayed photo index
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    if (!event || event.photos.length === 0) return null;

    const photos = event.photos;
    const currentPhoto = photos[currentPhotoIndex];

    // Logic to handle next/previous
    const hasMultiplePhotos = photos.length > 1;
    const isFirstPhoto = currentPhotoIndex === 0;
    const isLastPhoto = currentPhotoIndex === photos.length - 1;

    const goToNext = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    const goToPrev = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
    };

    // Helper to extract the image URL correctly from the imported object
    const currentPhotoUrl = currentPhoto.url;

    // Use the photo's description, which is more detailed, for the lightbox footer
    const currentDescription = currentPhoto.description;

    return (
        <div
            // Reset index when opening a new event
            key={event.id}
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-black bg-opacity-95 backdrop-blur-sm"
            onClick={onClose} // Close on backdrop click
        >
            {/* The modal body */}
            <div
                className="relative w-full h-full sm:h-[90vh] sm:max-w-4xl bg-white rounded-none sm:rounded-lg shadow-2xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                {/* Header - Ensures X icon is visible */}
                <div className="flex justify-between items-center p-3 z-10" style={{ backgroundColor: COLOR_PRIMARY }}>
                    <h3 className="text-lg font-bold text-white truncate">{event.title}</h3>
                    <button onClick={onClose} className="p-1 text-white hover:text-gray-200 bg-transparent transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Photo Display Area - object-contain prevents cutoff */}
                <div className="relative flex-grow flex items-center justify-center bg-gray-900 p-2">
                    <img
                        src={currentPhotoUrl}
                        alt={event.title}
                        className="max-h-full max-w-full object-contain"
                    />

                    {/* Navigation Buttons (visible only if multiple photos exist) */}
                    {hasMultiplePhotos && (
                        <>
                            {/* Previous Button */}
                            <button
                                onClick={goToPrev}
                                disabled={isFirstPhoto}
                                className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 mx-2 bg-black/50 hover:bg-black/70 rounded-full transition-opacity ${isFirstPhoto ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
                            >
                                <ChevronLeft className="w-8 h-8 text-white" />
                            </button>

                            {/* Next Button */}
                            <button
                                onClick={goToNext}
                                disabled={isLastPhoto}
                                className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 mx-2 bg-black/50 hover:bg-black/70 rounded-full transition-opacity ${isLastPhoto ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
                            >
                                <ChevronRight className="w-8 h-8 text-white" />
                            </button>
                        </>
                    )}
                </div>

                {/* Description Area (Simplified) */}
                <div className="max-h-[38vh] overflow-y-auto p-3 bg-gray-50 border-t border-gray-200">
                    {event.dateLocation && (
                        <p className="mb-2 text-sm font-bold text-[#d0510f]">{event.dateLocation}</p>
                    )}
                    <p className="text-sm font-medium text-gray-700">
                        {currentDescription}
                    </p>
                    {event.details && (
                        <div className="mt-3 space-y-2 border-t border-gray-200 pt-3 text-sm leading-6 text-gray-600">
                            {event.details.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    )}
                    {hasMultiplePhotos && (
                        <p className="text-xs text-gray-500 mt-1 text-right">
                            Photo {currentPhotoIndex + 1} of {photos.length}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};


// --- 5. Main Events Page Component (No Changes Needed Here) ---

const Events: React.FC = () => {
    // Dynamically get categories (will now include the new categories)
    const categories = ["All", ...Array.from(new Set(EVENTS.map(e => e.category)))];
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const filteredEvents = EVENTS.filter(event =>
        // Correct filter logic
        activeCategory === "All" || event.category === activeCategory
    );

    return (
        <div
            // *** 🔑 FIX FOR NAVIGATION: The required ID is set here ***
            id="events"
            className="py-12 sm:py-16 md:py-20"
            style={{ backgroundColor: COLOR_LIGHTGRAY_BG }}
        >

            {/* section-container implementation: max-w-6xl retained for the 3-column grid */}
            <div className="px-4 mx-auto max-w-7xl md:max-w-4xl lg:max-w-6xl">

                <MonthlyActivitySchedule
                    month="September"
                    schedule={SEPTEMBER_2026_SCHEDULE}
                    note="Pre-Nursery will have regular classes during the Mid-Term Examination from 16–22 September, from 8:30 a.m. to 12 noon."
                />

                <HindiRecitationCompetitionFeature />

                <MonthlyActivitySchedule month="August" schedule={AUGUST_2026_SCHEDULE} />

                <UnitTestIIRoutine />

                <ReadingCompetitionFeature />
                <HindiDiwasFeature />
                <SmartClassesFeature/>
                <HandwritingCompetitionResult />

                <SpellathonCompetitionResult />

                {/* Header Section */}
                <header className="text-center mb-10 md:mb-16">
                    <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${COLOR_BLACK} mb-3`}>
                        Srijan Valley School <span style={{ color: COLOR_PRIMARY }}>Event Gallery</span>
                    </h1>
                    <p className={`text-lg ${COLOR_GRAY}`}>
                        Moments of learning, creativity, and celebration from our vibrant school life.
                    </p>
                </header>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-12 border-b border-gray-300 pb-4">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ${activeCategory === category
                                ? 'text-white shadow-md'
                                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                                }`}
                            style={{
                                backgroundColor: activeCategory === category ? COLOR_PRIMARY : undefined,
                                color: activeCategory === category ? 'white' : 'black',
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Events Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredEvents.map(event => (
                        <div
                            key={event.id}
                            // This onClick opens the lightbox modal
                            onClick={() => setSelectedEvent(event)}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-200"
                        >
                            {/* Image Area */}
                            <div className="relative w-full aspect-video overflow-hidden">
                                <img
                                    src={event.previewPhoto}
                                    alt={event.title}
                                    className="w-full h-full object-contain bg-gray-100 group-hover:scale-[1.03] transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <Maximize className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-4">
                                <span className="text-xs font-medium uppercase tracking-wider rounded px-2 py-0.5" style={{ color: COLOR_PRIMARY, backgroundColor: '#fbe7d5' }}>
                                    {event.category}
                                </span>
                                <h3 className={`text-xl font-bold ${COLOR_BLACK} mt-2 mb-1`}>{event.title}</h3>
                                <p className={`text-sm ${COLOR_GRAY} line-clamp-1`}>
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Empty State */}
                    {filteredEvents.length === 0 && (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            No events found in the selected category.
                        </div>
                    )}
                </section>
            </div>

            {/* Lightbox Modal */}
            <EventLightbox
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
            />
        </div>
    );
}

export default Events;
