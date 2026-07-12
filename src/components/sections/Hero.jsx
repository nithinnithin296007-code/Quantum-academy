import { ACADEMY } from "../../constants/academy";
import Lightfall from "../ui/Lightfall";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
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
        document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
    };



    return (
        <section className="relative bg-navy-700 overflow-hidden min-h-[92vh] flex items-center">

            {/* Lightfall background */}
            <div className="absolute inset-0 z-0">
                <Lightfall
                    colors={["#1a3a6b", "#2255aa", "#f59e0b", "#fbbf24"]}
                    backgroundColor="#0f1f45"
                    speed={0.4}
                    streakCount={20}        // was 5 — more shooting streaks
                    streakWidth={0.8}
                    streakLength={1.2}
                    glow={0.8}
                    density={1.2}           // was 0.5 — more background stars
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

                <div className="flex gap-10 mt-10 mb-10 justify-center">
                    {[
                        { value: "4.9★", label: "Justdial Rating" },
                        { value: "90+", label: "Reviews" },
                        { value: "99%ile", label: "Top Score" },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <p className="text-3xl font-display font-black text-amber-400">{stat.value}</p>
                            <p className="text-white/40 text-sm mt-0.5">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                    <button
                        onClick={scrollToForm}
                        className="bg-amber-400 text-navy-900 px-8 py-4 rounded-xl font-bold text-sm hover:bg-amber-300 transition shadow-lg shadow-amber-400/20"
                    >
                        Book Free Counselling
                    </button>

                    <a
                        href={`tel:${ACADEMY.phone}`}
                        onClick={(e) => handlePhoneClick(e, ACADEMY.phone)}
                        className="border border-white/20 text-white/70 px-8 py-4 rounded-xl font-semibold text-sm hover:bg-white/5 transition"
                    >
                        Call Us Now
                    </a>
                </div>
            </div>
        </section>
    );
}
