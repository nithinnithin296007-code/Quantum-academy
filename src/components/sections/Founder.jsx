import TiltedCard from "../ui/TiltedCard";

export default function Founder({ name, title, bio, photo, instagram }) {
    return (
        <section id="founder" className="bg-white py-28 px-6 relative overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
                <div className="flex-shrink-0 w-full md:w-[420px]">
                    {photo ? (
                        <TiltedCard
                            imageSrc={photo}
                            altText={name}
                            captionText={name}
                            containerHeight="525px"
                            containerWidth="100%"
                            imageHeight="525px"
                            imageWidth="100%"
                            rotateAmplitude={10}
                            scaleOnHover={1.05}
                        />
                    ) : (
                        <div className="aspect-[4/5] w-full rounded-3xl overflow-hidden bg-navy-700 shadow-2xl flex items-center justify-center text-white/30 text-8xl font-display font-black">
                            {name?.[0] ?? "Q"}
                        </div>
                    )}
                </div>
                <div>
                    <span className="text-amber-500 font-semibold text-sm uppercase tracking-[0.25em]">
                        Meet the Founder
                    </span>
                    <h2 className="text-5xl md:text-6xl font-display font-black text-navy-700 mt-3">
                        {name}
                    </h2>
                    <p className="text-gray-500 text-lg mt-2">{title}</p>
                    <p className="text-gray-600 text-lg mt-6 leading-relaxed max-w-xl">{bio}</p>
                    {instagram && (
                        <a
                            href={instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block mt-6 text-base font-medium text-navy-700 hover:text-navy-900 transition-colors underline"
                        >
                            Follow on Instagram
                        </a>
                    )}
            </div>
        </div>
        </section >
    );
}