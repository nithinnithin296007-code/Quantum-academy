import { useState } from "react";

const QUESTIONS = [
    {
        question: "A particle moves in a circle of radius R with constant speed v. If the speed is doubled and the radius is halved, the centripetal acceleration becomes:",
        options: [
            "Halved",
            "Doubled",
            "4 times",
            "8 times"
        ],
        answer: 3,
        explanation: "Centripetal acceleration is given by a = v²/R. If speed is doubled (2v) and radius is halved (R/2), the new acceleration a' = (2v)² / (R/2) = 4v² / (0.5R) = 8v²/R = 8a.",
        hint: "Centripetal acceleration is given by a = v²/R. Try substituting 2v for speed and R/2 for radius in the formula."
    },
    {
        question: "Which of the following cell organelles is responsible for synthesizing proteins in a cell?",
        options: [
            "Mitochondria",
            "Lysosome",
            "Ribosome",
            "Golgi Apparatus"
        ],
        answer: 2,
        explanation: "Ribosomes are the cellular organelles responsible for protein synthesis. They translate genetic instructions from mRNA into polypeptide chains.",
        hint: "This organelle acts as the cellular protein factory and is often found on the rough endoplasmic reticulum or free in the cytoplasm."
    },
    {
        question: "The standard unit of rate constant for a first-order chemical reaction is:",
        options: [
            "mol L⁻¹ s⁻¹",
            "L mol⁻¹ s⁻¹",
            "s⁻¹",
            "L² mol⁻² s⁻¹"
        ],
        answer: 2,
        explanation: "For a first-order reaction, rate = k[A]. Therefore, k = rate / [A] = (mol L⁻¹ s⁻¹) / (mol L⁻¹) = s⁻¹.",
        hint: "Write the first-order rate law: Rate = k[A]. Note that rate units are mol L⁻¹ s⁻¹ and concentration [A] is in mol L⁻¹. Solve for the unit of k."
    }
];

