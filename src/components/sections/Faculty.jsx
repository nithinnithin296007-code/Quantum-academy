import FacultyCard from "../ui/FacultyCard";
import { FACULTY } from "../../constants/faculty";

export default function Faculty({
    title = "Meet the Faculty",
    subtitle = "Experienced educators dedicated to helping you crack JEE, NEET, and MHT-CET.",
    members = FACULTY,
}) {
    return (
        <section id="faculty" className="bg-[#07091a] py-24 px-6 relative overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <span className="text-amber-500 font-semibold text-xs uppercase tracking-[0.3em]">
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

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-16 place-items-center">
                    {members.map((member) => (
                        <FacultyCard key={member.id} {...member} />
                    ))}
                </div>
            </div>
        </section>
    );
}