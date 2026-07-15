import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { ACADEMY } from "../../constants/academy";
import Button from "../ui/Button";

const INPUT_CLASS = "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700 transition bg-gray-50 focus:bg-white";
const ERROR_CLASS = "text-red-500 text-xs mt-1";

function SuccessCard({ onReset }) {
    return (
        <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white rounded-2xl p-10 shadow-xl text-center flex flex-col items-center gap-5"
        >
            {/* Animated checkmark */}
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                <motion.svg
                    viewBox="0 0 52 52"
                    className="w-12 h-12"
                    initial="hidden"
                    animate="visible"
                >
                    <motion.circle
                        cx="26" cy="26" r="25"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                        variants={{
                            hidden: { pathLength: 0, opacity: 0 },
                            visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }
                        }}
                    />
                    <motion.path
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 27 L22 35 L38 19"
                        variants={{
                            hidden: { pathLength: 0, opacity: 0 },
                            visible: { pathLength: 1, opacity: 1, transition: { duration: 0.4, delay: 0.5, ease: "easeOut" } }
                        }}
                    />
                </motion.svg>
            </div>

            <div>
                <h3 className="text-2xl font-display font-black text-navy-700">Enquiry Sent! {"\u{1F389}"}</h3>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                    Your WhatsApp chat with Quantum Academy should be open now.<br />
                    We'll get back to you within a few hours.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
                <a
                    href={`https://wa.me/${ACADEMY.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl text-sm text-center transition"
                >
                    Open WhatsApp Again
                </a>
                <button
                    onClick={onReset}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl text-sm transition cursor-pointer"
                >
                    Submit Another
                </button>
            </div>
        </motion.div>
    );
}

export default function EnquiryForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        // Honeypot check for spam prevention
        if (data.website) {
            console.warn("Spam submission blocked");
            setSubmitted(true);
            reset();
            return;
        }

        setIsSubmitting(true);

        const classText = data.targetClass === "Dropper" ? "Dropper Batch" : `Class ${data.targetClass}`;
        const text = `Hello Quantum Academy,

I would like to inquire about admission details.

Student Details:
- Name: ${data.name}
- Class/Batch: ${classText}
- Target Exam: ${data.exam}
- Contact: ${data.mobile}
${data.message.trim() ? `- Message: ${data.message.trim()}\n` : ""}
Please provide the batch timings, fee structure, and enrollment next steps.

Thank you.`;

        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/${ACADEMY.whatsapp}?text=${encodedText}`;

        // Show countdown toast
        let count = 2;
        const toastId = toast.loading(`Opening WhatsApp in ${count}s...`);
        const countdown = setInterval(() => {
            count -= 1;
            if (count > 0) {
                toast.loading(`Opening WhatsApp in ${count}s...`, { id: toastId });
            } else {
                clearInterval(countdown);
                toast.success("Redirecting to WhatsApp! \u{2705}", { id: toastId });
                window.open(whatsappUrl, "_blank", "noopener,noreferrer");
                setIsSubmitting(false);
                setSubmitted(true);
                reset();
            }
        }, 1000);
    };

    const handleReset = () => setSubmitted(false);

    return (
        <section id="enquiry" className="bg-navy-900 py-24 px-6">
            <div className="max-w-xl mx-auto">
                <div className="text-center mb-10">
                    <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">
                        Free Counselling
                    </span>
                    <h2 className="text-3xl font-display font-bold text-white mt-2">
                        Book Your Seat Today
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">Fill the form below — we'll respond on WhatsApp within hours.</p>
                </div>

                <AnimatePresence mode="wait">
                    {submitted ? (
                        <SuccessCard key="success" onReset={handleReset} />
                    ) : (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                            onSubmit={handleSubmit(onSubmit)}
                            className="bg-white rounded-2xl p-8 space-y-5 shadow-xl"
                            noValidate
                        >
                            {/* Honeypot field for bot/spam prevention */}
                            <div className="hidden" aria-hidden="true">
                                <input
                                    type="text"
                                    id="website"
                                    {...register("website")}
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="text-sm font-medium text-gray-700">Student Name *</label>
                                <input id="name" {...register("name", { required: "Name is required" })}
                                    autoComplete="name"
                                    className={INPUT_CLASS} placeholder="Enter full name" />
                                {errors.name && <p className={ERROR_CLASS}>{errors.name.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="mobile" className="text-sm font-medium text-gray-700">Parent's Mobile *</label>
                                <input id="mobile" {...register("mobile", {
                                    required: "Mobile number is required",
                                    pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10-digit Indian number" }
                                })}
                                    autoComplete="tel"
                                    className={INPUT_CLASS} placeholder="10-digit mobile number" maxLength={10} />
                                {errors.mobile && <p className={ERROR_CLASS}>{errors.mobile.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="targetClass" className="text-sm font-medium text-gray-700">Class *</label>
                                <select id="targetClass" {...register("targetClass", { required: "Please select a class" })} className={INPUT_CLASS}>
                                    <option value="">Select class</option>
                                    <option value="XI">Class XI</option>
                                    <option value="XII">Class XII</option>
                                    <option value="Dropper">Dropper</option>
                                </select>
                                {errors.targetClass && <p className={ERROR_CLASS}>{errors.targetClass.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="exam" className="text-sm font-medium text-gray-700">Target Exam *</label>
                                <select id="exam" {...register("exam", { required: "Please select an exam" })} className={INPUT_CLASS}>
                                    <option value="">Select exam</option>
                                    <option value="JEE">JEE Main & Advanced</option>
                                    <option value="NEET">NEET</option>
                                    <option value="MHT-CET">MHT-CET</option>
                                </select>
                                {errors.exam && <p className={ERROR_CLASS}>{errors.exam.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="message" className="text-sm font-medium text-gray-700">Message (optional)</label>
                                <textarea id="message" {...register("message")} rows={3}
                                    className={INPUT_CLASS} placeholder="Any specific question or requirement?" />
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full py-4 text-base"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                        </svg>
                                        Preparing WhatsApp...
                                    </span>
                                    : "Send Enquiry on WhatsApp →"
                                }
                            </Button>

                            <p className="text-center text-xs text-gray-400">
                                General enquiries?{" "}
                                <a href={`https://wa.me/${ACADEMY.whatsapp}`} className="text-navy-700 font-medium underline" target="_blank" rel="noreferrer">
                                    Chat with us directly
                                </a>
                            </p>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}