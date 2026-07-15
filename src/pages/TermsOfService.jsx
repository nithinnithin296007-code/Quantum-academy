import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { ACADEMY } from "../constants/academy";

export default function TermsOfService() {
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
                    Terms & Conditions
                </h1>
                
                <p className="text-sm text-gray-400 mb-8">Last Updated: July 15, 2026</p>

                <div className="space-y-8 text-sm leading-relaxed">
                    <p>
                        Welcome to the website of <strong>{ACADEMY.name}</strong>. By accessing this website or enrolling in our academic programs, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully.
                    </p>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">1. Admissions and Registration</h2>
                        <ul className="list-disc pl-5 space-y-1.5">
                            <li>Admission to any classroom program or test series is subject to the submission of a completed admission form, required documents, and verification of eligibility.</li>
                            <li>The academy reserves the right to deny admission to any candidate without assigning any reason.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">2. Fee Structure and Refunds</h2>
                        <ul className="list-disc pl-5 space-y-1.5">
                            <li>Fees once paid are **non-refundable, non-transferable, and non-adjustable** under any circumstances or change in student circumstances.</li>
                            <li>For installment plans, all installments must be cleared on or before the designated due dates. Delay in payment may result in a late fee or suspension of access to lectures and study materials.</li>
                            <li>GST and other government taxes, where applicable, will be added to the fee amount in accordance with current tax guidelines.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">3. Code of Conduct</h2>
                        <ul className="list-disc pl-5 space-y-1.5">
                            <li>Students are expected to maintain strict discipline, decorum, and regular attendance in all classroom lectures, tests, and counseling sessions.</li>
                            <li>Any form of misconduct, use of unfair means in tests, property damage, or harassment of staff or fellow students will lead to immediate expulsion from the institute without any fee refund.</li>
                            <li>Mobile phones must be kept on silent or switched off during lecture hours.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">4. Intellectual Property</h2>
                        <ul className="list-disc pl-5 space-y-1.5">
                            <li>All educational materials, notes, test papers, lecture videos, and digital assets provided by {ACADEMY.name} are the sole intellectual property of the academy.</li>
                            <li>Students and parents are prohibited from recording lectures, photocopying study notes for external distribution, or sharing portal logins. Any unauthorized sharing or commercial usage will face legal action.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">5. Performance and Results</h2>
                        <ul className="list-disc pl-5 space-y-1.5">
                            <li>While {ACADEMY.name} provides expert guidance, comprehensive study materials, and rigorous mock test series, the final performance and ranking in exams (JEE, NEET, MHT-CET, Boards) depend entirely on the student's individual hard work and ability.</li>
                            <li>The academy does not guarantee selection, specific ranks, or minimum scoring percentiles in any competitive exams.</li>
                            <li>The academy reserves the right to publish the name, photograph, and exam results of enrolled students who achieve success in competitive exams or boards for promotional and motivational purposes.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">6. Limitation of Liability</h2>
                        <p>
                            {ACADEMY.name} shall not be liable for any temporary disruption in services (such as online portal downtime due to server issues, electricity failure, or force majeure events like natural disasters, government lockdowns, etc.).
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">7. Dispute Resolution</h2>
                        <p>
                            Any disputes, claims, or legal matters arising out of enrollment or usage of this website shall be subject to the exclusive jurisdiction of the courts in **Thane/Mumbai, India**.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-3">8. Contact Information</h2>
                        <p>
                            For any queries, clarifications, or complaints regarding these Terms and Conditions, please contact our administrative office:
                        </p>
                        <p className="mt-2 text-amber-400">
                            <strong>Email:</strong> {ACADEMY.email} <br />
                            <strong>Phone:</strong> {ACADEMY.phone} <br />
                            <strong>Address:</strong> {ACADEMY.address}
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
