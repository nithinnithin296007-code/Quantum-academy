export default function FacultyCard({ name, title, credentials, photo }) {
    const initials = name.replace(/^(Prof\.|Dr\.)\s*/, "")[0];

    return (
        <div className="group relative bg-white border border-gray-100 hover:border-amber-400/30 rounded-2xl p-6 md:p-8 text-left shadow-lg hover:-translate-y-1.5 hover:shadow-[0_15px_30px_-10px_rgba(26,43,95,0.08)] transition-all duration-300 ease-out flex gap-5 md:gap-6 items-start">
            <div className="flex-shrink-0">
                {photo ? (
                    <img
                        src={photo}
                        alt={name}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl object-cover border-2 border-gray-100 group-hover:border-amber-400/40 transition-colors duration-300 shadow-md"
                    />
                ) : (
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-navy-900 text-xl md:text-2xl font-display font-black shadow-md shadow-amber-500/10 group-hover:scale-105 transition-transform duration-300">
                        {initials}
                    </div>
                )}
            </div>

            <div className="flex-grow">
                {/* Visual accent: dot indicator */}
                <div className="w-2 h-2 rounded-full bg-gray-100 group-hover:bg-amber-400 transition-colors duration-300 absolute top-6 right-6" />

                <h3 className="text-navy-700 font-display font-bold text-lg md:text-xl group-hover:text-amber-500 transition-colors duration-300 leading-tight">
                    {name}
                </h3>
                {title && (
                    <p className="text-amber-500 text-[10px] md:text-xs font-semibold uppercase tracking-wider mt-1">
                        {title}
                    </p>
                )}
                {credentials && (
                    <p className="text-gray-500 text-xs md:text-sm mt-3 pt-3 border-t border-gray-100 leading-relaxed">
                        {credentials}
                    </p>
                )}
            </div>
        </div>
    );
}