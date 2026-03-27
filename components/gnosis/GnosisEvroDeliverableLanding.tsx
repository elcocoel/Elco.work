'use client';

import Link from 'next/link';
import { FadeInSection } from '@/components/FadeInSection';
import { DeliverableMarkdown } from '@/components/marketing/DeliverableMarkdown';
import { Section } from '@/components/ui/Section';
import { EditorialWordStagger } from '@/components/editorial/EditorialWordStagger';
import { FractalRevealStrip } from '@/components/FractalRevealStrip';
import {
  GNOSIS_EVRO_DELIVERABLE_SECTIONS,
  type DeliverableSection,
} from '@/lib/gnosisEvroDeliverableContent';
import {
  EDITORIAL_TEXT_GRID_ROW,
  EDITORIAL_EYEBROW_COL,
  EDITORIAL_BODY_COL,
  EDITORIAL_DISPLAY_BODY_CLASS,
  HOME_ALT_HERO_LEAD_CLASS,
} from '@/lib/homeAltHeroTypography';
import { FRAMEWORK_CARD_HAIRLINE_BORDER } from '@/lib/frameworkCardStyles';
import { BookDiscoveryCallTrigger } from '@/components/booking/BookDiscoveryCallTrigger';

/** Call-and-response: right column starts lower than left kicker (cf. about page body column). */
export const EDITORIAL_RESPONSE_OFFSET = 'md:pt-16 lg:pt-24';

/** Shared 12-col shell for `intro-about` + `markdown-band` — same gutters as About-style rails (do not drift). */
export const DELIVERABLE_EDITORIAL_GRID_ROW =
  'grid w-full grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-10 lg:gap-x-12';

/** Base fade delay per section index (matches existing section rhythm). */
export function sectionEntranceDelayMs(index: number) {
  return 70 + index * 45;
}

/** Section kickers — same scale as editorial rails / hero kicker, not `text-xs` marginalia. */
const SECTION_KICKER_CLASS = HOME_ALT_HERO_LEAD_CLASS;

/** Positioning intro / thesis — large Syne, not shy. */
const THESIS_INTRO_CLASS =
  'font-display font-medium normal-case tracking-tight text-black text-2xl leading-snug sm:text-3xl sm:leading-snug lg:text-4xl lg:leading-[1.12] xl:text-5xl xl:leading-[1.1]';

/** Intro body: Syne at readable sizes (overrides markdown `p` sans for this band only). */
const INTRO_MARKDOWN_BODY =
  'max-w-reading [&_p]:!font-display [&_p]:!text-lg sm:[&_p]:!text-xl [&_p]:!leading-relaxed [&_p]:!text-gray-700 [&_strong]:!font-semibold [&_strong]:!text-black';

/** Bold spans inside bridge body — Syne, match editorial display column. */
const BRIDGE_STAGGER_STRONG_CLASS = 'font-display font-semibold text-black';

/** Markdown-band left-column lead: prose may include `**`; keep sans scale from `LEAD_CLASS`. */
const LEAD_MARKDOWN_WRAP =
  'mt-4 max-w-reading [&_p]:!font-sans [&_p]:!text-base sm:[&_p]:!text-lg [&_p]:!leading-relaxed [&_p]:!text-gray-600 [&_p]:!mb-0 [&_p+p]:!mt-4 [&_strong]:!font-semibold [&_strong]:!text-black';

/** Full-width hand-off row — same branded body voice as elsewhere (tune copy later). */
const BRIDGE_TAIL_CLASS =
  'text-center font-display font-medium normal-case tracking-tight text-gray-800 text-lg sm:text-xl leading-relaxed max-w-4xl mx-auto px-6 sm:px-8';

const BODY_PROSE = 'space-y-4 text-lg leading-relaxed text-gray-700 font-sans';

/** Legitimate all-caps Syne shout — only for “The plan” (large + bold). */
const SYNE_EXCEPTION_TITLE =
  'font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-wide text-black';

