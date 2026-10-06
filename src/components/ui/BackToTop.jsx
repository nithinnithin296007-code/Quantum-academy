import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility, { passive: true });
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        if (window.lenis) {
            window.lenis.scrollTo(0, { duration: 1.5 });
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 left-6 z-[8000] w-12 h-12 bg-[#07091a]/80 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center shadow-lg shadow-black/40 hover:bg-amber-400 hover:text-navy-900 hover:border-amber-400 transition-colors duration-300 group focus:outline-none"
                    aria-label="Back to top"
                >
                    <svg 
                        className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={2.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
