export default function TestSeriesSection() {
    return (
        <section id="test-series" className="bg-[#0b0e24] py-24 px-6 relative overflow-hidden border-t border-b border-white/5">
            {/* Glowing backgrounds */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-amber-500 font-semibold text-xs uppercase tracking-[0.2em]">
                        Mock Tests & Analytics
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-black text-white mt-3">
                        All India Test Series
                    </h2>
                    <p className="text-gray-400 mt-4 text-sm max-w-xl mx-auto leading-relaxed">
                        Assess your rank, boost your speed, and identify your weak spots with our systematically designed JEE and NEET test series.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Eklavya (JEE) Card */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:border-amber-400/30 transition-all duration-300">
                        <div>
                            <span className="bg-blue-400/10 text-blue-400 border border-blue-400/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                JEE Mains Prep
                            </span>
                            <h3 className="text-2xl font-display font-bold text-white mt-4 mb-2">
                                Eklavya Test Series
                            </h3>
                            
                            {/* Price Badge */}
                            <div className="flex items-baseline gap-2 mb-4 bg-white/[0.03] border border-white/5 px-4 py-2.5 rounded-2xl w-fit">
                                <span className="text-2xl font-black text-amber-400">₹2,499</span>
                                <span className="text-gray-500 text-sm line-through">₹4,999</span>
                                <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-0.5 rounded-md ml-1">
                                    50% OFF
                                </span>
                            </div>

                            <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                A comprehensive test series designed specifically for JEE Mains aspirants, aligned with the revised NTA syllabus.
                            </p>
                            
                            <ul className="space-y-3 mb-8">
                                {[
                                    "25 high-quality mock tests",
                                    "10 unit-wise, 8 class-wise, and 7 full-length tests",
                                    "Detailed solutions and answer keys provided",
                                    "Comprehensive performance report and analytics",
                                ].map((point, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                <path d="M1 4L3.5 6.5L9 1" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-300 text-sm">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Poster and QR side-by-side */}
                        <div className="flex gap-4 items-stretch mt-6">
                            <a
                                href="/images/facilities/eklavya-poster.jpg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group overflow-hidden rounded-2xl border border-white/10 w-1/2 aspect-[3/4] bg-navy-900 block"
                            >
                                <img
                                    src="/images/facilities/eklavya-poster.jpg"
                                    alt="JEE Eklavya Test Series Details"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </a>
                            <div className="flex flex-col items-center justify-center p-4 bg-white/[0.03] rounded-2xl border border-white/10 w-1/2 text-center">
                                <div className="bg-white p-1.5 rounded-xl border border-white/10 shadow-inner">
                                    <img
                                        src="/images/facilities/eklavya-qr-clean.webp"
                                        alt="Register QR Code"
                                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                                    />
                                </div>
                                <span className="text-[11px] text-amber-400 font-bold mt-3 tracking-wider uppercase">
                                    Register Now
                                </span>
                                <p className="text-[9px] text-gray-400 mt-1 leading-normal">
                                    Scan QR code to enroll
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Dronacharya (NEET) Card */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:border-emerald-400/30 transition-all duration-300">
                        <div>
                            <span className="bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                NEET 2026 Prep
                            </span>
                            <h3 className="text-2xl font-display font-bold text-white mt-4 mb-2">
                                Dronacharya Test Series
                            </h3>

                            {/* Price Badge */}
                            <div className="flex items-baseline gap-2 mb-4 bg-white/[0.03] border border-white/5 px-4 py-2.5 rounded-2xl w-fit">
                                <span className="text-2xl font-black text-amber-400">₹1,999</span>
                                <span className="text-gray-500 text-sm line-through">₹4,999</span>
                                <span className="text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-0.5 rounded-md ml-1">
                                    60% OFF
                                </span>
                            </div>

                            <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                Specially designed mock tests to simulate real NEET conditions, focusing on high-yielding concepts.
                            </p>
                            
                            <ul className="space-y-3 mb-8">
                                {[
                                    "20 comprehensive mock tests",
                                    "10 unit-wise, 4 full-length, and 6 mock tests",
                                    "Detailed explanations and immediate answer keys",
                                    "Deep insights into speed, accuracy, and subject mastery",
                                ].map((point, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                <path d="M1 4L3.5 6.5L9 1" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-300 text-sm">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Poster and QR side-by-side */}
                        <div className="flex gap-4 items-stretch mt-6">
                            <a
                                href="/images/facilities/dronacharya-poster.jpg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group overflow-hidden rounded-2xl border border-white/10 w-1/2 aspect-[3/4] bg-navy-900 block"
                            >
                                <img
                                    src="/images/facilities/dronacharya-poster.webp"
                                    alt="NEET Dronacharya Test Series Details"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </a>
                            <div className="flex flex-col items-center justify-center p-4 bg-white/[0.03] rounded-2xl border border-white/10 w-1/2 text-center">
                                <div className="bg-white p-1.5 rounded-xl border border-white/10 shadow-inner">
                                    <img
                                        src="/images/facilities/dronacharya-qr-clean.webp"
                                        alt="Register QR Code"
                                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                                    />
                                </div>
                                <span className="text-[11px] text-amber-400 font-bold mt-3 tracking-wider uppercase">
                                    Register Now
                                </span>
                                <p className="text-[9px] text-gray-400 mt-1 leading-normal">
                                    Scan QR code to enroll
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
