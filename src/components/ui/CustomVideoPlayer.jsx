import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Helpers ─────────────────────────────────────────────────── */
const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
};

/* ── Animated waveform bars ─────────────────────────────────── */
const BARS = [0.6, 1, 0.7, 0.9, 0.5, 0.8, 0.65];

function Waveform({ active }) {
    return (
        <div className="flex items-center gap-[2px] h-4">
            {BARS.map((scale, i) => (
                <div
                    key={i}
                    className="w-[3px] rounded-full"
                    style={{
                        height: 16,
                        background: 'linear-gradient(180deg, #F5A623, #e09610)',
                        transformOrigin: 'center',
                        transform: active ? undefined : 'scaleY(0.25)',
                        opacity: active ? undefined : 0.4,
                        animation: active ? `waveformBounce 0.6s ease-in-out infinite alternate ${i * 0.08}s` : 'none',
                    }}
                />
            ))}
        </div>
    );
}

/* ── Volume slider (clean horizontal bar) ───────────────────── */
function VolumeSlider({ value, onChange }) {
    const trackRef = useRef(null);
    const isDragging = useRef(false);

    const getValueFromEvent = useCallback((clientX) => {
        const bar = trackRef.current;
        if (!bar) return 0;
        const { left, width } = bar.getBoundingClientRect();
        return Math.round(Math.max(0, Math.min(100, ((clientX - left) / width) * 100)));
    }, []);

    const handleMouseDown = (e) => {
        e.stopPropagation();
        isDragging.current = true;
        onChange(getValueFromEvent(e.clientX));
        const onMove = (ev) => { if (isDragging.current) onChange(getValueFromEvent(ev.clientX)); };
        const onUp = () => { isDragging.current = false; window.removeEventListener('mousemove', onMove); };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp, { once: true });
    };

    const handleTouchStart = (e) => {
        e.stopPropagation();
        onChange(getValueFromEvent(e.touches[0].clientX));
        const onMove = (ev) => { ev.preventDefault(); onChange(getValueFromEvent(ev.touches[0].clientX)); };
        const onEnd = () => { window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onEnd); };
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('touchend', onEnd, { once: true });
    };

    return (
        <div
            ref={trackRef}
            className="relative flex-1 cursor-pointer py-2"
            style={{ touchAction: 'none' }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            {/* Extended touch area */}
            <div className="absolute inset-x-0 -top-3 -bottom-3" />
            {/* Track */}
            <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.18)' }}>
                <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                        width: `${value}%`,
                        background: 'linear-gradient(90deg, #F5A623, #e09610)',
                        transition: 'width 0.05s linear',
                    }}
                />
            </div>
            {/* Thumb */}
            <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-md"
                style={{
                    left: `${value}%`,
                    transform: `translateX(-50%) translateY(-50%)`,
                    background: '#F5A623',
                    boxShadow: '0 0 8px rgba(245,166,35,0.6)',
                }}
            />
        </div>
    );
}

