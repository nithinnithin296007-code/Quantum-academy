import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ─── Google "G" logo SVG ──────────────────────────────────────── */
const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
);

/* ─── 5-star row ───────────────────────────────────────────────── */
const Stars = () => (
    <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

/* ─── Review data ──────────────────────────────────────────────── */
const REVIEWS = [
    {
        name: "Rishi Patil",
        meta: "3 reviews · 1 photo · a year ago",
        initials: "RP",
        color: "bg-blue-500",
        text: "Quantum Academy offers an exceptional learning environment with expert teachers, modern infrastructure, and personalized attention. The faculty excels in making complex topics understandable and provides continuous support. With specialized coaching for competitive exams like JEE and NEET, it's an ideal choice for students looking for quality education and overall growth.",
    },
    {
        name: "Anil Maurya",
        meta: "2 reviews · a year ago",
        initials: "AM",
        color: "bg-emerald-600",
        text: "Quantum Academy is a well known institute for science stream. The best thing about this class is that they complete the portion very soon and further conduct test series for good revision. The notes provided are very useful for preparation of exams like JEE, NEET & MHT-CET.",
    },
    {
        name: "Narendra Dhedu",
        meta: "3 reviews · a year ago",
        initials: "ND",
        color: "bg-purple-600",
        text: "As a student, I observed many great things here that you won't find elsewhere — weekly two tests with results in just two days, friendly faculty, and syllabus completion 3 months before the exam so students can do proper self study.",
    },
    {
        name: "Vanita Jaiswal",
        meta: "2 reviews · a year ago",
        initials: "VJ",
        color: "bg-rose-500",
        text: "I highly recommend Quantum Academy, led by Professor Ayush Bhardwaj! His passion for physics is infectious, and his teaching style is engaging, concise, and easy to follow. With personalized attention, valuable feedback, and top-notch study materials, I've gained a deeper understanding of complex physics concepts.",
    },
    {
        name: "Manju Darji",
        meta: "1 review · 2 years ago",
        initials: "MD",
        color: "bg-amber-600",
        text: "I joined Quantum Academy for preparing for NEET. My journey was amazing. The teachers and staff were very supportive. Mr Ayush Bhardwaj sir who teaches physics is very interactive and helpful. The best thing I found here is personal attention given to each student — something I didn't find anywhere else.",
    },
    {
        name: "Yuvraj Pandey",
        meta: "2 reviews · 5 years ago",
        initials: "YP",
        color: "bg-teal-600",
        text: "Very excellent academy for JEE Main, Advanced & NEET in Bhayandar. Focus on root fundamentals to advanced concepts — key for entrance exams. Modern lectures, unlimited practice through the app, and teachers personally connected to students for doubt clearing. Perfect balance of study and fun.",
    },
];

/* ─── Single review card ───────────────────────────────────────── */
function ReviewCard({ review, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col gap-4 rounded-2xl
                        bg-white/[0.04] border border-white/8
                        hover:border-amber-400/20 hover:bg-white/[0.06]
                        transition-all duration-300 p-6 group"
        >
            {/* Top row: avatar + name + Google badge */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className={`w-9 h-9 rounded-full ${review.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-xs font-bold tracking-wide">{review.initials}</span>
                    </div>
                    {/* Name + meta */}
                    <div>
                        <p className="text-white font-semibold text-sm leading-tight">{review.name}</p>
                        <p className="text-white/30 text-[10px] mt-0.5 leading-tight">{review.meta}</p>
                    </div>
                </div>
                {/* Google logo */}
                <div className="flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                    <GoogleIcon />
                </div>
            </div>

            {/* Stars */}
            <Stars />

            {/* Review text */}
            <p className="text-gray-400 text-sm leading-relaxed flex-1">
                "{review.text}"
            </p>
        </motion.div>
    );
}

/* ─── Section ──────────────────────────────────────────────────── */
export default function TestimonialsSection() {
    const headerRef = useRef(null);
    const isInView = useInView(headerRef, { once: true, margin: "-80px" });

    return (
        <section id="testimonials" className="relative bg-[#07091a] py-24 px-6 overflow-hidden">

            {/* Ambient glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[130px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[100px]" />
            </div>

            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div ref={headerRef} className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.45 }}
                        className="inline-flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-[0.3em]"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        What People Say
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.08 }}
                        className="text-4xl md:text-5xl font-display font-black text-white mt-4"
                    >
                        Trusted by Many.
                        <span className="text-amber-400"> Loved by All.</span>
                    </motion.h2>

                    {/* Google rating badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.16 }}
                        className="inline-flex items-center gap-3 mt-6 px-5 py-2.5 rounded-full
                                   bg-white/5 border border-white/10 backdrop-blur-sm"
                    >
                        <GoogleIcon />
                        <div className="flex items-center gap-1.5">
                            <Stars />
                            <span className="text-white font-bold text-sm">4.8</span>
                        </div>
                        <div className="w-px h-4 bg-white/15" />
                        <span className="text-gray-400 text-xs font-medium">90+ reviews on Google</span>
                    </motion.div>
                </div>

                {/* Review grid — 3 columns on desktop */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {REVIEWS.map((review, i) => (
                        <ReviewCard key={review.name} review={review} index={i} />
                    ))}
                </div>

                {/* CTA to Google reviews */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <a
                        href="https://share.google/DYMwLQXsxSwf4I9F6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                                   border border-white/10 bg-white/5 hover:bg-white/10
                                   text-white/60 hover:text-white text-sm font-medium
                                   transition-all duration-300"
                    >
                        <GoogleIcon />
                        View all reviews on Google
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
