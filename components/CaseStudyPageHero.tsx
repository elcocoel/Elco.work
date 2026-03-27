'use client';

import { useScrollSaturation } from '../lib/useScrollSaturation';

interface CaseStudyPageHeroProps {
  label: string;
  title: string;
  imagePath: string;
  imagePosition?: string;
  /** hover = color on hover (default). scroll = saturation from viewport focus zone. */
  saturationStyle?: 'hover' | 'scroll';
}

/**
 * Hero for case study pages. Uses project image with B&W + noise + gradients.
 * Color reveals on hover (0.5s ease) or via scroll-based focus zone when saturationStyle="scroll".
 */
export function CaseStudyPageHero({
  label,
  title,
  imagePath,
  imagePosition = '50% 40%',
  saturationStyle = 'hover',
}: CaseStudyPageHeroProps) {
  const [saturationRef, saturation] = useScrollSaturation();

  return (
    <section
      className={`relative border-b border-gray-100 pt-16 sm:pt-20 pb-8 lg:pt-30 lg:pb-10 overflow-x-hidden flex flex-col min-h-[32vh] bg-gray-50 ${saturationStyle === 'hover' ? 'group' : ''}`}
    >
      {/* Image layer: B&W + noise, color on hover or scroll focus zone */}
      {saturationStyle === 'hover' ? (
        <div
          className="absolute inset-0 transition-[filter] duration-500 ease-out grayscale group-hover:grayscale-0"
          style={{
            backgroundImage: `url(${imagePath})`,
            backgroundSize: 'cover',
            backgroundPosition: imagePosition,
          }}
          aria-hidden
        />
      ) : (
        <div
          ref={saturationRef as React.RefObject<HTMLDivElement>}
          className="absolute inset-0 transition-[filter] duration-500 ease-out"
          style={{
            backgroundImage: `url(${imagePath})`,
            backgroundSize: 'cover',
            backgroundPosition: imagePosition,
            filter: `grayscale(${saturation})`,
          }}
          aria-hidden
        />
      )}
      <span
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      {/* Gradients overlay (same as framework/about) */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: [
            'linear-gradient(to bottom, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.35) 40%, transparent 65%)',
            'linear-gradient(to top, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.5) 38%, rgba(255,255,255,0.12) 65%, transparent 85%)',
            'radial-gradient(ellipse 85% 70% at 50% 55%, transparent 50%, rgba(0,0,0,0.06) 100%)',
            'linear-gradient(rgba(255,255,255,0.65), rgba(255,255,255,0.65))',
          ].join(', '),
          backgroundSize: 'cover',
        }}
        aria-hidden
      />
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full text-center">
        <p
          className="font-display uppercase tracking-widest text-gray-400 mb-6 mix-blend-multiply"
          style={{ fontSize: '1.03rem' }}
        >
          {label}
        </p>
      </div>
      <div className="relative z-10 flex-1 flex items-center justify-center min-h-0 w-full">
        <div className="relative w-full max-w-full flex justify-center px-3 sm:px-6">
          <h1
            className="font-display font-extrabold uppercase tracking-tighter text-black leading-[0.85] whitespace-normal lg:whitespace-nowrap text-center max-w-full min-w-0 break-words [overflow-wrap:anywhere] hyphens-auto"
            style={{ fontSize: 'clamp(2.25rem, 7vw, 6.5rem)', textWrap: 'balance' }}
          >
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
