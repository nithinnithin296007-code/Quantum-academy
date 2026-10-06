import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 z-[9999] bg-[#07091a] flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative flex flex-col items-center"
            >
                {/* Glowing Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-500/20 rounded-full blur-[40px] pointer-events-none" />

                {/* Animated Logo Mark */}
                <div className="relative w-24 h-24 mb-6">
                    <motion.div
                        className="w-full h-full bg-white/95 rounded-2xl p-4 flex items-center justify-center shadow-lg shadow-amber-500/20"
                        initial={{ scale: 0.8, rotate: -10 }}
                        animate={{ scale: [0.8, 1.05, 1], rotate: [0, 5, 0] }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                    >
                        <img 
                            src={logo} 
                            alt="Quantum Academy Logo" 
                            className="w-full h-full object-contain"
                        />
                    </motion.div>
                </div>

                {/* Loading Text */}
                <motion.div
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <span className="text-white font-display font-bold tracking-widest uppercase text-sm">
                        Quantum Academy
                    </span>
                    <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 h-1.5 bg-amber-400 rounded-full"
                                animate={{ y: [0, -6, 0] }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: i * 0.15,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
