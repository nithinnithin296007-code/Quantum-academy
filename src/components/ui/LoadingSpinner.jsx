import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

/* ── Thin amber progress bar that sweeps across the top ── */
function ProgressBar() {
    return (
        <motion.div
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 rounded-full"
            initial={{ width: "0%", opacity: 1 }}
            animate={{ width: ["0%", "70%", "90%", "100%"] }}
            transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1], times: [0, 0.5, 0.8, 1] }}
        />
    );
}

/* ── Subtle radial grid ── */
function Grid() {
    return (
        <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
            }}
        />
    );
}

export default function LoadingSpinner() {
    return (
    <motion.div
            className="fixed inset-0 z-[9999] bg-[#07091a] flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            transition={{ duration: 0.3 }}
        >
            {/* Top progress bar */}
            <ProgressBar />

            {/* Subtle grid */}
            <Grid />

            {/* Ambient glow — centered */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/6 blur-[120px] pointer-events-none" />

            {/* ── Main content ── */}
            <div className="relative flex flex-col items-center gap-10">

                {/* Logo + ring */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex items-center justify-center"
                >
                    {/* Outer spinning ring */}
                    <motion.div
                        className="absolute w-24 h-24 rounded-full border border-amber-400/20"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        {/* Ring accent dot */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-400" />
                    </motion.div>

                    {/* Inner spinning ring (counter) */}
                    <motion.div
                        className="absolute w-16 h-16 rounded-full border border-white/8"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 rounded-full bg-white/30" />
                    </motion.div>

                    {/* Logo mark */}
                    <motion.div
                        className="relative w-14 h-14 bg-white rounded-2xl shadow-[0_0_40px_rgba(245,166,35,0.15)] flex items-center justify-center"
                        initial={{ scale: 0.85 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <img src={logo} alt="Quantum Academy" className="w-10 h-10 object-contain" />
                    </motion.div>
                </motion.div>

                {/* Brand text + tagline */}
                <motion.div
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <span className="font-display font-black text-white text-xl tracking-[0.18em] uppercase">
                        Quantum Academy
                    </span>
                    <span className="text-gray-500 text-xs tracking-[0.25em] uppercase font-medium">
                        A Trust-driven Science Institute
                    </span>
                </motion.div>

                {/* Slim loading bar */}
                <motion.div
                    className="w-48 h-[3px] rounded-full bg-white/8 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                >
                    <motion.div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.2 }}
                    />
                </motion.div>

            </div>

            {/* Bottom caption */}
            <motion.p
                className="absolute bottom-10 text-[11px] text-white/20 tracking-[0.2em] uppercase font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                XI–XII · IIT JEE · NEET · MHT-CET
            </motion.p>
        </motion.div>
    );
}
