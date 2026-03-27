/**
 * Case study content model. Structured data lives in `caseStudyContent.generated.ts`.
 */

export type Domain = 'Alignment' | 'Meaning' | 'Embodiment';

export interface CaseStudyMetadata {
  role: string;
  organization: string;
  year: string;
  domain: Domain[];
  /** Optional client quote/testimonial. Rendered as quotation block in metadata area. */
  clientStatement?: string;
  /** Optional avatar image URL for client statement. Rendered small, non-invasive. */
  clientAvatarUrl?: string;
  /** Optional name of person who gave the statement. Shown below quote. */
  clientName?: string;
  /** Optional role/title of person who gave the statement. Shown below quote. */
  clientRole?: string;
}

export interface CaseStudyImage {
  url: string;
  alt?: string;
  placeholderHint: string;
  type: 'mockup' | 'asset' | 'gallery' | 'video-still';
  /** When set, indicates video (mp4/webm/mov) or YouTube embed. */
  mediaType?: 'video' | 'youtube';
  /** Slot for extraction (hero, problem, highlight-1, solution-1, etc.). */
  slot?: string;
}

export interface CaseStudyReference {
  text: string;
  url?: string;
}

export interface CaseStudyFile {
  url: string;
  label: string;
  filename?: string;
  placeholderHint?: string;
}

export interface CaseStudyContent {
  slug: string;
  title: string;
  subtitle: string;
  /** Hero eyebrow above title (e.g. "Governance Platform"). Falls back to "Case study" if empty. */
  heroEyebrow?: string;
  metadata: CaseStudyMetadata;
  context: string;
  alignment: { heading: string; content: string };
  meaning: { heading: string; content: string };
  embodiment: { heading: string; content: string };
  outcome: string;
  artifacts: string[];
  references: CaseStudyReference[];
  images: CaseStudyImage[];
  files?: CaseStudyFile[];
  /** Full-width highlight between Problem and Solutions. */
  highlight1?: { url: string; alt?: string; description?: string; mediaType?: 'video' | 'youtube' };
  /** Full-width highlight between Solutions and Outcomes. */
  highlight2?: { url: string; alt?: string; description?: string; mediaType?: 'video' | 'youtube' };
  heroImageIndex: number;
  /** Framework grid cells acted upon (e.g. 1-explore-alignment). Human-approved. */
  frameworkCells?: string[];
}

/**
 * Case study content type — shared by generated, v2, v3.
 * For content lookup, use getCaseStudyContentV3 (live site). Parse script uses PARSED_CASE_STUDIES.
 */
