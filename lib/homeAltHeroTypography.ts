/**
 * Kicker / eyebrow — Syne caps, ~1.03rem, gray-600 + multiply.
 * In **editorial** layouts this sits in the **left** column (narrow rail).
 */
export const HOME_ALT_HERO_LEAD_CLASS =
  'font-display uppercase tracking-widest text-[1.03rem] leading-relaxed text-gray-600 mix-blend-multiply';

/**
 * Word-stagger for large editorial lines (`HomeAltHero` thesis, framework rails).
 *
 * **Rhythm:** Fixed **milliseconds between each word’s reveal start** — word count does not change
 * the interval (longer lines take longer overall). Calibrated from the former home-alt hero
 * thesis (~16 words): ~88ms × ~16 ≈ prior `EDITORIAL_WORD_STAGGER_TOTAL_MS` budget.
 *
 * **Trigger:** `EditorialWordStagger` — `startOn="mount"` (hero) or `inView` (exploration-driven
 * bands); post-trigger delay `EDITORIAL_WORD_STAGGER_START_DELAY_MS`.
 */
export const EDITORIAL_WORD_STAGGER_GAP_MS = 88;

/** @deprecated Reference only — legacy “total ms ÷ word count” budget; spacing uses `EDITORIAL_WORD_STAGGER_GAP_MS`. */
export const EDITORIAL_WORD_STAGGER_TOTAL_MS = 1400;

export const EDITORIAL_WORD_STAGGER_START_DELAY_MS = 380;

/**
 * Classic hero text band: narrow lead **left** (4) + thesis **right** (8), vertically centered.
 */
export const HOME_ALT_HERO_TEXT_GRID_ROW =
  'grid w-full grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-x-16 lg:gap-y-0';

export const HOME_ALT_HERO_LEAD_COL =
  'flex flex-col items-center text-center lg:col-span-4 lg:items-start lg:text-left lg:pr-2';

export const HOME_ALT_HERO_THESIS_COL =
  'flex flex-col items-stretch lg:col-span-8';

/**
 * Large display line (original hero thesis scale).
 */
export const HOME_ALT_HERO_THESIS_DISPLAY_CLASS =
  'max-w-4xl text-left font-display font-medium normal-case tracking-tight text-black text-2xl leading-snug sm:text-3xl sm:leading-snug lg:text-4xl lg:leading-[1.15] xl:text-5xl xl:leading-[1.12]';

/**
 * **Editorial** two-column: kicker **left**, thesis **right** fills remainder.
 * Flex layout ensures thesis block extends to container right edge (no grid gap residue).
 */
export const EDITORIAL_TEXT_GRID_ROW =
  'flex w-full flex-col gap-10 md:flex-row md:items-center md:gap-x-12 lg:gap-x-16';

/** Left rail for kickers; `max-w-sm` keeps line length comfortable. Shrink-0 so right fills remainder. */
export const EDITORIAL_EYEBROW_COL =
  'flex shrink-0 flex-col items-start text-left';

export const EDITORIAL_BODY_COL =
  'flex min-w-0 flex-1 flex-col items-stretch';

/**
 * Editorial primary column — thesis line under the illustration.
 * No max-width: fills column to right edge for exact alignment with page constraint.
 */
export const EDITORIAL_DISPLAY_BODY_CLASS =
  'w-full text-left font-display font-medium normal-case tracking-tight text-black text-2xl leading-snug sm:text-3xl sm:leading-snug lg:text-4xl lg:leading-[1.15] xl:text-5xl xl:leading-[1.12]';

/**
 * Manifesto editorial **verb column** only: Syne, sentence case, black; scaled under full editorial callout.
 */
export const EDITORIAL_CALLOUT_VERB_CLASS =
  'font-display font-medium normal-case tracking-tight text-black text-xl leading-snug sm:text-2xl sm:leading-snug lg:text-3xl lg:leading-snug';
