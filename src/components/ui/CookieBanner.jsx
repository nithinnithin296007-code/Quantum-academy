import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Wait a few seconds before showing to not overwhelm the user on first load
        const timer = setTimeout(() => {
            const hasConsent = localStorage.getItem("quantum_cookie_consent");
            if (!hasConsent) {
                setIsVisible(true);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("quantum_cookie_consent", "true");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 150, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-md z-[9000]"
                >
                    <div className="bg-[#07091a] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.7)] p-6 rounded-2xl flex flex-col gap-4 backdrop-blur-xl">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-amber-400">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-white font-display font-bold text-lg mb-1">We value your privacy</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                                    <a href="/privacy-policy" className="text-amber-400 hover:underline ml-1">Read Policy</a>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full">
                            <button
                                onClick={() => setIsVisible(false)}
                                className="flex-1 py-2.5 px-4 rounded-xl border border-white/10 text-gray-300 font-semibold text-sm hover:bg-white/5 transition"
                            >
                                Reject All
                            </button>
                            <button
                                onClick={acceptCookies}
                                className="flex-1 py-2.5 px-4 rounded-xl bg-amber-400 text-navy-950 font-bold text-sm hover:bg-amber-300 shadow-lg shadow-amber-400/20 transition hover:scale-105 active:scale-95"
                            >
                                Accept & Close
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
