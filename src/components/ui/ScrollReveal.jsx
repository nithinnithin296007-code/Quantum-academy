import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function ScrollReveal({
    children,
    delay = 0,
    direction = "up",
    scale = false,
    className = "",
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const controls = useAnimation();

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 32 : direction === "down" ? -32 : 0,
            x: direction === "left" ? 32 : direction === "right" ? -32 : 0,
            scale: scale ? 0.95 : 1,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                delay,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    useEffect(() => {
        if (isInView) controls.start("visible");
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
}