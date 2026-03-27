'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import type { DeckMeta } from '@/lib/deckData';
import { DeckSlide } from './DeckSlide';

const CONTROL_HIDE_DELAY_MS = 2500;

interface DeckViewProps {
  deck: DeckMeta;
}

export function DeckView({ deck }: DeckViewProps) {
  const [index, setIndex] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOrientationPrompt, setShowOrientationPrompt] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const slides = deck.slides;
  const total = slides.length;
  const slide = slides[index];

  const goPrev = useCallback(() => {
    setIndex((i) => (i <= 0 ? total - 1 : i - 1));
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((i) => (i >= total - 1 ? 0 : i + 1));
  }, [total]);

  const goTo = useCallback((i: number) => {
    setIndex(Math.max(0, Math.min(i, total - 1)));
  }, [total]);

  const showControls = useCallback(() => {
    setControlsVisible(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    hideTimeoutRef.current = setTimeout(() => {
      setControlsVisible(false);
      hideTimeoutRef.current = null;
    }, CONTROL_HIDE_DELAY_MS);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  const handleDownload = useCallback(() => {
    window.print();
  }, []);

  // Keyboard nav
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
        showControls();
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goNext();
        showControls();
        return;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goPrev, goNext, showControls]);

  // Fullscreen change (user can exit via ESC)
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Orientation / viewport: prompt on narrow portrait (mobile)
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isNarrow = w < 768;
      const isPortrait = h > w;
      setShowOrientationPrompt(isNarrow && isPortrait);
    };
    check();
    window.addEventListener('resize', check);
    window.addEventListener('orientationchange', check);
    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('orientationchange', check);
    };
  }, []);

  // Show controls briefly on mount so user discovers them
  useEffect(() => {
    setControlsVisible(true);
    const t = setTimeout(() => setControlsVisible(false), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  if (!slide) return null;

  return (
    <div
      ref={containerRef}
      className="deck-view relative w-full h-screen min-h-[100dvh] bg-gray-50 overflow-hidden flex flex-col print:hidden"
      onMouseMove={showControls}
      onMouseLeave={() => setControlsVisible(false)}
      onTouchStart={() => {
        showControls();
      }}
    >
      {/* Orientation prompt: mobile portrait */}
      {showOrientationPrompt && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-gray-900/90 p-6"
          role="dialog"
          aria-live="polite"
          aria-label="Rotate device"
        >
          <p className="font-display text-center text-lg uppercase tracking-wide text-white max-w-[280px]">
            Turn your device for a better experience
          </p>
        </div>
      )}

      {/* Print-only: all slides for PDF */}
      <div className="deck-print-layer hidden print:block">
        {slides.map((s) => (
          <DeckSlide key={s.id} slide={s} isolated />
        ))}
      </div>

      {/* Screen: one slide, full viewport */}
      <div className="deck-screen-main flex-1 min-h-0 flex items-center justify-center overflow-auto">
        <div className="w-full max-w-5xl mx-auto deck-slide-container">
          <DeckSlide slide={slide} />
        </div>
      </div>

      {/* Center-bottom control bar: hover-reveal, Netflix/YouTube style */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 px-4 py-3 rounded-t-sm bg-gray-900/85 backdrop-blur-sm border border-gray-700/50 border-b-0 transition-opacity duration-300 ${
          controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!controlsVisible}
      >
        <button
          type="button"
          onClick={() => {
            goPrev();
            showControls();
          }}
          className="p-2 text-gray-300 hover:text-white transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={slides[i].id}
              type="button"
              onClick={() => {
                goTo(i);
                showControls();
              }}
              className={`rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                i === index
                  ? 'w-2 h-2 bg-white'
                  : 'w-1.5 h-1.5 bg-gray-500 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            goNext();
            showControls();
          }}
          className="p-2 text-gray-300 hover:text-white transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        <div className="w-px h-5 bg-gray-600" aria-hidden />

        <button
          type="button"
          onClick={() => {
            toggleFullscreen();
            showControls();
          }}
          className="p-2 text-gray-300 hover:text-white transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            handleDownload();
            showControls();
          }}
          className="p-2 text-gray-300 hover:text-white transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          aria-label="Download as PDF"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
