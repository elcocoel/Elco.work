'use client';

import { useEffect, useRef, useState } from 'react';
import { getYouTubeVideoId, isLocalVideoUrl, useYouTubeThumbnailUrl } from '@/lib/youtube';
import { PlayOverlay } from './ui/PlayOverlay';

export interface GalleryOverhaulItem {
  id: string;
  section: string;
  type: 'image' | 'video' | 'file';
  title: string;
  description: string;
  src: string;
  alt?: string;
  filename?: string;
}

function normalizePdf(url: string): boolean {
  try {
    const pathname = new URL(url).pathname.toLowerCase();
    return pathname.endsWith('.pdf');
  } catch {
    return url.toLowerCase().includes('.pdf');
  }
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selectors = [
    'button:not([disabled])',
    'a[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');
  return Array.from(container.querySelectorAll<HTMLElement>(selectors)).filter(
    (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
  );
}

interface GalleryOverhaulModalProps {
  open: boolean;
  items: GalleryOverhaulItem[];
  index: number;
  progressRatio: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (nextIndex: number) => void;
  /** When YouTube thumbnail probe fails (e.g. private video), use this image as fallback. */
  heroFallbackUrl?: string | null;
}

export function GalleryOverhaulModal({
  open,
  items,
  index,
  progressRatio,
  onClose,
  onPrev,
  onNext,
  onSelectIndex,
  heroFallbackUrl,
}: GalleryOverhaulModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const mediaContainerRef = useRef<HTMLDivElement | null>(null);

  // Zoom/pan state (images only) — max scale 1.5 (50%), min 1
  const ZOOM_MAX = 1.5;
  const ZOOM_MIN = 1;
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [transformOrigin, setTransformOrigin] = useState<string>('center');
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageTransformRef = useRef<HTMLDivElement | null>(null);
  const swipeRef = useRef<{ x: number; t: number } | null>(null);

  const item = items[index];
  const isYouTubeVideo = item?.type === 'video' && getYouTubeVideoId(item.src);
  const isLocalVideo = item?.type === 'video' && isLocalVideoUrl(item.src);
  const youtubeThumb = useYouTubeThumbnailUrl(
    isYouTubeVideo ? item!.src : null,
    isYouTubeVideo ? heroFallbackUrl : undefined
  );

  useEffect(() => {
    if (!open) {
      setPlayingVideoId(null);
      return;
    }
    closeBtnRef.current?.focus();
  }, [open]);

  useEffect(() => {
    setPlayingVideoId(null);
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    setTransformOrigin('center');
    setIsPanning(false);
  }, [index]);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const CLICK_MOVE_THRESHOLD = 5;
  const MAX_OVERSCROLL_PX = 60; // reference the current right-side feel

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (item?.type !== 'image' || reducedMotion) return;
    if (e.button !== 0) return;
    setIsPanning(true);
    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      tx: translate.x,
      ty: translate.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  function getPanBounds(): { minX: number; maxX: number; minY: number; maxY: number } {
    const container = imageContainerRef.current;
    const content = imageTransformRef.current;
    if (!container || !content) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    const cr = container.getBoundingClientRect();
    const tr = content.getBoundingClientRect();
    const cw = cr.width;
    const ch = cr.height;
    const tw = tr.width;
    const th = tr.height;
    const minX = tw > cw ? -(tw - cw) / 2 : 0;
    const maxX = tw > cw ? (tw - cw) / 2 : 0;
    const minY = th > ch ? -(th - ch) / 2 : 0;
    const maxY = th > ch ? (th - ch) / 2 : 0;
    return { minX, maxX, minY, maxY };
  }

  function applyResistance(value: number, low: number, high: number): number {
    if (value >= low && value <= high) return value;
    if (value > high) {
      const overflow = value - high;
      return high + Math.min(Math.sqrt(overflow) * 3, MAX_OVERSCROLL_PX);
    }
    const overflow = low - value;
    return low - Math.min(Math.sqrt(overflow) * 3, MAX_OVERSCROLL_PX);
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPanning || item?.type !== 'image') return;
    const rawX = panStartRef.current.tx + (e.clientX - panStartRef.current.x);
    const rawY = panStartRef.current.ty + (e.clientY - panStartRef.current.y);
    const { minX, maxX, minY, maxY } = getPanBounds();
    let displayX = rawX;
    let displayY = rawY;
    displayX = applyResistance(rawX, minX, maxX);
    displayY = applyResistance(rawY, minY, maxY);
    setTranslate({ x: displayX, y: displayY });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    const dx = Math.abs(e.clientX - panStartRef.current.x);
    const dy = Math.abs(e.clientY - panStartRef.current.y);
    const moved = dx > CLICK_MOVE_THRESHOLD || dy > CLICK_MOVE_THRESHOLD;
    setIsPanning(false);
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);

    if (moved && item?.type === 'image') {
      const { minX, maxX, minY, maxY } = getPanBounds();
      setTranslate({
        x: Math.max(minX, Math.min(maxX, translate.x)),
        y: Math.max(minY, Math.min(maxY, translate.y)),
      });
    } else if (!moved && item?.type === 'image' && !reducedMotion) {
      const inner = imageTransformRef.current;
      const container = imageContainerRef.current;
      if (inner && container) {
        const innerRect = inner.getBoundingClientRect();
        const originX = e.clientX - innerRect.left;
        const originY = e.clientY - innerRect.top;
        if (scale === 1) {
          setTransformOrigin(`${originX}px ${originY}px`);
          setScale(ZOOM_MAX);
        } else {
          setTransformOrigin('center');
          setScale(1);
          setTranslate({ x: 0, y: 0 });
        }
      }
    }
  };

  useEffect(() => {
    const el = imageContainerRef.current;
    if (!el || item?.type !== 'image' || reducedMotion) return;
    const onWheel = (e: WheelEvent) => {
      const isTall = el.scrollHeight > el.clientHeight;
      if (isTall) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.05 : 0.05;
      setScale((s) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, s + delta)));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [item?.type, reducedMotion, open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onPrev();
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNext();
        return;
      }
      if ((event.key === ' ' || event.key === 'Enter') && item?.type === 'video') {
        event.preventDefault();
        setPlayingVideoId((current) => (current === item.id ? null : item.id));
      }
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = getFocusableElements(dialogRef.current);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [item, onClose, onNext, onPrev, open]);

  if (!open || !item) return null;

  const isPdf = item.type === 'file' && normalizePdf(item.src);
  const sectionLabel = item.section.charAt(0).toUpperCase() + item.section.slice(1);
  const isVideoPlaying = playingVideoId === item.id;
  const zoomedImage = item.type === 'image' && scale > 1.02;

  const onMediaTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    swipeRef.current = { x: e.touches[0].clientX, t: Date.now() };
  };

  const onMediaTouchEnd = (e: React.TouchEvent) => {
    const start = swipeRef.current;
    swipeRef.current = null;
    if (!start || e.changedTouches.length !== 1) return;
    if (zoomedImage || isPanning) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dt = Date.now() - start.t;
    if (dt > 900 || Math.abs(dx) < 56) return;
    if (dx < 0) onNext();
    else onPrev();
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-gray-900/25 backdrop-blur-[5px] transition-colors duration-200 motion-reduce:transition-none p-2 pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))] pl-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))] box-border"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Case study global gallery"
        className="relative mx-auto h-[min(100dvh-1rem,100%)] max-h-[min(100dvh-1rem,100%)] w-full max-w-[1600px] border border-gray-200 rounded-sm bg-gray-50/95 shadow-[0_14px_52px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.55)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile close — top-right, hidden on desktop where sidebar has the close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 z-10 lg:hidden inline-flex items-center justify-center h-9 w-9 border border-gray-300 rounded-sm text-gray-600 bg-gray-300 hover:bg-gray-400 hover:text-gray-700 active:bg-gray-500 active:text-white transition-colors duration-150 focus:outline-none"
          aria-label="Close gallery"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="flex flex-col-reverse lg:flex-row flex-1 min-h-0">
          {/* Sidebar: stacks below media on mobile, left on desktop */}
          <aside className="w-full lg:w-[300px] shrink-0 flex flex-col border-t lg:border-t-0 lg:border-r border-gray-200 bg-gray-50/95 max-h-[min(38vh,240px)] sm:max-h-[min(42vh,280px)] lg:max-h-none">
            <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="min-w-0">
                <p className="font-display text-xs uppercase tracking-widest text-gray-400 truncate">
                  {sectionLabel}
                </p>
                <h2 className="font-display text-sm uppercase tracking-wide text-black mt-0.5 truncate">
                  {item.title}
                </h2>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                className="shrink-0 inline-flex items-center justify-center h-10 w-10 border border-gray-300 rounded-sm text-gray-600 bg-gray-300 hover:bg-gray-400 hover:text-gray-700 active:bg-gray-500 active:text-white active:scale-[0.99] transition-colors transition-transform duration-150 focus:outline-none focus-visible:outline-none"
                aria-label="Close gallery"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden
                >
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* Context area: scrollable text + page number above function buttons */}
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4">
                <p className="font-display text-xs uppercase tracking-widest text-gray-400 mb-2">
                  Context
                </p>
                <p className="text-base leading-relaxed text-gray-700 whitespace-pre-wrap">
                  {item.description || '<n/a>'}
                </p>
              </div>
              <div className="shrink-0 flex justify-end pr-3 sm:pr-4 pb-2 pt-1">
                <p className="font-display text-xs uppercase tracking-widest text-gray-500">
                  {index + 1} / {items.length}
                </p>
              </div>
            </div>

            {/* Extra function buttons — fixed height, sectioned off; button fills area when present */}
            <div className="h-9 shrink-0 border-t border-gray-200 flex items-stretch bg-gray-50/50">
              {item.type === 'file' ? (
                <a
                  href={item.src}
                  download={item.filename}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center font-display text-xs uppercase tracking-wide text-gray-600 bg-gray-300 hover:bg-gray-400 hover:text-gray-700 active:bg-gray-500 active:text-white active:scale-[0.99] transition-colors transition-transform duration-150 focus:outline-none focus-visible:outline-none"
                >
                  Download
                </a>
              ) : (
                <span className="w-full h-full" aria-hidden />
              )}
            </div>

            <div className="border-t border-gray-200 p-3 sm:p-4 space-y-3">
              <div className="relative h-[3px] rounded-[2px] bg-gray-200/90 overflow-hidden shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
                <div
                  className="absolute inset-y-0 left-1/2 -translate-x-1/2 rounded-[2px] transition-[width] duration-200 motion-reduce:transition-none"
                  style={{
                    width: `${progressRatio * 100}%`,
                    background:
                      'linear-gradient(to right, rgba(156,163,175,0.33) 0%, rgba(156,163,175,1) 25%, rgba(156,163,175,1) 75%, rgba(156,163,175,0.33) 100%)',
                  }}
                  aria-hidden
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="grid grid-cols-2 gap-2 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={onPrev}
                    className="h-11 sm:h-9 w-full font-display text-xs uppercase tracking-wide text-gray-600 bg-gray-300 hover:bg-gray-400 hover:text-gray-700 active:bg-gray-500 active:text-white active:scale-[0.99] transition-colors transition-transform duration-150 rounded-sm focus:outline-none focus-visible:outline-none"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    className="h-11 sm:h-9 w-full font-display text-xs uppercase tracking-wide text-gray-600 bg-gray-300 hover:bg-gray-400 hover:text-gray-700 active:bg-gray-500 active:text-white active:scale-[0.99] transition-colors transition-transform duration-150 rounded-sm focus:outline-none focus-visible:outline-none"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 p-2.5 overflow-x-auto">
              <div className="flex gap-1 justify-center">
                {items.map((thumb, idx) => (
                  <button
                    key={thumb.id}
                    type="button"
                    onClick={() => onSelectIndex(idx)}
                    className={`h-1 w-1 rounded-full transition-colors shrink-0 ${
                      idx === index ? 'bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to item ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Media: full height, no top bar */}
          <div
            ref={mediaContainerRef}
            className="flex-1 min-w-0 min-h-0 flex flex-col bg-gray-100 overflow-hidden max-lg:min-h-[min(52dvh,420px)]"
            onTouchStart={onMediaTouchStart}
            onTouchEnd={onMediaTouchEnd}
          >
            <div className="flex-1 w-full min-h-[min(200px,35dvh)] flex items-center justify-center p-1.5 sm:p-2">
              {item.type === 'image' && (
                <div
                  ref={imageContainerRef}
                  className={`w-full h-full min-h-[min(200px,35dvh)] overflow-auto rounded-md border border-gray-100 shadow-[inset_0_0_24px_rgba(0,0,0,0.02)] flex items-center justify-center ${!reducedMotion ? 'cursor-grab active:cursor-grabbing' : ''}`}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerLeave={() => setIsPanning(false)}
                  style={{ touchAction: reducedMotion || scale > 1.01 ? 'none' : 'manipulation' }}
                >
                  <div
                    ref={imageTransformRef}
                    className="inline-block min-w-0"
                    style={{
                      transformOrigin: reducedMotion ? undefined : transformOrigin,
                      transform: reducedMotion
                        ? undefined
                        : `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
                      transition: reducedMotion ? undefined : 'transform 0.08s ease-out',
                    }}
                  >
                    <img
                      src={item.src}
                      alt={item.alt ?? item.title}
                      className="max-w-full min-h-[200px] w-auto object-contain object-center block select-none"
                      draggable={false}
                      style={{
                        maxHeight: 'min(72dvh, calc(100dvh - 14rem))',
                        pointerEvents: isPanning ? 'none' : undefined,
                      }}
                    />
                  </div>
                </div>
              )}

              {item.type === 'video' && (
                <div className="w-full h-full min-h-[min(200px,35dvh)] flex items-center justify-center">
                  {isLocalVideo ? (
                    <video
                      key={item.id}
                      src={item.src}
                      controls
                      playsInline
                      className="w-full max-w-full aspect-video rounded-lg border border-gray-200 shadow-[inset_0_0_24px_rgba(0,0,0,0.02)]"
                      title={item.title}
                    />
                  ) : !isVideoPlaying ? (
                    <button
                      type="button"
                      onClick={() => setPlayingVideoId(item.id)}
                      className="relative w-full max-w-full aspect-video rounded-lg overflow-hidden border border-gray-200 hover:border-black transition-colors block"
                    >
                      {youtubeThumb ? (
                        <img src={youtubeThumb} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-100" />
                      )}
                      <PlayOverlay />
                    </button>
                  ) : (
                    <iframe
                      key={item.id}
                      src={`${item.src}${item.src.includes('?') ? '&' : '?'}autoplay=1&modestbranding=1&rel=0`}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full max-w-full aspect-video rounded-lg border border-gray-200 shadow-[inset_0_0_24px_rgba(0,0,0,0.02)]"
                    />
                  )}
                </div>
              )}

              {item.type === 'file' && (
                <div className="w-full h-full min-h-[min(200px,35dvh)] border border-gray-100 rounded-md bg-white overflow-hidden flex flex-col shadow-[inset_0_0_24px_rgba(0,0,0,0.02)]">
                  <div className="border-b border-gray-100 px-4 py-2">
                    <p className="font-display text-xs uppercase tracking-widest text-gray-400">
                      Preview
                    </p>
                  </div>
                  <div className="flex-1 min-h-0">
                    {isPdf ? (
                      <iframe
                        src={item.src}
                        title={`${item.title} preview`}
                        className="w-full h-full min-h-[min(280px,45dvh)]"
                      />
                    ) : (
                      <div className="h-48 flex items-center justify-center bg-gray-100">
                        <p className="font-display text-xs uppercase tracking-widest text-gray-500">
                          {'<n/a>'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
