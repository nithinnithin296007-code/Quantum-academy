import { Link } from "react-router-dom";
import { ACADEMY } from "../../constants/academy";
import logo from "../../assets/logo.png";
import { handlePhoneClick } from "../../utils/contact";

export default function Footer() {
  return (
    <footer className="bg-[#07091a] text-gray-400 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 pb-10 border-b border-white/10">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center p-1.5">
                <img src={logo} alt={`${ACADEMY.name} logo`} className="h-full w-full object-contain" />
              </div>
              <p className="font-display font-black text-white text-xl">{ACADEMY.name}</p>
            </div>
            <p className="text-xs mt-1 text-amber-400">A Trust-driven Science Institute</p>
            <p className="text-sm mt-4 leading-relaxed">{ACADEMY.address}</p>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <span className="text-white font-semibold uppercase tracking-wider text-xs mb-1">Contact Details</span>
            <a
              href={`tel:${ACADEMY.phone}`}
              onClick={(e) => handlePhoneClick(e, ACADEMY.phone)}
              className="hover:text-amber-400 transition"
            >
              📞 {ACADEMY.phone}
            </a>
            <a
              href={`tel:${ACADEMY.phoneAlt}`}
              onClick={(e) => handlePhoneClick(e, ACADEMY.phoneAlt)}
              className="hover:text-amber-400 transition"
            >
              📞 {ACADEMY.phoneAlt}
            </a>
            <a href={`mailto:${ACADEMY.email}`} className="hover:text-amber-400 transition">
              ✉️ {ACADEMY.email}
            </a>
            <a href={`https://wa.me/${ACADEMY.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-amber-400 transition">
              💬 WhatsApp Us
            </a>
            <a href={ACADEMY.instagram} target="_blank" rel="noreferrer" className="hover:text-amber-400 transition">
              📸 Instagram
            </a>
          </div>
          {ACADEMY.mapEmbedUrl && (
            <div className="w-full md:w-[300px] h-[150px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex-shrink-0">
              <iframe
                title="Quantum Academy Location Map"
                src={ACADEMY.mapEmbedUrl}
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 mt-8 gap-4">
          <p>© {new Date().getFullYear()} {ACADEMY.name}. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/about-us" className="hover:text-amber-400 transition duration-200">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-amber-400 transition duration-200">
              Contact Us
            </Link>
            <Link to="/privacy-policy" className="hover:text-amber-400 transition duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-amber-400 transition duration-200">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div >
    </footer >
  );
}