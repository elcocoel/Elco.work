import { PlaceholderTooltip } from './PlaceholderTooltip';

interface CaseStudyVideoProps {
  url: string;
  placeholderHint?: string;
  className?: string;
}

function getYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtube.com') && parsed.pathname === '/watch') {
      return parsed.searchParams.get('v');
    }
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1);
    }
    if (parsed.hostname.includes('youtube.com') && parsed.pathname.startsWith('/embed/')) {
      return parsed.pathname.split('/')[2];
    }
    return null;
  } catch {
    return null;
  }
}

export function CaseStudyVideo({ url, placeholderHint, className = '' }: CaseStudyVideoProps) {
  const videoId = getYouTubeId(url);
  if (!videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`;

  const video = (
    <div className={`relative w-full aspect-video overflow-hidden rounded-sm bg-gray-100 ${className}`}>
      <iframe
        src={embedUrl}
        title="Case study video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );

  if (placeholderHint) {
    return (
      <PlaceholderTooltip hint={placeholderHint} className="block">
        {video}
      </PlaceholderTooltip>
    );
  }
  return video;
}
