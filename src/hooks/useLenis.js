import { useEffect } from "react";
import Lenis from "lenis";

export default function useLenis() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false, // Native momentum scrolling on touch/mobile for instant responsiveness
            wheelMultiplier: 1.0,
            touchMultiplier: 1.5,
            infinite: false,
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