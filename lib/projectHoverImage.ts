/**
 * Shared treatment for project hero images on Selected Work cards and Case Studies list.
 * Both animate from the side; same gradients, noise, obscuring. No slant — full-width soft wash.
 */

export const NOISE_SVG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Hero gradients (from CaseStudyPageHero) */
export const HERO_GRADIENTS = [
  'linear-gradient(to bottom, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.35) 40%, transparent 65%)',
  'linear-gradient(to top, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.5) 38%, rgba(255,255,255,0.12) 65%, transparent 85%)',
  'radial-gradient(ellipse 85% 70% at 50% 55%, transparent 50%, rgba(0,0,0,0.06) 100%)',
  'linear-gradient(rgba(255,255,255,0.65), rgba(255,255,255,0.65))',
].join(', ');

/** Strong left gradient — left 30% almost no image; image presence felt on the right. */
export const SOFT_FULL_GRADIENT = [
  'linear-gradient(to right, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.92) 15%, rgba(255,255,255,0.65) 30%, rgba(255,255,255,0.28) 55%, transparent 82%)',
  'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, transparent 50%)',
].join(', ');

/** Flipped horizontally — for right nav card; image intensity toward center, gradient under text. */
export const SOFT_FULL_GRADIENT_FLIPPED = [
  'linear-gradient(to left, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.92) 15%, rgba(255,255,255,0.65) 30%, rgba(255,255,255,0.28) 55%, transparent 82%)',
  'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, transparent 50%)',
].join(', ');

/** Detail crop — zoom to center (tighter crop on a detail) */
export const IMAGE_BG_SIZE = '150%';
export const IMAGE_BG_POSITION = '50% 50%';

/** Animation timing — slow, smooth reveal (replaces snappy 200ms) */
export const REVEAL_DURATION_MS = 550;
export const REVEAL_EASING = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
