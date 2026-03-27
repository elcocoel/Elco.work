'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CaseStudyPageHero } from './CaseStudyPageHero';
import { CaseStudyProblemBlock } from './CaseStudyProblemBlock';
import { CaseStudyHighlightBlock } from './CaseStudyHighlightBlock';
import { CaseStudySolutionCard } from './CaseStudySolutionCard';
import { CaseStudyOutcomeGrid, type OutcomeItem } from './CaseStudyOutcomeGrid';
import { CaseStudyFrameworkMiniGrid } from './CaseStudyFrameworkMiniGrid';
import { CaseStudyFile } from './CaseStudyFile';
import { CaseStudyLateralNav } from './CaseStudyLateralNav';
import { GalleryOverhaulModal } from './GalleryOverhaulModal';
import { StaggerChildren } from './StaggerChildren';
import { Eyebrow } from './ui/Eyebrow';
import { Section } from './ui/Section';
import { SectionTitle } from './ui/SectionTitle';
import type { CaseStudyContent } from '../lib/caseStudyContent';

type GallerySection = 'hero' | 'problem' | 'highlight-1' | 'solutions' | 'highlight-2' | 'outcomes' | 'files';
type GalleryItemType = 'image' | 'video' | 'file';

interface GalleryItem {
  id: string;
  section: GallerySection;
  type: GalleryItemType;
  title: string;
  description: string;
  src: string;
  alt?: string;
  filename?: string;
}

interface CaseStudyImageLike {
  url: string;
  alt?: string;
  placeholderHint?: string;
  mediaType?: 'video' | 'youtube';
}

interface CaseStudyFileLike {
  url: string;
  label: string;
  filename?: string;
  placeholderHint?: string;
}

interface CaseStudyHighlightLike {
  url: string;
  alt?: string;
  description?: string;
  mediaType?: 'video' | 'youtube';
}

interface CaseStudyInteractiveContentProps {
  content: CaseStudyContent;
  heroImage: CaseStudyImageLike;
  problemImage?: CaseStudyImageLike;
  highlight1?: CaseStudyHighlightLike;
  highlight2?: CaseStudyHighlightLike;
  solutionImages: Array<CaseStudyImageLike | undefined>;
  outcomeImages: CaseStudyImageLike[];
  files: CaseStudyFileLike[];
  /** Prev/next for lateral navigation. Infinite loop—suggested projects may change; next/prev language may be revisited. */
  prevCaseStudy?: {
    slug: string;
    title: string;
    descriptor?: string;
    year?: string;
    heroImage?: { url: string; alt?: string } | null;
  };
  nextCaseStudy?: {
    slug: string;
    title: string;
    descriptor?: string;
    year?: string;
    heroImage?: { url: string; alt?: string } | null;
  };
  /** Base path for case study links. Default: /case-studies */
  caseStudiesBasePath?: string;
  /** Metadata position: top (below hero) or bottom (before DiscoveryCTA). Default: top */
  metadataPosition?: 'top' | 'bottom';
  /** When true, images use scroll-based saturation (focus zone) instead of hover. For prototype. */
  scrollSaturation?: boolean;
}

function isPdfUrl(url: string): boolean {
  try {
    return new URL(url, 'http://dummy').pathname.toLowerCase().endsWith('.pdf');
  } catch {
    return url.toLowerCase().endsWith('.pdf');
  }
}

function isVideoHighlight(media: { url: string; mediaType?: 'video' | 'youtube' } | undefined): boolean {
  if (!media?.url) return false;
  if (media.mediaType === 'youtube' || media.mediaType === 'video') return true;
  try {
    const parsed = new URL(media.url);
    return parsed.hostname.includes('youtube.com') || parsed.hostname === 'youtu.be';
  } catch {
    return false;
  }
}

function toYouTubeEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtube.com') && parsed.pathname === '/watch') {
      const v = parsed.searchParams.get('v');
      return v ? `https://www.youtube.com/embed/${v}` : url;
    }
    if (parsed.hostname === 'youtu.be') {
      const v = parsed.pathname.slice(1).split('/')[0];
      return v ? `https://www.youtube.com/embed/${v}` : url;
    }
    if (parsed.hostname.includes('youtube.com') && parsed.pathname.startsWith('/embed/')) {
      return url;
    }
  } catch {
    /* ignore */
  }
  return url;
}

