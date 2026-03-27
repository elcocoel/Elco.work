/**
 * Discriminated sections for the EVRO deliverable landing.
 * `copywriterNote` is harness-only — never render.
 */

export type DeliverableWarmth = 'cold' | 'warm' | 'deep';

/** Rare: hero-scale Syne exception (use sparingly). */
export type SyneTitleException = 'plan';

/** Calibrated Syne section title (default for most bands). */
export type SyneTitleCalibrated = 'default';

/** Wide Anton accent — rare, high-contrast section band (cf. Intervention Grid). */
export type AccentWideTitle = 'risk-governance';

export type TitlePresentation =
  | { kind: 'syne-exception'; token: SyneTitleException }
  | { kind: 'syne-calibrated' }
  | { kind: 'accent-wide'; token: AccentWideTitle };

type SectionBase = {
  id: string;
  warmth: DeliverableWarmth;
  /** Copywriter / QA only — not shown in UI */
  copywriterNote?: string;
};

/** About page: one eyebrow + large sentence-case line + body prose column. */
export type IntroAboutSection = SectionBase & {
  layout: 'intro-about';
  eyebrow: string;
  /** Large Syne editorial line (sentence case, not all-caps). */
  displayLine: string;
  bodyMarkdown: string;
};

/**
 * Bridge: one sanctioned editorial scale (`EDITORIAL_DISPLAY_BODY_CLASS`) for all body copy;
 * split with `\\n\\n` for paragraphs. Centered tail is a full-width row below the two-column band.
 */
export type BridgeInvertedSection = SectionBase & {
  layout: 'bridge-inverted';
  eyebrow: string;
  /** Single voice, one type size — merge all narrative here; paragraphs separated by blank lines; `**inline**` emphasis (parsed in `EditorialWordStagger`). */
  editorialBody: string;
  /** Full-width centered row under the double column (hand-off to sections below). */
  bridgeTail: string;
};

export type StakeCard = { title: string; description: string };

/** Strategic bullets as framework-adjacent cards (no duplicate explainer stack). */
export type StakesCardsSection = SectionBase & {
  layout: 'stakes-cards';
  eyebrow: string;
  /** Calibrated section title */
  title: string;
  introMarkdown: string;
  cards: StakeCard[];
};

/** Standard band: single eyebrow, title presentation, optional lead, markdown. */
export type MarkdownBandSection = SectionBase & {
  layout: 'markdown-band';
  eyebrow: string;
  title: string;
  titlePresentation: TitlePresentation;
  /** Optional lead under title; **Markdown** inline emphasis supported. */
  lead?: string;
  bodyMarkdown: string;
  /** Deep bands: table shell */
  containedSheet?: boolean;
  /**
   * When true: eyebrow / title / lead stack first; `bodyMarkdown` renders below at **full section width**
   * (not the 5+7 rail). Use for wide tables that would otherwise force horizontal scroll in the 7-col column.
   */
  bodyFullWidthBelow?: boolean;
};

/**
 * Deep memo band: **no** editorial kicker (`HOME_ALT_HERO_LEAD_CLASS`); title + markdown only.
 * Body uses **full width** of the `Section` container (same gutter as other bands, no 5+7 rail).
 * Use when warmth is **`deep`** — serious execution detail after explanatory editorial bands.
 */
export type TradeoffCard = {
  question: string;
  stagedAnswer: string;
  oneshotAnswer: string;
};

export type MarkdownFullWidthSection = SectionBase & {
  layout: 'markdown-full-width';
  title: string;
  bodyMarkdown: string;
  containedSheet?: boolean;
  /** Optional 2×2 card grid appended after bodyMarkdown. Each card: bold question + staged/one-shot columns. */
  appendCardGrid?: TradeoffCard[];
  /** Centered `BookDiscoveryCallTrigger` FAB below prose (same as home hero). */
  bookingFabAfterBody?: 'discovery' | 'feedback';
};

/**
 * Two-column: left = fractal illustration + link card stacked; right = prose body.
 * Use when a reference artifact (illustration) should anchor the left and body text reads on the right.
 */
export type CardTextSection = SectionBase & {
  layout: 'card-text';
  /** Optional section heading rendered full-width above the two-column grid. */
  title?: string;
  /** Optional personal note rendered at the top of the right column, above bodyMarkdown. */
  leadMarkdown?: string;
  /** Prose rendered in the right column. Markdown supported. */
  bodyMarkdown: string;
  /** Link card displayed below the illustration. */
  card: {
    label: string;
    href: string;
    description: string;
  };
};

export type DeliverableSection =
  | IntroAboutSection
  | BridgeInvertedSection
  | StakesCardsSection
  | MarkdownBandSection
  | MarkdownFullWidthSection
  | CardTextSection;
