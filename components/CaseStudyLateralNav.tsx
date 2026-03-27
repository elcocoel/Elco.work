'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  NOISE_SVG,
  HERO_GRADIENTS,
  SOFT_FULL_GRADIENT,
  SOFT_FULL_GRADIENT_FLIPPED,
  IMAGE_BG_SIZE,
  IMAGE_BG_POSITION,
  REVEAL_DURATION_MS,
  REVEAL_EASING,
} from '../lib/projectHoverImage';

/**
 * When measured scrollbar width is 0, returns an offset to use.
 * - Classic scrollbars (Windows/Linux desktop): 17px fallback
 * - Overlay scrollbars (Mac, touch): 15px clearance so the overlay doesn't overlap the button
 */
function getScrollbarOffsetWhenMeasuredZero(): number {
  if (typeof navigator === 'undefined') return 15;
  const platform = navigator.platform ?? '';
  const ua = navigator.userAgent ?? '';
  if (platform === 'Win32' || ua.includes('Windows')) return 17;
  if (platform === 'Linux' && !ua.includes('Android')) return 17;
  return 15;
}

function useScrollbarWidth() {
  useEffect(() => {
    const measure = () => {
      const measured = window.innerWidth - document.documentElement.clientWidth;
      const offsetWhenZero = getScrollbarOffsetWhenMeasuredZero();
      const final = measured > 0 ? measured : offsetWhenZero;
      document.documentElement.style.setProperty('--scrollbar-width', `${final}px`);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
}

const OUTCOMES_SECTION_ID = 'case-study-outcomes';

interface NavProject {
  slug: string;
  title: string;
  descriptor?: string;
  year?: string;
  heroImage?: { url: string; alt?: string } | null;
}

interface CaseStudyLateralNavProps {
  prev?: NavProject;
  next?: NavProject;
  basePath?: string;
}

/**
 * Lateral navigation between case studies.
 * Desktop: wing buttons fixed on left/right edges, fade in when reaching Outcomes (sticky—once visible, stays).
 * Arrow keys Left/Right navigate when wings are visible.
 * Mobile: inline block at bottom, two cards side by side (no stack).
 * Infinite loop: suggested projects wrap; "next/previous" language may change—shouldn't imply episodes or continuity.
 */
export function CaseStudyLateralNav({
  prev,
  next,
  basePath = '/case-studies',
}: CaseStudyLateralNavProps) {
  useScrollbarWidth();
  const router = useRouter();
  const [wingsVisible, setWingsVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById(OUTCOMES_SECTION_ID);
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setWingsVisible(true);
        });
      },
      { threshold: 0, rootMargin: '0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!wingsVisible) return;
      if (document.querySelector('[aria-modal="true"]')) return;
      const target = e.target as HTMLElement;
      if (target?.closest('input, textarea, select')) return;

      if (e.key === 'ArrowLeft' && prev) {
        e.preventDefault();
        router.push(`${basePath}/${prev.slug}`);
      } else if (e.key === 'ArrowRight' && next) {
        e.preventDefault();
        router.push(`${basePath}/${next.slug}`);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [wingsVisible, prev, next, basePath, router]);

  const href = (slug: string) => `${basePath}/${slug}`;
  const wingBase =
    'fixed top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center justify-center w-7 h-36 rounded-sm border border-gray-200 bg-gray-300 hover:bg-gray-400 text-gray-600 hover:text-black transition-colors duration-200 transition-opacity duration-300';
  const wingVisible = wingsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none';

  return (
    <>
      {/* Wing buttons — fixed, flush to edges, desktop only (lg+), fade in after passing problem/solutions border */}
      {prev && (
        <Link
          href={href(prev.slug)}
          className={`left-0 rounded-r-sm border-l-0 ${wingBase} ${wingVisible}`}
          aria-label={`Previous: ${prev.title}`}
        >
          <svg
            className="w-3 h-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
      )}
      {next && (
        <Link
          href={href(next.slug)}
          className={`right-[var(--scrollbar-width,1rem)] rounded-l-sm border-r-0 ${wingBase} ${wingVisible}`}
          aria-label={`Next: ${next.title}`}
        >
          <svg
            className="w-3 h-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      )}

      {/* Bottom block — matches home grid: Link wraps inner div; inner div has overflow-hidden + shadow (same as home). mb-12 so area before Back link matches page bg. */}
      {(prev || next) && (
        <div className="grid grid-cols-2 pt-0 mb-12 min-h-[18rem]">
          {prev ? (
            <Link
              href={href(prev.slug)}
              className="group block h-full"
              aria-label={`Previous project: ${prev.title}`}
            >
              <div className="relative overflow-hidden border border-gray-100 rounded-l-sm bg-white p-4 sm:p-5 h-full min-h-full flex flex-col justify-end transition-shadow duration-200 group-hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                {/* Hero bg — invisible by default, color + gradients on hover */}
                {prev.heroImage && (
                  <div
                    className="absolute inset-0 opacity-0 grayscale group-hover:opacity-100 group-hover:grayscale-0"
                    style={{
                      transition: `opacity ${REVEAL_DURATION_MS}ms ${REVEAL_EASING}, filter ${REVEAL_DURATION_MS}ms ${REVEAL_EASING} 80ms`,
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url(${prev.heroImage.url})`,
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
                <div className="relative z-10 flex items-start gap-3">
                  <svg
                    className="w-4 h-5 sm:w-5 sm:h-6 shrink-0 text-gray-400 group-hover:text-black transition-colors mt-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  <div className="space-y-2 min-w-0 flex-1 text-left">
                    <h3 className="font-display text-base sm:text-lg font-medium uppercase tracking-wide text-black">
                      {prev.title}
                    </h3>
                    {prev.descriptor && (
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base group-hover:text-gray-700 transition-colors line-clamp-2">
                        {prev.descriptor}
                      </p>
                    )}
                    {prev.year && (
                      <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                        {prev.year}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="min-h-full" />
          )}
          {next ? (
            <Link
              href={href(next.slug)}
              className="group block h-full"
              aria-label={`Next project: ${next.title}`}
            >
              <div className="relative overflow-hidden border border-gray-100 rounded-r-sm bg-white p-4 sm:p-5 h-full min-h-full flex flex-col justify-end transition-shadow duration-200 group-hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                {/* Hero bg — invisible by default, color + gradients on hover */}
                {next.heroImage && (
                  <div
                    className="absolute inset-0 opacity-0 grayscale group-hover:opacity-100 group-hover:grayscale-0"
                    style={{
                      transition: `opacity ${REVEAL_DURATION_MS}ms ${REVEAL_EASING}, filter ${REVEAL_DURATION_MS}ms ${REVEAL_EASING} 80ms`,
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url(${next.heroImage.url})`,
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
                        backgroundImage: `${HERO_GRADIENTS}, ${SOFT_FULL_GRADIENT_FLIPPED}`,
                        backgroundSize: 'cover',
                      }}
                      aria-hidden
                    />
                  </div>
                )}
                <div className="relative z-10 flex items-start gap-3 justify-end">
                  <div className="space-y-2 min-w-0 flex-1 text-right">
                    <h3 className="font-display text-base sm:text-lg font-medium uppercase tracking-wide text-black">
                      {next.title}
                    </h3>
                    {next.descriptor && (
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base group-hover:text-gray-700 transition-colors line-clamp-2">
                        {next.descriptor}
                      </p>
                    )}
                    {next.year && (
                      <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                        {next.year}
                      </p>
                    )}
                  </div>
                  <svg
                    className="w-4 h-5 sm:w-5 sm:h-6 shrink-0 text-gray-400 group-hover:text-black transition-colors mt-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>
            </Link>
          ) : (
            <div className="min-h-full" />
          )}
        </div>
      )}
    </>
  );
}
