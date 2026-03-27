import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '../../../components/PageHero';
import { CaseStudyInteractiveContent } from '../../../components/CaseStudyInteractiveContent';
import { DiscoveryCTAv3 } from '../../../components/DiscoveryCTAv3';
import { Section } from '../../../components/ui/Section';
import { CASE_STUDIES_V3, type CaseStudySlugV3 } from '../../../lib/caseStudiesv3';
import { getCaseStudyContentV3 } from '../../../lib/caseStudyContentv3';
import { getCaseStudyHeroImageV2 } from '../../../lib/caseStudyContentv2';

const SLUGS: CaseStudySlugV3[] = CASE_STUDIES_V3.map((c) => c.slug);

export async function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = CASE_STUDIES_V3.find((c) => c.slug === slug);
  if (!study) return { title: 'Case Study — Elementary Complexity' };
  return {
    title: `${study.title} — Elementary Complexity`,
    description: study.descriptor,
  };
}

export default async function CaseStudyPageV3({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = CASE_STUDIES_V3.find((c) => c.slug === slug);
  if (!study) notFound();

  const content = getCaseStudyContentV3(slug);

  if (!content) {
    const index = CASE_STUDIES_V3.findIndex((c) => c.slug === slug);
    const prevStudy = index > 0 ? CASE_STUDIES_V3[index - 1] : CASE_STUDIES_V3[CASE_STUDIES_V3.length - 1];
    const nextStudy = index < CASE_STUDIES_V3.length - 1 ? CASE_STUDIES_V3[index + 1] : CASE_STUDIES_V3[0];

    return (
      <>
        <PageHero
          label="Case study"
          title={study.title}
          imagePath="/assets/sde.png"
          imagePosition="50% 35%"
        />
        <Section variant="default" contained>
          <p className="max-w-reading text-xl text-gray-600 leading-relaxed">
            {study.descriptor}
          </p>
          <p className="mt-10 max-w-reading text-gray-600 leading-relaxed">
            This case study is not yet written. Add content here when
            you&apos;re ready to publish.
          </p>
          <div className="flex items-center justify-between gap-4 py-6 mt-10 border-t border-gray-200">
            <Link
              href={`/case-studies/${prevStudy.slug}`}
              className="font-display text-sm uppercase tracking-wide text-gray-500 hover:text-black transition-colors flex items-center gap-2"
            >
              <span className="text-gray-400" aria-hidden>←</span>
              {prevStudy.title}
            </Link>
            <Link
              href={`/case-studies/${nextStudy.slug}`}
              className="font-display text-sm uppercase tracking-wide text-gray-500 hover:text-black transition-colors flex items-center gap-2"
            >
              {nextStudy.title}
              <span className="text-gray-400" aria-hidden>→</span>
            </Link>
          </div>
          <Link
            href="/case-studies"
            className="mt-4 inline-block font-display text-sm uppercase tracking-wide text-gray-500 hover:text-black transition-colors"
          >
            ← Back to case studies
          </Link>
        </Section>
        <DiscoveryCTAv3 />
      </>
    );
  }

  const images = content.images;
  const heroImage =
    images.find((img) => (img as { slot?: string }).slot === 'hero') ??
    images[content.heroImageIndex] ??
    images[0];
  const problemImage =
    images.find((img) => (img as { slot?: string }).slot === 'problem') as
      | { url: string; alt?: string; placeholderHint?: string }
      | undefined;
  const solutionImages = [
    images.find((img) => (img as { slot?: string }).slot === 'solution-1'),
    images.find((img) => (img as { slot?: string }).slot === 'solution-2'),
    images.find((img) => (img as { slot?: string }).slot === 'solution-3'),
  ];
  const outcomeImages = images.filter(
    (img) => (img as { slot?: string }).slot === 'outcome',
  );
  const files = content.files ?? [];

  const index = CASE_STUDIES_V3.findIndex((c) => c.slug === slug);
  const prevStudy =
    index > 0
      ? CASE_STUDIES_V3[index - 1]
      : CASE_STUDIES_V3[CASE_STUDIES_V3.length - 1];
  const nextStudy =
    index < CASE_STUDIES_V3.length - 1
      ? CASE_STUDIES_V3[index + 1]
      : CASE_STUDIES_V3[0];

  const prevCaseStudy = {
    slug: prevStudy.slug,
    title: prevStudy.title,
    descriptor: prevStudy.category,
    year: prevStudy.year,
    heroImage: getCaseStudyHeroImageV2(prevStudy.slug),
  };
  const nextCaseStudy = {
    slug: nextStudy.slug,
    title: nextStudy.title,
    descriptor: nextStudy.category,
    year: nextStudy.year,
    heroImage: getCaseStudyHeroImageV2(nextStudy.slug),
  };

  return (
    <>
      <CaseStudyInteractiveContent
        content={content}
        heroImage={
          heroImage ?? { url: '/assets/sde.png', alt: 'Case study hero' }
        }
        problemImage={
          problemImage
            ? {
                url: problemImage.url,
                alt: problemImage.alt,
                placeholderHint: problemImage.placeholderHint,
              }
            : undefined
        }
        highlight1={content.highlight1}
        highlight2={content.highlight2}
        solutionImages={solutionImages}
        outcomeImages={outcomeImages}
        files={files}
        prevCaseStudy={prevCaseStudy}
        nextCaseStudy={nextCaseStudy}
        metadataPosition="bottom"
        scrollSaturation
        caseStudiesBasePath="/case-studies"
      />

      <DiscoveryCTAv3 />
    </>
  );
}
