import { useRef, useEffect, useCallback } from "react";
import "./Lightfall.css";

/**
 * Lightfall – a canvas-based falling-light / shooting-star background.
 *
 * Props (all optional):
 *   colors           – array of hex colours for streaks          default: ["#ffffff"]
 *   backgroundColor  – canvas clear colour                       default: "#0f1f45"
 *   speed            – base fall speed multiplier                 default: 1
 *   streakCount      – number of active streaks                   default: 12
 *   streakWidth      – base width of each streak (px)             default: 1.5
 *   streakLength     – length multiplier for trails               default: 1
 *   glow             – glow intensity (0-1)                       default: 0.6
 *   density          – star-field dot density (0-1)               default: 0.4
 *   twinkle          – twinkle intensity for dots (0-1)           default: 0.5
 *   zoom             – scale factor for the whole scene           default: 1
 *   backgroundGlow   – ambient glow overlay opacity (0-1)         default: 0.2
 *   opacity          – overall canvas opacity                     default: 1
 *   mouseInteraction – enable mouse parallax                      default: false
 */
export default function Lightfall({
    colors = ["#ffffff"],
    backgroundColor = "#0f1f45",
    speed = 1,
    streakCount = 12,
    streakWidth = 1.5,
    streakLength = 1,
    glow = 0.6,
    density = 0.4,
    twinkle = 0.5,
    zoom = 1,
    backgroundGlow = 0.2,
    opacity = 1,
    mouseInteraction = false,
}) {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });

    /* ---- helpers ---- */
    const pickColor = useCallback(
        () => colors[Math.floor(Math.random() * colors.length)],
        [colors],
    );

    const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
    };

    const createStreak = useCallback(
        (w, h) => ({
            x: Math.random() * w,
            y: Math.random() * -h,
            vx: (Math.random() - 0.5) * 0.4 * speed,
            vy: (1.5 + Math.random() * 2) * speed,
            length: (40 + Math.random() * 80) * streakLength,
            width: (0.5 + Math.random() * 1.5) * streakWidth,
            color: pickColor(),
            opacity: 0.3 + Math.random() * 0.7,
            life: 0,
        }),
        [speed, streakLength, streakWidth, pickColor],
    );

    const createStar = (w, h) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: 0.4 + Math.random() * 1.2,
        baseAlpha: 0.15 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 1.2,
    });

    /* ---- main effect ---- */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let w = 0, h = 0;
        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            w = canvas.clientWidth;
            h = canvas.clientHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const resizeObserver = new ResizeObserver(() => {
            resize();
        });
        resizeObserver.observe(canvas);

        const initialW = canvas.clientWidth || window.innerWidth;
        const initialH = canvas.clientHeight || window.innerHeight;

        /* streaks */
        let streaks = Array.from({ length: streakCount }, () => createStreak(initialW, initialH));

        /* stars */
        const starCount = Math.floor(initialW * initialH * density * 0.0003);
        const stars = Array.from({ length: starCount }, () => createStar(initialW, initialH));

        /* mouse */
        const onMouseMove = (e) => {
            if (!mouseInteraction) return;
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = (e.clientX - rect.left) / rect.width;
            mouseRef.current.y = (e.clientY - rect.top) / rect.height;
        };
        canvas.addEventListener("mousemove", onMouseMove);

        /* animation loop */
        let time = 0;
        const loop = () => {
            time += 0.016; // ~60 fps
            if (w === 0 || h === 0) {
                animationRef.current = requestAnimationFrame(loop);
                return;
            }
            ctx.save();
            ctx.scale(zoom, zoom);
            const sw = w / zoom;
            const sh = h / zoom;

            /* clear */
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, sw, sh);

            /* ambient glow */
            if (backgroundGlow > 0) {
                const grd = ctx.createRadialGradient(
                    sw * 0.5,
                    sh * 0.35,
                    0,
                    sw * 0.5,
                    sh * 0.35,
                    sw * 0.6,
                );
                grd.addColorStop(0, `rgba(245,158,11,${backgroundGlow * 0.12})`);
                grd.addColorStop(1, "transparent");
                ctx.fillStyle = grd;
                ctx.fillRect(0, 0, sw, sh);
            }

            /* parallax offset */
            const px = mouseInteraction ? (mouseRef.current.x - 0.5) * 20 : 0;
            const py = mouseInteraction ? (mouseRef.current.y - 0.5) * 20 : 0;

            /* draw stars */
            stars.forEach((s) => {
                const alpha =
                    s.baseAlpha +
                    Math.sin(time * s.speed + s.phase) * twinkle * s.baseAlpha;
                ctx.beginPath();
                ctx.arc(s.x + px * 0.3, s.y + py * 0.3, s.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${Math.max(0, alpha)})`;
                ctx.fill();
            });

            /* draw streaks */
            streaks.forEach((s, i) => {
                s.x += s.vx + px * 0.05;
                s.y += s.vy;
                s.life += 0.016;

                if (s.y - s.length > sh || s.x < -50 || s.x > sw + 50) {
                    streaks[i] = createStreak(sw, sh);
                    return;
                }

                const { r, g, b } = hexToRgb(s.color);

                /* glow layer */
                if (glow > 0) {
                    ctx.save();
                    ctx.globalAlpha = s.opacity * glow * 0.35;
                    ctx.shadowColor = s.color;
                    ctx.shadowBlur = 18 * glow;
                    ctx.strokeStyle = `rgba(${r},${g},${b},0.5)`;
                    ctx.lineWidth = s.width * 3;
                    ctx.lineCap = "round";
                    ctx.beginPath();
                    ctx.moveTo(s.x, s.y);
                    ctx.lineTo(s.x - s.vx * 2, s.y - s.length);
                    ctx.stroke();
                    ctx.restore();
                }

                /* streak body */
                const grad = ctx.createLinearGradient(s.x, s.y, s.x, s.y - s.length);
                grad.addColorStop(0, `rgba(${r},${g},${b},${s.opacity})`);
                grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x - s.vx * 2, s.y - s.length);
                ctx.strokeStyle = grad;
                ctx.lineWidth = s.width;
                ctx.lineCap = "round";
                ctx.stroke();

                /* bright head */
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.width * 1.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${s.opacity * 0.9})`;
                ctx.fill();
            });

            ctx.restore();
            animationRef.current = requestAnimationFrame(loop);
        };

        animationRef.current = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(animationRef.current);
            resizeObserver.disconnect();
            canvas.removeEventListener("mousemove", onMouseMove);
        };
    }, [
        backgroundColor,
        backgroundGlow,
        colors,
        createStreak,
        density,
        glow,
        mouseInteraction,
        speed,
        streakCount,
        streakLength,
        streakWidth,
        twinkle,
        zoom,
    ]);

    return (
        <div className="lightfall-container">
            <canvas ref={canvasRef} style={{ opacity }} />
        </div>
    );
}