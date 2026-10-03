import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ACADEMY } from "../../constants/academy";

const APP_SCREENS = [
    {
        id: "home",
        title: "Smart Learning Hub",
        badge: "Main Dashboard",
        description: "Chapter-wise PYQs, AI learning assistant, and instant solutions.",
        src: "/images/app/app-screen-2.jpg",
        aspectRatio: "1024 / 1536",
        widthClass: "w-[270px] sm:w-[290px] md:w-[310px]",
        chip: "⚡ Chapter-wise PYQs",
    },
    {
        id: "exams",
        title: "Exam Tracker 2026",
        badge: "Exam Timelines",
        description: "Keep track of official dates for JEE Main, NEET UG, MHT-CET, and Boards.",
        src: "/images/app/app-screen-1.jpg",
        aspectRatio: "796 / 1600",
        widthClass: "w-[240px] sm:w-[260px] md:w-[275px]",
        chip: "📅 Exam Timelines & Alerts",
    },
    {
        id: "tests",
        title: "Mock Test Series",
        badge: "Mock Tests & PYQs",
        description: "Practice real exam pattern mock tests with instant performance breakdown.",
        src: "/images/app/app-screen-3.jpg",
        aspectRatio: "1024 / 1536",
        widthClass: "w-[270px] sm:w-[290px] md:w-[310px]",
        chip: "🎯 Full-length Mock Tests",
    },
];

