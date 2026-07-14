import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ACADEMY } from "../../constants/academy";
import logo from "../../assets/logo.png";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const scrollToSection = (id) => {
        setMenuOpen(false);
        if (location.pathname !== "/") {
            window.location.href = `/#${id}`;
            return;
        }
        window.lenis?.scrollTo(`#${id}`, { duration: 1.5 });
    };

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
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
                <div className="hidden md:flex items-center gap-8">
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

                    <button
                        onClick={() => scrollToSection("why-us")}
                        className="nav-link text-sm font-medium text-gray-400 hover:text-white cursor-pointer transition-colors"
                    >
                        Why Us
                    </button>

                    <button
                        onClick={() => scrollToSection("courses")}
                        className="nav-link text-sm font-medium text-gray-400 hover:text-white cursor-pointer transition-colors"
                    >
                        Courses
                    </button>

                    <button
                        onClick={() => scrollToSection("faculty")}
                        className="nav-link text-sm font-medium text-gray-400 hover:text-white cursor-pointer transition-colors"
                    >
                        Faculty
                    </button>

                    <button
                        onClick={() => scrollToSection("toppers")}
                        className="nav-link text-sm font-medium text-gray-400 hover:text-white cursor-pointer transition-colors"
                    >
                        Our Toppers
                    </button>

                    <button
                        onClick={() => scrollToSection("enquiry")}
                        className="bg-amber-400 text-navy-900 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-amber-500 cursor-pointer transition"
                    >
                        Enquire Now
                    </button>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-1"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`block h-0.5 w-6 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>
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

                    <button
                        onClick={() => scrollToSection("why-us")}
                        className="text-sm font-medium text-gray-400 text-left cursor-pointer"
                    >
                        Why Us
                    </button>

                    <button
                        onClick={() => scrollToSection("courses")}
                        className="text-sm font-medium text-gray-400 text-left cursor-pointer"
                    >
                        Courses
                    </button>

                    <button
                        onClick={() => scrollToSection("faculty")}
                        className="text-sm font-medium text-gray-400 text-left cursor-pointer"
                    >
                        Faculty
                    </button>

                    <button
                        onClick={() => scrollToSection("toppers")}
                        className="text-sm font-medium text-gray-400 text-left cursor-pointer"
                    >
                        Our Toppers
                    </button>

                    <button
                        onClick={() => scrollToSection("enquiry")}
                        className="bg-amber-400 text-navy-900 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-amber-500 cursor-pointer transition text-left"
                    >
                        Enquire Now
                    </button>
                </div>
            )}
        </header>
    );
}