export default function TestSeriesSection() {
    const [activeQuiz, setActiveQuiz] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [quizSubmitted, setQuizSubmitted] = useState(false);

    return (
        <section id="test-series" className="bg-[#0b0e24] py-24 px-6 relative overflow-hidden border-t border-b border-white/5">
            {/* Glowing backgrounds */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-amber-500 font-semibold text-xs uppercase tracking-[0.2em]">
                        Mock Tests & Analytics
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-black text-white mt-3">
                        All India Test Series
                    </h2>
                    <p className="text-gray-400 mt-4 text-sm max-w-xl mx-auto leading-relaxed">
                        Assess your rank, boost your speed, and identify your weak spots with our systematically designed JEE and NEET test series.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Eklavya (JEE) Card */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:border-amber-400/30 transition-all duration-300">
                        <div>
                            <span className="bg-blue-400/10 text-blue-400 border border-blue-400/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                JEE Mains Prep
                            </span>
                            <h3 className="text-2xl font-display font-bold text-white mt-4 mb-2">
                                Eklavya Test Series
                            </h3>
                            
                            {/* Price Badge */}
                            <div className="flex items-baseline gap-2 mb-4 bg-white/[0.03] border border-white/5 px-4 py-2.5 rounded-2xl w-fit">
                                <span className="text-2xl font-black text-amber-400">₹2,499</span>
                                <span className="text-gray-500 text-sm line-through">₹4,999</span>
                                <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-0.5 rounded-md ml-1">
                                    50% OFF
                                </span>
                            </div>

                            <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                A comprehensive test series designed specifically for JEE Mains aspirants, aligned with the revised NTA syllabus.
                            </p>
                            
                            <ul className="space-y-3 mb-8">
                                {[
                                    "25 high-quality mock tests",
                                    "10 unit-wise, 8 class-wise, and 7 full-length tests",
                                    "Detailed solutions and answer keys provided",
                                    "Comprehensive performance report and analytics",
                                ].map((point, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                <path d="M1 4L3.5 6.5L9 1" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-300 text-sm">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Poster and QR side-by-side */}
                        <div className="flex gap-4 items-stretch mt-6">
                            <a
                                href="/images/facilities/eklavya-poster.jpg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group overflow-hidden rounded-2xl border border-white/10 w-1/2 aspect-[3/4] bg-navy-900 block"
                            >
                                <img
                                    src="/images/facilities/eklavya-poster.jpg"
                                    alt="JEE Eklavya Test Series Details"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </a>
                            <div className="flex flex-col items-center justify-center p-4 bg-white/[0.03] rounded-2xl border border-white/10 w-1/2 text-center">
                                <div className="bg-white p-1.5 rounded-xl border border-white/10 shadow-inner">
                                    <img
                                        src="/images/facilities/eklavya-qr-clean.webp"
                                        alt="Register QR Code"
                                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                                    />
                                </div>
                                <span className="text-[11px] text-amber-400 font-bold mt-3 tracking-wider uppercase">
                                    Register Now
                                </span>
                                <p className="text-[9px] text-gray-400 mt-1 leading-normal">
                                    Scan QR code to enroll
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Dronacharya (NEET) Card */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:border-emerald-400/30 transition-all duration-300">
                        <div>
                            <span className="bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                NEET 2026 Prep
                            </span>
                            <h3 className="text-2xl font-display font-bold text-white mt-4 mb-2">
                                Dronacharya Test Series
                            </h3>

                            {/* Price Badge */}
                            <div className="flex items-baseline gap-2 mb-4 bg-white/[0.03] border border-white/5 px-4 py-2.5 rounded-2xl w-fit">
                                <span className="text-2xl font-black text-amber-400">₹1,999</span>
                                <span className="text-gray-500 text-sm line-through">₹4,999</span>
                                <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-0.5 rounded-md ml-1">
                                    60% OFF
                                </span>
                            </div>

                            <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                Specially designed mock tests to simulate real NEET conditions, focusing on high-yielding concepts.
                            </p>
                            
                            <ul className="space-y-3 mb-8">
                                {[
                                    "20 comprehensive mock tests",
                                    "10 unit-wise, 4 full-length, and 6 mock tests",
                                    "Detailed explanations and immediate answer keys",
                                    "Deep insights into speed, accuracy, and subject mastery",
                                ].map((point, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                <path d="M1 4L3.5 6.5L9 1" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-300 text-sm">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Poster and QR side-by-side */}
                        <div className="flex gap-4 items-stretch mt-6">
                            <a
                                href="/images/facilities/dronacharya-poster.jpg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group overflow-hidden rounded-2xl border border-white/10 w-1/2 aspect-[3/4] bg-navy-900 block"
                            >
                                <img
                                    src="/images/facilities/dronacharya-poster.webp"
                                    alt="NEET Dronacharya Test Series Details"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </a>
                            <div className="flex flex-col items-center justify-center p-4 bg-white/[0.03] rounded-2xl border border-white/10 w-1/2 text-center">
                                <div className="bg-white p-1.5 rounded-xl border border-white/10 shadow-inner">
                                    <img
                                        src="/images/facilities/dronacharya-qr-clean.webp"
                                        alt="Register QR Code"
                                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                                    />
                                </div>
                                <span className="text-[11px] text-amber-400 font-bold mt-3 tracking-wider uppercase">
                                    Register Now
                                </span>
                                <p className="text-[9px] text-gray-400 mt-1 leading-normal">
                                    Scan QR code to enroll
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Practice Demo / Interactive Quiz Widget */}
                <div className="mt-20 bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
                        <div>
                            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest">
                                Live Practice Demo
                            </span>
                            <h3 className="text-2xl font-display font-black text-white mt-1">
                                Try a Mock Question
                            </h3>
                        </div>
                        
                        {/* Demo Tabs */}
                        <div className="flex bg-white/[0.05] p-1 rounded-xl border border-white/5 w-fit">
                            {["JEE (Physics)", "NEET (Biology)", "MHT-CET (Chemistry)"].map((tab, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setActiveQuiz(idx);
                                        setSelectedOption(null);
                                        setQuizSubmitted(false);
                                    }}
                                    className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                                        activeQuiz === idx 
                                            ? "bg-amber-400 text-navy-900 shadow-md" 
                                            : "text-gray-400 hover:text-white"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quiz Body */}
                    <div className="space-y-6">
                        <div>
                            <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-1">
                                Question {activeQuiz + 1}
                            </span>
                            <p className="text-white text-base md:text-lg font-medium leading-relaxed">
                                {QUESTIONS[activeQuiz].question}
                            </p>
                        </div>

                        {/* Options */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {QUESTIONS[activeQuiz].options.map((opt, i) => {
                                const optionLetter = String.fromCharCode(65 + i); // A, B, C, D
                                const isSelected = selectedOption === i;
                                const isCorrect = i === QUESTIONS[activeQuiz].answer;
                                
                                let optionStyle = "border-white/10 bg-white/[0.02] text-gray-300 hover:bg-white/[0.05] hover:border-white/20";
                                if (quizSubmitted) {
                                    if (isCorrect) {
                                        optionStyle = "border-green-500/50 bg-green-500/10 text-green-400";
                                    } else if (isSelected) {
                                        optionStyle = "border-red-500/50 bg-red-500/10 text-red-400";
                                    } else {
                                        optionStyle = "border-white/5 bg-white/[0.01] text-gray-500 opacity-60";
                                    }
                                } else if (isSelected) {
                                    optionStyle = "border-amber-400 bg-amber-400/10 text-amber-400";
                                }

                                return (
                                    <button
                                        key={i}
                                        disabled={quizSubmitted}
                                        onClick={() => setSelectedOption(i)}
                                        className={`flex items-start text-left gap-4 p-4 rounded-2xl border transition-all duration-200 text-sm leading-relaxed ${
                                            !quizSubmitted ? "cursor-pointer active:scale-[0.98]" : "cursor-default"
                                        } ${optionStyle}`}
                                    >
                                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                                            isSelected ? "bg-amber-400 text-navy-900" : "bg-white/5 text-gray-400"
                                        }`}>
                                            {optionLetter}
                                        </span>
                                        <span>{opt}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Action buttons / Feedback */}
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pt-4 border-t border-white/5">
                            <div>
                                {quizSubmitted && (
                                    <div className="text-sm">
                                        {selectedOption === QUESTIONS[activeQuiz].answer ? (
                                            <p className="text-green-400 font-semibold flex items-center gap-1.5">
                                                <span>✓ Correct Answer!</span>
                                            </p>
                                        ) : (
                                            <>
                                                <p className="text-red-400 font-semibold flex items-center gap-1.5">
                                                    <span>✗ Incorrect.</span>
                                                </p>
                                                <div className="mt-4 p-4 rounded-xl border border-amber-500/10 bg-amber-500/5">
                                                    <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                                        <span>💡 Helpful Hint</span>
                                                    </p>
                                                    <p className="text-gray-300 text-xs leading-relaxed">
                                                        {QUESTIONS[activeQuiz].hint}
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                        <p className="text-gray-400 text-xs mt-3 leading-relaxed max-w-xl">
                                            <strong className="text-gray-300">Explanation:</strong> {QUESTIONS[activeQuiz].explanation}
                                        </p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex gap-3">
                                {quizSubmitted ? (
                                    <button
                                        onClick={() => {
                                            setSelectedOption(null);
                                            setQuizSubmitted(false);
                                        }}
                                        className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
                                    >
                                        Retry Question
                                    </button>
                                ) : (
                                    <button
                                        disabled={selectedOption === null}
                                        onClick={() => setQuizSubmitted(true)}
                                        className={`px-6 py-2.5 rounded-xl text-xs font-bold transition ${
                                            selectedOption === null 
                                                ? "bg-white/5 text-gray-500 cursor-not-allowed" 
                                                : "bg-amber-400 hover:bg-amber-500 text-navy-900 cursor-pointer active:scale-95"
                                        }`}
                                    >
                                        Check Answer
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
