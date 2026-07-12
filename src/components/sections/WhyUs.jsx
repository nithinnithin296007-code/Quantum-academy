import { WHY_US } from "../../constants/whyus";
import ScrollReveal from "../ui/ScrollReveal";

export default function WhyUs() {
    return (
        <section id="why-us" className="bg-[#f4f7fc] py-24 px-6 relative overflow-hidden">
            <div className="max-w-5xl mx-auto relative z-10">
                <ScrollReveal>
                    <div className="max-w-xl mb-14">
                        <span className="text-amber-500 font-semibold text-xs uppercase tracking-[0.2em]">
                            Why Quantum Academy
                        </span>
                        <h2 className="text-4xl font-display font-black text-navy-700 mt-3 leading-tight">
                            Built Different.<br />On Purpose.
                        </h2>
                        <p className="text-gray-500 mt-4 text-base leading-relaxed">
                            We're not a general tuition center. Every decision here — batch size,
                            material, test frequency — is made for one goal: your exam.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {WHY_US.map((item, i) => (
                        <ScrollReveal key={item.id} delay={i * 0.1}>
                            <div
                                className="group relative p-8 rounded-2xl border border-gray-100 hover:border-navy-700/20 hover:shadow-xl transition-all duration-300 bg-white"
                            >
                                <div className="absolute top-6 right-6 text-5xl font-display font-black text-gray-50 group-hover:text-navy-50 transition-colors select-none">
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <h3 className="font-display font-bold text-navy-700 text-xl mb-3 relative z-10">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed relative z-10">
                                    {item.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}