'use client';

import { useId, useMemo, useRef, type ReactNode } from 'react';
import { useBookingModal } from './BookingModalContext';
import { buildWavyRadialBadgePathD, DISCOVERY_FAB_CLIP_DEFAULTS } from '@/lib/wavyRectClipPath';
import { useDiscoveryFabClipPathAnimation } from '@/hooks/useDiscoveryFabClipPathAnimation';

const LINK_DEFAULT =
  'inline-block font-display text-lg font-medium uppercase tracking-wide text-black border-b-2 border-black pb-1 hover:border-gray-500 hover:text-gray-600 transition-colors';

const DISCOVERY_FAB_LINE_CLASS =
  'block max-w-full text-[0.64rem] tracking-[0.1em] leading-tight sm:text-[0.68rem] sm:tracking-[0.11em]';

interface BookDiscoveryCallTriggerProps {
  /**
   * `link` — underlined Syne caps (default site-wide).
   * `jewel` — prototype embedded control; `className` merged for spacing only.
   * `fab` — **circle base** + acute sine scallops on the radius (rAF phase); label stays horizontal.
   */
  appearance?: 'link' | 'jewel' | 'fab';
  className?: string;
  children?: React.ReactNode;
  /**
   * Default label copy: middle line on FAB (`Book a` / `{intent}` / `call`);
   * link/jewel default when `children` omitted. Home uses `discovery`.
   */
  callIntent?: 'discovery' | 'feedback';
  /** When `appearance="fab"` and custom `children`, set for screen readers. */
  fabAriaLabel?: string;
}

function DiscoveryFabShell({
  fabClipId,
  buttonClassName,
  onClick,
  ariaLabel,
  children,
}: {
  fabClipId: string;
  buttonClassName: string;
  onClick: () => void;
  ariaLabel: string;
  children: ReactNode;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  useDiscoveryFabClipPathAnimation(pathRef);
  const initialD = useMemo(
    () => buildWavyRadialBadgePathD({ ...DISCOVERY_FAB_CLIP_DEFAULTS, wavePhase: 0 }),
    [],
  );
  const clipUrl = `url(#${fabClipId})`;

  return (
    <span className="inline-block align-middle">
      <svg width={0} height={0} className="absolute" aria-hidden>
        <defs>
          <clipPath id={fabClipId} clipPathUnits="objectBoundingBox">
            <path ref={pathRef} d={initialD} />
          </clipPath>
        </defs>
      </svg>
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        style={{ clipPath: clipUrl, WebkitClipPath: clipUrl }}
        className={buttonClassName}
      >
        {children}
      </button>
    </span>
  );
}

function defaultLinkLabel(intent: 'discovery' | 'feedback') {
  return intent === 'feedback' ? 'Book a feedback call' : 'Book a discovery call';
}

export function BookDiscoveryCallTrigger({
  appearance = 'link',
  className,
  children,
  callIntent = 'discovery',
  fabAriaLabel,
}: BookDiscoveryCallTriggerProps) {
  const { openModal } = useBookingModal();
  const fabClipId = `discovery-fab-clip-${useId().replace(/:/g, '')}`;
  const fabDefaultAria =
    callIntent === 'feedback' ? 'Book a feedback call' : 'Book a discovery call';
  const fabMiddleWord = callIntent === 'feedback' ? 'feedback' : 'discovery';

  if (appearance === 'link') {
    const btnClass = className ?? LINK_DEFAULT;
    return (
      <button type="button" onClick={openModal} className={btnClass}>
        {children ?? defaultLinkLabel(callIntent)}
      </button>
    );
  }

  if (appearance === 'fab') {
    const fabBase = [
      'jewel-funnel-group relative inline-flex flex-col items-center justify-center overflow-hidden rounded-none',
      'min-h-[10rem] min-w-[10rem] max-w-[10.75rem] px-8 py-9 sm:min-h-[10.5rem] sm:min-w-[10.5rem] sm:px-9 sm:py-10',
      'jewel-funnel-entry-noise jewel-funnel-entry-face',
      'bg-[#2c2a28] text-[#ece8e2]',
      'font-display font-medium uppercase',
      'shadow-[inset_0_2px_12px_rgba(0,0,0,0.5),inset_0_-1px_0_rgba(255,255,255,0.06),0_10px_40px_rgba(0,0,0,0.22)]',
      'transition-[transform,box-shadow,background-color] duration-200 ease-out',
      'hover:-translate-y-0.5 hover:bg-[#3a3734]',
      'hover:shadow-[inset_0_1px_6px_rgba(0,0,0,0.35),0_14px_44px_rgba(0,0,0,0.28)]',
      'active:translate-y-0 active:scale-[0.97] active:bg-[#232220]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ece8e2]/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
      'motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100',
    ].join(' ');

    const fabDefault = (
      <span className="discovery-fab-label flex w-full max-w-[6.85rem] flex-col items-center justify-center gap-[0.3em] px-2 text-center">
        <span className={DISCOVERY_FAB_LINE_CLASS}>Book a</span>
        <span className={DISCOVERY_FAB_LINE_CLASS}>{fabMiddleWord}</span>
        <span className={DISCOVERY_FAB_LINE_CLASS}>call</span>
      </span>
    );

    const fabAria = children != null ? fabAriaLabel ?? 'Book a call' : fabDefaultAria;

    return (
      <DiscoveryFabShell
        fabClipId={fabClipId}
        buttonClassName={className ? `${fabBase} ${className}` : fabBase}
        onClick={openModal}
        ariaLabel={fabAria}
      >
        {children ?? fabDefault}
      </DiscoveryFabShell>
    );
  }

  const jewelBase =
    [
      'jewel-funnel-group relative inline-flex items-center justify-center overflow-hidden rounded-sm',
      'jewel-funnel-entry-noise jewel-funnel-entry-face',
      'border border-black/55',
      'bg-[#2c2a28] text-[#ece8e2]',
      'font-display text-lg font-medium uppercase tracking-wide',
      'px-7 py-3',
      'shadow-[inset_0_2px_14px_rgba(0,0,0,0.52),inset_0_-1px_0_rgba(255,255,255,0.07)]',
      'transition-[transform,box-shadow,background-color,border-color] duration-200 ease-out',
      'hover:-translate-y-px hover:border-white/[0.18] hover:bg-[#3a3734]',
      'hover:shadow-[inset_0_1px_5px_rgba(0,0,0,0.28),0_5px_18px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.06)]',
      'active:translate-y-0.5 active:bg-[#232220] active:border-black/70',
      'active:shadow-[inset_0_4px_18px_rgba(0,0,0,0.68),inset_0_2px_4px_rgba(0,0,0,0.45)]',
      'active:duration-100',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ece8e2]/90 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50',
      'motion-reduce:hover:translate-y-0 motion-reduce:active:translate-y-0',
      'motion-reduce:hover:shadow-[inset_0_2px_14px_rgba(0,0,0,0.52),inset_0_-1px_0_rgba(255,255,255,0.07)]',
      'motion-reduce:active:shadow-[inset_0_2px_14px_rgba(0,0,0,0.52),inset_0_-1px_0_rgba(255,255,255,0.07)]',
    ].join(' ');

  return (
    <button
      type="button"
      onClick={openModal}
      className={className ? `${jewelBase} ${className}` : jewelBase}
    >
      <span className="jewel-funnel-entry-label">{children ?? defaultLinkLabel(callIntent)}</span>
    </button>
  );
}
