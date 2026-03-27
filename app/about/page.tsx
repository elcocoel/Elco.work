import Link from 'next/link';
import { PageHero } from '../../components/PageHero';
import { DiscoveryCTAv3 } from '../../components/DiscoveryCTAv3';
import { BookDiscoveryCallTrigger } from '../../components/booking/BookDiscoveryCallTrigger';
import { ABOUT_HERO_V3 } from '../../lib/aboutPageV3';
import { FadeInSection } from '../../components/FadeInSection';
import { Section } from '../../components/ui/Section';
import { EditorialWordStagger } from '../../components/editorial/EditorialWordStagger';
import { HOME_ALT_HERO_LEAD_CLASS } from '../../lib/homeAltHeroTypography';

export const metadata = {
  title: 'About — Elementary Complexity',
  description:
    'Strategic studio at the intersection of governance design, narrative architecture, and cultural production.',
};

const THESIS_CLASS =
  'font-display font-medium normal-case tracking-tight text-black text-xl leading-snug sm:text-2xl sm:leading-snug lg:text-3xl lg:leading-[1.18]';

const BODY_PROSE = 'space-y-4 text-lg leading-relaxed text-gray-700';

export default function AboutPage() {
  return (
    <>
      <PageHero
        label={ABOUT_HERO_V3.eyebrow}
        title={ABOUT_HERO_V3.title}
        imagePath="/assets/vision.png"
        imagePosition="center"
      />

      {/* ── Section 1: Core thesis (two-column) ─────────── */}
      <Section variant="default" contained reveal="none">
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-10 lg:gap-x-12">
          {/* Left: eyebrow + animated callout */}
          <FadeInSection as="div" className="flex flex-col md:col-span-5" delay={120}>
            <p className={`${HOME_ALT_HERO_LEAD_CLASS} mb-6`}>Core thesis</p>
            <EditorialWordStagger
              className={THESIS_CLASS}
              as="h2"
              text="Organizations are coordination engines. When they work, humans accomplish extraordinary things together."
              startOn="inView"
            />
          </FadeInSection>

          {/* Right: body prose (offset down for call-and-response stagger) */}
          <FadeInSection as="div" className="flex flex-col md:col-span-7 md:pt-16 lg:pt-24" delay={250}>
            <div className={BODY_PROSE}>
              <p>
                Markets, institutions, DAOs, networks — these are all
                coordination systems. Technology is accelerating. Intelligence is
                becoming abundant. But coordination remains difficult. And
                coordination is where the twenty-first century will be won or
                lost.
              </p>
              <p>
                Elementary Complexity explores, designs, and operates systems
                through which humans coordinate — strategy, narrative,
                governance — so that organizations can expand their capacity for
                collective action.
              </p>
            </div>
          </FadeInSection>
        </div>
      </Section>

      {/* ── Section 2: The Work ─────────────────────────────── */}
      <Section variant="alt" contained reveal="none">
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-10 lg:gap-x-12">
          {/* Left: eyebrow + animated callout */}
          <FadeInSection as="div" className="flex flex-col md:col-span-5" delay={120}>
            <p className={`${HOME_ALT_HERO_LEAD_CLASS} mb-6`}>
              What we deliver
            </p>
            <EditorialWordStagger
              className={THESIS_CLASS}
              as="h2"
              text="A strategic studio at the intersection of governance design, narrative architecture, and cultural production."
              startOn="inView"
            />
          </FadeInSection>

          {/* Right: body (offset down for call-and-response stagger) */}
          <FadeInSection as="div" className="flex flex-col md:col-span-7 md:pt-16 lg:pt-24" delay={250}>
            <div className={BODY_PROSE}>
              <p>
                From designing governance systems for decentralized
                organizations to shaping product narrative or standing up entire
                communications architectures for emerging ecosystems, we do
                what&apos;s needed. Sometimes it takes the form of conferences,
                launch videos, brand systems, or a beer can.
              </p>
              <p>
                What connects every project is a focus on how ideas, people, and
                artifacts interact inside real systems — and how to make those
                interactions more legible, more intentional, and more effective.
              </p>
            </div>
          </FadeInSection>
        </div>
      </Section>

      {/* ── Section 3: Principal ────────────────────────────── */}
      <Section variant="default" contained reveal="none">
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-10 lg:gap-x-12">
          {/* Left: eyebrow + animated callout */}
          <FadeInSection as="div" className="flex flex-col md:col-span-5" delay={120}>
            <p className={`${HOME_ALT_HERO_LEAD_CLASS} mb-6`}>Principal</p>
            <EditorialWordStagger
              className={THESIS_CLASS}
              as="h2"
              text="A decade inside decentralized technology — building governance, shaping narratives, producing the artifacts that make institutions real. Elementary Complexity grew out of that practice."
              startOn="inView"
            />
          </FadeInSection>

          {/* Right: body (offset down for call-and-response stagger) */}
          <FadeInSection as="div" className="flex flex-col md:col-span-7 md:pt-16 lg:pt-24" delay={250}>
            <div className={BODY_PROSE}>
              <p>
                Elementary Complexity is the name of this studio — and, in
                compressed form, my own: Elco. It signals my dedication to
                learning how those engines work, how to service them — and on a
                good day, how to design better ones.
              </p>
              <p>
                I&apos;m a designer, strategist, and systems thinker working at
                the intersection of technology, governance, and culture. I live my
                day to day inside organizations that are inventing new ways for
                humans to coordinate.
              </p>
            </div>
          </FadeInSection>
        </div>
      </Section>

      {/* ── Section 4: Praxis ─────────────────────────────── */}
      <Section variant="alt" contained reveal="none">
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-10 lg:gap-x-12">
          {/* Left: eyebrow + callout */}
          <FadeInSection as="div" className="flex flex-col md:col-span-5" delay={120}>
            <p className={`${HOME_ALT_HERO_LEAD_CLASS} mb-6`}>Praxis</p>
            <h2 className={THESIS_CLASS}>
              A strategic studio delivering solutions across{' '}
              <Link
                href="/framework"
                className="border-b border-black text-black transition-colors hover:border-gray-500 hover:text-gray-600"
              >
                9&nbsp;dimensions
              </Link>
              . The focus is on getting the ball rolling. Everything starts
              with{' '}
              <BookDiscoveryCallTrigger
                appearance="link"
                className="border-b border-black text-black transition-colors hover:border-gray-500 hover:text-gray-600 inline text-[length:inherit] font-[inherit] tracking-[inherit] leading-[inherit] uppercase-[inherit] p-0"
              >
                a&nbsp;conversation
              </BookDiscoveryCallTrigger>
              .
            </h2>
          </FadeInSection>

          {/* Right: body (offset down for call-and-response stagger) */}
          <FadeInSection as="div" className="flex flex-col md:col-span-7 md:pt-16 lg:pt-24" delay={250}>
            <div className={BODY_PROSE}>
              <p>
                The engagement model is flexible. Projects range from short
                advisory engagements to deeper collaborations involving system
                design, communication architecture, and artifact production. The
                studio works with organizations where coordination is the core
                challenge: emerging networks, decentralized organizations,
                protocol teams, institutional innovators, and teams building new
                kinds of institutions.
              </p>
            </div>
          </FadeInSection>
        </div>
      </Section>

      <DiscoveryCTAv3 />
    </>
  );
}