/* ── Lightbox Modal Component (Portal) ──────────────────────── */
function LightboxModal({
    src,
    badgeText = "Reel",
    initialTime,
    initialPlaying,
    volume,
    isMuted,
    onClose,
}) {
    const modalVideoRef = useRef(null);
    const backdropRef   = useRef(null);
    const scrubRef      = useRef(null);
    const isDragging    = useRef(false);

    const [isPlaying,    setIsPlaying]    = useState(Boolean(initialPlaying));
    const [localVolume,  setLocalVolume]  = useState(volume);
    const [localMuted,   setLocalMuted]   = useState(isMuted);
    const [currentTime,  setCurrentTime]  = useState(initialTime || 0);
    const [duration,     setDuration]     = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [tapFlash,     setTapFlash]     = useState(null);
    const controlsTimer = useRef(null);

    const resetTimer = useCallback(() => {
        setShowControls(true);
        clearTimeout(controlsTimer.current);
        if (isPlaying) {
            controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
        }
    }, [isPlaying]);

    const handleClose = useCallback(() => {
        const v = modalVideoRef.current;
        const finalTime = v ? v.currentTime : currentTime;
        const finalPlaying = v ? !v.paused : isPlaying;
        onClose(finalTime, finalPlaying, localVolume, localMuted);
    }, [currentTime, isPlaying, localVolume, localMuted, onClose]);

    // Lock html & body, disable Lenis, and block wheel/touch gestures from scrolling
    useEffect(() => {
        document.documentElement.classList.add('lightbox-active');
        document.body.classList.add('lightbox-active');

        if (typeof window !== 'undefined' && window.lenis) {
            try {
                window.lenis.stop();
            } catch {}
        }

        const preventScroll = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        const node = backdropRef.current;
        if (node) {
            node.addEventListener('wheel', preventScroll, { passive: false });
            node.addEventListener('touchmove', preventScroll, { passive: false });
        }
        window.addEventListener('wheel', preventScroll, { passive: false });

        return () => {
            document.documentElement.classList.remove('lightbox-active');
            document.body.classList.remove('lightbox-active');
            if (typeof window !== 'undefined' && window.lenis) {
                try {
                    window.lenis.start();
                } catch {}
            }
            if (node) {
                node.removeEventListener('wheel', preventScroll);
                node.removeEventListener('touchmove', preventScroll);
            }
            window.removeEventListener('wheel', preventScroll);
            window.dispatchEvent(new Event('scroll'));
        };
    }, []);

    const initialConfigRef = useRef({ initialTime, initialPlaying, localVolume, localMuted });

    // Initialize video time and playback on mount
    useEffect(() => {
        const v = modalVideoRef.current;
        if (!v) return;

        const { initialTime: initT, initialPlaying: initP, localVolume: initVol, localMuted: initMute } = initialConfigRef.current;

        v.muted = initMute;
        v.volume = initMute ? 0 : (initVol || 80) / 100;

        try {
            if (initT) v.currentTime = initT;
        } catch {}

        if (initP) {
            v.play().catch(() => {});
        }

        const onTime = () => setCurrentTime(v.currentTime);
        const onMeta = () => {
            if (v.duration) setDuration(v.duration);
            try {
                if (initT && Math.abs(v.currentTime - initT) > 0.5) {
                    v.currentTime = initT;
                }
            } catch {}
            if (initP && v.paused) {
                v.play().catch(() => {});
            }
        };

        v.addEventListener('timeupdate', onTime);
        v.addEventListener('loadedmetadata', onMeta);
        if (v.duration) setDuration(v.duration);

        return () => {
            v.removeEventListener('timeupdate', onTime);
            v.removeEventListener('loadedmetadata', onMeta);
        };
    }, []);

    // Sync volume/mute
    useEffect(() => {
        if (!modalVideoRef.current) return;
        modalVideoRef.current.muted = localMuted;
        modalVideoRef.current.volume = localMuted ? 0 : (localVolume || 80) / 100;
    }, [localVolume, localMuted]);

    // Timer trigger on isPlaying
    useEffect(() => {
        resetTimer();
        return () => clearTimeout(controlsTimer.current);
    }, [isPlaying, resetTimer]);

    // Escape key
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [handleClose]);

    const togglePlay = (e) => {
        e?.stopPropagation();
        const v = modalVideoRef.current;
        if (!v) return;
        if (isPlaying) {
            v.pause();
            setIsPlaying(false);
            setTapFlash('pause');
        } else {
            v.play().catch(() => {});
            setIsPlaying(true);
            setTapFlash('play');
        }
        setTimeout(() => setTapFlash(null), 600);
        resetTimer();
    };

    // Scrubber seeking
    const seekToRatio = useCallback((clientX) => {
        const bar = scrubRef.current;
        const v   = modalVideoRef.current;
        if (!bar || !v || !duration) return;
        const { left, width } = bar.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (clientX - left) / width));
        const t = ratio * duration;
        v.currentTime = t;
        setCurrentTime(t);
    }, [duration]);

    const handleScrubMouseDown = (e) => {
        e.stopPropagation();
        isDragging.current = true;
        seekToRatio(e.clientX);
        const onMove = (ev) => { if (isDragging.current) seekToRatio(ev.clientX); };
        const onUp   = ()   => { isDragging.current = false; window.removeEventListener('mousemove', onMove); };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp, { once: true });
    };

    const handleScrubTouchStart = (e) => {
        e.stopPropagation();
        seekToRatio(e.touches[0].clientX);
        const onMove = (ev) => { ev.preventDefault(); seekToRatio(ev.touches[0].clientX); };
        const onEnd = () => {
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend', onEnd);
        };
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('touchend', onEnd, { once: true });
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div
            ref={backdropRef}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-4 modal-backdrop-animate select-none overflow-hidden"
            onClick={handleClose}
            onMouseMove={resetTimer}
            onTouchStart={resetTimer}
            style={{
                touchAction: 'none',
                overscrollBehavior: 'none',
            }}
        >
            {/* Close button at top right */}
            <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleClose(); }}
                className="absolute top-3 right-3 sm:top-5 sm:right-5 z-[10000] w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white cursor-pointer active:scale-90 transition-all shadow-2xl hover:scale-105"
                style={{
                    background: 'rgba(255, 255, 255, 0.22)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                }}
                aria-label="Close enlarged reel"
            >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Video container — centered reel with clean 1.5rem rounded corners */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[min(400px,88vw)] h-[min(78dvh,750px)] aspect-[9/16] rounded-3xl overflow-hidden bg-black shadow-[0_25px_80px_rgba(0,0,0,0.9)] border border-white/20 modal-content-animate flex flex-col justify-end"
                style={{
                    borderRadius: '1.5rem',
                    WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                    transform: 'translateZ(0)',
                    overscrollBehavior: 'none',
                    touchAction: 'none',
                }}
            >
                {/* Video element */}
                <video
                    ref={modalVideoRef}
                    src={src}
                    className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                    onClick={togglePlay}
                    playsInline
                    loop
                />

                {/* Top gradient for readability */}
                <div
                    className="absolute top-0 inset-x-0 h-28 pointer-events-none z-10"
                    style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)' }}
                />

                {/* Top: Reel badge */}
                {badgeText && (
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
                        <div
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                            style={{
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(12px)',
                                WebkitBackdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255,255,255,0.2)',
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth={2}>
                                <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                            </svg>
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">{badgeText}</span>
                        </div>
                    </div>
                )}

                {/* Tap flash indicator */}
                {tapFlash && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none animate-ping">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center"
                            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
                        >
                            {tapFlash === 'play' ? (
                                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            ) : (
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                                </svg>
                            )}
                        </div>
                    </div>
                )}

                {/* Bottom gradient */}
                <div
                    className="absolute bottom-0 inset-x-0 h-44 pointer-events-none z-10"
                    style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)' }}
                />

                {/* Controls container */}
                <div
                    className="relative z-20 px-3 pb-4 pt-0 flex flex-col gap-2 transition-opacity duration-300"
                    style={{
                        opacity: showControls || !isPlaying ? 1 : 0,
                        pointerEvents: showControls || !isPlaying ? 'auto' : 'none',
                    }}
                >
                    {/* Progress scrubber bar */}
                    <div
                        ref={scrubRef}
                        onMouseDown={handleScrubMouseDown}
                        onTouchStart={handleScrubTouchStart}
                        className="relative cursor-pointer py-2"
                        style={{ touchAction: 'none' }}
                    >
                        <div className="absolute inset-x-0 -top-3 -bottom-3" />
                        <div className="relative h-[4px] rounded-full overflow-visible" style={{ background: 'rgba(255,255,255,0.25)' }}>
                            <div
                                className="absolute inset-y-0 left-0 rounded-full"
                                style={{ width: `${Math.min(progress + 15, 100)}%`, background: 'rgba(255,255,255,0.15)' }}
                            />
                            <div
                                className="absolute inset-y-0 left-0 rounded-full"
                                style={{
                                    width: `${progress}%`,
                                    background: 'linear-gradient(90deg, #F5A623, #e09610)',
                                }}
                            />
                            <div
                                className="absolute top-1/2 w-4 h-4 rounded-full shadow-md"
                                style={{
                                    left: `${progress}%`,
                                    transform: 'translateX(-50%) translateY(-50%)',
                                    background: '#F5A623',
                                    boxShadow: '0 0 10px rgba(245,166,35,0.9), 0 2px 4px rgba(0,0,0,0.5)',
                                }}
                            />
                        </div>
                    </div>

                    {/* Controls row */}
                    <div className="flex items-center gap-2">
                        {/* Play / Pause */}
                        <button
                            type="button"
                            onClick={togglePlay}
                            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-md cursor-pointer"
                            style={{ background: 'linear-gradient(135deg, #F5A623, #e09610)', boxShadow: '0 4px 12px rgba(245,166,35,0.4)' }}
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                            {isPlaying ? (
                                <svg className="w-4 h-4" fill="#0d1730" viewBox="0 0 24 24">
                                    <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 ml-0.5" fill="#0d1730" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>

                        {/* Time */}
                        <span className="text-[11px] text-white/90 tabular-nums font-semibold flex-shrink-0">
                            {fmt(currentTime)} / {fmt(duration)}
                        </span>

                        {/* Volume section */}
                        <div className="flex-1 flex items-center gap-2 min-w-0">
                            <button
                                type="button"
                                className="flex-shrink-0 text-white active:scale-90 transition-transform p-1 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLocalMuted(m => !m);
                                    if (localMuted) setLocalVolume(v => v || 80);
                                }}
                                aria-label={localMuted ? 'Unmute' : 'Mute'}
                            >
                                {localMuted ? (
                                    <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    </svg>
                                )}
                            </button>

                            <div className="hidden xs:flex flex-1 items-center min-w-0">
                                <VolumeSlider
                                    value={localMuted ? 0 : (localVolume || 80)}
                                    onChange={(v) => { setLocalVolume(v); if (v > 0) setLocalMuted(false); else setLocalMuted(true); }}
                                />
                            </div>
                        </div>

                        {/* Waveform */}
                        <div className="flex-shrink-0">
                            <Waveform active={isPlaying && !localMuted} />
                        </div>

                        {/* Exit Fullscreen button */}
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleClose(); }}
                            className="flex-shrink-0 text-white/80 hover:text-white active:scale-90 transition-all p-1 cursor-pointer"
                            aria-label="Exit fullscreen"
                            title="Exit fullscreen"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── Main Inline Player Component ────────────────────────────── */
