/**
 * Deck content definition. One deck = array of slides.
 * Illustration paths reference public/assets (top directory only; add paths as vetted).
 */
export type SlideType =
  | 'cover'
  | 'hero'
  | 'hero-image-left'
  | 'hero-image-right'
  | 'section'
  | 'process'
  | 'list'
  | 'closing';

export interface DeckSlide {
  id: string;
  type: SlideType;
  /** Eyebrow (optional) */
  eyebrow?: string;
  /** Main headline or statement */
  title: string;
  /** Body or supporting line */
  body?: string;
  /** For hero+image: path from public (e.g. /assets/illustrations/...) */
  imageSrc?: string;
  imageAlt?: string;
  /** For list slides: items */
  items?: string[];
  /** For process: label per step */
  steps?: string[];
}

export interface DeckMeta {
  id: string;
  title: string;
  subtitle?: string;
  slides: DeckSlide[];
}

/** Illustration paths (public). Approved set = top directory of public/assets only. */
const ILLUS = {
  banner: '/assets/illustration-banner-grid.png',
  exploreAlignment: '/assets/illustration-explore-alignment-the-scan.png',
  designMeaning: '/assets/illustration-design-meaning-mapping-the-message.png',
  operateAlignment: '/assets/illustration-operate-alignment-the-meeting.png',
  domainAlignment: '/assets/illustration-domain-alignment.png',
  domainMeaning: '/assets/illustration-domain-meaning.png',
  domainEmbodiment: '/assets/illustration-domain-embodiment.png',
};

/** Public /deck narrative; illustration paths are vetted assets under `public/assets`. */
export const HARNESS_DECK: DeckMeta = {
  id: 'harness',
  title: 'The Harness',
  subtitle: 'How Elementary Complexity runs its system',
  slides: [
    {
      id: 'cover',
      type: 'cover',
      title: 'The Harness',
      body: 'How Elementary Complexity runs its system',
    },
    {
      id: 'section-1',
      type: 'section',
      eyebrow: 'Part 1',
      title: 'What it is',
    },
    {
      id: 'hero-what',
      type: 'hero-image-right',
      title: 'A map of directives, not a flowchart of tasks.',
      body: 'Strategy, tactics, design, copy, interfaces, publishing, evaluation.',
      imageSrc: ILLUS.banner,
      imageAlt: 'Framework grid',
    },
    {
      id: 'process-flow',
      type: 'process',
      eyebrow: 'Flow',
      title: 'From idea to output',
      steps: ['Strategy', 'Tactics', 'Design & Copy', 'Publishing', 'Evaluation'],
    },
    {
      id: 'section-2',
      type: 'section',
      eyebrow: 'Part 2',
      title: 'How to use it',
    },
    {
      id: 'hero-load',
      type: 'hero-image-left',
      title: 'Map the message, then ship it.',
      body: 'Communications and content flow from strategy through design and copy to publishing.',
      imageSrc: ILLUS.designMeaning,
      imageAlt: 'Mapping the message',
    },
    {
      id: 'list-load',
      type: 'list',
      title: 'Load the right doc for the task.',
      items: [
        'Building UI → Design DNA, Interfaces',
        'Writing copy → Copy DNA',
        'Shipping a deliverable → Building philosophy, Publishing',
        'Running QA → Evaluation, Reporting',
      ],
    },
    {
      id: 'closing',
      type: 'closing',
      title: 'One system. Many outputs.',
      body: 'The harness is the map. The work is the territory.',
    },
  ],
};