const SYNE_CALIBRATED_TITLE =
  'font-display text-2xl sm:text-3xl font-semibold normal-case tracking-tight text-black';

/** Outcomes band — pitch-scale, not sheet-scale. */
const OUTCOMES_TITLE_CLASS =
  'font-display text-3xl sm:text-4xl font-semibold normal-case tracking-tight text-black';

const OUTCOME_CARD_TITLE =
  'font-display text-base sm:text-lg font-semibold uppercase tracking-wide text-black mb-3';

const OUTCOME_CARD_BODY = 'text-base sm:text-lg leading-relaxed text-gray-700 font-sans';

/** Anton — rare high-contrast band. */
const ACCENT_WIDE_TITLE =
  'font-accent text-3xl sm:text-[2.25rem] lg:text-5xl leading-none uppercase tracking-wide text-black';

/** Deep memo (`markdown-full-width`): title only — no editorial kicker; Syne calibrated h2. */
const DEEP_MEMO_TITLE_CLASS =
  'font-display text-2xl sm:text-3xl font-semibold normal-case tracking-tight text-black';

/** Visual weight for consecutive deep bands (warmer / more serious than editorial rails). */
const DEEP_MEMO_SECTION_CLASS = 'border-t border-gray-200';

/** Markdown shell for long-form deliverable bands (tables, sheets, width). */
export function MarkdownBlock({
  markdown,
  sheet,
  /** When true, markdown is not capped at 65ch (full-width deliverable bands). */
  fullWidthContent = false,
}: {
  markdown: string;
  sheet?: boolean;
  fullWidthContent?: boolean;
}) {
  const inner = (
    <DeliverableMarkdown
      content={markdown}
      linkBaseUrl="/gnosis/evrodeployment"
      variant="editorial2026"
      contentWidth={fullWidthContent ? 'full' : 'reading'}
    />
  );
  const scrollShell = 'min-w-0 overflow-x-auto';
  if (sheet) {
    return (
      <div
        className={`border border-gray-100 rounded-sm bg-white p-4 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${FRAMEWORK_CARD_HAIRLINE_BORDER} ${scrollShell}`}
      >
        {inner}
      </div>
    );
  }
  return <div className={scrollShell}>{inner}</div>;
}

function IntroAboutSectionView({
  section,
  index,
  variant,
}: {
  section: Extract<DeliverableSection, { layout: 'intro-about' }>;
  index: number;
  variant: 'default' | 'alt';
}) {
  return (
    <Section key={section.id} variant={variant} contained reveal="none">
      <FadeInSection as="div" delay={sectionEntranceDelayMs(index)}>
        <div className={DELIVERABLE_EDITORIAL_GRID_ROW}>
          <div className="flex flex-col md:col-span-5">
            <p className={`${SECTION_KICKER_CLASS} mb-6`}>{section.eyebrow}</p>
            <EditorialWordStagger
              className={THESIS_INTRO_CLASS}
              as="h2"
              text={section.displayLine}
              startOn="inView"
            />
          </div>
          <FadeInSection
            as="div"
            className={`flex flex-col md:col-span-7 ${EDITORIAL_RESPONSE_OFFSET}`}
            delay={200}
          >
            <div className={INTRO_MARKDOWN_BODY}>
              <DeliverableMarkdown
                content={section.bodyMarkdown}
                linkBaseUrl="/gnosis/evrodeployment"
                variant="editorial2026"
              />
            </div>
          </FadeInSection>
        </div>
      </FadeInSection>
    </Section>
  );
}

