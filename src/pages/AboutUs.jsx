import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Founder from "../components/sections/Founder";
import SEO from "../components/ui/SEO";
import { FOUNDER } from "../constants/founder";

const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Quantum Academy",
    "description": "Dedicated to preparing the next generation of engineers, doctors, and scientists through a trust-driven, Concept-first coaching approach in Bhayandar.",
    "publisher": {
        "@type": "EducationalOrganization",
        "name": "Quantum Academy",
        "url": "https://quantumacademyedu.com"
    }
};

export default function AboutUs() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-[#f4f7fc] min-h-screen">
            <SEO schema={aboutSchema} />
            <Navbar />

            {/* Header Section */}
            <section className="bg-[#07091a] text-center pt-32 pb-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#111634] to-[#07091a] opacity-50" />
                <div className="relative z-10 max-w-3xl mx-auto">
                    <span className="text-amber-500 font-semibold text-xs uppercase tracking-[0.25em]">
                        Our Story & Philosophy
                    </span>
                    <h1 className="text-4xl md:text-6xl font-display font-black text-white mt-4 leading-tight">
                        About Quantum Academy
                    </h1>
                    <p className="text-gray-400 mt-6 text-base md:text-lg leading-relaxed">
                        Dedicated to preparing the next generation of engineers, doctors, and scientists through a trust-driven, Concept-first coaching approach in Bhayandar.
                    </p>
                </div>
            </section>

            {/* Pedagogy Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-amber-500 font-semibold text-xs uppercase tracking-[0.2em]">
                            Our Pedagogy
                        </span>
                        <h2 className="text-3xl md:text-4xl font-display font-black text-navy-700 mt-3">
                            How We Teach
                        </h2>
                        <p className="text-gray-500 mt-4 text-sm max-w-xl mx-auto leading-relaxed">
                            Competitive exams like JEE, NEET, and MHT-CET require more than just rote learning. Here is our structured pedagogical approach to student success.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 text-2xl font-bold mb-6">
                                01
                            </div>
                            <h3 className="font-display font-bold text-navy-700 text-lg mb-3">
                                Concept Mastery First
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                We believe in deep, intuitive understanding of core principles. Our lectures start from absolute basics before moving to complex JEE/NEET problem-solving.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl font-bold mb-6">
                                02
                            </div>
                            <h3 className="font-display font-bold text-navy-700 text-lg mb-3">
                                Small Batches, High Focus
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                To ensure every student receives personal attention, we limit our batch sizes. This allows our faculty to monitor and address individual student queries.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-navy-100 flex items-center justify-center text-navy-600 text-2xl font-bold mb-6">
                                03
                            </div>
                            <h3 className="font-display font-bold text-navy-700 text-lg mb-3">
                                Doubt-Solving & Support
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Learning doesn't stop after the lecture. We have dedicated doubt-solving cabins where students can interact one-on-one with their teachers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-24 px-6 bg-[#f4f7fc]">
                <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-8">
                    <div className="bg-navy-700 rounded-3xl p-10 text-white shadow-xl">
                        <span className="text-amber-400 font-semibold text-xs uppercase tracking-widest block mb-2">
                            Our Drive
                        </span>
                        <h3 className="font-display font-black text-3xl mb-4">Our Mission</h3>
                        <p className="text-gray-300 leading-relaxed text-sm">
                            Every student's learning capacity is unique. We aim to customize our coaching methodology, strengthen fundamentals, build confidence, and guide each aspirant toward their dream engineering or medical career.
                        </p>
                    </div>
                    <div className="bg-emerald-600 rounded-3xl p-10 text-white shadow-xl">
                        <span className="text-emerald-200 font-semibold text-xs uppercase tracking-widest block mb-2">
                            Our Direction
                        </span>
                        <h3 className="font-display font-black text-3xl mb-4">Our Vision</h3>
                        <p className="text-white/95 leading-relaxed text-sm">
                            To innovate continuously in our methods of imparting quality education, keeping integrity and student growth at the forefront, and establishing ourselves as the most trust-driven Science institute in the region.
                        </p>
                    </div>
                </div>
            </section>

            {/* Founder Section */}
            <Founder {...FOUNDER} />

            <Footer />
        </main>
    );
}
