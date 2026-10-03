import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ACADEMY } from "../../constants/academy";
import logo from "../../assets/logo.png";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        
        // Ensure light class is removed from document root
        if (typeof window !== "undefined") {
            document.documentElement.classList.remove("light");
            localStorage.removeItem("theme");
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
            ? "bg-[#07091a]/90 backdrop-blur-md border-b border-white/5 py-3"
            : "bg-transparent py-5"
            }`}>
            <nav className="max-w-6xl mx-auto flex items-center justify-between px-4">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white/95 flex items-center justify-center p-2 shadow-lg shadow-black/20">
                        <img src={logo} alt={`${ACADEMY.name} logo`} className="h-full w-full object-contain" />
                    </div>
                    <span className="font-display font-bold text-xl text-white tracking-tight">
                        {ACADEMY.name}
                    </span>
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8">
                    <Link
                        to="/"
                        className={`text-sm font-medium transition-colors ${location.pathname === "/"
                            ? "text-amber-400 border-b-2 border-amber-400 pb-0.5"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Home
                    </Link>

                    <Link
                        to="/about-us"
                        className={`text-sm font-medium transition-colors ${location.pathname === "/about-us"
                            ? "text-amber-400 border-b-2 border-amber-400 pb-0.5"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        About Us
                    </Link>

                    <Link
                        to="/facilities"
                        className={`text-sm font-medium transition-colors ${location.pathname === "/facilities"
                            ? "text-amber-400 border-b-2 border-amber-400 pb-0.5"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Facilities
                    </Link>

                    <Link
                        to="/beyond-classroom"
                        className={`text-sm font-medium transition-colors ${location.pathname === "/beyond-classroom"
                            ? "text-amber-400 border-b-2 border-amber-400 pb-0.5"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Beyond Classroom
                    </Link>

                    <Link
                        to="/contact"
                        className="bg-[#25D366] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#20bd5a] cursor-pointer transition shadow-md shadow-emerald-500/20"
                    >
                        Enquire Now
                    </Link>
                </div>

                {/* Mobile controls */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        className="flex flex-col gap-1.5 p-1 cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        <span className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                        <span className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
                        <span className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-[#07091a] border-t border-white/10 px-4 py-4 flex flex-col gap-4">
                    <Link
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className={`text-sm font-medium ${location.pathname === "/" ? "text-amber-400" : "text-gray-400"
                            }`}
                    >
                        Home
                    </Link>

                    <Link
                        to="/about-us"
                        onClick={() => setMenuOpen(false)}
                        className={`text-sm font-medium ${location.pathname === "/about-us" ? "text-amber-400" : "text-gray-400"
                            }`}
                    >
                        About Us
                    </Link>

                    <Link
                        to="/facilities"
                        onClick={() => setMenuOpen(false)}
                        className={`text-sm font-medium ${location.pathname === "/facilities" ? "text-amber-400" : "text-gray-400"
                            }`}
                    >
                        Facilities
                    </Link>

                    <Link
                        to="/beyond-classroom"
                        onClick={() => setMenuOpen(false)}
                        className={`text-sm font-medium ${location.pathname === "/beyond-classroom" ? "text-amber-400" : "text-gray-400"
                            }`}
                    >
                        Beyond Classroom
                    </Link>

                    <Link
                        to="/contact"
                        onClick={() => setMenuOpen(false)}
                        className="bg-[#25D366] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#20bd5a] cursor-pointer transition text-center shadow-md shadow-emerald-500/20"
                    >
                        Enquire Now
                    </Link>
                </div>
            )}
        </header>
    );
}
