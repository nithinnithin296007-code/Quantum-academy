import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './TiltedCard.css';

const springValues = {
    damping: 30,
    stiffness: 100,
    mass: 2
};

export default function TiltedCard({
    imageSrc,
    altText = 'Tilted card image',
    captionText = '',
    containerHeight = '100%',
    containerWidth = '100%',
    imageHeight = '100%',
    imageWidth = '100%',
    scaleOnHover = 1.05,
    rotateAmplitude = 10,
    showTooltip = true,
    overlayContent = null,
    displayOverlayContent = false
}) {
    const ref = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || window.matchMedia('(hover: none)').matches);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useMotionValue(0), springValues);
    const rotateY = useSpring(useMotionValue(0), springValues);
    const scale = useSpring(1, springValues);
    const opacity = useSpring(0);
    const rotateFigcaption = useSpring(0, {
        stiffness: 350,
        damping: 30,
        mass: 1
    });
    const [lastY, setLastY] = useState(0);

    function handleMouse(e) {
        if (isMobile || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
        const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

        rotateX.set(rotationX);
        rotateY.set(rotationY);

        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);

        const velocityY = offsetY - lastY;
        rotateFigcaption.set(-velocityY * 0.6);
        setLastY(offsetY);
    }

    function handleMouseEnter() {
        if (isMobile) return;
        scale.set(scaleOnHover);
        opacity.set(1);
    }

    function handleMouseLeave() {
        if (isMobile) return;
        opacity.set(0);
        scale.set(1);
        rotateX.set(0);
        rotateY.set(0);
        rotateFigcaption.set(0);
    }

    return (
        <figure
            ref={ref}
            className="tilted-card-figure w-full h-full"
            style={{ height: containerHeight, width: containerWidth }}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="tilted-card-inner w-full h-full"
                style={{ width: isMobile ? '100%' : imageWidth, height: isMobile ? '100%' : imageHeight, rotateX: isMobile ? 0 : rotateX, rotateY: isMobile ? 0 : rotateY, scale: isMobile ? 1 : scale }}
            >
                <motion.img
                    src={imageSrc}
                    alt={altText}
                    className="tilted-card-img w-full h-full object-cover"
                    style={{ width: isMobile ? '100%' : imageWidth, height: isMobile ? '100%' : imageHeight }}
                />
                {displayOverlayContent && overlayContent && (
                    <motion.div className="tilted-card-overlay">{overlayContent}</motion.div>
                )}
            </motion.div>
            {showTooltip && !isMobile && (
                <motion.figcaption
                    className="tilted-card-caption"
                    style={{ x, y, opacity, rotate: rotateFigcaption }}
                >
                    {captionText}
                </motion.figcaption>
            )}
        </figure>
    );
}