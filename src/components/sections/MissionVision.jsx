export default function MissionVision() {
    return (
        <section className="bg-white py-24 px-6">
            <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
                <div className="bg-navy-700 rounded-2xl p-10 text-white">
                    <h3 className="font-display font-black text-2xl mb-4">Our Mission</h3>
                    <p className="text-gray-300 leading-relaxed">
                        Every student is different. We aim to treat them individually with our
                        expertise, to mould and strengthen everyone, and lead them to achieve
                        their desired goals.
                    </p>
                </div>
                <div className="bg-emerald-600 rounded-2xl p-10 text-white">
                    <h3 className="font-display font-black text-2xl mb-4">Our Vision</h3>
                    <p className="text-white/90 leading-relaxed">
                        Innovation in techniques for imparting education is our foundation — we're
                        here to make a real difference.
                    </p>
                </div>
            </div>
        </section>
    );
}