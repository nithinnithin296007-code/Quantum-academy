import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ACADEMY } from "../../constants/academy";

export default function AppPromo() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section className="relative bg-[#07091a] py-20 px-6 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-400/8 rounded-full blur-[150px] pointer-events-none" />

            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative z-10 max-w-3xl mx-auto text-center"
            >
                <span className="text-amber-400 font-semibold text-xs uppercase tracking-[0.3em]">
                    Study Anywhere
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-black text-white mt-4 leading-tight">
                    Practice On The Go
                </h2>
                <p className="text-gray-400 mt-4 text-base max-w-xl mx-auto leading-relaxed">
                    Chapter-wise PYQs, mock tests, and instant solutions for JEE, NEET
                    and CET — right on your phone. Download the Quantum Academy app.
                </p>

                <div className="flex flex-wrap gap-6 justify-center mt-10 items-center">
                    <a
                        href={ACADEMY.playStoreUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 bg-white text-navy-900 px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg"
                    >
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                        <path d="M3.6 2.4c-.3.3-.5.7-.5 1.2v16.8c0 .5.2.9.5 1.2l.1.1L13.3 12 3.7 2.3l-.1.1z" fill="#00D2FF" />
                        <path d="M16.6 15.3l-3.3-3.3 3.3-3.3 4 2.3c.7.4.7 1.6 0 2l-4 2.3z" fill="#FFC107" />
                        <path d="M13.3 12L3.6 2.3c.3-.2.7-.2 1.1 0l11.9 6.8-3.3 3.3v-.1z" fill="#00F076" />
                        <path d="M13.3 12l3.3 3.3-11.9 6.8c-.4.2-.8.2-1.1 0L13.3 12z" fill="#FF3D57" />
                    </svg>
                    <div className="text-left leading-tight">
                        <p className="text-[10px] uppercase tracking-wide text-gray-500">Get it on</p>
                        <p className="text-base font-bold -mt-0.5">Google Play</p>
                    </div>
                </a>

                <div className="text-left">
                    <p className="text-white font-display font-bold text-lg">4.9★ Rating</p>
                    <p className="text-gray-500 text-xs">JEE · NEET · CET prep</p>
                </div>
            </div>
        </motion.div>
        </section>
    );
}