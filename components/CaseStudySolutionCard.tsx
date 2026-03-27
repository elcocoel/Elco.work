import { SOLUTION_CARD_IMAGE_SOFT_GRADIENT_STYLE } from '../lib/solutionCardImageGradients';
import { CaseStudyImage } from './CaseStudyImage';
import { Card } from './ui/Card';
import { Eyebrow } from './ui/Eyebrow';

interface CaseStudySolutionCardProps {
  eyebrow: string;
  content: string;
  image?: { url: string; alt?: string; placeholderHint?: string; mediaType?: 'video' | 'youtube' };
  useScrollSaturation?: boolean;
}

/**
 * Solution card: eyebrow + content + hero-style image (gradients, B&W, color on hover).
 */
export function CaseStudySolutionCard({
  eyebrow,
  content,
  image,
  useScrollSaturation = false,
}: CaseStudySolutionCardProps) {
  return (
    <Card className="flex flex-col hover:border-gray-300 overflow-hidden bg-white transition-colors">
      {/* Image area with gradient overlay */}
      <div className="relative aspect-[4/3] min-h-[140px] overflow-hidden bg-gray-50">
        {image ? (
          <>
            {image.mediaType === 'video' ? (
              <video
                src={image.url}
                muted
                loop
                playsInline
                autoPlay
                className="absolute inset-0 w-full h-full object-cover"
                aria-label={image.alt}
              />
            ) : (
              <CaseStudyImage
                src={image.url}
                alt={image.alt}
                placeholderHint={image.placeholderHint}
                fill
                className="absolute inset-0 w-full h-full"
                useScrollSaturation={useScrollSaturation}
              />
            )}
            {/* Soft gradient overlays (hero-style) - B&W image color-reveals on hover */}
            <span
              className="absolute inset-0 pointer-events-none z-10"
              style={SOLUTION_CARD_IMAGE_SOFT_GRADIENT_STYLE}
              aria-hidden
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-gray-100" />
        )}
      </div>
      {/* Text */}
      <div className="p-5 flex-1 flex flex-col">
        <Eyebrow className="text-gray-500 mb-3">
          {eyebrow}
        </Eyebrow>
        <p className="text-sm text-gray-700 leading-relaxed">
          {content}
        </p>
      </div>
    </Card>
  );
}
