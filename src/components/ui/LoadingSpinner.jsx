export default function LoadingSpinner() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#07091a]">
            <div className="relative w-16 h-16 flex items-center justify-center">
                {/* Outer pulsing ring */}
                <div className="absolute inset-0 rounded-full border-4 border-amber-400/20 animate-ping duration-1000" />
                {/* Inner spinning segment */}
                <div className="w-12 h-12 rounded-full border-4 border-t-amber-400 border-r-transparent border-b-transparent border-l-transparent animate-spin duration-700" />
            </div>
        </div>
    );
}
