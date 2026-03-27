'use client';

import { useState } from 'react';
import { getYouTubeVideoId, useYouTubeThumbnailUrl } from '@/lib/youtube';
import { CaseStudyImage } from './CaseStudyImage';
import { Eyebrow } from './ui/Eyebrow';
import { PlayOverlay } from './ui/PlayOverlay';
import { Section } from './ui/Section';
import { SectionTitle } from './ui/SectionTitle';

interface CaseStudyHighlightBlockProps {
  /** Full-width media: image or video (YouTube or local mp4/webm). */
  media?: { url: string; alt?: string; description?: string; mediaType?: 'video' | 'youtube' };
  /** When true, images use scroll-based saturation. */
  useScrollSaturation?: boolean;
  /** When YouTube thumbnail probe fails (e.g. private video), use this image as fallback. */
  heroFallbackUrl?: string | null;
}

function isYouTubeUrl(url: string): boolean {
  return getYouTubeVideoId(url) !== null;
}

/**
 * Full-width highlight block (no text). Supports image, YouTube preview (thumbnail + play overlay), or local video.
 * Placed between Problem/Solutions or Solutions/Outcomes.
 */
export function CaseStudyHighlightBlock({
  media,
  useScrollSaturation = false,
  heroFallbackUrl,
}: CaseStudyHighlightBlockProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  if (!media?.url) return null;

  const isYouTube = media.mediaType === 'youtube' || isYouTubeUrl(media.url);
  const isLocalVideo = media.mediaType === 'video' && !isYouTube;
  const youtubeThumb = useYouTubeThumbnailUrl(
    isYouTube ? media.url : null,
    isYouTube ? heroFallbackUrl : undefined
  );
  const videoId = isYouTube ? getYouTubeVideoId(media.url) : null;
  const isVideo = isYouTube || isLocalVideo;
  const showCaption = isVideo && (media.alt || media.description);

  const videoBlock = (
    <div className="relative w-full aspect-video overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
        {isYouTube ? (
          isPlaying && videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
              title={media.alt ?? 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <>
              {youtubeThumb ? (
                <img
                  src={youtubeThumb}
                  alt={media.alt ?? 'Video preview'}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-100" />
              )}
              <PlayOverlay onClick={() => setIsPlaying(true)} />
            </>
          )
        ) : isLocalVideo ? (
          <video
            src={media.url}
            controls
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            title={media.alt ?? 'Video'}
          />
        ) : (
          <CaseStudyImage
            src={media.url}
            alt={media.alt}
            placeholderHint={media.alt}
            fill
            objectFit="contain"
            className="absolute inset-0 w-full h-full"
            useScrollSaturation={useScrollSaturation}
          />
        )}
    </div>
  );

  return (
    <Section variant="default" contained reveal="fade">
      {showCaption && (
        <>
          <Eyebrow className="text-gray-500 mb-4">Video</Eyebrow>
          <SectionTitle className="mb-4">{media.alt}</SectionTitle>
        </>
      )}
      {videoBlock}
      {showCaption && media.description && (
        <p className="mt-3 text-center text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
          {media.description}
        </p>
      )}
    </Section>
  );
}
