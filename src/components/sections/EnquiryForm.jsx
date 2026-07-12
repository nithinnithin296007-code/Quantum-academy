import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ACADEMY } from "../../constants/academy";
import Button from "../ui/Button";

const INPUT_CLASS = "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700 transition";
const ERROR_CLASS = "text-red-500 text-xs mt-1";

export default function EnquiryForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        setIsSubmitting(true);
        try {
            const text = `Hello Quantum Academy,

I would like to enquire about admission details. Here are the details:

👨‍🎓 *Student Name:* ${data.name}
📚 *Class:* Class ${data.targetClass}
🎯 *Target Exam:* ${data.exam}
📱 *Parent's Contact:* ${data.mobile}
${data.message.trim() ? `\n💬 *Additional Message:* ${data.message.trim()}\n` : ""}
Please share details regarding batch timings, fee structure, and next steps. Thank you!`;

            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${ACADEMY.whatsapp}?text=${encodedText}`;
            
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
            toast.success("Opening WhatsApp chat...");
            reset();
        } catch {
            toast.error("Could not open WhatsApp. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 space-y-5 shadow-xl" noValidate>
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

                    <Button type="submit" variant="primary" className="w-full py-4 text-base">
                        {isSubmitting ? "Opening WhatsApp..." : "Send Enquiry on WhatsApp →"}
                    </Button>

                    <p className="text-center text-xs text-gray-400">
                        General enquiries?{" "}
                        <a href={`https://wa.me/${ACADEMY.whatsapp}`} className="text-navy-700 font-medium underline" target="_blank" rel="noreferrer">
                            Chat with us directly
                        </a>
                    </p>
                </form>
            </div>
        </section>
    );
}