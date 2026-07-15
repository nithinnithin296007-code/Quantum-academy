import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { ACADEMY } from "../constants/academy";

export default function PrivacyPolicy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-[#07091a] text-gray-300 min-h-screen">
            <Navbar />
            
            <section className="max-w-4xl mx-auto px-6 py-32">
                <span className="text-amber-500 font-semibold text-xs uppercase tracking-[0.2em]">
                    Legal & Compliance
                </span>
                <h1 className="text-4xl md:text-5xl font-display font-black text-white mt-3 mb-8">
                    Privacy Policy
                </h1>
                
                <p className="text-sm text-gray-400 mb-8">Last Updated: July 15, 2026</p>

                <div className="space-y-8 text-sm leading-relaxed">
                    <p>
                        At <strong>{ACADEMY.name}</strong>, we are committed to protecting the privacy and security of our students, parents, and visitors. This Privacy Policy describes how we collect, use, and safeguard the personal information you provide when using our website and enrolling in our programs.
                    </p>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
                        <p className="mb-3">
                            We collect personal information when you fill out our Enquiry Form, register for our courses, or communicate with us. This information may include:
                        </p>
                        <ul className="list-disc pl-5 space-y-1.5">
                            <li>Student's Full Name</li>
                            <li>Parent or Guardian's Name</li>
                            <li>Contact Information (Phone Numbers, Email Addresses)</li>
                            <li>Academic Details (School/College Name, Class, Marks, Stream)</li>
                            <li>Course of Interest (JEE, NEET, MHT-CET, Boards)</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
                        <p className="mb-3">
                            The personal details we collect are used strictly for educational and administrative purposes:
                        </p>
                        <ul className="list-disc pl-5 space-y-1.5">
                            <li>To respond to admission inquiries and schedule counseling sessions.</li>
                            <li>To keep parents and students updated on batch timings, test schedules, and academic progress.</li>
                            <li>To deliver study materials, mock test results, and administrative notifications.</li>
                            <li>To comply with legal obligations and internal quality assurance practices.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">3. Data Sharing & Security</h2>
                        <p className="mb-3">
                            We prioritize data security and implement appropriate physical, technical, and administrative controls to protect your information. 
                        </p>
                        <ul className="list-disc pl-5 space-y-1.5">
                            <li>We **do not sell, rent, or trade** personal data of students or parents to third-party marketing companies.</li>
                            <li>Access to your personal information is restricted only to authorized management and faculty members of {ACADEMY.name}.</li>
                            <li>While we strive to secure all online communications, please note that no transmission method over the internet is 100% secure.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">4. Cookies and Analytical Data</h2>
                        <p>
                            Our website may use basic cookies or analytics tracking to monitor traffic patterns, optimize page performance, and improve the user experience. You can choose to disable cookies in your browser settings if you prefer.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">5. Your Consent</h2>
                        <p>
                            By submitting your details via our Enquiry Form or using our website, you consent to the collection and use of your information as outlined in this Privacy Policy.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">6. Updates to This Policy</h2>
                        <p>
                            We reserve the right to update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated "Last Updated" date.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">7. Contact Us</h2>
                        <p>
                            If you have questions regarding this Privacy Policy or wish to modify/delete any information you have provided, please contact us:
                        </p>
                        <p className="mt-2 text-amber-400">
                            <strong>Email:</strong> {ACADEMY.email} <br />
                            <strong>Phone:</strong> {ACADEMY.phoneAlt} / {ACADEMY.phone} <br />
                            <strong>Address:</strong> {ACADEMY.address}
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
