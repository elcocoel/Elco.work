import { PageHero } from '../../components/PageHero';
import { EditorialWordStagger } from '../../components/editorial/EditorialWordStagger';
import { FractalRevealStrip } from '../../components/FractalRevealStrip';
import { FrameworkCardSet } from '../../components/framework/FrameworkCardSet';
import { FrameworkGridInteractive } from '../../components/FrameworkGridInteractive';
import { ManifestoStagesAnimationEditorial } from '../../components/ManifestoSentencePair';
import { DiscoveryCTAv3 } from '../../components/DiscoveryCTAv3';
import { StaggerChildren } from '../../components/StaggerChildren';
import { Section } from '../../components/ui/Section';
import { SectionTitle } from '../../components/ui/SectionTitle';
import {
  FRAMEWORK_FRACTAL_BANNER,
  FRAMEWORK_FRACTAL_CARD_PHASES,
} from '../../lib/frameworkFractalPhases';
import { FRAMEWORK_CARD_HAIRLINE_BORDER } from '../../lib/frameworkCardStyles';
import {
  HOME_ALT_HERO_LEAD_CLASS,
  EDITORIAL_BODY_COL,
  EDITORIAL_DISPLAY_BODY_CLASS,
  EDITORIAL_EYEBROW_COL,
  EDITORIAL_TEXT_GRID_ROW,
} from '../../lib/homeAltHeroTypography';
import { MANIFESTO_STAGES_V3 } from '../../lib/manifestoPairsv3';

export const metadata = {
  title: 'Framework — Elementary Complexity',
  description:
    'The 3×3 framework: Explore, Design, Operate across Alignment, Meaning, and Embodiment.',
};

const DOMAINS = [
  {
    icon: '2-design-alignment',
    title: 'Alignment',
    description:
      'People must coordinate around shared goals. Power, incentives, decision-making.',
    maps: 'Coordination Systems',
  },
  {
    icon: '2-design-meaning',
    title: 'Meaning',
    description:
      'The system must be legible to those inside it. Narratives, information flow, sense-making.',
    maps: 'Communication Architectures',
  },
  {
    icon: '2-design-embodiment',
    title: 'Embodiment',
    description:
      'Ideas must take form in the world. Artifacts, practices, institutions.',
    maps: 'Cultural Artifacts',
  },
] as const;

/** Matches home Projects grid — harness motion table (stagger reveal). */
const NARRATIVE_STAGGER_STEP_MS = 55;
const NARRATIVE_STAGGER_REVEAL_DELAY_MS = 120;

const MODES = [
  {
    icon: '1-explore-alignment',
    title: 'Explore',
    description: 'Audit and diagnose. Understand what exists before defining what should.',
    maps: 'Audit & Diagnosis',
  },
  {
    icon: '2-design-alignment',
    title: 'Design',
    description: 'Structure and architect. Define coordination systems and communication flows.',
    maps: 'Systems & Architecture',
  },
  {
    icon: '3-operate-alignment',
    title: 'Operate',
    description: 'Facilitate and produce. Run what was designed.',
    maps: 'Delivery & Implementation',
  },
] as const;

