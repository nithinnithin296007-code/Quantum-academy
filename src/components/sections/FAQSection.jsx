import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
    {
        id: 1,
        question: "What are the lecture timings for Class XI & XII batches?",
        answer: "We offer multiple batch timings with flexible morning and evening slots to seamlessly align with different junior college schedules. Please contact us to find a timing that best fits your daily routine.",
    },
    {
        id: 2,
        question: "How does the academy help students catch up on missed lectures?",
        answer: "If a student misses a lecture due to illness or an emergency, they can access study material and structured notes on the Quantum Exam Prep App. Additionally, they can schedule personal doubt-clearing slots with our teachers to quickly get back on track.",
    },
    {
        id: 3,
        question: "Do you provide study material and test series?",
        answer: "Absolutely. We provide complete, syllabus-aligned study packages and daily practice sheets prepared in-house by our expert faculty. Students also get full access to our mock test series—Eklavya (JEE) and Dronacharya (NEET)—including detailed step-by-step solutions.",
    },
    {
        id: 4,
        question: "Where is the academy located and is it easily accessible?",
        answer: "Our center is located on the 1st Floor of Rashmi Laxmi Sadan, Navghar Road, Bhayandar East (opposite Divine Image School). It is centrally situated and highly accessible via public transport, auto-rickshaws, and is a short commute from the Bhayandar railway station.",
    },
];

function FAQItem({ faq, isOpen, onToggle }) {
    return (
        <div className="border-b border-gray-100 last:border-0 py-5">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center text-left py-2 font-display font-bold text-navy-700 text-base md:text-lg hover:text-amber-500 transition-colors cursor-pointer group"
            >
                <span>{faq.question}</span>
                <span className={`w-6 h-6 rounded-full bg-slate-50 group-hover:bg-amber-400/10 flex items-center justify-center flex-shrink-0 transition-all ${
                    isOpen ? "rotate-180 bg-amber-400/20" : ""
                }`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 4L6 8L10 4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
            </button>
            
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed pt-2 pb-4">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQSection() {
    const [openId, setOpenId] = useState(null);

    const handleToggle = (id) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <section id="faq" className="bg-white py-24 px-6 relative overflow-hidden">
            <div className="max-w-3xl mx-auto relative z-10">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-amber-500 font-semibold text-xs uppercase tracking-[0.2em]">
                        Got Questions?
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-black text-navy-700 mt-3">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-500 mt-4 text-sm max-w-lg mx-auto leading-relaxed">
                        Find answers to the most common queries about admissions, classes, study material, and test preparations at Quantum.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
                    {FAQS.map((faq) => (
                        <FAQItem
                            key={faq.id}
                            faq={faq}
                            isOpen={openId === faq.id}
                            onToggle={() => handleToggle(faq.id)}
                        />
                    ))}
                </div>

                {/* Sub-text CTA */}
                <div className="text-center mt-12">
                    <p className="text-gray-500 text-sm">
                        Still have questions?{" "}
                        <a
                            href="#enquiry"
                            className="text-amber-500 font-bold hover:underline"
                        >
                            Book a Free Counselling Session
                        </a>
                    </p>
                </div>

            </div>
        </section>
    );
}
