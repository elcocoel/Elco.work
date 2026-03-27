/**
 * Home hero illustration strip (`/homealt`). **Fractal reveal** — thin wrapper around
 * `FractalRevealStrip` (shared with `/framework`).
 */
'use client';

import { FractalRevealStrip } from '../FractalRevealStrip';

export function HomeAltHeroIllustrationStrip() {
  return <FractalRevealStrip layout="hero" />;
}
