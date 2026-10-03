import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ACADEMY } from "../../constants/academy";
import Button from "../ui/Button";

const INPUT_CLASS = "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-400 disabled:opacity-60 disabled:cursor-not-allowed";
const ERROR_CLASS = "text-red-500 text-xs mt-1 font-medium";

export default function EnquiryForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);

    const onSubmit = (data) => {
        const classText = data.targetClass === "Dropper" ? "Dropper Batch" : `Class ${data.targetClass}`;

        const text = `Hello Quantum Academy,

I would like to inquire about admission details.

Student Details:
- Name: ${data.name.trim()}
- Class/Batch: ${classText}
- Target Exam: ${data.exam}
- Contact: ${data.mobile.trim()}
${data.message && data.message.trim() ? `- Message: ${data.message.trim()}\n` : ""}
Please provide the batch timings, fee structure, and enrollment next steps.

Thank you.`;

        const whatsappUrl = `https://wa.me/${ACADEMY.whatsapp}?text=${encodeURIComponent(text)}`;

        const summaryData = {
            name: data.name.trim(),
            mobile: data.mobile.trim(),
            targetClass: classText,
            exam: data.exam,
            whatsappUrl,
        };

        setIsRedirecting(true);
        setSubmittedData(summaryData);

        // Simulate mini-loading for redirection
        setTimeout(() => {
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
            setIsRedirecting(false);
            setShowSuccessPopup(true);
            reset();
        }, 1500);
    };

    return (
        <section id="enquiry" className="bg-[#07091a] py-24 px-6 relative overflow-hidden">
            <div className="max-w-xl mx-auto">
                <div className="text-center mb-10">
                    <span className="text-amber-400 font-semibold text-xs uppercase tracking-widest bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
                        Required Before Messaging
                    </span>
                    <h2 className="text-3xl font-display font-bold text-white mt-4">
                        Enquire via WhatsApp
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">
                        Please fill out the form below. Once submitted, it will directly open WhatsApp with your details.
                    </p>
                </div>

                <div className="relative">
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 space-y-5 shadow-2xl border border-white/10 relative" noValidate>
                        <div>
                            <label htmlFor="name" className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                                Student Name <span className="text-amber-500">*</span>
                            </label>
                            <input
                                id="name"
                                {...register("name", { required: "Student Name is required to proceed" })}
                                autoComplete="name"
                                disabled={isRedirecting}
                                className={INPUT_CLASS}
                                placeholder="Enter full name"
                            />
                            {errors.name && <p className={ERROR_CLASS}>⚠️ {errors.name.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="mobile" className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                                Parent's Mobile <span className="text-amber-500">*</span>
                            </label>
                            <input
                                id="mobile"
                                {...register("mobile", {
                                    required: "Parent's Mobile number is required",
                                    pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10-digit mobile number" }
                                })}
                                autoComplete="tel"
                                disabled={isRedirecting}
                                className={INPUT_CLASS}
                                placeholder="10-digit mobile number"
                                maxLength={10}
                            />
                            {errors.mobile && <p className={ERROR_CLASS}>⚠️ {errors.mobile.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="targetClass" className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                                Class <span className="text-amber-500">*</span>
                            </label>
                            <select
                                id="targetClass"
                                {...register("targetClass", { required: "Please select student's class" })}
                                disabled={isRedirecting}
                                className={INPUT_CLASS}
                            >
                                <option value="">Select class</option>
                                <option value="XI">Class XI</option>
                                <option value="XII">Class XII</option>
                                <option value="Dropper">Dropper</option>
                            </select>
                            {errors.targetClass && <p className={ERROR_CLASS}>⚠️ {errors.targetClass.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="exam" className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                                Target Exam <span className="text-amber-500">*</span>
                            </label>
                            <select
                                id="exam"
                                {...register("exam", { required: "Please select target exam" })}
                                disabled={isRedirecting}
                                className={INPUT_CLASS}
                            >
                                <option value="">Select exam</option>
                                <option value="JEE">JEE Main & Advanced</option>
                                <option value="NEET">NEET</option>
                                <option value="MHT-CET">MHT-CET</option>
                                <option value="HSC State Board">HSC State Board</option>
                            </select>
                            {errors.exam && <p className={ERROR_CLASS}>⚠️ {errors.exam.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="message" className="text-sm font-semibold text-gray-800">
                                Message <span className="text-gray-400 text-xs font-normal">(optional)</span>
                            </label>
                            <textarea
                                id="message"
                                {...register("message")}
                                disabled={isRedirecting}
                                rows={3}
                                className={INPUT_CLASS}
                                placeholder="Any specific question or requirement?"
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="whatsapp"
                            disabled={isRedirecting}
                            className="w-full py-4 text-base font-bold flex items-center justify-center gap-2 relative overflow-hidden"
                        >
                            {isRedirecting ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Redirecting to WhatsApp...
                                </span>
                            ) : (
                                <span>Send Enquiry on WhatsApp →</span>
                            )}
                        </Button>

                        <p className="text-center text-xs text-gray-500 font-medium pt-1">
                            🔒 Fill in all required fields to open WhatsApp chat.
                        </p>

                        {/* Mini Loading Overlay inside form */}
                        <AnimatePresence>
                            {isRedirecting && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl z-20 flex flex-col items-center justify-center p-6 text-center"
                                >
                                    <div className="relative mb-4">
                                        <div className="w-16 h-16 rounded-full border-4 border-emerald-200 border-t-[#25D366] animate-spin" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <svg className="w-7 h-7 text-[#25D366] animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 font-display">Redirecting to WhatsApp...</h4>
                                    <p className="text-xs text-gray-500 mt-1 max-w-xs">
                                        Opening WhatsApp chat with Quantum Academy with your pre-filled details.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>

            {/* Success Popup Modal */}
            <AnimatePresence>
                {showSuccessPopup && submittedData && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07091a]/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-emerald-100 overflow-hidden text-center"
                        >
                            {/* Decorative ambient top glow */}
                            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

                            {/* Animated checkmark icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                                className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-green-400 text-white shadow-lg shadow-emerald-500/30 mx-auto flex items-center justify-center mb-4 relative"
                            >
                                <motion.svg
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </motion.svg>
                            </motion.div>

                            <h3 className="text-2xl font-display font-black text-gray-900">
                                Message Sent Successfully! 🎉
                            </h3>
                            <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">
                                Your enquiry details have been generated and opened in WhatsApp.
                            </p>

                            {/* Summary Card */}
                            <div className="bg-slate-50 rounded-2xl p-4 my-5 text-left border border-slate-100 text-xs space-y-2">
                                <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                                    <span className="text-gray-400 font-medium">Student Name:</span>
                                    <span className="font-semibold text-gray-800">{submittedData.name}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                                    <span className="text-gray-400 font-medium">Parent Contact:</span>
                                    <span className="font-semibold text-gray-800">{submittedData.mobile}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 font-medium">Class & Exam:</span>
                                    <span className="font-semibold text-gray-800">{submittedData.targetClass} • {submittedData.exam}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5 text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200/60 mb-6 text-left">
                                <span className="text-base flex-shrink-0">💬</span>
                                <span className="leading-snug">Our academic counsellors will review your inquiry and respond on WhatsApp shortly.</span>
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setShowSuccessPopup(false)}
                                    className="w-full py-3.5 px-4 bg-navy-700 hover:bg-navy-900 text-white font-bold text-sm rounded-xl shadow-lg transition cursor-pointer"
                                >
                                    Got it, thanks!
                                </button>
                                <button
                                    type="button"
                                    onClick={() => window.open(submittedData.whatsappUrl, "_blank", "noopener,noreferrer")}
                                    className="w-full py-2.5 px-4 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition cursor-pointer flex items-center justify-center gap-1.5"
                                >
                                    <span>Didn't open? Click to re-open WhatsApp</span>
                                    <span>↗</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
