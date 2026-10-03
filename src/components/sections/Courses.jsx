import { COURSES } from "../../constants/courses";

export default function Courses() {
    const scrollToForm = () => {
        window.lenis?.scrollTo("#enquiry", { duration: 1.5 });
    };

    const colors = [
        { bg: "bg-navy-700", text: "text-white", badge: "bg-white/10 text-white/80", btn: "bg-amber-400 text-navy-900 hover:bg-amber-500" },
        { bg: "bg-[#f4f7fc] border-2 border-navy-700/20 shadow-xl shadow-navy-700/5 relative lg:-translate-y-2 transition-all duration-300", text: "text-navy-900", badge: "bg-navy-700/10 text-navy-700 border border-navy-700/15", btn: "bg-navy-700 text-white hover:bg-navy-900" },
        { bg: "bg-navy-700", text: "text-white", badge: "bg-white/10 text-white/80", btn: "bg-amber-400 text-navy-900 hover:bg-amber-500" },
        { bg: "bg-[#f4f7fc] border-2 border-navy-700/20 shadow-xl shadow-navy-700/5 relative lg:-translate-y-2 transition-all duration-300", text: "text-navy-900", badge: "bg-navy-700/10 text-navy-700 border border-navy-700/15", btn: "bg-navy-700 text-white hover:bg-navy-900" },
    ];

    return (
        <section id="courses" className="bg-white py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span className="text-amber-500 font-semibold text-xs uppercase tracking-[0.2em]">
                        Courses Offered
                    </span>
                    <h2 className="text-4xl font-display font-black text-navy-700 mt-3">
                        Choose Your Track
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {COURSES.map((course, i) => {
                        const c = colors[i % colors.length];
                        return (
                            <div key={course.id} className={`${c.bg} rounded-2xl p-6 lg:p-8 flex flex-col justify-between`}>
                                <div>
                                    <span className={`text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full w-fit inline-block ${c.badge}`}>
                                        {course.target}
                                    </span>
                                    <h3 className={`font-display font-black text-2xl mt-4 ${c.text}`}>
                                        {course.name}
                                    </h3>
                                    <p className={`text-sm mt-3 leading-relaxed opacity-85 ${c.text}`}>
                                        {course.description}
                                    </p>
                                </div>

                                <div>
                                    <div className="flex flex-wrap gap-2 mt-5">
                                        {course.subjects.map((s) => (
                                            <span key={s} className={`text-xs px-2 py-1 rounded ${c.badge}`}>
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        onClick={scrollToForm}
                                        className={`mt-6 w-full py-3.5 rounded-xl font-bold text-sm transition cursor-pointer ${c.btn}`}
                                    >
                                        Enquire →
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}