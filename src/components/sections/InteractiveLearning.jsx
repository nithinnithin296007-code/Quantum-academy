import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CustomVideoPlayer from "../ui/CustomVideoPlayer";

/* ─── SVG icons ────────────────────────────────────────────────── */
const IconBoard = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M7 8h3m-1-2v4M14 10h3" />
    </svg>
);
const IconTarget = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
);
const IconChat = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" />
    </svg>
);
const IconChart = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
);

/* ─── Data ─────────────────────────────────────────────────────── */
const FEATURES = [
    {
        Icon: IconBoard, title: "Smart-board Sessions",
        desc: "Visual, concept-driven teaching using interactive smart boards in every class.",
        color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20 group-hover:bg-amber-400/18",
    },
    {
        Icon: IconTarget, title: "Exam-Ready Approach",
        desc: "Curriculum engineered to crack JEE, NEET & MHT-CET with concept clarity.",
        color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20 group-hover:bg-blue-400/18",
    },
    {
        Icon: IconChat, title: "Real-time Doubt Solving",
        desc: "Dedicated doubt sessions so no question ever stays unanswered.",
        color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20 group-hover:bg-emerald-400/18",
    },
    {
        Icon: IconChart, title: "Performance Analytics",
        desc: "Track progress through test scores, weak-area reports & personalised feedback.",
        color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/20 group-hover:bg-purple-400/18",
    },
];

const STATS = [
    { num: "2000+", label: "Students taught" },
    { num: "98%", label: "Satisfaction rate" },
];

