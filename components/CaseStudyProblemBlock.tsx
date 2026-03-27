import { CaseStudyImage } from './CaseStudyImage';
import { Eyebrow } from './ui/Eyebrow';
import { Section } from './ui/Section';

interface CaseStudyProblemBlockProps {
  context: string;
  image?: { url: string; alt?: string; placeholderHint?: string };
  useScrollSaturation?: boolean;
}

/**
 * Problem section: 40% text, 60% media. Always image (videos live in highlights).
 * Uses 16:9 aspect ratio.
 */
export function CaseStudyProblemBlock({
  context,
  image,
  useScrollSaturation = false,
}: CaseStudyProblemBlockProps) {
  const hasImage = image && image.url;

  return (
    <Section variant="default" contained reveal="fade">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Text: 40% (2/5 cols) — eyebrow, heading, body share column so image aligns with eyebrow */}
          <div className="lg:col-span-2 flex flex-col">
            <Eyebrow className="text-gray-500 mb-4">Context</Eyebrow>
            <h2 className="font-display text-2xl font-extrabold uppercase tracking-wide text-black mb-8">
              Problem
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed text-gray-700">
              {context}
            </p>
          </div>
          {/* Media: 60% (3/5 cols), 16:9 aspect, top-aligned with eyebrow */}
          <div className="lg:col-span-3 lg:flex lg:items-start">
            <div className="relative w-full aspect-video overflow-hidden rounded-sm border border-gray-100 bg-gray-50">
              {hasImage ? (
                <CaseStudyImage
                  src={image!.url}
                  alt={image!.alt}
                  placeholderHint={image!.placeholderHint}
                  fill
                  objectFit="contain"
                  className="absolute inset-0 w-full h-full"
                  useScrollSaturation={useScrollSaturation}
                />
              ) : (
                <div className="absolute inset-0 bg-gray-100" />
              )}
            </div>
          </div>
        </div>
    </Section>
  );
}
