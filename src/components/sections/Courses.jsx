import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { COURSES } from "../../constants/courses";

/* ── Per-course visual config ────────────────────────────── */
const COURSE_CONFIG = {
    jee: {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.607L5 14.5m14.8.5-1.65 1.65m0 0A9 9 0 0112 21a9 9 0 01-6.15-4.35m12.3 0L5 14.5" />
            </svg>
        ),
        accent: "#3B82F6",
        accentLight: "rgba(59,130,246,0.12)",
        label: "Engineering",
        popular: false,
        stats: ["25+ Mock Tests", "3 Subjects", "Daily Sessions"],
    },
    neet: {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
        ),
        accent: "#10B981",
        accentLight: "rgba(16,185,129,0.12)",
        label: "Medical",
        popular: true,
        stats: ["NCERT Focused", "3 Subjects", "Full-length Tests"],
    },
    mhtcet: {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
        ),
        accent: "#F59E0B",
        accentLight: "rgba(245,158,11,0.12)",
        label: "State Entrance",
        popular: false,
        stats: ["CET Shortcuts", "Speed Drills", "State-aligned"],
    },
    stateboard: {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
        ),
        accent: "#8B5CF6",
        accentLight: "rgba(139,92,246,0.12)",
        label: "Board Exam",
        popular: false,
        stats: ["Class XI & XII", "Practicals", "Board Papers"],
    },
};

/* ── Single course card ──────────────────────────────────── */
function CourseCard({ course, index, config, onEnquire }) {
    const isPopular = config.popular;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="relative flex flex-col rounded-3xl overflow-hidden group cursor-default"
            style={{
                background: "#ffffff",
                border: isPopular
                    ? `1.5px solid ${config.accent}80`
                    : "1.5px solid rgba(0,0,0,0.08)",
                boxShadow: isPopular
                    ? `0 8px 40px -8px ${config.accent}30`
                    : "0 2px 16px rgba(0,0,0,0.06)",
            }}
        >
            {/* Popular badge */}
            {isPopular && (
                <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest z-10"
                    style={{ background: config.accent, color: "#fff" }}
                >
                    Most Popular
                </div>
            )}

            {/* Top accent line */}
            <div
                className="h-[3px] w-full"
                style={{ background: `linear-gradient(90deg, ${config.accent}, transparent)` }}
            />

            <div className="flex flex-col flex-1 p-7 gap-5">
                {/* Label badge */}
                <div>
                    <span
                        className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ background: config.accentLight, color: config.accent }}
                    >
                        {config.label}
                    </span>
                </div>


                {/* Course name */}
                <h3 className="text-xl font-display font-black text-navy-900 leading-tight">
                    {course.name}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                    {course.description}
                </p>

                {/* Subject chips */}
                <div className="flex flex-wrap gap-2">
                    {course.subjects.map((s) => (
                        <span
                            key={s}
                            className="text-[11px] font-medium px-2.5 py-1 rounded-lg"
                            style={{ background: config.accentLight, color: config.accent }}
                        >
                            {s}
                        </span>
                    ))}
                </div>

                {/* CTA button */}
                <button
                    onClick={onEnquire}
                    className="mt-auto w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 cursor-pointer"
                    style={{
                        background: isPopular ? config.accent : "transparent",
                        color: isPopular ? "#ffffff" : config.accent,
                        border: `1.5px solid ${config.accent}`,
                    }}
                    onMouseEnter={(e) => {
                        if (!isPopular) {
                            e.currentTarget.style.background = config.accentLight;
                        } else {
                            e.currentTarget.style.opacity = "0.85";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isPopular) {
                            e.currentTarget.style.background = "transparent";
                        } else {
                            e.currentTarget.style.opacity = "1";
                        }
                    }}
                >
                    Enquire Now →
                </button>
            </div>
        </motion.div>
    );
}

/* ── Section ─────────────────────────────────────────────── */
export default function Courses() {
    const headerRef = useRef(null);
    const isInView = useInView(headerRef, { once: true, margin: "-80px" });

    const scrollToForm = () => {
        window.lenis?.scrollTo("#enquiry", { duration: 1.5 });
    };

    return (
        <section id="courses" className="relative bg-[#f4f7fc] py-24 md:py-32 px-6 overflow-hidden">
            {/* Ambient glows */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-100/60 blur-[130px]" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-emerald-100/60 blur-[110px]" />
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4 }}
                        className="inline-flex items-center gap-2 text-amber-500 font-semibold text-xs uppercase tracking-[0.3em]"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        Courses Offered
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.08 }}
                        className="text-4xl md:text-5xl font-display font-black text-navy-900 mt-4 leading-tight"
                    >
                        Choose Your{" "}
                        <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                            Track
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.16 }}
                        className="text-gray-500 mt-4 text-sm max-w-xl mx-auto leading-relaxed"
                    >
                        Every course is purpose-built — structured syllabus, expert faculty, and a
                        proven system designed to get you into your dream college.
                    </motion.p>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    {COURSES.map((course, i) => {
                        const config = COURSE_CONFIG[course.id] ?? {
                            icon: null,
                            accent: "#F59E0B",
                            accentLight: "rgba(245,158,11,0.1)",
                            label: course.target,
                            popular: false,
                            stats: course.subjects,
                        };
                        return (
                            <CourseCard
                                key={course.id}
                                course={course}
                                index={i}
                                config={config}
                                onEnquire={scrollToForm}
                            />
                        );
                    })}
                </div>

                {/* Bottom note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-gray-400 text-xs mt-10"
                >
                    All courses include study material, test series & doubt-clearing sessions.{" "}
                    <button
                        onClick={scrollToForm}
                        className="text-amber-400 hover:text-amber-300 underline cursor-pointer transition-colors"
                    >
                        Contact us for fee details.
                    </button>
                </motion.p>
            </div>
        </section>
    );
}