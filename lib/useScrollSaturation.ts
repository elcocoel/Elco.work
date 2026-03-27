'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** Focus zone: viewport center ± this value (in vh). Band ≈ 2 * FOCUS_ZONE_HALF_VH. */
const FOCUS_ZONE_HALF_VH = 40;

/**
 * Returns [ref, saturation] where saturation in [0, 1]: 0 = full color, 1 = grayscale.
 * Element center distance from viewport center maps to saturation: in zone → 0, beyond → 1.
 */
export function useScrollSaturation(): [
  ref: React.RefObject<HTMLElement | null>,
  saturation: number,
] {
  const ref = useRef<HTMLElement | null>(null);
  const [saturation, setSaturation] = useState(1);
  const rafRef = useRef<number | null>(null);
  const lastRunRef = useRef(0);
  const THROTTLE_MS = 50;

  const compute = useCallback(() => {
    if (typeof window === 'undefined' || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const viewportCenterY = window.innerHeight / 2;
    const zoneHalfPx = (FOCUS_ZONE_HALF_VH / 100) * window.innerHeight;
    const elemCenterY = rect.top + rect.height / 2;
    const distance = Math.abs(elemCenterY - viewportCenterY);

    if (distance <= zoneHalfPx) {
      setSaturation(0);
      return;
    }
    const excess = distance - zoneHalfPx;
    const fadePx = zoneHalfPx * 0.5;
    const t = Math.min(1, excess / fadePx);
    setSaturation(t);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onScrollOrResize = () => {
      const now = Date.now();
      if (now - lastRunRef.current < THROTTLE_MS) {
        if (rafRef.current == null) {
          rafRef.current = requestAnimationFrame(() => {
            lastRunRef.current = Date.now();
            compute();
            rafRef.current = null;
          });
        }
        return;
      }
      lastRunRef.current = now;
      compute();
    };

    compute();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [compute]);

  return [ref, saturation];
}
