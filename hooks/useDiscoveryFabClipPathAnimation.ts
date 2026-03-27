'use client';

import { useEffect, type RefObject } from 'react';
import {
  buildWavyRadialBadgePathD,
  DISCOVERY_FAB_CLIP_DEFAULTS,
} from '@/lib/wavyRectClipPath';

const WAVE_RADIANS_PER_SEC = 2.35;

/**
 * Drives the discovery FAB clip-path `d` with rAF so React does not re-render every frame.
 * Respects `prefers-reduced-motion` (static phase 0).
 */
export function useDiscoveryFabClipPathAnimation(
  pathRef: RefObject<SVGPathElement | null>,
): void {
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const paint = (wavePhase: number) => {
      path.setAttribute(
        'd',
        buildWavyRadialBadgePathD({ ...DISCOVERY_FAB_CLIP_DEFAULTS, wavePhase }),
      );
    };

    paint(0);

    if (mq.matches) {
      return;
    }

    const start = performance.now();
    let raf = 0;

    const loop = (now: number) => {
      if (mq.matches) {
        paint(0);
        return;
      }
      const wavePhase = ((now - start) / 1000) * WAVE_RADIANS_PER_SEC;
      paint(wavePhase);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [pathRef]);
}
