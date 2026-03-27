import type { CSSProperties } from 'react';

const GRADIENT_LAYERS = [
  'linear-gradient(to bottom, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.35) 40%, transparent 65%)',
  'linear-gradient(to top, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.5) 38%, rgba(255,255,255,0.12) 65%, transparent 85%)',
  'radial-gradient(ellipse 85% 70% at 50% 55%, transparent 50%, rgba(0,0,0,0.06) 100%)',
  'linear-gradient(rgba(255,255,255,0.65), rgba(255,255,255,0.65))',
];

const GRADIENT_LAYERS_FLIPPED = [
  'linear-gradient(to bottom, rgba(249,250,251,1) 0%, rgba(249,250,251,1) 16%, rgba(249,250,251,0.96) 30%, rgba(249,250,251,0.9) 44%, rgba(249,250,251,0.76) 58%, rgba(249,250,251,0.5) 72%, rgba(249,250,251,0.2) 86%, transparent 95%)',
  'linear-gradient(to top, rgba(249,250,251,0.8) 0%, rgba(249,250,251,0.32) 12%, transparent 24%)',
  'radial-gradient(ellipse 85% 70% at 50% 68%, transparent 52%, rgba(0,0,0,0.06) 100%)',
  'linear-gradient(rgba(255,255,255,0.74), rgba(255,255,255,0.74))',
];

/**
 * Hero/header background: gradients + image.
 */
export function getHeroBackgroundStyle(
  imagePath: string,
  position: string = '50% 40%',
  options?: {
    flipVerticalFade?: boolean;
  }
): CSSProperties {
  const gradients = options?.flipVerticalFade
    ? GRADIENT_LAYERS_FLIPPED
    : GRADIENT_LAYERS;

  return {
    backgroundImage: [...gradients, `url(${imagePath})`].join(', '),
    backgroundSize: 'cover',
    backgroundPosition: position,
  };
}

/** Illustrated portrait — booking modal inset. */
export const ELCO_PORTRAIT_ILLUSTRATION = '/assets/elco-portrait-illustration.png' as const;

