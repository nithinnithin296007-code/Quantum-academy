import FlipCard from './FlipCard';

export default function FacultyCard({ name, title, credentials, photo, description }) {
    const initials = name.replace(/^(Prof\.|Dr\.)\s*/, "")[0];

    const Front = (
        <div className="w-full h-full relative group">
            {photo ? (
                <img
                    src={photo}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-navy-900 text-6xl font-display font-black">
                    {initials}
                </div>
            )}
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent opacity-90" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                <h3 className="text-white font-display font-bold text-2xl md:text-3xl leading-tight drop-shadow-md">
                    {name}
                </h3>
                {title && (
                    <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mt-1.5 drop-shadow-md">
                        {title}
                    </p>
                )}
                
                {credentials && (
                    <div className="mt-3 inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full">
                        <svg className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        <p className="text-white text-xs font-semibold">
                            {credentials}
                        </p>
                    </div>
                )}
            </div>
            
            {/* Interactive hint */}
            <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md rounded-full p-2.5 animate-pulse border border-white/20">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
            </div>
        </div>
    );

    const Back = (
        <div className="w-full h-full bg-white p-8 flex flex-col justify-center items-center text-center">
            <h3 className="font-display font-bold text-2xl text-navy-700">
                {name}
            </h3>
            <div className="w-12 h-1 bg-amber-400 rounded-full mt-3 mb-6" />
            
            {description && (
                <p className="text-gray-600 font-medium text-sm leading-relaxed max-w-sm">
                    {description}
                </p>
            )}
            
            {credentials && (
                <div className="mt-auto pt-6 w-full border-t border-gray-100 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <p className="text-gray-500 text-sm font-semibold">
                        {credentials}
                    </p>
                </div>
            )}
        </div>
    );

    return (
        <div className="w-full h-[380px] sm:h-[420px]">
            <FlipCard
                front={Front}
                back={Back}
                width="100%"
                height="100%"
                background="#ffffff"
                radius={24}
                glare={true}
                glareOpacity={0.15}
            />
        </div>
    );
}