import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import EnquiryForm from "../components/sections/EnquiryForm";
import SEO from "../components/ui/SEO";
import { ACADEMY } from "../constants/academy";
import { handlePhoneClick } from "../utils/contact";

const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Quantum Academy",
    "description": "Reach out to Quantum Academy Bhayandar for admissions, course details, or support queries.",
    "mainEntity": {
        "@type": "LocalBusiness",
        "name": "Quantum Academy",
        "telephone": "+917400478707",
        "email": "support@quantumedu.co.in",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Shop No. 14-17, 1st Floor, Rashmi Laxmi Sadan, Opp. Divine Image School, Navghar Road, Bhayandar East",
            "addressLocality": "Thane",
            "addressRegion": "Maharashtra",
            "postalCode": "401105",
            "addressCountry": "IN"
        }
    }
};

export default function ContactUs() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-[#f4f7fc] min-h-screen">
            <SEO schema={contactSchema} />
            <Navbar />

            {/* Header Section */}
            <section className="bg-[#07091a] text-center pt-32 pb-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#111634] to-[#07091a] opacity-50" />
                <div className="relative z-10 max-w-3xl mx-auto">
                    <span className="text-amber-500 font-semibold text-xs uppercase tracking-[0.25em]">
                        Get in Touch
                    </span>
                    <h1 className="text-4xl md:text-6xl font-display font-black text-white mt-4 leading-tight">
                        Contact Us
                    </h1>
                    <p className="text-gray-400 mt-6 text-base md:text-lg leading-relaxed">
                        Have questions about admissions, syllabus, or batch timings? Reach out to us, or visit our campus. We are here to help you.
                    </p>
                </div>
            </section>

            {/* Contact Details Grid */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Call Card */}
                        <div className="p-8 rounded-2xl border border-gray-100 bg-[#f4f7fc]/50 flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xl mb-6">
                                📞
                            </div>
                            <h3 className="font-display font-bold text-navy-700 text-lg mb-3">Call Helpline</h3>
                            <p className="text-gray-500 text-sm mb-4">Feel free to speak to our support team directly.</p>
                            <div className="space-y-1.5 font-semibold text-navy-700 text-sm">
                                <a
                                    href={`tel:${ACADEMY.phone}`}
                                    onClick={(e) => handlePhoneClick(e, ACADEMY.phone)}
                                    className="block hover:text-amber-600 transition"
                                >
                                    {ACADEMY.phone}
                                </a>
                                <a
                                    href={`tel:${ACADEMY.phoneAlt}`}
                                    onClick={(e) => handlePhoneClick(e, ACADEMY.phoneAlt)}
                                    className="block hover:text-amber-600 transition"
                                >
                                    {ACADEMY.phoneAlt}
                                </a>
                            </div>
                        </div>

                        {/* Timing Card */}
                        <div className="p-8 rounded-2xl border border-gray-100 bg-[#f4f7fc]/50 flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl mb-6">
                                ⏰
                            </div>
                            <h3 className="font-display font-bold text-navy-700 text-lg mb-3">Office Timings</h3>
                            <p className="text-gray-500 text-sm mb-4">Visit our office or call us during these hours.</p>
                            <div className="text-navy-700 text-sm font-semibold space-y-1">
                                <p>Mon - Sat: 8:00 AM - 9:00 PM</p>
                                <p>Sunday: 8:00 AM - 1:00 PM</p>
                            </div>
                        </div>

                        {/* Email Card */}
                        <div className="p-8 rounded-2xl border border-gray-100 bg-[#f4f7fc]/50 flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 text-xl mb-6">
                                ✉️
                            </div>
                            <h3 className="font-display font-bold text-navy-700 text-lg mb-3">Email Support</h3>
                            <p className="text-gray-500 text-sm mb-4">Drop us an email for general or corporate enquiries.</p>
                            <a
                                href={`mailto:${ACADEMY.email}`}
                                className="text-navy-700 font-semibold text-sm hover:text-amber-600 transition"
                            >
                                {ACADEMY.email}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map & Address Section */}
            <section className="py-24 px-6 bg-[#f4f7fc] border-t border-gray-100">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-stretch gap-12">
                    <div className="flex-1 flex flex-col justify-center">
                        <span className="text-amber-500 font-semibold text-xs uppercase tracking-[0.2em] mb-3">
                            Campus Address
                        </span>
                        <h2 className="text-3xl font-display font-black text-navy-700 leading-tight mb-6">
                            Visit Our Classroom
                        </h2>
                        <p className="text-gray-600 text-base leading-relaxed mb-6">
                            Our classrooms are located in the heart of Bhayandar East, easily accessible by local transport. We have state-of-the-art classrooms, personal doubt cabins, and reference library spaces.
                        </p>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                            <div className="text-2xl mt-1">📍</div>
                            <div>
                                <h4 className="font-display font-bold text-navy-700 mb-1">Office Location</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{ACADEMY.address}</p>
                            </div>
                        </div>
                    </div>
                    {ACADEMY.mapEmbedUrl && (
                        <div className="flex-1 min-h-[350px] rounded-3xl overflow-hidden shadow-xl border border-gray-200">
                            <iframe
                                title="Quantum Academy Campus Map"
                                src={ACADEMY.mapEmbedUrl}
                                className="w-full h-full border-0 min-h-[350px]"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    )}
                </div>
            </section>

            {/* Inquiry Form Section */}
            <EnquiryForm />

            <Footer />
        </main>
    );
}
