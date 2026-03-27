import Link from 'next/link';
import { DiscoveryCTAv3 } from '../components/DiscoveryCTAv3';
import { NewsletterSignupSection } from '../components/NewsletterSignupSection';
import { FadeInSection } from '../components/FadeInSection';
import { StaggerChildren } from '../components/StaggerChildren';
import { Section } from '../components/ui/Section';
import { HomeAltHero } from '../components/homealt/HomeAltHero';
import { getHeroBackgroundStyle } from '../lib/headerBackground';
import { CASE_STUDIES_V3 } from '../lib/caseStudiesv3';
import { getCaseStudyHeroImageV2 } from '../lib/caseStudyContentv2';
import {
  NOISE_SVG,
  HERO_GRADIENTS,
  SOFT_FULL_GRADIENT,
  IMAGE_BG_SIZE,
  IMAGE_BG_POSITION,
  REVEAL_DURATION_MS,
  REVEAL_EASING,
} from '../lib/projectHoverImage';

export const metadata = {
  title: 'Elementary Complexity',
  description:
    'Strategic studio at the intersection of research and design — coordination at scale.',
};

export default function HomePage() {
  return (
    <>
      <section
        className="relative overflow-x-hidden border-b border-gray-200 bg-gray-50"
        style={getHeroBackgroundStyle('/assets/imageggg.png', '50% 100%', {
          flipVerticalFade: true,
        })}
      >
        <div className="mx-auto w-full max-w-7xl px-6 pt-[1.36rem] pb-[1.6rem] sm:px-8 sm:pt-[1.7rem] sm:pb-8 lg:px-12 lg:pt-[2.04rem] lg:pb-[2.4rem] xl:pt-[2.38rem] xl:pb-[2.8rem]">
          <div className="mx-auto w-full max-w-7xl">
            <HomeAltHero />
          </div>
        </div>
      </section>

      <Section
        variant="default"
        contained
        className="pt-8 pb-24 lg:pt-10 lg:pb-30"
      >
        <div>
          <p className="mb-6 font-display text-xs uppercase tracking-widest text-gray-400">
            Selected Work
          </p>
          <h2 className="mb-16 max-w-3xl font-display text-4xl font-extrabold uppercase tracking-wide text-black">
            Projects
          </h2>
        </div>
        <FadeInSection as="div" delay={60}>
          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            stepMs={55}
            revealDelayMs={120}
          >
            {CASE_STUDIES_V3.map((project) => {
              const heroImage = getCaseStudyHeroImageV2(project.slug);
              const descriptor = project.descriptor;
              return (
                <Link
                  key={project.slug}
                  href={`/case-studies/${project.slug}`}
                  className="group block h-full"
                >
                  {/* Hover shadow: keep in sync with SELECTED_WORK_TILE_HOVER_SHADOW_CLASS in lib/frameworkCardStyles.ts */}
                  <div className="relative flex h-full min-h-[200px] flex-col overflow-hidden border border-gray-100 p-5 transition-shadow group-hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                    {heroImage && (
                      <div
                        className="absolute inset-0 opacity-0 grayscale group-hover:opacity-100 group-hover:grayscale-0"
                        style={{
                          transition: `opacity ${REVEAL_DURATION_MS}ms ${REVEAL_EASING}, filter ${REVEAL_DURATION_MS}ms ${REVEAL_EASING} 80ms`,
                        }}
                      >
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `url(${heroImage.url})`,
                            backgroundSize: IMAGE_BG_SIZE,
                            backgroundPosition: IMAGE_BG_POSITION,
                          }}
                          aria-hidden
                        />
                        <span
                          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
                          style={{ backgroundImage: NOISE_SVG }}
                          aria-hidden
                        />
                        <div
                          className="pointer-events-none absolute inset-0"
                          style={{
                            backgroundImage: `${HERO_GRADIENTS}, ${SOFT_FULL_GRADIENT}`,
                            backgroundSize: 'cover',
                          }}
                          aria-hidden
                        />
                      </div>
                    )}
                    <div className="relative z-10 min-w-0 space-y-3">
                      <h3 className="font-display text-lg font-medium uppercase tracking-wide text-black">
                        {project.title}
                      </h3>
                      <p className="break-words leading-relaxed text-gray-600 transition-colors group-hover:text-gray-700">
                        {descriptor}
                      </p>
                      <p className="text-sm text-gray-500 transition-colors group-hover:text-gray-600">
                        {project.year}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </StaggerChildren>
        </FadeInSection>
      </Section>

      <NewsletterSignupSection />

      <DiscoveryCTAv3 />
    </>
  );
}