function BridgeInvertedSectionView({
  section,
  index,
  variant,
}: {
  section: Extract<DeliverableSection, { layout: 'bridge-inverted' }>;
  index: number;
  variant: 'default' | 'alt';
}) {
  const paras = section.editorialBody
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const entrance = sectionEntranceDelayMs(index);

  return (
    <Section key={section.id} variant={variant} contained reveal="none">
      <FadeInSection as="div" delay={entrance}>
        <div className={EDITORIAL_TEXT_GRID_ROW}>
          <div className={EDITORIAL_EYEBROW_COL}>
            <p className={`${SECTION_KICKER_CLASS} max-w-sm`}>{section.eyebrow}</p>
          </div>
          <div className={EDITORIAL_BODY_COL}>
            <div className="space-y-6">
              {paras.map((para, pi) => (
                <EditorialWordStagger
                  key={`${section.id}-ed-${pi}`}
                  as="p"
                  className={EDITORIAL_DISPLAY_BODY_CLASS}
                  text={para}
                  parseMarkdownBold
                  strongClassName={BRIDGE_STAGGER_STRONG_CLASS}
                  startOn="inView"
                />
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>
      <FadeInSection
        as="div"
        className="w-full mt-12 md:mt-16 lg:mt-20 pt-2 md:pt-4"
        delay={100}
      >
        <p className={BRIDGE_TAIL_CLASS}>{section.bridgeTail}</p>
      </FadeInSection>
    </Section>
  );
}

function StakesCardsSectionView({
  section,
  index,
  variant,
}: {
  section: Extract<DeliverableSection, { layout: 'stakes-cards' }>;
  index: number;
  variant: 'default' | 'alt';
}) {
  const entrance = sectionEntranceDelayMs(index);

  return (
    <Section key={section.id} variant={variant} contained reveal="none">
      <FadeInSection as="div" delay={entrance}>
        <div className="mb-10 lg:mb-12">
          <p className={`${SECTION_KICKER_CLASS} mb-4`}>{section.eyebrow}</p>
          <EditorialWordStagger
            as="h2"
            className={OUTCOMES_TITLE_CLASS}
            text={section.title}
            startOn="inView"
          />
          {section.introMarkdown.trim() ? (
            <div className={`mt-6 ${BODY_PROSE}`}>
              <DeliverableMarkdown
              content={section.introMarkdown}
              linkBaseUrl="/gnosis/evrodeployment"
              variant="editorial2026"
            />
            </div>
          ) : null}
        </div>
        <div className="grid grid-cols-1 gap-px rounded-sm border border-gray-100 bg-gray-100 sm:grid-cols-2 lg:grid-cols-4">
          {section.cards.map((card, ci) => (
            <FadeInSection
              key={card.title}
              as="div"
              className="min-h-[10rem] bg-white p-6 sm:p-8 transition-colors hover:border-black/20"
              delay={90 + ci * 70}
            >
              <h3 className={OUTCOME_CARD_TITLE}>{card.title}</h3>
              <p className={OUTCOME_CARD_BODY}>{card.description}</p>
            </FadeInSection>
          ))}
        </div>
      </FadeInSection>
    </Section>
  );
}

function titleClassFor(presentation: Extract<DeliverableSection, { layout: 'markdown-band' }>['titlePresentation']) {
  if (presentation.kind === 'syne-exception') return SYNE_EXCEPTION_TITLE;
  if (presentation.kind === 'accent-wide') return ACCENT_WIDE_TITLE;
  return SYNE_CALIBRATED_TITLE;
}

function MarkdownFullWidthSectionView({
  section,
  index,
  variant,
}: {
  section: Extract<DeliverableSection, { layout: 'markdown-full-width' }>;
  index: number;
  variant: 'default' | 'alt';
}) {
  const entrance = sectionEntranceDelayMs(index);

  return (
    <Section
      key={section.id}
      variant={variant}
      contained
      reveal="none"
      className={DEEP_MEMO_SECTION_CLASS}
    >
      <FadeInSection as="div" delay={entrance}>
        <div className="w-full min-w-0">
          <EditorialWordStagger
            as="h2"
            className={DEEP_MEMO_TITLE_CLASS}
            text={section.title}
            startOn="inView"
          />
          <div className="mt-8 md:mt-10 w-full min-w-0">
            {section.appendCardGrid && section.appendCardGrid.length > 0 ? (
              // Unified shell: markdown + card grid share one border/background
              <div className={`border ${FRAMEWORK_CARD_HAIRLINE_BORDER} rounded-sm bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden`}>
                <div className="p-4 sm:p-6 min-w-0 overflow-x-auto">
                  <DeliverableMarkdown
                    content={section.bodyMarkdown}
                    linkBaseUrl="/gnosis/evrodeployment"
                    variant="editorial2026"
                    contentWidth="full"
                  />
                </div>
                <div className={`border-t ${FRAMEWORK_CARD_HAIRLINE_BORDER}`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-100">
                    {section.appendCardGrid.map((card, ci) => (
                      <FadeInSection
                        key={card.question}
                        as="div"
                        className="bg-white p-6"
                        delay={90 + ci * 70}
                      >
                        <p className="font-display font-semibold text-sm text-black mb-5">
                          {card.question}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="font-display text-xs uppercase tracking-widest text-gray-400 mb-2">
                              Staged
                            </p>
                            <p className="text-sm leading-relaxed text-gray-600 font-sans">
                              {card.stagedAnswer}
                            </p>
                          </div>
                          <div>
                            <p className="font-display text-xs uppercase tracking-widest text-gray-400 mb-2">
                              One-shot
                            </p>
                            <p className="text-sm leading-relaxed text-gray-600 font-sans">
                              {card.oneshotAnswer}
                            </p>
                          </div>
                        </div>
                      </FadeInSection>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <MarkdownBlock
                markdown={section.bodyMarkdown}
                sheet={section.containedSheet}
                fullWidthContent
              />
            )}
          </div>
          {section.bookingFabAfterBody ? (
            <div className="mt-10 flex w-full justify-center">
              <BookDiscoveryCallTrigger
                appearance="fab"
                callIntent={section.bookingFabAfterBody}
              />
            </div>
          ) : null}
        </div>
      </FadeInSection>
    </Section>
  );
}

function MarkdownBandSectionView({
  section,
  index,
  variant,
}: {
  section: Extract<DeliverableSection, { layout: 'markdown-band' }>;
  index: number;
  variant: 'default' | 'alt';
}) {
  const entrance = sectionEntranceDelayMs(index);

  const headerBlock = (
    <div className="flex flex-col">
      <p className={`${SECTION_KICKER_CLASS} mb-4`}>{section.eyebrow}</p>
      <EditorialWordStagger
        as="h2"
        className={titleClassFor(section.titlePresentation)}
        text={section.title}
        startOn="inView"
      />
      {section.lead ? (
        <div className={LEAD_MARKDOWN_WRAP}>
          <DeliverableMarkdown
            content={section.lead}
            linkBaseUrl="/gnosis/evrodeployment"
            variant="editorial2026"
            contentWidth="full"
          />
        </div>
      ) : null}
    </div>
  );

  if (section.bodyFullWidthBelow) {
    return (
      <Section key={section.id} variant={variant} contained reveal="none">
        <FadeInSection as="div" delay={entrance}>
          <div className="flex w-full flex-col gap-10 md:gap-12">
            {headerBlock}
            <FadeInSection as="div" className="min-w-0 w-full" delay={200}>
              <MarkdownBlock
                markdown={section.bodyMarkdown}
                sheet={section.containedSheet}
                fullWidthContent
              />
            </FadeInSection>
          </div>
        </FadeInSection>
      </Section>
    );
  }

  return (
    <Section key={section.id} variant={variant} contained reveal="none">
      <FadeInSection as="div" delay={entrance}>
        <div className={DELIVERABLE_EDITORIAL_GRID_ROW}>
          <div className="flex flex-col md:col-span-5">{headerBlock}</div>
          <FadeInSection
            as="div"
            className={`flex flex-col md:col-span-7 min-w-0 ${EDITORIAL_RESPONSE_OFFSET}`}
            delay={200}
          >
            <MarkdownBlock markdown={section.bodyMarkdown} sheet={section.containedSheet} />
          </FadeInSection>
        </div>
      </FadeInSection>
    </Section>
  );
}

function CardTextSectionView({
  section,
  index,
  variant,
}: {
  section: Extract<DeliverableSection, { layout: 'card-text' }>;
  index: number;
  variant: 'default' | 'alt';
}) {
  const entrance = sectionEntranceDelayMs(index);

  return (
    <Section key={section.id} variant={variant} contained reveal="none">
      {section.title && (
        <FadeInSection as="div" delay={entrance}>
          <EditorialWordStagger
            as="h2"
            className={`${DEEP_MEMO_TITLE_CLASS} mb-8`}
            text={section.title}
            startOn="inView"
          />
        </FadeInSection>
      )}
      <FadeInSection as="div" delay={section.title ? entrance + 80 : entrance}>
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-10 lg:gap-x-12 md:items-stretch">
          {/* Left — unified illustration + card (framework grammar) */}
          <div className="flex flex-col md:col-span-5">
            <Link
              href={section.card.href}
              className={`flex flex-col overflow-hidden rounded-lg bg-white border ${FRAMEWORK_CARD_HAIRLINE_BORDER} hover:border-black/30 transition-colors group`}
            >
              <div className="relative h-48 sm:h-56 w-full shrink-0">
                <FractalRevealStrip
                  layout="card"
                  cardShell="flush"
                  startDelayMs={400}
                  caption="Research compendium — fractal illustration"
                  className="h-full"
                />
              </div>
              <div className={`border-t ${FRAMEWORK_CARD_HAIRLINE_BORDER} px-5 py-5`}>
                <p className="font-display text-xs uppercase tracking-widest text-gray-400 mb-2">
                  Reference
                </p>
                <p className="font-display text-sm font-semibold text-black mb-3">
                  {section.card.label}
                </p>
                <p className="text-sm leading-relaxed text-gray-600 font-sans mb-4">
                  {section.card.description}
                </p>
                <p className="font-display text-xs uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
                  Explore →
                </p>
              </div>
            </Link>
          </div>

          {/* Right — lead note + methodology prose, vertically centered */}
          <FadeInSection
            as="div"
            className="flex flex-col justify-center md:col-span-7"
            delay={150}
          >
            {section.leadMarkdown && (
              <div className="text-base sm:text-lg leading-relaxed text-gray-500 italic mb-6 font-sans [&_strong]:font-semibold [&_strong]:text-gray-700">
                <DeliverableMarkdown
                  content={section.leadMarkdown}
                  linkBaseUrl="/gnosis/evrodeployment"
                  variant="editorial2026"
                  contentWidth="full"
                />
              </div>
            )}
            <div className="text-base sm:text-lg leading-relaxed text-gray-700 font-sans">
              <DeliverableMarkdown
                content={section.bodyMarkdown}
                linkBaseUrl="/gnosis/evrodeployment"
                variant="editorial2026"
                contentWidth="full"
              />
            </div>
          </FadeInSection>
        </div>
      </FadeInSection>
    </Section>
  );
}

function renderSection(section: DeliverableSection, index: number) {
  const variant = index % 2 === 0 ? 'default' : 'alt';
  switch (section.layout) {
    case 'intro-about':
      return <IntroAboutSectionView key={section.id} section={section} index={index} variant={variant} />;
    case 'bridge-inverted':
      return <BridgeInvertedSectionView key={section.id} section={section} index={index} variant={variant} />;
    case 'stakes-cards':
      return <StakesCardsSectionView key={section.id} section={section} index={index} variant={variant} />;
    case 'markdown-band':
      return <MarkdownBandSectionView key={section.id} section={section} index={index} variant={variant} />;
    case 'markdown-full-width':
      return <MarkdownFullWidthSectionView key={section.id} section={section} index={index} variant={variant} />;
    case 'card-text':
      return <CardTextSectionView key={section.id} section={section} index={index} variant={variant} />;
    default: {
      const _exhaustive: never = section;
      return _exhaustive;
    }
  }
}

export function GnosisEvroDeliverableLanding({
  sections = GNOSIS_EVRO_DELIVERABLE_SECTIONS,
}: {
  sections?: DeliverableSection[];
} = {}) {
  return <>{sections.map((s, i) => renderSection(s, i))}</>;
}
