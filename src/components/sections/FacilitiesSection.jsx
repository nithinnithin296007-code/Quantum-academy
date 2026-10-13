export default function FacilitiesSection() {
    return (
        <section id="facilities" className="bg-[#f4f7fc] py-24 px-6">
            <div className="max-w-5xl mx-auto text-center">
                <span className="text-amber-500 font-semibold text-xs uppercase tracking-[0.2em]">
                    What We Offer
                </span>
                <h1 className="text-4xl md:text-5xl font-display font-black text-navy-700 mt-3">
                    Our Facilities
                </h1>
                <p className="text-gray-500 mt-4 text-sm max-w-xl mx-auto leading-relaxed">
                    Everything you need to study smarter, perform better, and reach your goals — all under one roof.
                </p>

                <div className="grid sm:grid-cols-2 gap-5 mt-14 text-left">

                    {/* Digital Classroom */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-200 group">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                            <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="3" width="20" height="14" rx="2" />
                                <path d="M8 21h8M12 17v4" />
                            </svg>
                        </div>
                        <h3 className="font-display font-bold text-base text-blue-600 mb-2">Digital Classroom</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Smart-board led teaching with visual aids to make concepts easier to grasp and retain.
                        </p>
                    </div>

                    {/* Dedicated Library */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-emerald-200 group">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                            <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                            </svg>
                        </div>
                        <h3 className="font-display font-bold text-base text-emerald-600 mb-2">Dedicated Library</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            A quiet, well-stocked study space with reference books and past papers for self-study hours.
                        </p>
                    </div>

                    {/* Quantum Exam Prep App */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-purple-200 group">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
                            <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="5" y="2" width="14" height="20" rx="2" />
                                <path d="M9 7h6M9 11h6M9 15h4" />
                            </svg>
                        </div>
                        <h3 className="font-display font-bold text-base text-purple-600 mb-2">Quantum Exam Prep App</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Track your progress and analytics, access study material, and take tests on the go.
                        </p>
                    </div>

                    {/* Study Material */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-200 group">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                            <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                            </svg>
                        </div>
                        <h3 className="font-display font-bold text-base text-amber-600 mb-2">Study Material</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Structured notes and practice sheets designed in-house, aligned to the current syllabus.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}