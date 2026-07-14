const FACILITIES = [
    {
        id: 1,
        title: "Digital Classroom",
        desc: "Smart-board led teaching with visual aids to make concepts easier to grasp and retain.",
        accent: "border-blue-400/30 bg-blue-400/5",
        titleColor: "text-blue-400",
    },
    {
        id: 2,
        title: "Dedicated Library",
        desc: "A quiet, well-stocked study space with reference books and past papers for self-study hours.",
        accent: "border-emerald-400/30 bg-emerald-400/5",
        titleColor: "text-emerald-400",
    },
    {
        id: 3,
        title: "Quantum Exam Prep App",
        desc: "Track your progress and analytics, access study material, and take tests on the go.",
        accent: "border-purple-400/30 bg-purple-400/5",
        titleColor: "text-purple-400",
    },
    {
        id: 4,
        title: "Study Material",
        desc: "Structured notes and practice sheets designed in-house, aligned to the current syllabus.",
        accent: "border-rose-400/30 bg-rose-400/5",
        titleColor: "text-rose-400",
    },
];

export default function FacilitiesSection() {
    return (
        <section id="facilities" className="bg-[#07091a] py-24 px-6">
            <div className="max-w-5xl mx-auto text-center">
                <span className="text-amber-500 font-semibold text-xs uppercase tracking-[0.2em]">
                    What We Offer
                </span>
                <h1 className="text-4xl md:text-5xl font-display font-black text-white mt-3">
                    Our Facilities
                </h1>

                <div className="grid sm:grid-cols-2 gap-6 mt-14 text-left">
                    {FACILITIES.map((item) => (
                        <div
                            key={item.id}
                            className={`border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${item.accent}`}
                        >
                            <h3 className={`font-display font-bold text-lg mb-3 ${item.titleColor}`}>
                                {item.title}
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}