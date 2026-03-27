/**
 * V3 case study content — merges caseStudyContentv2 (internal copy) with caseStudiesv3 (hero title, eyebrow, year).
 * Source of truth for hero title, eyebrow, and year: lib/caseStudiesv3.ts.
 * Internal text (context, alignment, meaning, embodiment, outcome): caseStudyContentv2.
 */

import type { CaseStudyContent } from './caseStudyContent';
import { getCaseStudyContentV2 } from './caseStudyContentv2';
import { CASE_STUDIES_V3 } from './caseStudiesv3';

const V3_MAP = Object.fromEntries(
  CASE_STUDIES_V3.map((s) => [s.slug, s]),
);

export function getCaseStudyContentV3(slug: string): CaseStudyContent | null {
  const content = getCaseStudyContentV2(slug);
  const study = V3_MAP[slug];
  if (!content || !study) return content ?? null;
  return {
    ...content,
    title: study.title,
    heroEyebrow: study.category,
    metadata: {
      ...content.metadata,
      year: study.year,
    },
  };
}