export default function CustomVideoPlayer({ src, badgeText = "Reel", className = "" }) {
    const videoRef     = useRef(null);
    const containerRef = useRef(null);
    const scrubRef     = useRef(null);
    const isDragging   = useRef(false);

    const [isPlaying,        setIsPlaying]        = useState(false);
    const [volume,           setVolume]            = useState(80);
    const [isMuted,          setIsMuted]           = useState(true);
    const [isLightbox,       setIsLightbox]        = useState(false);
    const [showUnmuteHint,   setShowUnmuteHint]    = useState(false);
    const [isInView,         setIsInView]          = useState(false);
    const [currentTime,      setCurrentTime]       = useState(0);
    const [duration,         setDuration]          = useState(0);
    const [showControls,     setShowControls]      = useState(true);
    const [tapFlash,         setTapFlash]          = useState(null);
    const controlsTimer = useRef(null);

    /* Auto-hide controls */
    const resetControlsTimer = useCallback(() => {
        setShowControls(true);
        clearTimeout(controlsTimer.current);
        if (isPlaying) {
            controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
        }
    }, [isPlaying]);

    /* Intersection observer — play when in view, pause when out */
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting);
            if (entry.isIntersecting) {
                if (!isLightbox) {
                    videoRef.current?.play().catch(() => {});
                    setIsPlaying(true);
                }
            } else {
                videoRef.current?.pause();
                setIsPlaying(false);
            }
        }, { threshold: 0.5 });

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [isLightbox]);

    /* Time events */
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        const onTime = () => setCurrentTime(v.currentTime);
        const onMeta = () => setDuration(v.duration);
        v.addEventListener('timeupdate', onTime);
        v.addEventListener('loadedmetadata', onMeta);
        if (v.duration) setDuration(v.duration);
        return () => {
            v.removeEventListener('timeupdate', onTime);
            v.removeEventListener('loadedmetadata', onMeta);
        };
    }, []);

    /* Unmute hint */
    useEffect(() => {
        let t;
        if (isInView && isMuted && !isLightbox) {
            t = setTimeout(() => setShowUnmuteHint(true), 2000);
        } else {
            setShowUnmuteHint(false);
        }
        return () => clearTimeout(t);
    }, [isInView, isMuted, isLightbox]);

    /* Sync volume to video */
    useEffect(() => {
        if (!videoRef.current) return;
        const v = videoRef.current;
        v.muted = isMuted;
        v.volume = isMuted ? 0 : (volume || 80) / 100;
    }, [volume, isMuted]);

    /* Controls timer */
    useEffect(() => {
        resetControlsTimer();
        return () => clearTimeout(controlsTimer.current);
    }, [isPlaying, resetControlsTimer]);

    /* Seek helpers */
    const seekToRatio = useCallback((clientX) => {
        const bar = scrubRef.current;
        const v   = videoRef.current;
        if (!bar || !v || !duration) return;
        const { left, width } = bar.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (clientX - left) / width));
        const t = ratio * duration;
        v.currentTime = t;
        setCurrentTime(t);
    }, [duration]);

    const handleScrubMouseDown = (e) => {
        e.stopPropagation();
        isDragging.current = true;
        seekToRatio(e.clientX);
        const onMove = (ev) => { if (isDragging.current) seekToRatio(ev.clientX); };
        const onUp   = ()   => { isDragging.current = false; window.removeEventListener('mousemove', onMove); };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp, { once: true });
    };

    const handleScrubTouchStart = (e) => {
        e.stopPropagation();
        seekToRatio(e.touches[0].clientX);
        const onMove = (ev) => { ev.preventDefault(); seekToRatio(ev.touches[0].clientX); };
        const onEnd = () => {
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend', onEnd);
        };
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('touchend', onEnd, { once: true });
    };

    const togglePlay = useCallback((e) => {
        e?.stopPropagation();
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
            setTapFlash('pause');
        } else {
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
            setTapFlash('play');
        }
        setTimeout(() => setTapFlash(null), 600);
        resetControlsTimer();
    }, [isPlaying, resetControlsTimer]);

    const handleVideoTap = (e) => {
        e.stopPropagation();
        resetControlsTimer();
        togglePlay(e);
    };

    /* Open Lightbox */
    const openLightbox = (e) => {
        e?.stopPropagation();
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
            videoRef.current.pause();
        }
        setIsLightbox(true);
    };

    /* Close Lightbox and synchronize playback */
    const closeLightbox = (finalTime, finalPlaying, finalVolume, finalMuted) => {
        setIsLightbox(false);
        setVolume(finalVolume);
        setIsMuted(finalMuted);
        setCurrentTime(finalTime);
        if (videoRef.current) {
            videoRef.current.currentTime = finalTime;
            videoRef.current.muted = finalMuted;
            videoRef.current.volume = finalMuted ? 0 : (finalVolume || 80) / 100;
            if (finalPlaying) {
                videoRef.current.play().catch(() => {});
                setIsPlaying(true);
            } else {
                setIsPlaying(false);
            }
        }
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div
            ref={containerRef}
            onMouseMove={resetControlsTimer}
            onTouchStart={resetControlsTimer}
            className={`relative w-full h-full rounded-3xl overflow-hidden bg-black ${className}`}
            style={{
                borderRadius: '1.5rem',
                WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                transform: 'translateZ(0)',
                isolation: 'isolate',
            }}
        >
            {/* Inline Video element */}
            <video
                ref={videoRef}
                src={src}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer rounded-3xl"
                style={{ borderRadius: '1.5rem' }}
                onClick={handleVideoTap}
                onTouchEnd={handleVideoTap}
                playsInline
                loop
                muted={isMuted}
            />

            {/* Top gradient for badges */}
            <div
                className="absolute top-0 inset-x-0 h-24 pointer-events-none z-10"
                style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 100%)' }}
            />

            {/* Bottom gradient for controls */}
            <div
                className="absolute bottom-0 inset-x-0 h-36 pointer-events-none z-10"
                style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }}
            />

            {/* Top: Reel badge */}
            {badgeText && (
                <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 pointer-events-none">
                    <div
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}
                    >
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-red-500"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                        />
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2">
                            <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                        </svg>
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">{badgeText}</span>
                    </div>
                </div>
            )}

            {/* Unmute hint pill */}
            <AnimatePresence>
                {showUnmuteHint && (
                    <motion.button
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        onClick={(e) => { e.stopPropagation(); setIsMuted(false); setVolume(80); setShowUnmuteHint(false); }}
                        className="absolute top-14 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full font-bold text-xs shadow-lg active:scale-95 transition-transform"
                        style={{
                            background: 'linear-gradient(135deg, #F5A623, #e09610)',
                            color: '#0d1730',
                            boxShadow: '0 4px 16px rgba(245,166,35,0.4)',
                        }}
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                        Tap to Unmute
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Tap flash indicator */}
            <AnimatePresence>
                {tapFlash && (
                    <motion.div
                        key={tapFlash}
                        initial={{ opacity: 0.9, scale: 0.7 }}
                        animate={{ opacity: 0, scale: 1.3 }}
                        exit={{}}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                    >
                        <div
                            className="w-14 h-14 rounded-full flex items-center justify-center"
                            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
                        >
                            {tapFlash === 'play' ? (
                                <svg className="w-7 h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            ) : (
                                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                                </svg>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Controls */}
            <motion.div
                className="absolute inset-x-0 bottom-0 z-20 px-3 pb-3 pt-0 flex flex-col gap-1.5"
                animate={{ opacity: showControls || !isPlaying ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ pointerEvents: showControls || !isPlaying ? 'auto' : 'none' }}
            >
                {/* Progress bar */}
                <div
                    ref={scrubRef}
                    onMouseDown={handleScrubMouseDown}
                    onTouchStart={handleScrubTouchStart}
                    className="relative cursor-pointer py-1.5"
                    style={{ touchAction: 'none' }}
                >
                    <div className="absolute inset-x-0 -top-3 -bottom-3" />
                    <div className="relative h-[4px] rounded-full overflow-visible" style={{ background: 'rgba(255,255,255,0.2)' }}>
                        <div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{ width: `${Math.min(progress + 15, 100)}%`, background: 'rgba(255,255,255,0.12)' }}
                        />
                        <div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{
                                width: `${progress}%`,
                                background: 'linear-gradient(90deg, #F5A623, #e09610)',
                            }}
                        />
                        <div
                            className="absolute top-1/2 w-3.5 h-3.5 rounded-full shadow-md"
                            style={{
                                left: `${progress}%`,
                                transform: 'translateX(-50%) translateY(-50%)',
                                background: '#F5A623',
                                boxShadow: '0 0 8px rgba(245,166,35,0.8), 0 2px 4px rgba(0,0,0,0.4)',
                            }}
                        />
                    </div>
                </div>

                {/* Controls row */}
                <div className="flex items-center gap-2">
                    {/* Play / Pause */}
                    <button
                        onClick={togglePlay}
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-md"
                        style={{ background: 'linear-gradient(135deg, #F5A623, #e09610)', boxShadow: '0 4px 12px rgba(245,166,35,0.4)' }}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? (
                            <svg className="w-3.5 h-3.5" fill="#0d1730" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                            </svg>
                        ) : (
                            <svg className="w-3.5 h-3.5 ml-0.5" fill="#0d1730" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>

                    {/* Time */}
                    <span className="text-[10px] text-white/70 tabular-nums font-medium flex-shrink-0">
                        {fmt(currentTime)} / {fmt(duration)}
                    </span>

                    {/* Volume toggle */}
                    <div className="flex-1 flex items-center gap-1.5 min-w-0">
                        <button
                            className="flex-shrink-0 text-white active:scale-90 transition-transform p-0.5"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMuted(m => !m);
                                if (isMuted) setVolume(v => v || 80);
                            }}
                            aria-label={isMuted ? 'Unmute' : 'Mute'}
                        >
                            {isMuted ? (
                                <svg className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                </svg>
                            ) : (
                                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                </svg>
                            )}
                        </button>

                        <div className="hidden xs:flex flex-1 items-center min-w-0">
                            <VolumeSlider
                                value={isMuted ? 0 : (volume || 80)}
                                onChange={(v) => { setVolume(v); if (v > 0) setIsMuted(false); else setIsMuted(true); }}
                            />
                        </div>
                    </div>

                    {/* Waveform */}
                    <div className="flex-shrink-0">
                        <Waveform active={isPlaying && !isMuted} />
                    </div>

                    {/* Fullscreen / Enlarge Button */}
                    <button
                        onClick={openLightbox}
                        className="flex-shrink-0 text-white/70 hover:text-white active:scale-90 transition-all p-1"
                        aria-label="Enlarge reel"
                        title="Enlarge reel"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                    </button>
                </div>
            </motion.div>

            {/* Lightbox Modal rendered via Portal to document.body */}
            {isLightbox && typeof document !== 'undefined' && createPortal(
                <LightboxModal
                    src={src}
                    badgeText={badgeText}
                    initialTime={currentTime}
                    initialPlaying={isPlaying}
                    volume={volume}
                    isMuted={isMuted}
                    onClose={closeLightbox}
                />,
                document.body
            )}
        </div>
    );
}
