import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NetworkStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showBackOnline, setShowBackOnline] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setShowBackOnline(true);
            // Hide the "Back Online" message after 3 seconds
            setTimeout(() => setShowBackOnline(false), 3000);
        };
        const handleOffline = () => {
            setIsOnline(false);
            setShowBackOnline(false);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <AnimatePresence>
            {!isOnline && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed top-0 left-0 right-0 z-[10000] flex justify-center p-4 pointer-events-none"
                >
                    <div className="bg-red-500 text-white px-6 py-3 rounded-2xl shadow-[0_10px_40px_rgba(239,68,68,0.4)] flex items-center gap-3 border border-red-400">
                        <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                        </svg>
                        <div>
                            <p className="font-bold text-sm">You are offline</p>
                            <p className="text-xs opacity-90">Please check your internet connection.</p>
                        </div>
                    </div>
                </motion.div>
            )}

            {showBackOnline && isOnline && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed top-0 left-0 right-0 z-[10000] flex justify-center p-4 pointer-events-none"
                >
                    <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-[0_10px_40px_rgba(16,185,129,0.4)] flex items-center gap-3 border border-emerald-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                            <p className="font-bold text-sm">Back Online</p>
                            <p className="text-xs opacity-90">Your internet connection was restored.</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
