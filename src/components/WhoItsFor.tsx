import React, { useRef } from 'react';
import { UserPlus, RefreshCw, Truck, Info, CheckCircle2, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const SchoolFees = () => {
    const PRIMARY_ORANGE_BG = 'bg-orange-600';
    const PRIMARY_ORANGE_TEXT = 'text-orange-600';

    // 1. Added HTMLDivElement type to the ref
    const feeCardRef = useRef<HTMLDivElement>(null);

    const newStudentFees = [
        { label: 'Admission Form', amount: '500' },
        { label: 'Admission Fee', amount: '2,500' },
        { label: 'Caution Deposit (Refundable)', amount: '2,000' },
        { label: 'Annual Charges', amount: '1,500' },
        { label: 'Activity Charges', amount: '500' },
        { label: 'Misc (Diary, ID, File, etc.)', amount: '200' },
    ];

    const oldStudentFees = [
        { label: 'Activity Charges', amount: '500' },
        { label: 'Misc (Diary, ID, File, etc.)', amount: '200' },
    ];

    const handleDownload = () => {
        const element = feeCardRef.current;
        if (!element) return; // Guard clause for TS

        const opt = {
            margin: [10, 10, 10, 10] as [number, number, number, number],
            filename: 'Srijan_Valley_School_Fees_2026-27.pdf',
            image: { type: 'jpeg' as const, quality: 0.98 }, // Added 'as const'
            html2canvas: { scale: 2, useCORS: true, letterRendering: true },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait' as const // Added 'as const'
            }
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <section id="pricing" className="section-padding bg-gradient-to-b from-muted/30 to-background">
            <div className="section-container">

                <div ref={feeCardRef} className="p-8 bg-white rounded-xl">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Srijan Valley School <br />
                            <span className={PRIMARY_ORANGE_TEXT}>Fee Structure (2026-27)</span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Comprehensive breakdown of academic fees for the upcoming session.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-6xl mx-auto">
                        {/* NEW STUDENTS CARD */}
                        <div className="border border-slate-200 rounded-2xl p-8 flex flex-col h-full bg-white shadow-sm border-t-4 border-t-orange-600">
                            <div className="mb-8">
                                <div className={`w-12 h-12 rounded-xl ${PRIMARY_ORANGE_BG} flex items-center justify-center mb-4`}>
                                    <UserPlus className="text-white w-6 h-6" />
                                </div>
                                <h3 className="text-3xl font-bold text-foreground">New Admission (For New Students)</h3>
                                <p className="text-muted-foreground text-sm">One-time admission requirements</p>
                            </div>

                            <div className="mb-8 p-4 bg-orange-50 rounded-xl">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-foreground">₹1,800</span>
                                    <span className="text-muted-foreground font-medium">/ month</span>
                                </div>
                                <p className={`text-xs font-bold uppercase mt-1 ${PRIMARY_ORANGE_TEXT}`}>Monthly Tuition Fee</p>
                            </div>

                            <div className="space-y-4 flex-grow">
                                {newStudentFees.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                                        <span className="text-muted-foreground flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-orange-600" />
                                            {item.label}
                                        </span>
                                        <span className="font-semibold text-foreground">₹{item.amount}/-</span>
                                    </div>
                                ))}
                                <div className="pt-4 mt-4 border-t-2 border-dashed flex justify-between items-center">
                                    <span className="font-bold text-foreground">Total at Admission</span>
                                    <span className={`text-2xl font-bold ${PRIMARY_ORANGE_TEXT}`}>₹7,200/-</span>
                                </div>
                            </div>
                        </div>

                       
                    </div>

                    {/* Footer Info inside the capture area */}
                    {/* Full Width Footer Info Section */}
                    <div className="mt-8 max-w-6xl mx-auto space-y-4">
                        {/* Option 1: Two separate full-width bars */}
                        <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white w-full shadow-sm">
                            <div className="bg-orange-100 p-2 rounded-lg">
                                <Truck className="w-5 h-5 text-orange-600" />
                            </div>
                            <p className="text-[11px] md:text-xs leading-tight text-muted-foreground uppercase font-bold tracking-widest">
                                <span className="text-orange-600 mr-2 underline decoration-2 underline-offset-4">Transport Facility:</span>
                                To be fix as per the destination.
                            </p>
                        </div>


                    </div>
                </div>

                {/* Download Button */}
                <div className="text-center mt-12">
                    <button
                        onClick={handleDownload}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all flex items-center gap-2 mx-auto active:scale-95"
                    >
                        <Download className="w-5 h-5" />
                        Download Fee Structure PDF
                    </button>
                </div>

            </div>
        </section>
    );
};

export default SchoolFees;