export function CaseStudyInteractiveContent({
  content,
  heroImage,
  problemImage,
  highlight1,
  highlight2,
  solutionImages,
  outcomeImages,
  files,
  prevCaseStudy,
  nextCaseStudy,
  caseStudiesBasePath = '/case-studies',
  metadataPosition = 'top',
  scrollSaturation = false,
}: CaseStudyInteractiveContentProps) {
  const galleryItems = useMemo<GalleryItem[]>(() => {
    const items: GalleryItem[] = [];

    items.push({
      id: 'hero-0',
      section: 'hero',
      type: 'image',
      title: 'Hero',
      description: content.subtitle,
      src: heroImage.url,
      alt: heroImage.alt,
    });

    if (problemImage) {
      items.push({
        id: 'problem-image',
        section: 'problem',
        type: 'image',
        title: 'Problem media',
        description: content.context,
        src: problemImage.url,
        alt: problemImage.alt,
      });
    }

    if (highlight1) {
      const isVideo = highlight1.mediaType === 'video' || highlight1.mediaType === 'youtube';
      items.push({
        id: 'highlight-1',
        section: 'highlight-1',
        type: isVideo ? 'video' : 'image',
        title: 'Highlight 1',
        description: content.context,
        src: highlight1.mediaType === 'youtube' ? toYouTubeEmbedUrl(highlight1.url) : highlight1.url,
        alt: highlight1.alt,
      });
    }

    const solutionContexts = [
      { title: content.alignment.heading, description: content.alignment.content },
      { title: content.meaning.heading, description: content.meaning.content },
      { title: content.embodiment.heading, description: content.embodiment.content },
    ];

    solutionImages.forEach((image, index) => {
      if (!image) return;
      items.push({
        id: `solutions-${index}`,
        section: 'solutions',
        type: 'image',
        title: solutionContexts[index]?.title ?? `Solution ${index + 1}`,
        description: solutionContexts[index]?.description ?? '<n/a>',
        src: image.url,
        alt: image.alt,
      });
    });

    if (highlight2) {
      const isVideo = highlight2.mediaType === 'video' || highlight2.mediaType === 'youtube';
      items.push({
        id: 'highlight-2',
        section: 'highlight-2',
        type: isVideo ? 'video' : 'image',
        title: 'Highlight 2',
        description: content.outcome,
        src: highlight2.mediaType === 'youtube' ? toYouTubeEmbedUrl(highlight2.url) : highlight2.url,
        alt: highlight2.alt,
      });
    }

    outcomeImages.forEach((image, index) => {
      const isVideo = image.mediaType === 'video' || image.mediaType === 'youtube';
      items.push({
        id: `outcomes-${index}`,
        section: 'outcomes',
        type: isVideo ? 'video' : 'image',
        title: `Outcome ${index + 1}`,
        description: content.outcome,
        src: image.mediaType === 'youtube' ? toYouTubeEmbedUrl(image.url) : image.url,
        alt: image.alt,
      });
    });

    files.forEach((file, index) => {
      items.push({
        id: `files-${index}`,
        section: 'files',
        type: 'file',
        title: file.label,
        description: file.placeholderHint ?? 'Downloadable file',
        src: file.url,
        filename: file.filename,
      });
    });

    return items;
  }, [content, files, heroImage, highlight1, highlight2, outcomeImages, problemImage, solutionImages]);

  const outcomeGridItems = useMemo<OutcomeItem[]>(() => {
    const imageItems: OutcomeItem[] = outcomeImages
      .filter((img) => img?.url)
      .map((img, i) => ({
        type: 'image' as const,
        id: `outcomes-${i}`,
        url: img.url,
        alt: img.alt,
        placeholderHint: img.placeholderHint,
        mediaType: img.mediaType,
      }));
    const pdfItems: OutcomeItem[] = files
      .map((f, origIdx) => (f?.url && isPdfUrl(f.url) ? { ...f, origIdx } : null))
      .filter((f): f is NonNullable<typeof f> & { origIdx: number } => f !== null)
      .map((f) => ({
        type: 'file' as const,
        id: `files-${f.origIdx}`,
        url: f.url,
        label: f.label,
        filename: f.filename,
      }));
    return [...imageItems, ...pdfItems];
  }, [outcomeImages, files]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [seenItemIds, setSeenItemIds] = useState<Set<string>>(new Set());

  const openAtId = (id: string) => {
    const nextIndex = galleryItems.findIndex((item) => item.id === id);
    if (nextIndex === -1) return;
    setActiveIndex(nextIndex);
    setSeenItemIds(new Set([galleryItems[nextIndex].id]));
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);
  const nextItem = () =>
    setActiveIndex((current) => {
      const nextIndex = (current + 1) % galleryItems.length;
      setSeenItemIds((prev) => {
        const next = new Set(prev);
        next.add(galleryItems[nextIndex].id);
        return next;
      });
      return nextIndex;
    });
  const prevItem = () =>
    setActiveIndex((current) => {
      const nextIndex = (current - 1 + galleryItems.length) % galleryItems.length;
      setSeenItemIds((prev) => {
        const next = new Set(prev);
        next.add(galleryItems[nextIndex].id);
        return next;
      });
      return nextIndex;
    });

  const selectItem = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= galleryItems.length) return;
    setActiveIndex(nextIndex);
    setSeenItemIds((prev) => {
      const next = new Set(prev);
      next.add(galleryItems[nextIndex].id);
      return next;
    });
  };

  const progressRatio =
    galleryItems.length > 0 ? Math.min(1, seenItemIds.size / galleryItems.length) : 0;

  return (
    <>
      <div className="relative">
        <CaseStudyPageHero
          label={content.heroEyebrow?.trim() || 'Case study'}
          title={content.title}
          imagePath={heroImage.url}
          imagePosition="50% 40%"
          saturationStyle={scrollSaturation ? 'scroll' : 'hover'}
        />
        <button
          type="button"
          onClick={() => openAtId('hero-0')}
          className="absolute inset-0"
          aria-label="Open global gallery from hero image"
        />
      </div>

      {metadataPosition === 'top' && (
        <Section variant="metadata" contained>
          <p className="mb-6 font-display font-normal text-xs uppercase tracking-widest text-gray-400">
            {content.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 sm:gap-12">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div>
                  {content.heroEyebrow?.trim() && (
                    <p className="font-display text-xs uppercase tracking-widest text-gray-400 mb-2">
                      {content.heroEyebrow.trim()}
                    </p>
                  )}
                  <CaseStudyFrameworkMiniGrid cells={content.frameworkCells ?? []} />
                </div>
                <div className="sm:max-w-[12rem] shrink-0">
                  <dt className="font-display font-normal text-xs uppercase tracking-widest text-gray-400">Role</dt>
                  <dd className="text-base text-gray-700 mt-0.5 normal-case">{content.metadata.role}</dd>
                </div>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                <span>
                  <span className="font-display font-normal text-xs uppercase tracking-widest text-gray-400">Client</span>
                  <span className="text-base text-gray-700 ml-1 normal-case"> {content.metadata.organization}</span>
                </span>
                <span>
                  <span className="font-display font-normal text-xs uppercase tracking-widest text-gray-400">Year</span>
                  <span className="text-base text-gray-700 ml-1 normal-case"> {content.metadata.year}</span>
                </span>
              </div>
            </div>
            {content.metadata.clientStatement && content.metadata.clientStatement.trim() && (
              <div className="flex flex-1 justify-center overflow-visible sm:pl-3">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 max-w-[28rem]">
                  <div className="flex flex-1 min-w-0 flex-col gap-3">
                    <blockquote className="relative flex gap-2 items-start text-base text-gray-700 leading-relaxed pl-6 normal-case" aria-label="Client statement">
                      <span
                        className="absolute left-0 top-0 font-display text-2xl font-extrabold text-black leading-none select-none"
                        aria-hidden="true"
                      >
                        &ldquo;
                      </span>
                      <span>{content.metadata.clientStatement}</span>
                    </blockquote>
                  {(content.metadata.clientName || content.metadata.clientRole) && (
                    <div className="flex flex-col gap-0.5 pl-6">
                        {content.metadata.clientName && (
                          <span className="text-base text-gray-700 normal-case">{content.metadata.clientName}</span>
                        )}
                        {content.metadata.clientRole && (
                          <span className="font-display font-normal text-xs uppercase tracking-widest text-gray-400">{content.metadata.clientRole}</span>
                        )}
                      </div>
                    )}
                  </div>
                  {content.metadata.clientAvatarUrl && (
                    <div className="group shrink-0">
                      <img
                        src={content.metadata.clientAvatarUrl}
                        alt=""
                        className="w-24 h-28 rounded-sm object-cover border border-gray-200 grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0"
                        width={96}
                        height={112}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Section>
      )}

      {problemImage ? (
        <div onClick={() => openAtId('problem-image')}>
          <CaseStudyProblemBlock
            context={content.context}
            image={problemImage}
            useScrollSaturation={scrollSaturation}
          />
        </div>
      ) : (
        <CaseStudyProblemBlock
          context={content.context}
          image={problemImage}
          useScrollSaturation={scrollSaturation}
        />
      )}

      {highlight1 &&
        (isVideoHighlight(highlight1) ? (
          <CaseStudyHighlightBlock
            media={highlight1}
            useScrollSaturation={scrollSaturation}
            heroFallbackUrl={heroImage?.url}
          />
        ) : (
          <div onClick={() => openAtId('highlight-1')}>
            <CaseStudyHighlightBlock
              media={highlight1}
              useScrollSaturation={scrollSaturation}
              heroFallbackUrl={heroImage?.url}
            />
          </div>
        ))}

      <Section variant="default" contained reveal="fade" revealDelay={50}>
        <Eyebrow className="text-gray-500 mb-4">What was built</Eyebrow>
        <SectionTitle className="mb-8">Solutions</SectionTitle>
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" stepMs={55} revealDelayMs={120}>
          <div onClick={() => openAtId('solutions-0')}>
            <CaseStudySolutionCard
              eyebrow={content.alignment.heading}
              content={content.alignment.content}
              image={solutionImages[0]}
              useScrollSaturation={scrollSaturation}
            />
          </div>
          <div onClick={() => openAtId('solutions-1')}>
            <CaseStudySolutionCard
              eyebrow={content.meaning.heading}
              content={content.meaning.content}
              image={solutionImages[1]}
              useScrollSaturation={scrollSaturation}
            />
          </div>
          <div onClick={() => openAtId('solutions-2')}>
            <CaseStudySolutionCard
              eyebrow={content.embodiment.heading}
              content={content.embodiment.content}
              image={solutionImages[2]}
              useScrollSaturation={scrollSaturation}
            />
          </div>
        </StaggerChildren>
      </Section>

      {highlight2 &&
        (isVideoHighlight(highlight2) ? (
          <CaseStudyHighlightBlock
            media={highlight2}
            useScrollSaturation={scrollSaturation}
            heroFallbackUrl={heroImage?.url}
          />
        ) : (
          <div onClick={() => openAtId('highlight-2')}>
            <CaseStudyHighlightBlock
              media={highlight2}
              useScrollSaturation={scrollSaturation}
              heroFallbackUrl={heroImage?.url}
            />
          </div>
        ))}

      <Section id="case-study-outcomes" variant="alt" contained reveal="fade" revealDelay={100}>
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16">
          <div className="lg:w-[40%] lg:shrink-0 lg:self-start space-y-8">
            <div>
              <Eyebrow className="text-gray-500 mb-4">Impact</Eyebrow>
              <SectionTitle className="mb-8">Outcomes</SectionTitle>
              <p className="text-lg lg:text-xl leading-relaxed text-gray-700">{content.outcome}</p>
            </div>
            <div>
              <Eyebrow className="text-gray-500 mb-4">Artifacts</Eyebrow>
              <ul className="list-none space-y-2 text-lg lg:text-xl leading-relaxed text-gray-700">
                {content.artifacts.map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-gray-400 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:flex-1 lg:min-w-0 space-y-8">
            <CaseStudyOutcomeGrid
              items={outcomeGridItems}
              onItemClick={openAtId}
              useScrollSaturation={scrollSaturation}
              heroFallbackUrl={heroImage?.url}
            />
            <div>
              <Eyebrow className="text-gray-500 mb-4">References</Eyebrow>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 list-none text-sm text-gray-600">
                {content.references.map((reference, index) => (
                  <li key={index} className="flex gap-2 min-w-0">
                    <span className="text-gray-400 shrink-0">•</span>
                    {reference.url ? (
                      <a
                        href={reference.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-b border-gray-400 hover:border-black transition-colors truncate min-w-0"
                        title={reference.text}
                      >
                        {reference.text}
                      </a>
                    ) : (
                      <span className="truncate min-w-0" title={reference.text}>{reference.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {metadataPosition === 'bottom' && (
        <Section variant="metadata" contained className="bg-gray-100/90">
          <p className="mb-6 font-display font-normal text-xs uppercase tracking-widest text-gray-400">
            {content.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 sm:gap-12">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div>
                  {content.heroEyebrow?.trim() && (
                    <p className="font-display text-xs uppercase tracking-widest text-gray-400 mb-2">
                      {content.heroEyebrow.trim()}
                    </p>
                  )}
                  <CaseStudyFrameworkMiniGrid cells={content.frameworkCells ?? []} />
                </div>
                <div className="sm:max-w-[12rem] shrink-0">
                  <dt className="font-display font-normal text-xs uppercase tracking-widest text-gray-400">Role</dt>
                  <dd className="text-base text-gray-700 mt-0.5 normal-case">{content.metadata.role}</dd>
                </div>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                <span>
                  <span className="font-display font-normal text-xs uppercase tracking-widest text-gray-400">Client</span>
                  <span className="text-base text-gray-700 ml-1 normal-case"> {content.metadata.organization}</span>
                </span>
                <span>
                  <span className="font-display font-normal text-xs uppercase tracking-widest text-gray-400">Year</span>
                  <span className="text-base text-gray-700 ml-1 normal-case"> {content.metadata.year}</span>
                </span>
              </div>
            </div>
            {content.metadata.clientStatement && content.metadata.clientStatement.trim() && (
              <div className="flex flex-1 justify-center overflow-visible sm:pl-3">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 max-w-[28rem]">
                  <div className="flex flex-1 min-w-0 flex-col gap-3">
                    <blockquote className="relative flex gap-2 items-start text-base text-gray-700 leading-relaxed pl-6 normal-case" aria-label="Client statement">
                      <span
                        className="absolute left-0 top-0 font-display text-2xl font-extrabold text-black leading-none select-none"
                        aria-hidden="true"
                      >
                        &ldquo;
                      </span>
                      <span>{content.metadata.clientStatement}</span>
                    </blockquote>
                  {(content.metadata.clientName || content.metadata.clientRole) && (
                    <div className="flex flex-col gap-0.5 pl-6">
                        {content.metadata.clientName && (
                          <span className="text-base text-gray-700 normal-case">{content.metadata.clientName}</span>
                        )}
                        {content.metadata.clientRole && (
                          <span className="font-display font-normal text-xs uppercase tracking-widest text-gray-400">{content.metadata.clientRole}</span>
                        )}
                      </div>
                    )}
                  </div>
                  {content.metadata.clientAvatarUrl && (
                    <div className="group shrink-0">
                      <img
                        src={content.metadata.clientAvatarUrl}
                        alt=""
                        className="w-24 h-28 rounded-sm object-cover border border-gray-200 grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0"
                        width={96}
                        height={112}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Section>
      )}

      {files.length > 0 && (
        <Section variant="default" contained reveal="fade" revealDelay={140}>
          <SectionTitle className="mb-8">Downloads</SectionTitle>
          <div className="flex flex-wrap gap-8">
            {files.map((file, index) => (
              <CaseStudyFile
                key={file.url + index}
                url={file.url}
                label={file.label}
                filename={file.filename}
                placeholderHint={file.placeholderHint}
                onActivate={() => openAtId(`files-${index}`)}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Nav section: sits below metadata, never overlaps. overflow-visible so card drop shadow isn't clipped. */}
      <Section variant="default" contained className="!pt-0 lg:!pt-0 overflow-visible">
        <CaseStudyLateralNav
          prev={prevCaseStudy}
          next={nextCaseStudy}
          basePath={caseStudiesBasePath}
        />
        <Link
          href={caseStudiesBasePath}
          className="inline-block font-display text-sm uppercase tracking-wide text-gray-500 hover:text-black transition-colors mt-4"
        >
          ← Back to case studies
        </Link>
      </Section>

      <GalleryOverhaulModal
        open={isOpen}
        items={galleryItems.map((i) => ({
          id: i.id,
          section: i.section,
          type: i.type,
          title: i.title,
          description: i.description,
          src: i.src,
          alt: i.alt,
          filename: i.filename,
        }))}
        index={activeIndex}
        progressRatio={progressRatio}
        onClose={closeModal}
        onPrev={prevItem}
        onNext={nextItem}
        onSelectIndex={selectItem}
        heroFallbackUrl={heroImage?.url}
      />
    </>
  );
}
