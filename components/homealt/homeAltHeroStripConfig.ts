/**
 * Home hero illustration strip (`/`) — **Fractal reveal** sequence.
 *
 * **Cycle:** **brand images only** (see `HOME_ALT_HERO_STRIP_FRAMES`). Project stills live in
 * **`HOME_ALT_STRIP_PROJECT_FRAMES`** for a separate treatment — not shown in this animation.
 *
 * **`focalX` / `focalY`** (0–100): anchor for `object-position`; optional narrow overrides below `lg`.
 * **Viewport:** Below `lg`, strip uses `aspect-[4/3]` + `max-h-[30vh]` (see component).
 *
 * Motion grammar: `.cursor/rules/design-visual-language.mdc` (Fractal reveal strip).
 * Copy: `docs/elementary-complexity-copy/home.md`.
 */

export type HomeAltHeroStripFrame = {
  id: string;
  kind: 'brand' | 'project';
  src: string;
  /** Horizontal anchor for object-position (0 = left, 100 = right). */
  focalX: number;
  /** Vertical center of interest (0 = top, 100 = bottom). */
  focalY: number;
  focalXNarrow?: number;
  focalYNarrow?: number;
  projectSlug?: string;
  focalNote: string;
};

/** Frames cycled by `HomeAltHeroIllustrationStrip` — brands only. */
export const HOME_ALT_HERO_STRIP_FRAMES = [
  {
    id: 'brand-imageggg',
    kind: 'brand',
    src: '/assets/imageggg.png',
    focalX: 50,
    focalY: 52,
    focalNote:
      'Network mesh — nodal mass slightly below center so the graph reads in crop.',
  },
  {
    id: 'brand-vision',
    kind: 'brand',
    src: '/assets/vision.png',
    focalX: 50,
    focalY: 46,
    focalNote: 'Figurative silhouette / head cluster; slight upward bias.',
  },
  {
    id: 'brand-arch2-dark',
    kind: 'brand',
    src: '/assets/A%20arch2%20dark.png',
    focalX: 50,
    focalY: 55,
    focalNote: 'Architectural arch — weight mid-lower.',
  },
  {
    id: 'brand-serpentine',
    kind: 'brand',
    src: '/assets/Serpentine.png',
    focalX: 50,
    focalY: 50,
    focalNote: 'Organic curve — geometric center.',
  },
  {
    id: 'brand-lovers-very-good-2',
    kind: 'brand',
    src: '/assets/A%20lovers%20very%20good%202.png',
    focalX: 48,
    focalY: 40,
    focalNote: 'Two figures — bias up-left toward heads / embrace.',
  },
] as const satisfies readonly HomeAltHeroStripFrame[];

/**
 * Case-study stills — **not** in the hero strip cycle; reserved for another UX (e.g. grid hover, second strip).
 * Hero-biased URLs align with `lib/caseStudyContent.generated.ts`.
 */
export const HOME_ALT_STRIP_PROJECT_FRAMES = [
  {
    id: 'project-daoist-hero',
    kind: 'project',
    projectSlug: 'the-daoist',
    src: '/project-media/the-daoist/3%20hero%20political%20drivers-WO.webp',
    focalX: 50,
    focalY: 38,
    focalXNarrow: 50,
    focalYNarrow: 36,
    focalNote: 'Panel — vertical interest on speaker heads / upper bodies.',
  },
  {
    id: 'project-rg-deck-cover',
    kind: 'project',
    projectSlug: 'raidguild',
    src: '/project-media/raidguild/1%20hero%20highlight%202%2000%20-%20RaidGuild%20Deck%20-%20COVER-WO.webp',
    focalX: 50,
    focalY: 48,
    focalNote: 'Deck cover lockup — keep title and crest centered.',
  },
  {
    id: 'project-korbon-highlight-1',
    kind: 'project',
    projectSlug: 'korbon-visual-identity',
    src: '/project-media/korbon-visual-identity/1%20highlight%201%20-%20Cover.webp',
    focalX: 50,
    focalY: 48,
    focalNote: 'Cover illustration — center figure / mark.',
  },
  {
    id: 'project-chutes-hero',
    kind: 'project',
    projectSlug: 'chutes-merch',
    src: '/project-media/chutes-merch/1%20hero%20image7-WO.webp',
    focalX: 50,
    focalY: 46,
    focalXNarrow: 50,
    focalYNarrow: 44,
    focalNote: 'Hero character — face / mark in upper-middle band.',
  },
  {
    id: 'project-dao-canvas-actors',
    kind: 'project',
    projectSlug: 'dao-canvas',
    src: '/project-media/dao-canvas/2%20actors%20solution%203.webp',
    focalX: 50,
    focalY: 42,
    focalXNarrow: 52,
    focalYNarrow: 36,
    focalNote:
      'Collaboration cluster — three-person gaze; narrow crop favors heads upper-mid.',
  },
] as const satisfies readonly HomeAltHeroStripFrame[];

export type HomeAltHeroStripFrameId = (typeof HOME_ALT_HERO_STRIP_FRAMES)[number]['id'];

/** `object-position` from focal fields; below `lg` uses narrow focal when set. */
export function getStripObjectPosition(
  frame: HomeAltHeroStripFrame,
  isLg: boolean | null,
): string {
  const f = frame;
  const useNarrow = isLg !== true;
  const x = useNarrow && f.focalXNarrow != null ? f.focalXNarrow : f.focalX;
  const y = useNarrow && f.focalYNarrow != null ? f.focalYNarrow : f.focalY;
  return `${x}% ${y}%`;
}

/**
 * Inner media scale vs viewport (100 = none). Slight zoom only if fractal edge needs cover;
 * keep low so ultra-wide assets keep more horizontal information visible.
 */
export const HOME_ALT_STRIP_INNER_SCALE_PERCENT = 108;

/** Time each illustration is stable before the glitch reveal (ms). */
export const HOME_ALT_STRIP_HOLD_MS = 2500;

/**
 * Outgoing “discovery” — staggered vertical columns scan L→R + opacity blend (ms).
 */
export const HOME_ALT_STRIP_REVEAL_MS = 480;

/** Vertical slices in the SVG mask; each wipes after the previous by this delay (ms). */
export const HOME_ALT_STRIP_SCAN_COLS = 8;
export const HOME_ALT_STRIP_COL_STAGGER_MS = 40;

/** Per-column wipe length so the last column finishes by REVEAL_MS. */
export const HOME_ALT_STRIP_COL_WIPE_MS =
  HOME_ALT_STRIP_REVEAL_MS -
  (HOME_ALT_STRIP_SCAN_COLS - 1) * HOME_ALT_STRIP_COL_STAGGER_MS;

/** After frame index commits: image sharpens / locks in (ms). */
export const HOME_ALT_STRIP_SETTLE_MS = 380;

/** Full transition length (reveal + settle). */
export const HOME_ALT_STRIP_GLITCH_MS =
  HOME_ALT_STRIP_REVEAL_MS + HOME_ALT_STRIP_SETTLE_MS;

/** One frame step: hold → reveal → settle (ms). Full loop = `frames.length *` this. */
export const HOME_ALT_STRIP_CYCLE_STEP_MS =
  HOME_ALT_STRIP_HOLD_MS + HOME_ALT_STRIP_REVEAL_MS + HOME_ALT_STRIP_SETTLE_MS;
