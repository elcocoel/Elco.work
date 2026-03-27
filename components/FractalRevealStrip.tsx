/**
 * Reusable **Fractal reveal** illustration strip (same motion as `/homealt` hero).
 * @see `components/homealt/homeAltHeroStripConfig.ts` — timings and default frames.
 */
'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { useEffect, useId, useMemo, useState } from 'react';
import { SOLUTION_CARD_IMAGE_SOFT_GRADIENT_STYLE } from '../lib/solutionCardImageGradients';
import {
  getStripObjectPosition,
  HOME_ALT_HERO_STRIP_FRAMES,
  HOME_ALT_STRIP_COL_STAGGER_MS,
  HOME_ALT_STRIP_COL_WIPE_MS,
  HOME_ALT_STRIP_HOLD_MS,
  HOME_ALT_STRIP_INNER_SCALE_PERCENT,
  HOME_ALT_STRIP_REVEAL_MS,
  HOME_ALT_STRIP_SCAN_COLS,
  HOME_ALT_STRIP_SETTLE_MS,
  type HomeAltHeroStripFrame,
} from './homealt/homeAltHeroStripConfig';

const MQ_LG = '(min-width: 1024px)';

function useIsLgViewport() {
  const [isLg, setIsLg] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(MQ_LG);
    const sync = () => setIsLg(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return isLg;
}

export type FractalRevealStripLayout = 'hero' | 'banner' | 'cell' | 'card';

const LAYOUT_SIZES: Record<FractalRevealStripLayout, string> = {
  hero: '(max-width: 640px) 100vw, (max-width: 1024px) 48rem, 72rem',
  banner: '(max-width: 1024px) 100vw, min(100%, 72rem)',
  cell: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px',
  card: '(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 280px',
};

function StripFigure({
  frames,
  frameIndex,
  glitching,
  showOutgoingTop,
  stripScanKey,
  layout,
  cardShell,
  sizes,
  imagePriority,
  innerScalePercent,
  caption,
  figureClassName,
}: {
  frames: readonly HomeAltHeroStripFrame[];
  frameIndex: number;
  glitching: boolean;
  showOutgoingTop: boolean;
  stripScanKey: number;
  layout: FractalRevealStripLayout;
  /** When `layout="card"` or `layout="banner"`: `flush` = no inner radius/ring (parent provides unified frame). */
  cardShell?: 'standalone' | 'flush';
  sizes: string;
  imagePriority: boolean;
  innerScalePercent: number;
  caption: string;
  figureClassName?: string;
}) {
  const n = frames.length;
  const current = frames[frameIndex % n]!;
  const next = frames[(frameIndex + 1) % n]!;
  const isLg = useIsLgViewport();
  const objectPositionCurrent = getStripObjectPosition(current, isLg);
  const objectPositionNext = getStripObjectPosition(next, isLg);
  const maskIdRaw = useId();
  const maskId = maskIdRaw.replace(/:/g, '');

  const colWidth = 1 / HOME_ALT_STRIP_SCAN_COLS;

  const cssVars = {
    '--home-alt-strip-reveal-ms': `${HOME_ALT_STRIP_REVEAL_MS}ms`,
    '--home-alt-strip-settle-ms': `${HOME_ALT_STRIP_SETTLE_MS}ms`,
    '--home-alt-strip-glitch-total-ms': `${HOME_ALT_STRIP_REVEAL_MS + HOME_ALT_STRIP_SETTLE_MS}ms`,
  } as CSSProperties;

  /** Same outer radius + ring as home hero (`layout="hero"`) — used for `/framework` card + banner too. */
  const heroShellRingClass =
    'rounded-lg bg-gray-100 shadow-[0_0_0_1px_rgb(0_0_0/0.2),inset_0_0_0_1px_rgb(0_0_0/0.12)]';

  const cardShellClass =
    cardShell === 'flush'
      ? 'relative h-full min-h-0 overflow-hidden bg-gray-100'
      : `relative h-full min-h-0 overflow-hidden ${heroShellRingClass}`;

  const bannerShellClass =
    cardShell === 'flush'
      ? 'relative overflow-hidden bg-gray-100'
      : `relative overflow-hidden ${heroShellRingClass}`;

  const shellClass =
    layout === 'hero'
      ? `relative overflow-hidden ${heroShellRingClass}`
      : layout === 'card'
        ? cardShellClass
        : layout === 'banner'
          ? bannerShellClass
          : 'overflow-hidden rounded-sm border border-gray-100 bg-gray-100 shadow-[0_0_0_1px_rgb(0_0_0/0.12),inset_0_0_0_1px_rgb(0_0_0/0.08)]';

  const showSolutionSoftGradient =
    layout === 'hero' || layout === 'banner' || layout === 'card';

  const viewportClass =
    layout === 'hero'
      ? 'relative aspect-[4/3] max-h-[30vh] w-full overflow-hidden lg:max-h-none lg:aspect-auto lg:h-[calc(13.5rem*1.15)]'
      : layout === 'banner'
        ? 'relative h-32 w-full overflow-hidden sm:h-36 lg:h-[calc(13.5rem*1.15)]'
        : layout === 'card'
          ? 'relative h-full min-h-0 w-full overflow-hidden'
          : 'relative h-24 w-full overflow-hidden';

  const figureLayoutClass =
    layout === 'card' ? 'flex h-full min-h-0 flex-col' : '';

  return (
    <figure
      className={['m-0 w-full', figureLayoutClass, figureClassName ?? '']
        .filter(Boolean)
        .join(' ')}
      data-strip-frame={current.id}
    >
      <div className={shellClass}>
        <div className={viewportClass}>
          <div
            className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `${innerScalePercent}%`,
              height: `${innerScalePercent}%`,
            }}
          >
            <div
              className={[
                'relative h-full w-full',
                glitching ? 'home-alt-strip-glitch-phase' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={cssVars}
            >
              {glitching && showOutgoingTop ? (
                <>
                  <svg
                    key={stripScanKey}
                    className="pointer-events-none absolute h-0 w-0 overflow-hidden"
                    aria-hidden
                  >
                    <defs>
                      <mask
                        id={maskId}
                        maskUnits="objectBoundingBox"
                        maskContentUnits="objectBoundingBox"
                      >
                        <rect width="1" height="1" fill="black" />
                        {Array.from({ length: HOME_ALT_STRIP_SCAN_COLS }, (_, i) => (
                          <g
                            key={i}
                            transform={`translate(${i * colWidth} 0)`}
                            className="home-alt-strip-mask-col"
                            style={{
                              transformOrigin: '100% 50%',
                              animationDelay: `${i * HOME_ALT_STRIP_COL_STAGGER_MS}ms`,
                              animationDuration: `${HOME_ALT_STRIP_COL_WIPE_MS}ms`,
                            }}
                          >
                            <rect width={colWidth} height="1" fill="white" />
                          </g>
                        ))}
                      </mask>
                    </defs>
                  </svg>
                  <div className="home-alt-strip-incoming-under absolute inset-0 z-0">
                    <Image
                      src={next.src}
                      alt=""
                      fill
                      className="object-cover"
                      style={{ objectPosition: objectPositionNext }}
                      sizes={sizes}
                      priority={false}
                    />
                  </div>
                  <div
                    className="home-alt-strip-outgoing-reveal pointer-events-none absolute inset-0 z-[1]"
                    style={
                      {
                        WebkitMask: `url(#${maskId})`,
                        mask: `url(#${maskId})`,
                      } as CSSProperties
                    }
                  >
                    <Image
                      src={current.src}
                      alt=""
                      fill
                      className="object-cover"
                      style={{ objectPosition: objectPositionCurrent }}
                      sizes={sizes}
                      priority={false}
                    />
                  </div>
                </>
              ) : (
                <div
                  className={[
                    'relative h-full w-full',
                    glitching ? 'home-alt-strip-incoming-settle' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <Image
                    src={current.src}
                    alt=""
                    fill
                    className="object-cover"
                    style={{ objectPosition: objectPositionCurrent }}
                    sizes={sizes}
                    priority={imagePriority}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {showSolutionSoftGradient && (
          <span
            className="pointer-events-none absolute inset-0 z-10"
            style={SOLUTION_CARD_IMAGE_SOFT_GRADIENT_STYLE}
            aria-hidden
          />
        )}
      </div>
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}

export type FractalRevealStripProps = {
  /** Defaults to brand strip frames from home alt config. */
  frames?: readonly HomeAltHeroStripFrame[];
  layout?: FractalRevealStripLayout;
  /**
   * When `layout="card"` or `layout="banner"`: `flush` removes inner radius + ring so a parent can wrap illo + copy in one frame.
   */
  cardShell?: 'standalone' | 'flush';
  /** Starting frame in `frames` (cycles forward). */
  initialFrameIndex?: number;
  /** Post-mount delay before the first hold→reveal loop begins (ms). */
  startDelayMs?: number;
  className?: string;
  /** Screen-reader-only caption; defaults to focal note of current frame. */
  caption?: string;
  /** Override default inner zoom (see config). */
  innerScalePercent?: number;
};

export function FractalRevealStrip({
  frames = HOME_ALT_HERO_STRIP_FRAMES,
  layout = 'hero',
  cardShell = 'standalone',
  initialFrameIndex = 0,
  startDelayMs = 0,
  className = '',
  caption,
  innerScalePercent = HOME_ALT_STRIP_INNER_SCALE_PERCENT,
}: FractalRevealStripProps) {
  const n = frames.length;
  const normalizedInitial = useMemo(
    () => ((initialFrameIndex % n) + n) % n,
    [initialFrameIndex, n],
  );

  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [frameIndex, setFrameIndex] = useState(normalizedInitial);
  const [glitching, setGlitching] = useState(false);
  const [showOutgoingTop, setShowOutgoingTop] = useState(false);
  const [stripScanKey, setStripScanKey] = useState(0);

  useEffect(() => {
    setFrameIndex(normalizedInitial);
  }, [normalizedInitial]);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const pending: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, ms: number) => {
      pending.push(setTimeout(fn, ms));
    };

    const cycle = () => {
      schedule(() => {
        setStripScanKey((k) => k + 1);
        setGlitching(true);
        setShowOutgoingTop(true);
        schedule(() => {
          setFrameIndex((i) => (i + 1) % n);
          setShowOutgoingTop(false);
          schedule(() => {
            setGlitching(false);
            cycle();
          }, HOME_ALT_STRIP_SETTLE_MS);
        }, HOME_ALT_STRIP_REVEAL_MS);
      }, HOME_ALT_STRIP_HOLD_MS);
    };

    if (startDelayMs > 0) {
      schedule(cycle, startDelayMs);
    } else {
      cycle();
    }

    return () => pending.forEach(clearTimeout);
  }, [mounted, reducedMotion, n, startDelayMs]);

  const sizes = LAYOUT_SIZES[layout];
  const imagePriority = layout === 'hero' && frameIndex === 0;

  const displayIndex =
    !mounted || reducedMotion ? normalizedInitial : frameIndex;
  const displayFrame = frames[displayIndex % n]!;
  const cap =
    caption ??
    `Illustration frame ${displayFrame.id}. Focal ${displayFrame.focalX}% horizontal, ${displayFrame.focalY}% vertical.${displayFrame.focalNote ? ` ${displayFrame.focalNote}` : ''}`;

  if (!mounted) {
    return (
      <StripFigure
        frames={frames}
        frameIndex={normalizedInitial}
        glitching={false}
        showOutgoingTop={false}
        stripScanKey={0}
        layout={layout}
        cardShell={cardShell}
        sizes={sizes}
        imagePriority={false}
        innerScalePercent={innerScalePercent}
        caption={cap}
        figureClassName={className}
      />
    );
  }

  if (reducedMotion) {
    return (
      <StripFigure
        frames={frames}
        frameIndex={normalizedInitial}
        glitching={false}
        showOutgoingTop={false}
        stripScanKey={0}
        layout={layout}
        cardShell={cardShell}
        sizes={sizes}
        imagePriority={false}
        innerScalePercent={innerScalePercent}
        caption={cap}
        figureClassName={className}
      />
    );
  }

  return (
    <StripFigure
      frames={frames}
      frameIndex={frameIndex}
      glitching={glitching}
      showOutgoingTop={showOutgoingTop}
      stripScanKey={stripScanKey}
      layout={layout}
      cardShell={cardShell}
      sizes={sizes}
      imagePriority={imagePriority}
      innerScalePercent={innerScalePercent}
      caption={cap}
      figureClassName={className}
    />
  );
}
