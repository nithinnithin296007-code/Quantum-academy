export default function FacultyCard({ name, title, credentials, photo, description }) {
    const initials = name.replace(/^(Prof\.|Dr\.)\s*/, "")[0];

    return (
        <div className="w-full h-[380px] sm:h-[420px] rounded-3xl overflow-hidden relative group hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 hover:-translate-y-2 bg-[#0d1730]">
            {photo ? (
                <img
                    src={photo}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-navy-900 text-6xl font-display font-black">
                    {initials}
                </div>
            )}
            
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-left">
                <h3 className="text-white font-display font-bold text-2xl md:text-3xl leading-tight drop-shadow-md">
                    {name}
                </h3>
                {title && (
                    <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mt-1.5 drop-shadow-md">
                        {title}
                    </p>
                )}
                
                {description && (
                    <p className="text-gray-300 text-sm mt-3 line-clamp-2">
                        {description}
                    </p>
                )}
                
                {credentials && (
                    <div className="mt-4 inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full">
                        <svg className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        <p className="text-white text-xs font-semibold">
                            {credentials}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}