import { ACADEMY } from "../../constants/academy";
import CircularGallery from "../ui/CircularGallery";
import useIsMobile from "../../hooks/useIsMobile";

const TOPPER_ITEMS = [
    { image: "/images/topper-2026-3.jpg", text: "Aditya Gupta · 99.24%ile" },
    { image: "/images/topper-2026-2.jpg", text: "Dhiraj Parmar · 97.63%ile" },
    { image: "/images/topper-2026-6.jpg", text: "Yash Singh · 96.17%ile" },
    { image: "/images/topper-2026-4.jpg", text: "Shriya Gawde · 95.78%ile" },
    { image: "/images/topper-2026-8.jpg", text: "Sakshi Gupta · 95.43%ile" },
    { image: "/images/topper-2026-7.jpg", text: "Riya Rajak · 95.43%ile" },
    { image: "/images/topper-2026-5.jpg", text: "Adarsh Singh · 93.50%ile" },
    { image: "/images/academy-3.jpg", text: "Rishi Makwana · 96.57%ile" },
    { image: "/images/academy-4.jpg", text: "Prabhat Sahu · 97%ile" },
    { image: "/images/academy-5.jpg", text: "Raj Yadav · 97%ile" },
    { image: "/images/academy-6.jpg", text: "Abhishek Maurya · 548/720" },
    { image: "/images/academy-7.jpg", text: "Om Jaiswal · 98.26%ile" },
    { image: "/images/academy-8.jpg", text: "Krish Mondal · 99.08%ile" },
    { image: "/images/academy-10.jpg", text: "Anmol Saini · 99.27%ile" },
    { image: "/images/academy-2.jpg", text: "Hrishikesh Jha · 98.16%ile" },
    { image: "/images/academy-1.jpg", text: "Rakshita Dalvi · 1st Place" },
];

export default function WallOfFame() {
    const isMobile = useIsMobile();

    return (
        <section id="toppers" className="bg-[#f4f7fc]">

            {/* Header */}
            <div className="text-center pt-24 pb-6 px-4">
                <span className="text-amber-500 font-semibold text-xs uppercase tracking-[0.3em]">
                    Wall of Fame
                </span>
                <h2 className="text-4xl md:text-6xl font-display font-black text-navy-700 mt-4">
                    Our Toppers
                </h2>
                
                {/* MHT-CET 2026 Note */}
                <div className="inline-block mt-4 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm shadow-[0_0_15px_rgba(245,158,11,0.05)]">
                    <p className="text-amber-600 font-medium text-sm flex items-center gap-2">
                        <span>🏆</span> Outstanding Results
                    </p>
                </div>

                <p className="text-gray-500 mt-4 text-sm">
                    Rated{" "}
                    <span className="text-amber-500 font-bold">{ACADEMY.googleRating}★</span>
                    {" · "}
                    {ACADEMY.googleReviews} reviews on Google
                </p>
                <div className="flex items-center justify-center gap-4 mt-6">
                    <div className="h-px w-16 bg-amber-400/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <div className="h-px w-16 bg-amber-400/60" />
                </div>
                <p className="text-gray-400 text-xs mt-6 animate-pulse">
                    {isMobile ? "Swipe to explore" : "Drag or scroll to explore"}
                </p>
            </div>

            {/* Gallery Section */}
            {isMobile ? (
                /* Mobile View: Native Horizontal Scroll Carousel */
                <div className="w-full px-4 pb-12 overflow-hidden">
                    <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none py-4 px-2">
                        {TOPPER_ITEMS.map((item, index) => {
                            const [name, score] = item.text.split(" · ");
                            return (
                                <div
                                    key={index}
                                    className="w-[320px] flex-shrink-0 snap-center bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xl"
                                >
                                    <div className="aspect-[4/5] w-full relative overflow-hidden bg-slate-50 flex items-center justify-center p-2">
                                        <img
                                            src={item.image}
                                            alt={item.text}
                                            className="w-full h-full object-contain drop-shadow-md rounded-xl"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-4 text-center bg-white border-t border-gray-100">
                                        <p className="text-navy-700 font-display font-bold text-sm tracking-wide">
                                            {name}
                                        </p>
                                        <p className="text-amber-600 text-xs mt-1 font-bold">
                                            {score}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                /* Desktop View: WebGL Circular Gallery */
                <div className="w-full h-[620px]">
                    <CircularGallery
                        items={TOPPER_ITEMS}
                        bend={3}
                        textColor="#F5A623"
                        borderRadius={0.05}
                        font="bold 22px Poppins"
                        fontUrl="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap"
                        scrollSpeed={2}
                        scrollEase={0.05}
                        planeWidth={760}
                        planeHeight={920}
                        showTitle={true}
                    />
                </div>
            )}

        </section>
    );
}