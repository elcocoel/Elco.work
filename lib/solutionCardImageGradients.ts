import type { CSSProperties } from 'react';

/**
 * Soft white gradient stack over image areas — matches {@link CaseStudySolutionCard}.
 */
export const SOLUTION_CARD_IMAGE_SOFT_GRADIENT_STYLE = {
  background: [
    'linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.25) 100%)',
    'linear-gradient(to top, rgba(255,255,255,0.4) 0%, transparent 25%)',
  ].join(', '),
} satisfies CSSProperties;
