export default function Button({ children, variant = "primary", onClick, type = "button", className = "" }) {
  const base = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-sm";
  const variants = {
    primary:   "bg-amber-400 text-navy-900 hover:bg-amber-500",
    secondary: "bg-navy-700 text-white hover:bg-navy-900",
    outline:   "border-2 border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white",
    ghost:     "text-navy-700 hover:underline",
  };
  return (
    <button type={type} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}