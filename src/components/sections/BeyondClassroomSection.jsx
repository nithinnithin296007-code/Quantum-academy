import { useState } from "react";

const REELS = [
    {
        id: 1,
        title: "Picnic Day Outings",
        desc: "A day out for students to unwind, play, and build strong bonds together outside academic hours.",
        src: "/videos/picnic.mp4",
    },
    {
        id: 2,
        title: "Turf & Sports Activities",
        desc: "Regular sports matches and team games to promote health, focus, and teamwork.",
        src: "/videos/turf.mp4",
    },
    {
        id: 3,
        title: "15th August Celebration",
        desc: "Patriotic celebrations with speeches, cultural performances, and historic commemorations.",
        src: "/videos/independence-day.mp4",
    },
];

export default function BeyondClassroomSection() {
    const [activeReelIndex, setActiveReelIndex] = useState(0);
    const activeReel = REELS[activeReelIndex];

    return (
        <section id="beyond-classroom" className="bg-white py-24 px-6 relative overflow-hidden">
            <div className="max-w-5xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16">

                    {/* Text side */}
                    <div className="flex-grow">
                        <span className="text-amber-500 font-semibold text-xs uppercase tracking-[0.2em]">
                            Life at Quantum
                        </span>
                        <h2 className="text-4xl font-display font-black text-navy-700 mt-3 leading-tight">
                            Beyond the<br />Classroom
                        </h2>
                        <p className="text-gray-500 mt-4 text-base leading-relaxed">
                            Academics matter most, but we make time for the rest too. Watch what our students do outside of classes at Quantum Academy.
                        </p>
                        <div className="flex flex-col gap-4 mt-8">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                                Click an event below to watch the reel:
                            </span>
                            {REELS.map((reel, index) => {
                                const isActive = index === activeReelIndex;
                                return (
                                    <button
                                        key={reel.id}
                                        onClick={() => setActiveReelIndex(index)}
                                        className={`flex items-start text-left gap-4 p-4 rounded-2xl transition-all cursor-pointer group ${
                                            isActive
                                                ? "bg-slate-50 border border-slate-100 shadow-sm"
                                                : "border border-transparent hover:bg-slate-50/50"
                                        }`}
                                    >
                                        <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
                                            isActive
                                                ? "bg-amber-400 scale-110 shadow-lg shadow-amber-400/20"
                                                : "border border-gray-300 bg-transparent group-hover:border-amber-400 group-hover:bg-amber-400/5"
                                        }`}>
                                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="ml-0.5">
                                                <path
                                                    d="M2 1.5L6.5 4L2 6.5V1.5Z"
                                                    fill={isActive ? "#1A2B5F" : "#9CA3AF"}
                                                    className="transition-colors duration-300 group-hover:fill-amber-500"
                                                />
                                            </svg>
                                        </span>
                                        <div className="flex-grow">
                                            <span className={`text-base font-semibold transition-colors block ${
                                                isActive ? "text-navy-700" : "text-gray-500 group-hover:text-gray-700"
                                            }`}>
                                                {reel.title}
                                            </span>
                                            {isActive && (
                                                <p className="text-gray-500 text-sm mt-1 leading-relaxed transition-all">
                                                    {reel.desc}
                                                </p>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Video side */}
                    <div className="flex-shrink-0 w-full md:w-72">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-navy-900 aspect-[9/16]">
                            <video
                                key={activeReel.src}
                                src={activeReel.src}
                                className="w-full h-full object-cover"
                                controls
                                controlsList="nodownload nofullscreen"
                                playsInline
                                autoPlay
                                muted
                                loop
                            />
                            {/* Reel indicator overlay */}
                            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 pointer-events-none">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400 animate-pulse">
                                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                                </svg>
                                <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                                    Reel
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}