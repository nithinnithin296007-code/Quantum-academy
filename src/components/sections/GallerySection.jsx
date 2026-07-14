import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES = [
    { id: 1, src: "/images/academy-1.jpg", title: "Digital Classroom Sessions", category: "Classroom" },
    { id: 2, src: "/images/academy-2.jpg", title: "Spacious Lecture Halls", category: "Classroom" },
    { id: 3, src: "/images/academy-3.jpg", title: "Dedicated Study Cabins", category: "Self Study" },
    { id: 4, src: "/images/academy-4.jpg", title: "Quiet Library Reference Space", category: "Library" },
    { id: 5, src: "/images/academy-5.jpg", title: "One-on-One Doubt Solving", category: "Mentorship" },
    { id: 6, src: "/images/academy-6.jpg", title: "Interactive Lectures", category: "Classroom" },
    { id: 7, src: "/images/academy-7.jpg", title: "Collaborative Study Desks", category: "Library" },
    { id: 8, src: "/images/academy-8.jpg", title: "Smartboard Led Teaching", category: "Classroom" },
    { id: 9, src: "/images/academy-9.jpg", title: "Personal Guidance Cabins", category: "Mentorship" },
    { id: 10, src: "/images/academy-10.jpg", title: "Modern Learning Infrastructure", category: "Infrastructure" },
];

export default function GallerySection() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handlePrev = (e) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
    };

    return (
        <section id="gallery" className="bg-[#f8fafc] py-24 px-6 relative overflow-hidden">
            <div className="max-w-5xl mx-auto relative z-10">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-amber-500 font-semibold text-xs uppercase tracking-[0.2em]">
                        Infrastructure & Campus
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-black text-navy-700 mt-3">
                        Our Gallery
                    </h2>
                    <p className="text-gray-500 mt-4 text-sm max-w-xl mx-auto leading-relaxed">
                        Take a visual tour of Quantum Academy's modern learning environments, quiet libraries, and personal counselling spaces.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {IMAGES.map((img, index) => (
                        <div
                            key={img.id}
                            onClick={() => setActiveIndex(index)}
                            className="relative group overflow-hidden rounded-2xl aspect-[4/3] bg-gray-200 border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
                        >
                            <img
                                src={img.src}
                                alt={img.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                                    {img.category}
                                </span>
                                <h4 className="text-white text-base font-semibold">
                                    {img.title}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {activeIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveIndex(null)}
                        className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-md cursor-zoom-out"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setActiveIndex(null)}
                            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-200 cursor-pointer"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        {/* Prev button */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 md:left-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3.5 rounded-full transition-all duration-200 cursor-pointer"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>

                        {/* Next button */}
                        <button
                            onClick={handleNext}
                            className="absolute right-4 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3.5 rounded-full transition-all duration-200 cursor-pointer"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>

                        {/* Active Image Box */}
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-4xl max-h-[80vh] w-full flex flex-col items-center gap-4 cursor-default"
                        >
                            <img
                                src={IMAGES[activeIndex].src}
                                alt={IMAGES[activeIndex].title}
                                className="max-w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl border border-white/5"
                            />
                            <div className="text-center">
                                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
                                    {IMAGES[activeIndex].category}
                                </span>
                                <p className="text-white font-medium text-base mt-1">
                                    {IMAGES[activeIndex].title}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
