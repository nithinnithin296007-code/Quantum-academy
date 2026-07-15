import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ACADEMY } from "../../constants/academy";
import logo from "../../assets/logo.png";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [isLight, setIsLight] = useState(() => {
        if (typeof window !== "undefined") {
            return document.documentElement.classList.contains("light");
        }
        return false;
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        
        // Sync initial theme
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light") {
            document.documentElement.classList.add("light");
            setIsLight(true);
        } else {
            document.documentElement.classList.remove("light");
            setIsLight(false);
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = () => {
        const root = document.documentElement;
        if (root.classList.contains("light")) {
            root.classList.remove("light");
            localStorage.setItem("theme", "dark");
            setIsLight(false);
        } else {
            root.classList.add("light");
            localStorage.setItem("theme", "light");
            setIsLight(true);
        }
    };

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

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="text-gray-400 hover:text-amber-400 p-2 rounded-lg transition-colors cursor-pointer"
                    >
                        {isLight ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                            </svg>
                        )}
                    </button>

                    <Link
                        to="/contact"
                        className="bg-amber-400 text-navy-900 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-amber-500 cursor-pointer transition"
                    >
                        Enquire Now
                    </Link>
                </div>

                {/* Mobile controls */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="text-gray-400 hover:text-amber-400 p-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                        {isLight ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                            </svg>
                        )}
                    </button>
                    <button
                        className="flex flex-col gap-1.5 p-1"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} stroke="currentColor" />
                        <span className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} stroke="currentColor" />
                        <span className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} stroke="currentColor" />
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
                        className="bg-amber-400 text-navy-900 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-amber-500 cursor-pointer transition text-center"
                    >
                        Enquire Now
                    </Link>
                </div>
            )}
        </header>
    );
}
