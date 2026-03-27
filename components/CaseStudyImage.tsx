'use client';

import Image from 'next/image';
import { useScrollSaturation } from '../lib/useScrollSaturation';
import { PlaceholderTooltip } from './PlaceholderTooltip';

interface CaseStudyImageProps {
  src: string;
  alt?: string;
  type?: 'mockup' | 'asset' | 'gallery' | 'video-still';
  placeholderHint?: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  /** How the image fills its container. Default 'cover' (crop to fill). Use 'contain' to show full image with letterbox/pillarbox. */
  objectFit?: 'cover' | 'contain';
  /** When true, saturation driven by scroll focus zone instead of hover. */
  useScrollSaturation?: boolean;
}

/** Use native img for /project-media paths to avoid Next.js Image validation issues. */
const useNativeImg = (src: string) => src.startsWith('/project-media');

/**
 * Project image with B&W + noise by default, color reveal on hover (0.5s ease) or scroll focus zone.
 * When placeholderHint is provided, shows tooltip on hover.
 */
export function CaseStudyImage({
  src,
  alt = '',
  type,
  placeholderHint,
  className = '',
  width,
  height,
  fill = false,
  objectFit = 'cover',
  useScrollSaturation: scrollSaturation = false,
}: CaseStudyImageProps) {
  const [saturationRef, saturation] = useScrollSaturation();

  const fitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';
  const imgClass =
    `${fitClass} transition-[filter,transform] duration-500 ease-out` +
    (scrollSaturation ? '' : ' grayscale group-hover:grayscale-0 group-hover:scale-105') +
    (fill ? ' w-full h-full' : '');

  const imgStyle = scrollSaturation ? { filter: `grayscale(${saturation})` } : undefined;
  const combinedImgStyle = fill
    ? { width: '100%', height: '100%', objectFit, ...imgStyle }
    : imgStyle;

  const content = (
    <span
      ref={scrollSaturation ? saturationRef : undefined}
      className={`${scrollSaturation ? '' : 'group'} relative block overflow-hidden ${className}`}
    >
      <span
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      {useNativeImg(src) ? (
        <img
          src={src}
          alt={alt}
          className={imgClass + (fill ? ' absolute inset-0' : '')}
          style={combinedImgStyle}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width ?? 1200}
          height={fill ? undefined : height ?? 800}
          fill={fill}
          className={imgClass}
          style={imgStyle}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
        />
      )}
    </span>
  );

  if (placeholderHint) {
    return (
      <PlaceholderTooltip
        hint={placeholderHint}
        className={fill ? 'block absolute inset-0 w-full h-full' : ''}
      >
        {content}
      </PlaceholderTooltip>
    );
  }
  return content;
}
