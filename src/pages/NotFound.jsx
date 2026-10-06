import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function NotFound() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-[#07091a] min-h-screen flex flex-col selection:bg-amber-400 selection:text-[#07091a]">
            <Navbar />
            
            <section className="flex-grow flex items-center justify-center relative overflow-hidden pt-20 px-6">
                {/* Ambient Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 text-center max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h1 className="text-[8rem] md:text-[12rem] font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500/20 leading-none select-none">
                            404
                        </h1>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-white mt-4 tracking-tight">
                            Lost in the <span className="text-amber-400">Quantum Realm?</span>
                        </h2>
                        <p className="text-gray-400 mt-6 text-lg leading-relaxed max-w-lg mx-auto">
                            The page you are looking for doesn't exist, has been moved, or is temporarily unavailable. 
                        </p>
                        
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link 
                                to="/" 
                                className="w-full sm:w-auto bg-amber-400 text-navy-950 font-bold px-8 py-4 rounded-xl hover:bg-amber-300 transition-all duration-300 shadow-lg shadow-amber-400/20 hover:scale-105 active:scale-95"
                            >
                                ← Back to Homepage
                            </Link>
                            <Link 
                                to="/contact" 
                                className="w-full sm:w-auto bg-white/5 border border-white/10 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
