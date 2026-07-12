import FacultyCard from "../ui/FacultyCard";
import { FACULTY } from "../../constants/faculty";

export default function Faculty({
    title = "Meet the Faculty",
    subtitle = "Experienced educators dedicated to helping you crack JEE, NEET, and MHT-CET.",
    members = FACULTY,
}) {
    return (
        <section className="bg-[#07091a] border-t border-b border-white/5 py-24 px-6 relative overflow-hidden">
            {/* Background blur accents */}
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-400/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-navy-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <span className="text-amber-400 font-semibold text-xs uppercase tracking-[0.3em]">
                    Our Team
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-black text-white mt-4">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-gray-400 mt-4 text-sm max-w-xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                )}

                <div className="grid md:grid-cols-2 gap-6 mt-16">
                    {members.map((member) => (
                        <FacultyCard key={member.id} {...member} />
                    ))}
                </div>
            </div>
        </section>
    );
}