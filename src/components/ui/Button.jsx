import { motion } from "framer-motion";

export default function Button({ children, variant = "primary", onClick, type = "button", className = "", disabled = false }) {
  const base = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm select-none";
  const variants = {
    primary:   "bg-amber-400 text-navy-900 hover:bg-amber-500",
    secondary: "bg-navy-700 text-white hover:bg-navy-900",
    outline:   "border-2 border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white",
    ghost:     "text-navy-700 hover:underline",
    whatsapp:  "bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-lg shadow-emerald-500/20",
  };
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`${base} ${variants[variant]} transition-colors duration-200 ${disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"} ${className}`}
    >
      {children}
    </motion.button>
  );
}