export default function FrameworkPage() {
  return (
    <>
      <PageHero
        label="The Framework"
        title="How We Work"
        imagePath="/assets/field.png"
        imagePosition="50% 30%"
      />

      <Section
        variant="default"
        contained
        reveal="none"
        className="bg-gray-50 border-b border-gray-200 !py-12 sm:!py-14 lg:!py-16 lg:!pb-20"
      >
        <StaggerChildren
          stepMs={NARRATIVE_STAGGER_STEP_MS}
          revealDelayMs={NARRATIVE_STAGGER_REVEAL_DELAY_MS}
          deferMountIndices={[0, 2, 4]}
          deferMountPlaceholderClassName={{
            0: 'mx-auto w-full max-w-full sm:max-w-[80%] min-h-[min(52vh,28rem)]',
            2: 'min-h-[min(28rem,75vh)] w-full',
            4: 'min-h-[min(28rem,75vh)] w-full',
          }}
        >
          <div className="mx-auto mb-14 flex w-full max-w-full flex-col items-center sm:max-w-[80%] lg:mb-16">
            <p
              className={`${HOME_ALT_HERO_LEAD_CLASS} mb-6 w-full text-center`}
            >
              Manifesto
            </p>
            <div
              className={`w-full overflow-hidden rounded-lg border bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${FRAMEWORK_CARD_HAIRLINE_BORDER}`}
            >
              <ManifestoStagesAnimationEditorial
                stages={MANIFESTO_STAGES_V3}
                startDelayMs={0}
                verbVisualSize="cta"
              />
            </div>
          </div>

          <div className={`mb-12 ${EDITORIAL_TEXT_GRID_ROW}`}>
            <div className={EDITORIAL_EYEBROW_COL}>
              <p className={`${HOME_ALT_HERO_LEAD_CLASS} max-w-sm`}>
                Coordination breaks in recognisable patterns.
              </p>
            </div>
            <div className={EDITORIAL_BODY_COL}>
              <EditorialWordStagger
                className={EDITORIAL_DISPLAY_BODY_CLASS}
                text="Once you can name the pattern, the intervention becomes clear."
                startOn="inView"
              />
            </div>
          </div>

          <FrameworkCardSet
            variant="split-right"
            items={MODES}
            illustrationPhases={FRAMEWORK_FRACTAL_CARD_PHASES.slice(0, 3)}
            illustrationCaptionPrefix="modes (Explore, Design, Operate)"
          />

          <div className={`mt-10 mb-10 ${EDITORIAL_TEXT_GRID_ROW}`}>
            <div className={EDITORIAL_EYEBROW_COL}>
              <p className={`${HOME_ALT_HERO_LEAD_CLASS} max-w-sm`}>
                Each of those modes can engage with any of three domains.
              </p>
            </div>
            <div className={EDITORIAL_BODY_COL}>
              <EditorialWordStagger
                className={EDITORIAL_DISPLAY_BODY_CLASS}
                text="The dimensions that define what kind of coordination problem you are actually facing."
                startOn="inView"
              />
            </div>
          </div>

          <FrameworkCardSet
            variant="split-left"
            items={DOMAINS}
            illustrationPhases={FRAMEWORK_FRACTAL_CARD_PHASES.slice(3, 6)}
            illustrationCaptionPrefix="domains (Alignment, Meaning, Embodiment)"
          />

          <div className={`mt-10 border-t border-gray-100 pt-8 ${EDITORIAL_TEXT_GRID_ROW}`}>
            <div className={EDITORIAL_EYEBROW_COL}>
              <p className={`${HOME_ALT_HERO_LEAD_CLASS} max-w-sm`}>
                Nine distinct intervention types.
              </p>
            </div>
            <div className={EDITORIAL_BODY_COL}>
              <EditorialWordStagger
                className={EDITORIAL_DISPLAY_BODY_CLASS}
                text="Three times three. Each a different kind of work."
                startOn="inView"
              />
            </div>
          </div>
        </StaggerChildren>
      </Section>

      <Section variant="alt" contained reveal="none">
        <StaggerChildren
          stepMs={NARRATIVE_STAGGER_STEP_MS}
          revealDelayMs={NARRATIVE_STAGGER_REVEAL_DELAY_MS}
          deferMountIndices={[1]}
          deferMountPlaceholderClassName={{
            1: 'mb-10 min-h-[min(60vh,32rem)] w-full',
          }}
        >
          <div>
            <p className={`${HOME_ALT_HERO_LEAD_CLASS} mb-4`}>
              The 9 interventions
            </p>
            <SectionTitle className="mb-3">Intervention Grid</SectionTitle>
            <p className="mb-10 max-w-2xl text-sm leading-relaxed text-gray-600">
              Each cell is a distinct type of work. Every engagement lives somewhere
              in this grid.
            </p>
          </div>

          <FrameworkGridInteractive
            topBanner={
              <FractalRevealStrip
                layout="banner"
                cardShell="flush"
                className="w-full"
                initialFrameIndex={FRAMEWORK_FRACTAL_BANNER.initialFrameIndex}
                startDelayMs={FRAMEWORK_FRACTAL_BANNER.startDelayMs}
                caption="Framework intervention grid — rotating brand illustrations."
              />
            }
          />
        </StaggerChildren>
      </Section>

      <DiscoveryCTAv3 />
    </>
  );
}