/* ─── Section ──────────────────────────────────────────────────── */
export default function InteractiveLearning() {
    const titleRef = useRef(null);
    const isInView = useInView(titleRef, { once: true, margin: "-80px" });

    return (
        <section id="interactive-learning" className="relative bg-[#07091a] py-24 px-6">

            {/* Ambient glows — own overflow scope so they don't clip the cards */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full bg-amber-500/4 blur-[150px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/4 blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto">

                {/* ── Header ── */}
                <div ref={titleRef} className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.45 }}
                        className="inline-flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-[0.3em]"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        Inside the Classroom
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.08 }}
                        className="text-4xl md:text-6xl font-display font-black text-white mt-4 leading-tight"
                    >
                        Learning That{" "}
                        <span className="text-amber-400 relative">
                            Comes Alive
                            <svg className="absolute -bottom-1 left-0 w-full" height="4"
                                viewBox="0 0 300 4" preserveAspectRatio="none">
                                <path d="M0 3 Q75 0 150 2.5 Q225 5 300 2"
                                    stroke="#F5A623" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
                            </svg>
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.16 }}
                        className="text-gray-400 mt-5 text-base max-w-lg mx-auto leading-relaxed"
                    >
                        Watch live excerpts from our classroom — real students, real teachers, real results.
                    </motion.p>
                </div>

                {/* ── Body ── */}
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

                    {/* LEFT — Features + Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: -32 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:w-[340px] flex-shrink-0 flex flex-col justify-center"
                    >
                        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gray-500 mb-7">
                            What makes us different
                        </p>

                        <div className="flex flex-col gap-5">
                            {FEATURES.map(({ Icon, title, desc, color, bg }, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -18 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.45, delay: i * 0.07 }}
                                    className="flex items-start gap-4 group"
                                >
                                    <div className={`w-11 h-11 rounded-xl border flex-shrink-0
                                                    flex items-center justify-center
                                                    transition-all duration-300 ${bg} ${color}`}>
                                        <Icon />
                                    </div>
                                    <div>
                                        <p className={`font-display font-semibold text-sm mb-0.5 ${color}`}>{title}</p>
                                        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-9 mb-7 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        <div className="flex gap-8">
                            {STATS.map((s, i) => (
                                <motion.div
                                    key={s.label}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.45, delay: 0.3 + i * 0.07 }}
                                    className="flex flex-col gap-0.5"
                                >
                                    <span className="text-2xl font-display font-black text-amber-400">{s.num}</span>
                                    <span className="text-[11px] text-gray-500 leading-tight">{s.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT — Two reels */}
                    <div className="flex-1">

                        {/* ── MOBILE: vertical stacked creative layout ── */}
                        <div className="flex flex-col items-center gap-6 lg:hidden">

                            {/* Decorative label */}
                            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gray-500">
                                Watch it live
                            </p>

                            {/* Reel 1 — slightly tilted left */}
                            <motion.div
                                initial={{ opacity: 0, y: 30, rotate: -1 }}
                                whileInView={{ opacity: 1, y: 0, rotate: -1 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full max-w-[300px] flex flex-col gap-2"
                                style={{ rotate: "-1.5deg" }}
                            >
                                <div className="relative rounded-[2rem] overflow-hidden
                                                ring-1 ring-white/10
                                                shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
                                    style={{ aspectRatio: "9/16" }}>
                                    <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5
                                                    bg-black/60 backdrop-blur-md px-3 py-1 rounded-full
                                                    border border-white/10 pointer-events-none">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                        <span className="text-[9px] font-bold text-white uppercase tracking-wider">
                                            Live Session
                                        </span>
                                    </div>
                                    <CustomVideoPlayer src="/videos/reel-interactive-1.mp4" />
                                </div>
                                <p className="text-gray-400 text-xs font-medium tracking-wide text-center">
                                    Inside the Classroom
                                </p>
                            </motion.div>

                            {/* Divider with arrow */}
                            <div className="flex items-center gap-3 w-full max-w-[300px]">
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
                                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
                            </div>

                            {/* Reel 2 — slightly tilted right */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full max-w-[300px] flex flex-col gap-2"
                                style={{ rotate: "1.5deg" }}
                            >
                                <div className="relative rounded-[2rem] overflow-hidden
                                                ring-1 ring-amber-400/20
                                                shadow-[0_20px_60px_rgba(245,166,35,0.15)]"
                                    style={{ aspectRatio: "9/16" }}>
                                    <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5
                                                    bg-black/60 backdrop-blur-md px-3 py-1 rounded-full
                                                    border border-white/10 pointer-events-none">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                        <span className="text-[9px] font-bold text-white uppercase tracking-wider">
                                            Campus Life
                                        </span>
                                    </div>
                                    <CustomVideoPlayer src="/videos/reel-interactive-2.mp4" />
                                </div>
                                <p className="text-gray-400 text-xs font-medium tracking-wide text-center">
                                    Student Experience
                                </p>
                            </motion.div>
                        </div>

                        {/* ── DESKTOP: side-by-side staggered layout ── */}
                        <div className="hidden lg:flex flex-row gap-5 items-start h-[600px]">

                            {/* Reel 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="flex-1 flex flex-col gap-3 h-full"
                            >
                                <div className="relative flex-1 rounded-[2rem] overflow-hidden
                                                ring-1 ring-white/8
                                                shadow-[0_20px_80px_rgba(0,0,0,0.6)]
                                                min-h-[340px]">
                                    <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5
                                                    bg-black/60 backdrop-blur-md px-3 py-1 rounded-full
                                                    border border-white/10 pointer-events-none">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                        <span className="text-[9px] font-bold text-white uppercase tracking-wider">
                                            Live Session
                                        </span>
                                    </div>
                                    <CustomVideoPlayer src="/videos/reel-interactive-1.mp4" />
                                </div>
                                <p className="text-gray-400 text-xs font-medium tracking-wide text-center flex-shrink-0">
                                    Inside the Classroom
                                </p>
                            </motion.div>

                            {/* Reel 2 — staggered down */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.75, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                className="flex-1 flex flex-col gap-3 h-full pt-16"
                            >
                                <div className="relative flex-1 rounded-[2rem] overflow-hidden
                                                ring-1 ring-white/8
                                                shadow-[0_20px_80px_rgba(0,0,0,0.6)]
                                                min-h-[340px]">
                                    <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5
                                                    bg-black/60 backdrop-blur-md px-3 py-1 rounded-full
                                                    border border-white/10 pointer-events-none">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                        <span className="text-[9px] font-bold text-white uppercase tracking-wider">
                                            Campus Life
                                        </span>
                                    </div>
                                    <CustomVideoPlayer src="/videos/reel-interactive-2.mp4" />
                                </div>
                                <p className="text-gray-400 text-xs font-medium tracking-wide text-center flex-shrink-0">
                                    Student Experience
                                </p>
                            </motion.div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
