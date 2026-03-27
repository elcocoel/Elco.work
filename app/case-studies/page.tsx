import Link from 'next/link';
import { PageHero } from '../../components/PageHero';
import { DiscoveryCTAv3 } from '../../components/DiscoveryCTAv3';
import { Section } from '../../components/ui/Section';
import { CASE_STUDIES_V3 } from '../../lib/caseStudiesv3';
import { getCaseStudyHeroImageV2 } from '../../lib/caseStudyContentv2';
import {
  NOISE_SVG,
  HERO_GRADIENTS,
  SOFT_FULL_GRADIENT,
  IMAGE_BG_SIZE,
  IMAGE_BG_POSITION,
  REVEAL_DURATION_MS,
  REVEAL_EASING,
} from '../../lib/projectHoverImage';

export const metadata = {
  title: 'Case Studies — Elementary Complexity',
  description:
    'Selected projects in governance design, narrative architecture, and cultural production.',
};

export default function CaseStudiesPageV3() {
  return (
    <>
      <PageHero
        label="Selected work"
        title="Case Studies"
        imagePath="/assets/Serpentine.png"
        imagePosition="center"
      />

      <Section variant="default" reveal="fade" className="py-0 bg-transparent">
        <div className="divide-y divide-gray-200">
          {CASE_STUDIES_V3.map((project) => {
            const heroImage = getCaseStudyHeroImageV2(project.slug);
            const title = project.title;
            const eyebrow = project.category;
            const year = project.year;
            return (
              <Link
                key={project.slug}
                href={`/case-studies/${project.slug}`}
                className="group block relative overflow-hidden py-12 transition-shadow duration-200 group-hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                aria-label={`View case study: ${title}`}
              >
                <div
                  className="absolute inset-0 z-20 pointer-events-none border border-transparent transition-colors duration-200 group-hover:border-gray-200"
                  aria-hidden
                />

                <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h2 className="font-display text-xl font-medium uppercase tracking-wide text-black group-hover:text-gray-600 transition-colors">
                        {title}
                      </h2>
                      <p className="font-display text-xs uppercase tracking-widest text-gray-400 group-hover:text-gray-500 transition-colors mt-1">
                        {eyebrow}
                      </p>
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-gray-500 transition-colors tabular-nums">
                      {year}
                    </span>
                  </div>
                </div>

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
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: `${HERO_GRADIENTS}, ${SOFT_FULL_GRADIENT}`,
                        backgroundSize: 'cover',
                      }}
                      aria-hidden
                    />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </Section>

      <DiscoveryCTAv3 />
    </>
  );
}