export default function AppPromo() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeTab, setActiveTab] = useState("home");

    const activeIndex = APP_SCREENS.findIndex((s) => s.id === activeTab);

    return (
        <section id="app-promo" className="relative bg-[#060814] py-24 md:py-32 px-6 overflow-hidden select-none">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 px-4 py-1.5 rounded-full mb-4">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-amber-400 font-semibold text-xs uppercase tracking-[0.2em]">
                            Quantum Prep Mobile App
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-display font-black text-white leading-tight">
                        Practice Anywhere, <br className="hidden sm:block" />
                        <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                            Crack Your Goal.
                        </span>
                    </h2>

                    <p className="text-gray-400 mt-5 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                        Get instant access to chapter-wise PYQs, full-length mock tests, smart AI study assistance, and real-time exam notifications.
                    </p>

                    {/* Interactive Tab Switcher */}
                    <div className="flex flex-wrap justify-center gap-2 mt-8 bg-navy-900/90 p-1.5 rounded-2xl border border-white/10 max-w-xl mx-auto backdrop-blur-md">
                        {APP_SCREENS.map((screen) => (
                            <button
                                key={screen.id}
                                onClick={() => setActiveTab(screen.id)}
                                className={`flex-1 py-3 px-4 rounded-xl text-xs md:text-sm transition-all duration-300 cursor-pointer font-bold ${
                                    activeTab === screen.id
                                        ? "bg-amber-400 text-navy-950 shadow-lg shadow-amber-400/20"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                {screen.title}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* 3D Overlapping Phone Stage */}
                <div className="relative min-h-[500px] md:min-h-[580px] flex items-center justify-center">
                    {/* Floating Feature Glass Chips */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 }}
                        className="hidden lg:flex absolute left-8 top-16 z-30 items-center gap-3 bg-white/10 border border-white/15 backdrop-blur-xl px-4 py-3 rounded-2xl text-white shadow-2xl"
                    >
                        <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 font-bold text-lg">
                            ⚡
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-gray-400 font-medium">Chapter-wise Practice</p>
                            <p className="text-sm font-bold text-white">10,000+ Verified PYQs</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 }}
                        className="hidden lg:flex absolute right-8 bottom-20 z-30 items-center gap-3 bg-white/10 border border-white/15 backdrop-blur-xl px-4 py-3 rounded-2xl text-white shadow-2xl"
                    >
                        <div className="w-9 h-9 rounded-xl bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 font-bold text-lg">
                            📊
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-gray-400 font-medium">Instant Analysis</p>
                            <p className="text-sm font-bold text-white">Rank & Accuracy Drills</p>
                        </div>
                    </motion.div>

                    {/* Phones Stage Wrapper */}
                    <div className="relative w-full max-w-4xl mx-auto flex justify-center items-center h-[500px] md:h-[580px]">
                        {APP_SCREENS.map((screen, idx) => {
                            const offset = idx - activeIndex;
                            const isActive = idx === activeIndex;

                            let xOffset = 0;
                            let scale = 1;
                            let zIndex = 20;
                            let rotateY = 0;
                            let opacity = 1;

                            if (offset === -1 || (activeIndex === 0 && idx === 2)) {
                                xOffset = -240;
                                scale = 0.85;
                                zIndex = 10;
                                rotateY = 8;
                                opacity = 0.8;
                            } else if (offset === 1 || (activeIndex === 2 && idx === 0)) {
                                xOffset = 240;
                                scale = 0.85;
                                zIndex = 10;
                                rotateY = -8;
                                opacity = 0.8;
                            } else if (!isActive) {
                                opacity = 0;
                            }

                            return (
                                <motion.div
                                    key={screen.id}
                                    onClick={() => setActiveTab(screen.id)}
                                    animate={{
                                        x: window.innerWidth < 768 ? offset * 70 : xOffset,
                                        scale: window.innerWidth < 768 ? (isActive ? 1 : 0.85) : (isActive ? 1.05 : scale),
                                        zIndex: isActive ? 30 : zIndex,
                                        opacity: window.innerWidth < 768 && !isActive ? 0.3 : opacity,
                                        rotateY: isActive ? 0 : rotateY,
                                    }}
                                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                    className="absolute cursor-pointer group"
                                    style={{ perspective: 1000 }}
                                >
                                    {/* Clean Device Mockup Frame matching exact image aspect ratio */}
                                    <div
                                        className={`relative ${screen.widthClass} rounded-[2.6rem] bg-navy-950 p-2 md:p-2.5 border-[2px] ${
                                            isActive
                                                ? "border-amber-400/80 shadow-[0_25px_60px_-10px_rgba(245,158,11,0.35)] ring-4 ring-amber-400/10"
                                                : "border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:border-white/40"
                                        } transition-all duration-300 overflow-hidden`}
                                    >
                                        {/* Screen Image Container matching exact native aspect ratio */}
                                        <div
                                            className="rounded-[2rem] overflow-hidden bg-white relative w-full"
                                            style={{ aspectRatio: screen.aspectRatio }}
                                        >
                                            <img
                                                src={screen.src}
                                                alt={screen.alt}
                                                className="w-full h-full object-fill block"
                                                loading="eager"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Call To Action Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <a
                        href={ACADEMY.playStoreUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-navy-950 px-8 py-4 rounded-2xl font-black hover:from-amber-300 hover:to-amber-400 transition-all duration-300 shadow-xl shadow-amber-400/20 hover:scale-105 group"
                    >
                        <svg className="w-8 h-8 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none">
                            <path d="M3.6 2.4c-.3.3-.5.7-.5 1.2v16.8c0 .5.2.9.5 1.2l.1.1L13.3 12 3.7 2.3l-.1.1z" fill="#00D2FF" />
                            <path d="M16.6 15.3l-3.3-3.3 3.3-3.3 4 2.3c.7.4.7 1.6 0 2l-4 2.3z" fill="#FFC107" />
                            <path d="M13.3 12L3.6 2.3c.3-.2.7-.2 1.1 0l11.9 6.8-3.3 3.3v-.1z" fill="#00F076" />
                            <path d="M13.3 12l3.3 3.3-11.9 6.8c-.4.2-.8.2-1.1 0L13.3 12z" fill="#FF3D57" />
                        </svg>
                        <div className="text-left leading-tight">
                            <p className="text-[10px] uppercase tracking-widest font-bold opacity-80">Get Free App on</p>
                            <p className="text-lg font-black -mt-0.5">Google Play Store</p>
                        </div>
                    </a>

                    <div className="flex items-center gap-3 bg-navy-900/60 border border-white/10 px-5 py-3.5 rounded-2xl backdrop-blur-md">
                        <div className="flex text-amber-400 text-base">
                            ★★★★★
                        </div>
                        <div className="text-left border-l border-white/10 pl-3">
                            <p className="text-white font-bold text-sm">4.9 / 5.0 Rating</p>
                            <p className="text-gray-400 text-xs">100+ downloads</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}