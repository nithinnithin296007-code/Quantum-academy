import { useState, useEffect } from "react";

/**
 * Custom hook to detect if the viewport width is below a given breakpoint.
 * @param {number} [breakpoint=768] - Viewport width threshold in pixels.
 * @returns {boolean}
 */
export default function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth < breakpoint : false
    );

    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < breakpoint);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, [breakpoint]);

    return isMobile;
}
