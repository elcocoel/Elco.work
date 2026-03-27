'use client';

import { getYouTubeVideoId } from '@/lib/youtube';
import { CaseStudyImage } from './CaseStudyImage';
import { Card } from './ui/Card';

export interface OutcomeImageItem {
  type: 'image';
  id: string;
  url: string;
  alt?: string;
  placeholderHint?: string;
  mediaType?: 'video' | 'youtube';
}

export interface OutcomeFileItem {
  type: 'file';
  id: string;
  url: string;
  label: string;
  filename?: string;
}

export type OutcomeItem = OutcomeImageItem | OutcomeFileItem;

interface OutcomeImage {
  url: string;
  alt?: string;
  placeholderHint?: string;
  mediaType?: 'video' | 'youtube';
}

interface CaseStudyOutcomeGridProps {
  /** Legacy: images only. When items is provided, images is ignored. */
  images?: OutcomeImage[];
  /** Legacy: index-based click. When onItemClick is provided, onImageClick is ignored. */
  onImageClick?: (index: number) => void;
  /** Unified items (images + PDF files). When provided, replaces images. */
  items?: OutcomeItem[];
  /** ID-based click for gallery openAtId. Use with items. */
  onItemClick?: (id: string) => void;
  useScrollSaturation?: boolean;
  /** When YouTube thumbnail probe fails (e.g. private video), use this image as fallback. */
  heroFallbackUrl?: string | null;
}

function OutcomeFileCard({
  file,
  onItemClick,
}: {
  file: OutcomeFileItem;
  onItemClick?: (id: string) => void;
}) {
  const card = (
    <Card className="relative overflow-hidden bg-gray-100 border-0 rounded-none aspect-square w-full flex flex-col items-center justify-center p-4">
      <svg
        className="w-10 h-10 text-gray-500 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
      <span className="text-xs font-display uppercase tracking-wide text-gray-600 text-center line-clamp-2 mt-2 break-words">
        {file.label}
      </span>
    </Card>
  );

  if (!onItemClick) {
    return card;
  }

  return (
    <button
      type="button"
      onClick={() => onItemClick(file.id)}
      className="text-left w-full aspect-square min-w-0"
      aria-label={`Open ${file.label} in gallery`}
    >
      {card}
    </button>
  );
}

function OutcomeCard({
  img,
  index,
  id,
  onImageClick,
  onItemClick,
  useScrollSaturation,
  heroFallbackUrl,
}: {
  img: OutcomeImage;
  index: number;
  id?: string;
  onImageClick?: (index: number) => void;
  onItemClick?: (id: string) => void;
  useScrollSaturation?: boolean;
  heroFallbackUrl?: string | null;
}) {
  const isVideo = img.mediaType === 'video' || img.mediaType === 'youtube';
  const youtubeVideoId = img.mediaType === 'youtube' ? getYouTubeVideoId(img.url) : null;

  const card = (
    <Card
      key={index}
      className="relative overflow-hidden bg-gray-100 border-0 rounded-none aspect-square w-full"
    >
      {isVideo ? (
        img.mediaType === 'video' ? (
          <video
            src={img.url}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            aria-label={img.alt}
          />
        ) : youtubeVideoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&modestbranding=1&rel=0`}
            title={img.alt ?? 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-1/2 left-1/2 h-full w-[177.78%] min-w-full -translate-x-1/2 -translate-y-1/2"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-100" />
        )
      ) : (
        <CaseStudyImage
          src={img.url}
          alt={img.alt}
          placeholderHint={img.placeholderHint}
          fill
          className="absolute inset-0 w-full h-full"
          useScrollSaturation={useScrollSaturation}
        />
      )}
    </Card>
  );

  const handleClick = onItemClick && id ? () => onItemClick(id) : onImageClick ? () => onImageClick(index) : undefined;
  if (!handleClick) {
    return card;
  }

  return (
    <button
      key={id ?? index}
      type="button"
      onClick={handleClick}
      className="text-left w-full aspect-square min-w-0"
      aria-label={id ? `Open in gallery` : `Open outcome image ${index + 1} in gallery`}
    >
      {card}
    </button>
  );
}

/**
 * Uniform grid of square outcome images. All cells same size.
 * Videos (local + YouTube) autoplay muted in the grid; no play overlay. Click opens gallery.
 */
function isPdfUrl(url: string): boolean {
  try {
    return new URL(url, 'http://dummy').pathname.toLowerCase().endsWith('.pdf');
  } catch {
    return url.toLowerCase().endsWith('.pdf');
  }
}

export function CaseStudyOutcomeGrid({
  images = [],
  onImageClick,
  items,
  onItemClick,
  useScrollSaturation = false,
  heroFallbackUrl,
}: CaseStudyOutcomeGridProps) {
  const useItems = items != null && items.length > 0;
  const validImages = (images ?? []).filter((img): img is OutcomeImage => Boolean(img?.url));

  return (
    <div
      className="grid gap-px w-full bg-gray-100"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gridAutoRows: 'auto',
        gridAutoFlow: 'dense',
      }}
    >
      {useItems
        ? items.map((it) =>
            it.type === 'image' ? (
              <OutcomeCard
                key={it.id}
                img={it}
                index={0}
                id={it.id}
                onItemClick={onItemClick}
                useScrollSaturation={useScrollSaturation}
                heroFallbackUrl={heroFallbackUrl}
              />
            ) : (
              <OutcomeFileCard key={it.id} file={it} onItemClick={onItemClick} />
            )
          )
        : validImages.map((img, i) => (
            <OutcomeCard
              key={i}
              img={img}
              index={i}
              onImageClick={onImageClick}
              useScrollSaturation={useScrollSaturation}
              heroFallbackUrl={heroFallbackUrl}
            />
          ))}
    </div>
  );
}
