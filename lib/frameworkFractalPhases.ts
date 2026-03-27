/**
 * Phase offsets for **Fractal reveal** strips on `/framework`.
 * **Banner** (above intervention grid) + **six overview cards** (modes row, then domains).
 *
 * **Cards:** `startDelayMs` steps in **reading order** — row 1 left→right, then row 2 left→right
 * — so each strip’s cycle begins after the previous. `initialFrameIndex` stays offset so
 * simultaneous frames (later in time) don’t all show the same still.
 *
 * Card order: **MODES** (Explore, Design, Operate) → **DOMAINS** (Alignment, Meaning, Embodiment).
 */

/** Delay between each overview card strip starting its timer chain (ms). */
export const FRAMEWORK_FRACTAL_CARD_START_STAGGER_MS = 300;

export const FRAMEWORK_FRACTAL_BANNER = {
  initialFrameIndex: 0,
  startDelayMs: 0,
} as const;

export const FRAMEWORK_FRACTAL_CARD_PHASES = [
  { initialFrameIndex: 0, startDelayMs: 0 * FRAMEWORK_FRACTAL_CARD_START_STAGGER_MS },
  { initialFrameIndex: 1, startDelayMs: 1 * FRAMEWORK_FRACTAL_CARD_START_STAGGER_MS },
  { initialFrameIndex: 2, startDelayMs: 2 * FRAMEWORK_FRACTAL_CARD_START_STAGGER_MS },
  { initialFrameIndex: 3, startDelayMs: 3 * FRAMEWORK_FRACTAL_CARD_START_STAGGER_MS },
  { initialFrameIndex: 4, startDelayMs: 4 * FRAMEWORK_FRACTAL_CARD_START_STAGGER_MS },
  { initialFrameIndex: 0, startDelayMs: 5 * FRAMEWORK_FRACTAL_CARD_START_STAGGER_MS },
] as const satisfies readonly {
  initialFrameIndex: number;
  startDelayMs: number;
}[];
