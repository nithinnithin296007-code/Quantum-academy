import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

export default function LoadingSpinner() {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-[#07091a] flex flex-col items-center justify-center overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        >
            {/* Top amber progress bar */}
            <motion.div
                className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: ["0%", "70%", "90%", "100%"] }}
                transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1], times: [0, 0.5, 0.8, 1] }}
            />

            {/* Subtle grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Ambient glow */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/6 blur-[120px] pointer-events-none" />

            {/* ── Main content — always visible, no opacity:0 initial ── */}
            <div className="relative flex flex-col items-center gap-10">

                {/* Logo + spinning rings */}
                <div className="relative flex items-center justify-center">

                    {/* Outer spinning ring */}
                    <motion.div
                        className="absolute w-24 h-24 rounded-full border border-amber-400/20"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-400" />
                    </motion.div>

                    {/* Inner counter-spinning ring */}
                    <motion.div
                        className="absolute w-16 h-16 rounded-full border border-white/10"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 rounded-full bg-white/30" />
                    </motion.div>

                    {/* Logo mark */}
                    <div className="relative w-14 h-14 bg-white rounded-2xl shadow-[0_0_40px_rgba(245,166,35,0.2)] flex items-center justify-center">
                        <img src={logo} alt="Quantum Academy" className="w-10 h-10 object-contain" />
                    </div>
                </div>

                {/* Brand name + tagline */}
                <div className="flex flex-col items-center gap-2">
                    <span className="font-display font-black text-white text-xl tracking-[0.18em] uppercase">
                        Quantum Academy
                    </span>
                    <span className="text-gray-500 text-xs tracking-[0.25em] uppercase font-medium">
                        A Trust-driven Science Institute
                    </span>
                </div>

                {/* Shimmer loading bar */}
                <div className="w-48 h-[3px] rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.2 }}
                    />
                </div>
            </div>

            {/* Bottom caption */}
            <p className="absolute bottom-10 text-[11px] text-white/20 tracking-[0.2em] uppercase font-medium">
                XI–XII · IIT JEE · NEET · MHT-CET
            </p>
        </motion.div>
    );
}
