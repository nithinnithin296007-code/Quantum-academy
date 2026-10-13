import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

/* ── Animated waveform visualizer ───────────────────────────────── */
const BAR_HEIGHTS = [12, 18, 10, 16]; // base max-heights (px)

function Waveform({ active }) {
    return (
        <div className="flex items-end gap-[3px] h-[18px]">
            {BAR_HEIGHTS.map((maxH, i) => (
                <motion.div
                    key={i}
                    className="w-[3px] rounded-full bg-amber-400"
                    animate={active
                        ? { height: [2, maxH, 4, maxH * 0.7, 2] }
                        : { height: 2 }
                    }
                    transition={active ? {
                        duration: 0.8 + i * 0.12,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.1,
                    } : { duration: 0.2 }}
                />
            ))}
        </div>
    );
}
import SloshGauge from '../ui/SloshGauge';
import useIsMobile from '../../hooks/useIsMobile';

/* ── Helpers ─────────────────────────────────────────────────── */
const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
};

export default function CustomVideoPlayer({ src }) {
    const videoRef      = useRef(null);
    const containerRef  = useRef(null);
    const scrubRef      = useRef(null);
    const isDragging    = useRef(false);

    const [isPlaying,        setIsPlaying]        = useState(false);
    const [volume,           setVolume]            = useState(0);
    const [isLightbox,       setIsLightbox]        = useState(false);
    const [showUnmutePrompt, setShowUnmutePrompt]  = useState(false);
    const [isInView,         setIsInView]          = useState(false);
    const [currentTime,      setCurrentTime]       = useState(0);
    const [duration,         setDuration]          = useState(0);
    const isMobile = useIsMobile();

    /* ── Intersection observer — auto play/pause ── */
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting);
            if (entry.isIntersecting) {
                videoRef.current?.play().catch(() => {});
                setIsPlaying(true);
            } else {
                videoRef.current?.pause();
                setIsPlaying(false);
            }
        }, { threshold: 0.5 });

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    /* ── Video time / duration events ── */
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        const onTime = () => setCurrentTime(v.currentTime);
        const onMeta = () => setDuration(v.duration);
        v.addEventListener('timeupdate', onTime);
        v.addEventListener('loadedmetadata', onMeta);
        // If already loaded
        if (v.duration) setDuration(v.duration);
        return () => {
            v.removeEventListener('timeupdate', onTime);
            v.removeEventListener('loadedmetadata', onMeta);
        };
    }, []);

    /* ── Unmute prompt after 3 s ── */
    useEffect(() => {
        let t;
        if (isInView && volume === 0) t = setTimeout(() => setShowUnmutePrompt(true), 3000);
        else setShowUnmutePrompt(false);
        return () => clearTimeout(t);
    }, [isInView, volume]);

    /* ── Sync volume ── */
    useEffect(() => {
        if (!videoRef.current) return;
        videoRef.current.volume = volume / 100;
        videoRef.current.muted  = volume === 0;
        if (volume > 0) setShowUnmutePrompt(false);
    }, [volume]);

    /* ── Body class for lightbox ── */
    useEffect(() => {
        document.body.classList.toggle('lightbox-active', isLightbox);
        return () => document.body.classList.remove('lightbox-active');
    }, [isLightbox]);

    /* ── Escape key ── */
    useEffect(() => {
        const fn = (e) => { if (e.key === 'Escape' && isLightbox) setIsLightbox(false); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [isLightbox]);

    /* ── Seek helpers ── */
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
        const onUp   = ()   => { isDragging.current = false; };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp, { once: true });
        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', onMove);
        }, { once: true });
    };

    /* Touch seek */
    const handleScrubTouchStart = (e) => {
        e.stopPropagation();
        seekToRatio(e.touches[0].clientX);
        const onMove = (ev) => seekToRatio(ev.touches[0].clientX);
        const onEnd  = ()   => window.removeEventListener('touchmove', onMove);
        window.addEventListener('touchmove', onMove);
        window.addEventListener('touchend', onEnd, { once: true });
    };

    const togglePlay = (e) => {
        e.stopPropagation();
        if (!videoRef.current) return;
        if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
        else           { videoRef.current.play();  setIsPlaying(true);  }
    };

    const toggleFullscreen = (e) => { e.stopPropagation(); setIsLightbox(v => !v); };

    const handleOverlayClick = (e) => {
        if (isLightbox && e.target === containerRef.current) setIsLightbox(false);
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div
            ref={containerRef}
            onClick={handleOverlayClick}
            className={isLightbox
                ? 'fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center transition-all duration-300'
                : 'relative w-full h-full group transition-all duration-300'
            }
        >
            {/* Lightbox close */}
            {isLightbox && (
                <button
                    onClick={() => setIsLightbox(false)}
                    className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}

            <div className={`relative bg-black overflow-hidden shadow-2xl group transition-all duration-300 ${isLightbox ? 'h-full aspect-[9/16] rounded-3xl max-w-full' : 'w-full h-full rounded-3xl'}`}>

                {/* Reel badge */}
                <div className={`absolute top-4 left-4 z-20 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 pointer-events-none transition-opacity duration-300 ${isLightbox ? 'opacity-0' : 'opacity-100'}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400 animate-pulse">
                        <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Reel</span>
                </div>

                {/* Unmute prompt */}
                <button
                    onClick={(e) => { e.stopPropagation(); setVolume(100); }}
                    className={`absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-amber-400 text-navy-900 font-bold px-4 py-2 rounded-full shadow-lg transition-all duration-500 transform hover:scale-105 active:scale-95 ${showUnmutePrompt ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95 pointer-events-none'}`}
                >
                    <div className="flex items-center gap-2 text-sm pointer-events-none">
                        <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                        Tap to Unmute
                    </div>
                </button>

                {/* Video */}
                <video
                    ref={videoRef}
                    src={src}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={isMobile ? undefined : togglePlay}
                    playsInline
                    loop
                />

                {/* ── Controls overlay ── */}
                <div className={`absolute inset-0 transition-opacity duration-300 flex flex-col justify-end pointer-events-none
                    ${(!isPlaying || isLightbox) ? 'opacity-100 bg-black/20' : 'opacity-100 sm:opacity-0 sm:group-hover:opacity-100 bg-transparent sm:group-hover:bg-black/20'}`}>

                    {/* Control card — two-row pill */}
                    <div className="mx-2 sm:mx-3 mb-2 sm:mb-3 pointer-events-auto
                                    bg-navy-900/90 backdrop-blur-md
                                    rounded-2xl border border-white/10 shadow-lg
                                    px-3 py-2 flex flex-col gap-2">

                        {/* ── Row 1: Scrubber + timestamps ── */}
                        <div className="flex items-center gap-2">
                            {/* Current time */}
                            <span className="text-[9px] sm:text-[10px] text-white/60 tabular-nums font-medium w-7 text-right flex-shrink-0">
                                {fmt(currentTime)}
                            </span>

                            {/* Scrub track */}
                            <div
                                ref={scrubRef}
                                onMouseDown={handleScrubMouseDown}
                                onTouchStart={handleScrubTouchStart}
                                className="relative flex-1 h-1 sm:h-[5px] rounded-full bg-white/15 cursor-pointer group/scrub"
                            >
                                {/* Filled portion */}
                                <div
                                    className="absolute inset-y-0 left-0 rounded-full bg-amber-400 transition-none"
                                    style={{ width: `${progress}%` }}
                                />
                                {/* Buffered ghost (visual only) */}
                                <div
                                    className="absolute inset-y-0 left-0 rounded-full bg-white/20 -z-10"
                                    style={{ width: `${Math.min(progress + 12, 100)}%` }}
                                />
                                {/* Thumb dot */}
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2
                                               w-3 h-3 rounded-full bg-amber-400 shadow-md
                                               opacity-0 group-hover/scrub:opacity-100 transition-opacity duration-150"
                                    style={{ left: `${progress}%` }}
                                />
                            </div>

                            {/* Duration */}
                            <span className="text-[9px] sm:text-[10px] text-white/40 tabular-nums font-medium w-7 flex-shrink-0">
                                {fmt(duration)}
                            </span>
                        </div>

                        {/* ── Row 2: Play | Volume gauge | Fullscreen ── */}
                        <div className="flex items-center gap-2 sm:gap-3">

                            {/* Play/Pause */}
                            <button
                                onClick={togglePlay}
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-400 text-navy-900 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform flex-shrink-0 shadow-md"
                            >
                                {isPlaying ? (
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </button>

                            {/* Volume icon + SloshGauge */}
                            <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                <button
                                    className="text-white hover:text-amber-400 transition-colors p-0.5 flex-shrink-0"
                                    onClick={(e) => { e.stopPropagation(); setVolume(volume === 0 ? 100 : 0); }}
                                >
                                    {volume === 0 ? (
                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                        </svg>
                                    ) : (
                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                        </svg>
                                    )}
                                </button>
                                <SloshGauge
                                    value={volume}
                                    onChange={setVolume}
                                    interactive={true}
                                    orientation="horizontal"
                                    width={90}
                                    height={14}
                                    radius={7}
                                    ticks={0}
                                    glassColor="#1A2B5F"
                                    liquidColor="#FFFFFF"
                                />
                            </div>

                            {/* Waveform visualizer — active when playing with audio */}
                            <div className="flex-1 flex justify-center">
                                <Waveform active={isPlaying && volume > 0} />
                            </div>

                            {/* Fullscreen */}
                            <button
                                onClick={toggleFullscreen}
                                className="text-white hover:text-amber-400 transition-colors p-1 flex-shrink-0"
                            >
                                {isLightbox ? (
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                ) : (
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
