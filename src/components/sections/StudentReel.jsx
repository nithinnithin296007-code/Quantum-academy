import CustomVideoPlayer from '../ui/CustomVideoPlayer';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BULLET_POINTS = [
    "Personal attention in every class",
    "Exam-focused study material",
    "Faculty who actually care",
];

const STATS = [
    { value: '500+', label: 'Happy Students' },
    { value: '95%', label: 'Satisfaction Rate' },
    { value: '4.9★', label: 'Avg Rating' },
];

export default function StudentReel() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            id="reviews"
            ref={ref}
            className="bg-[#f4f7fc] py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
        >
            {/* Subtle background ambient accents */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute -top-40 -left-40 w-[450px] h-[450px] rounded-full opacity-30"
                    style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.15) 0%, transparent 70%)', filter: 'blur(70px)' }}
                />
                <div
                    className="absolute -bottom-40 -right-20 w-[400px] h-[400px] rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, rgba(26,43,95,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }}
                />
            </div>

            <div className="relative max-w-5xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                    {/* ── Text side ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 text-center lg:text-left"
                    >
                        {/* Tag */}
                        <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 rounded-full px-4 py-1.5 mb-5 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-amber-600 font-semibold text-xs uppercase tracking-[0.2em]">
                                Hear It From Them
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-navy-700 leading-tight">
                            Our Students{' '}
                            <span className="text-amber-500 block sm:inline">
                                Speak for Us.
                            </span>
                        </h2>

                        <p className="text-gray-600 mt-4 text-base leading-relaxed max-w-md mx-auto lg:mx-0">
                            Don't take our word for it. Watch what our students have to say
                            about studying at Quantum Academy — in their own words.
                        </p>

                        {/* Bullet points */}
                        <div className="flex flex-col gap-3 mt-7 items-center lg:items-start">
                            {BULLET_POINTS.map((point, i) => (
                                <motion.div
                                    key={point}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease: 'easeOut' }}
                                    className="flex items-center gap-3"
                                >
                                    <span className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0 shadow-sm shadow-amber-400/30">
                                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                            <path d="M1 4L3.5 6.5L9 1" stroke="#0d1730" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className="text-gray-700 text-sm font-medium">{point}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Stats row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                            className="flex gap-8 mt-9 justify-center lg:justify-start pt-2 border-t border-gray-200/60"
                        >
                            {STATS.map((stat) => (
                                <div key={stat.label} className="text-center lg:text-left">
                                    <div className="text-2xl sm:text-3xl font-display font-black text-navy-900">{stat.value}</div>
                                    <div className="text-xs text-gray-600 mt-0.5 font-semibold">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── Video side: Clean rounded-corner reel ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                        className="flex-shrink-0 w-full max-w-[290px] sm:max-w-[320px] mx-auto"
                    >
                        {/* Video card with clean rounded-3xl corners (matching Image 2) */}
                        <div
                            className="relative rounded-3xl overflow-hidden shadow-2xl bg-navy-900 aspect-[9/16] ring-1 ring-black/10 group"
                            style={{
                                borderRadius: '1.5rem',
                                WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                                transform: 'translateZ(0)',
                            }}
                        >
                            <CustomVideoPlayer src="/reel.mp4" />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
