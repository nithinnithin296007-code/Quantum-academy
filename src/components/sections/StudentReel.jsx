export default function StudentReel() {
    return (
        <section id="reviews" className="bg-[#f4f7fc] py-24 px-6 relative overflow-hidden">
            <div className="max-w-5xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16">

                    {/* Text side */}
                    <div className="flex-grow">
                        <span className="text-amber-500 font-semibold text-xs uppercase tracking-[0.2em]">
                            Hear It From Them
                        </span>
                        <h2 className="text-4xl font-display font-black text-navy-700 mt-3 leading-tight">
                            Our Students<br />Speak for Us.
                        </h2>
                        <p className="text-gray-500 mt-4 text-base leading-relaxed">
                            Don't take our word for it. Watch what our students have to say
                            about studying at Quantum Academy — in their own words.
                        </p>
                        <div className="flex flex-col gap-3 mt-8">
                            {[
                                "Personal attention in every class",
                                "Exam-focused study material",
                                "Faculty who actually care",
                            ].map((point) => (
                                <div key={point} className="flex items-center gap-3">
                                    <span className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
                                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                            <path d="M1 4L3.5 6.5L9 1" stroke="#1A2B5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className="text-gray-700 text-sm font-medium">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Video side */}
                    <div className="flex-shrink-0 w-full md:w-72">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-navy-900 aspect-[9/16]">
                            <video
                                src="/reel.mp4"
                                className="w-full h-full object-cover"
                                controls
                                controlsList="nodownload nofullscreen"
                                playsInline
                                autoPlay
                                muted
                                loop
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
