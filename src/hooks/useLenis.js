import { useEffect } from "react";
import Lenis from "lenis";

export default function useLenis() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4, // Luxuriously smooth deceleration
            easing: (t) => 1 - Math.pow(1 - t, 5), // easeOutQuint: highly organic speed decay
            smoothWheel: true,
            smoothTouch: true, // Smooth scrolling on trackpads/touch screens
            touchMultiplier: 1.2,
            wheelMultiplier: 0.95, // Softens mouse scrolling jumps
            infinite: false,
        });

        // Register globally for custom components/navbar to trigger scrollTo
        window.lenis = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            window.lenis = null;
        };
    }, []);
}