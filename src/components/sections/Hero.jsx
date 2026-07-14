import { ACADEMY } from "../../constants/academy";
import Lightfall from "../ui/Lightfall";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { handlePhoneClick } from "../../utils/contact";

export default function Hero() {
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            gsap.fromTo(
                contentRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.2 }
            );
        }
    }, []);

    const scrollToForm = () => {
        window.lenis?.scrollTo("#enquiry", { duration: 1.5 });
    };

    return (
        <section className="relative bg-navy-700 overflow-hidden min-h-[92vh] flex items-center">

            {/* Lightfall background */}
            <div className="absolute inset-0 z-0">
                <Lightfall
                    colors={["#1a3a6b", "#2255aa", "#f59e0b", "#fbbf24"]}
                    backgroundColor="#0f1f45"
                    speed={0.4}
                    streakCount={20}
                    streakWidth={0.8}
                    streakLength={1.2}
                    glow={0.8}
                    density={1.2}
                    twinkle={0.6}
                    zoom={3}
                    backgroundGlow={0.3}
                    opacity={0.6}
                    mouseInteraction={false}
                />
            </div>

            {/* Amber glow blobs */}
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-amber-400/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-[120px] pointer-events-none z-0" />

            <div ref={contentRef} className="relative z-10 max-w-5xl mx-auto px-6 py-32 w-full text-center">

                <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-[1.05] max-w-3xl mx-auto">
                    Crack{" "}
                    <span className="text-white">JEE · NEET · MHT-CET.</span>
                    <br />
                    From Bhayandar.
                </h1>

                <p className="text-white/50 mt-6 text-base max-w-lg leading-relaxed mx-auto">
                    Bhayandar East's most trusted Science coaching for Class XI and XII —
                    4.9★ on Justdial, with toppers at NIT, SPIT and GMC.
                </p>

                {/* Stat counters with staggered pop-in */}
                <div className="flex gap-10 mt-10 mb-10 justify-center">
                    {[
                        { value: "4.9★", label: "Justdial Rating" },
                        { value: "90+", label: "Reviews" },
                        { value: "99%ile", label: "Top Score" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20, scale: 0.85 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.9 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ y: -3, scale: 1.05 }}
                        >
                            <p className="text-3xl font-display font-black text-amber-400">{stat.value}</p>
                            <p className="text-white/40 text-sm mt-0.5">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                    <motion.button
                        onClick={scrollToForm}
                        whileHover={{ scale: 1.04, y: -2, boxShadow: "0 12px 30px -8px rgba(245,166,35,0.45)" }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 380, damping: 20 }}
                        className="bg-amber-400 text-navy-900 px-8 py-4 rounded-xl font-bold text-sm shadow-lg shadow-amber-400/20 cursor-pointer"
                    >
                        Book Free Counselling
                    </motion.button>

                    <motion.a
                        href={`tel:${ACADEMY.phone}`}
                        onClick={(e) => handlePhoneClick(e, ACADEMY.phone)}
                        whileHover={{ scale: 1.04, y: -2, backgroundColor: "rgba(255,255,255,0.08)" }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 380, damping: 20 }}
                        className="border border-white/20 text-white/70 px-8 py-4 rounded-xl font-semibold text-sm cursor-pointer"
                    >
                        Call Us Now
                    </motion.a>
                </div>
            </div>
        </section>
    );
}
