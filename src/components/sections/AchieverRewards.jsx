import { ACHIEVERS } from "../../constants/achievers";

export default function AchieverRewards() {
    return (
        <section className="bg-[#07091a] py-24 px-6">
            <div className="max-w-5xl mx-auto text-center">
                <span className="text-amber-500 font-semibold text-xs uppercase tracking-[0.2em]">
                    Your Effort, Rewarded
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-black text-white mt-3">
                    Your Efforts Will Be Awarded
                </h2>
                <p className="text-gray-400 mt-4 text-sm max-w-xl mx-auto">
                    All students enrolled in Quantum Academy who secure top ranks in JEE Mains &
                    Advanced, NEET, MHT-CET, and Boards will be awarded.
                </p>

                <div className="grid sm:grid-cols-2 gap-6 mt-14 text-left">
                    {ACHIEVERS.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white/5 border border-white/10 rounded-2xl p-8"
                        >
                            <h3 className="text-amber-400 font-display font-bold text-lg mb-4">
                                {item.exam}
                            </h3>
                            <ul className="space-y-2">
                                {item.rewards.map((r, i) => (
                                    <li key={i} className="text-gray-300 text-sm leading-relaxed flex gap-2">
                                        <span className="text-amber-400">•</span>
                                        <span>{r}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <p className="text-gray-500 text-xs mt-10">*Terms & conditions apply</p>
            </div>
        </section>
    );
}