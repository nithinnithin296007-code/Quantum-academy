import { useRef, useEffect, useState } from "react";

const TOPPERS = [
    { img: "academy-1.jpg", name: "Rakshita Dalvi", score: "1st Place", exam: "HSC Board", college: "Abhinav College" },
    { img: "academy-10.jpg", name: "Anmol Saini", score: "99.27%ile", exam: "MHT-CET", college: "SPIT Mumbai" },
    { img: "academy-2.jpg", name: "Hrishikesh Jha", score: "98.16%ile", exam: "NEET", college: "GMC Bhuldana" },
    { img: "academy-3.jpg", name: "Rishi Makwana", score: "96.57%ile", exam: "JEE Mains 2026", college: "NIT Jaipur" },
    { img: "academy-4.jpg", name: "Prabhat Sahu", score: "97%ile", exam: "JEE Mains", college: "NIT Trichy" },
    { img: "academy-5.jpg", name: "Raj Yadav", score: "97%ile", exam: "MHT-CET & JEE", college: "SN College" },
    { img: "academy-6.jpg", name: "Abhishek Maurya", score: "548/720", exam: "NEET", college: "Sau Vandana Medical" },
    { img: "academy-7.jpg", name: "Om Jaiswal", score: "98.26%ile", exam: "JEE Mains 2026", college: "" },
    { img: "academy-8.jpg", name: "Krish Mondal", score: "99.08%ile", exam: "MHT-CET", college: "VIT Pune" },
    { img: "academy-9.jpg", name: "Babita Maurya", score: "97.27%ile", exam: "MHT-CET", college: "Ramkrishna Paramedical" },
];

function TopperCard({ topper, index }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const isEven = index % 2 === 0;

    return (
        <div
            ref={ref}
            className={`relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
            <div className="absolute text-[80px] sm:text-[160px] font-display font-black text-white/5 select-none leading-none pointer-events-none z-0 -left-2 top-0">
                {String(index + 1).padStart(2, "0")}
            </div>

            {/* Mobile: stacked, Desktop: side by side */}
            <div className={`relative z-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 ${isEven ? "sm:flex-row" : "sm:flex-row-reverse"}`}>

                {/* Image */}
                <div className="relative flex-shrink-0 w-full h-64 sm:w-52 sm:h-72 rounded-2xl overflow-hidden shadow-2xl group">
                    <img
                        src={`/images/${topper.img}`}
                        alt={topper.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-3 items-start sm:items-start">
                    <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em]">
                        {topper.exam}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-display font-black text-white leading-tight">
                        {topper.name}
                    </h3>
                    <span className="text-5xl sm:text-6xl font-display font-black text-amber-400 leading-none">
                        {topper.score}
                    </span>
                    {topper.college && (
                        <span className="text-gray-400 text-sm mt-1 flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
                            </svg>
                            {topper.college}
                        </span>
                    )}
                    <div className="h-px w-24 bg-amber-400/40 mt-2" />
                </div>
            </div>
        </div>
    );
}

export default function SocialProof() {
    return (
        <section className="relative bg-[#07091a] py-24 px-6 overflow-hidden">
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-400/8 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="flex flex-col gap-16">
                    {TOPPERS.map((topper, i) => (
                        <TopperCard key={topper.img} topper={topper} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}