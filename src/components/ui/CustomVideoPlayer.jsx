import { useState, useRef, useEffect } from 'react';
import SloshGauge from '../ui/SloshGauge';

export default function CustomVideoPlayer({ src }) {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0); // Muted by default
    const [isLightbox, setIsLightbox] = useState(false);
    const [showUnmutePrompt, setShowUnmutePrompt] = useState(false);
    const [isInView, setIsInView] = useState(false);

    // Handle intersection observer to play/pause based on visibility
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% of the video is in view
        };

        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            setIsInView(entry.isIntersecting);
            
            if (entry.isIntersecting) {
                videoRef.current?.play().catch(e => console.log("Autoplay blocked"));
                setIsPlaying(true);
            } else {
                videoRef.current?.pause();
                setIsPlaying(false);
            }
        }, options);

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    // Handle the 3-second unmute prompt
    useEffect(() => {
        let timeout;
        if (isInView && volume === 0) {
            timeout = setTimeout(() => {
                setShowUnmutePrompt(true);
            }, 3000);
        } else {
            setShowUnmutePrompt(false);
        }

        return () => clearTimeout(timeout);
    }, [isInView, volume]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume / 100;
            videoRef.current.muted = volume === 0;
            
            // If user unmuted, hide the prompt
            if (volume > 0) {
                setShowUnmutePrompt(false);
            }
        }
    }, [volume]);

    // Handle body class for hiding navbar
    useEffect(() => {
        if (isLightbox) {
            document.body.classList.add('lightbox-active');
        } else {
            document.body.classList.remove('lightbox-active');
        }
        return () => document.body.classList.remove('lightbox-active');
    }, [isLightbox]);

    // Handle Escape key to close lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isLightbox) {
                setIsLightbox(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLightbox]);

    const togglePlay = (e) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleFullscreen = (e) => {
        e.stopPropagation();
        setIsLightbox(!isLightbox);
    };
    
    const handleOverlayClick = (e) => {
        if (isLightbox && e.target === containerRef.current) {
            setIsLightbox(false);
        }
    };

    return (
        <div 
            ref={containerRef}
            onClick={handleOverlayClick}
            className={isLightbox 
                ? "fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center transition-all duration-300"
                : "relative w-full h-full group transition-all duration-300"
            }
        >
            {isLightbox && (
                <button 
                    onClick={() => setIsLightbox(false)}
                    className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            )}

            <div className={`relative bg-black overflow-hidden shadow-2xl group transition-all duration-300 ${isLightbox ? 'h-full aspect-[9/16] rounded-3xl max-w-full' : 'w-full h-full rounded-3xl'}`}>
                
                {/* Reel indicator overlay */}
                <div className={`absolute top-4 left-4 z-20 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 pointer-events-none transition-opacity duration-300 ${isLightbox ? 'opacity-0' : 'opacity-100'}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400 animate-pulse">
                        <polygon points="23 7 16 12 23 17 23 7"></polygon>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                    </svg>
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                        Reel
                    </span>
                </div>

                {/* Unmute Prompt */}
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setVolume(100);
                    }}
                    className={`absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-amber-400 text-navy-900 font-bold px-4 py-2 rounded-full shadow-lg transition-all duration-500 transform hover:scale-105 active:scale-95 ${showUnmutePrompt ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95 pointer-events-none'}`}
                >
                    <div className="flex items-center gap-2 text-sm pointer-events-none">
                        <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                        Tap to Unmute
                    </div>
                </button>

                <video
                    ref={videoRef}
                    src={src}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={togglePlay}
                    playsInline
                    loop
                />
                
                {/* Controls Overlay */}
                <div className={`absolute inset-0 transition-opacity duration-300 flex flex-col justify-end p-2 sm:p-3 pointer-events-none ${!isPlaying || isLightbox ? 'opacity-100 bg-black/20' : 'opacity-0 sm:group-hover:opacity-100 sm:group-hover:bg-black/20'}`}>
                    
                    <div className="flex items-center bg-navy-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 pointer-events-auto shadow-lg mx-auto w-max gap-3 sm:gap-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Play/Pause Button */}
                            <button 
                                onClick={togglePlay}
                                className="w-8 h-8 rounded-full bg-amber-400 text-navy-900 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform flex-shrink-0 shadow-md"
                            >
                                {isPlaying ? (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
                                ) : (
                                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                )}
                            </button>

                            {/* Volume Icon + SloshGauge Inline */}
                            <div className="flex items-center gap-1.5">
                                <button 
                                    className="text-white hover:text-amber-400 transition-colors p-0.5"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setVolume(volume === 0 ? 100 : 0);
                                    }}
                                >
                                    {volume === 0 ? (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                                    )}
                                </button>

                                <SloshGauge
                                    value={volume}
                                    onChange={setVolume}
                                    interactive={true}
                                    orientation="horizontal"
                                    width={120}
                                    height={16}
                                    radius={8}
                                    ticks={0}
                                    glassColor="#1A2B5F"
                                    liquidColor="#FFFFFF"
                                />
                            </div>
                        </div>

                        {/* Fullscreen Button */}
                        <button 
                            onClick={toggleFullscreen}
                            className="text-white hover:text-amber-400 transition-colors p-1"
                        >
                            {isLightbox ? (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
