import { useEffect } from "react";
import Lenis from "lenis";

export default function useLenis() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.8,
            // Smooth cubic ease-out — snappy start, gentle stop (no lag)
            easing: (t) => 1 - Math.pow(1 - t, 3),
            smoothWheel: true,
            smoothTouch: false,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.2,
            infinite: false,
            syncTouch: false,
        });

        // Register globally for custom components/navbar to trigger scrollTo
        window.lenis = lenis;

        let animationFrameId;
        function raf(time) {
            lenis.raf(time);
            animationFrameId = requestAnimationFrame(raf);
        }

        animationFrameId = requestAnimationFrame(raf);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            lenis.destroy();
            window.lenis = null;
        };
    }, []);
}