'use client';

import {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useCallback,
  type CSSProperties,
} from 'react';
import type { ManifestoStage } from '@/lib/manifestoPairs';
import { FRAMEWORK_CARD_HAIRLINE_BORDER } from '@/lib/frameworkCardStyles';
import { EDITORIAL_CALLOUT_VERB_CLASS } from '@/lib/homeAltHeroTypography';
import { TypewriterText } from './ui/TypewriterText';

const STAGGER_TOTAL_MS = 200;

/** Fallback row heights (px) for editorial before measure / SSR — tuned so layout rarely jumps. */
const EDITORIAL_TOP_FALLBACK_PX = 80;
const EDITORIAL_SECOND_FALLBACK_PX = 240;

function longestStageField(
  stages: ManifestoStage[],
  key: 'top' | 'rest' | 'verb',
): string {
  return stages.reduce((acc, s) => {
    const v = s[key];
    return v.length > acc.length ? v : acc;
  }, '');
}

interface StaggeredWordRevealProps {
  text: string;
  totalMs?: number;
  onComplete?: () => void;
  start?: boolean;
  className?: string;
}

function StaggeredWordReveal({
  text,
  totalMs = STAGGER_TOTAL_MS,
  onComplete,
  start = true,
  className = '',
}: StaggeredWordRevealProps) {
  const didComplete = useRef(false);
  const words = text.trim().split(/\s+/);

  useEffect(() => {
    if (!start || words.length === 0 || didComplete.current) return;
    const t = setTimeout(() => {
      didComplete.current = true;
      onComplete?.();
    }, totalMs);
    return () => clearTimeout(t);
  }, [start, words.length, totalMs, onComplete]);

  if (!start || words.length === 0) return <span className={className} />;

  const delayPerWord = Math.max(1, totalMs / words.length);

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={`${i}-${word}`}
          className="animate-stagger-word-in opacity-0"
          style={{
            animationDelay: `${i * delayPerWord}ms`,
            animationFillMode: 'forwards',
          }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

const VERB_ANIM_IN_MS = 450;
const VERB_ANIM_OUT_MS = 350;

interface VerbSlideInProps {
  verb: string;
  onComplete?: () => void;
}

/** Rotating verb — default: Anton. Editorial: Syne callout verb (sentence case), scaled under display body. */
const VERB_BASE =
  'font-accent uppercase tracking-wide text-black block w-full max-w-full text-center overflow-hidden';

const EDITORIAL_VERB_SHELL =
  'block w-full max-w-full text-center overflow-hidden';

function verbTypeClass(
  visualSize: 'stage' | 'cta',
  variant: 'default' | 'editorial',
): string {
  if (variant === 'editorial') {
    return `${EDITORIAL_CALLOUT_VERB_CLASS} ${EDITORIAL_VERB_SHELL}`;
  }
  return visualSize === 'cta'
    ? `${VERB_BASE} text-lg leading-tight`
    : `${VERB_BASE} text-3xl sm:text-4xl leading-[0.95]`;
}

interface VerbSlideInPropsWithClass extends VerbSlideInProps {
  verbTypeClass: string;
}

function VerbSlideIn({ verb, onComplete, verbTypeClass }: VerbSlideInPropsWithClass) {
  useEffect(() => {
    const t = setTimeout(() => onComplete?.(), VERB_ANIM_IN_MS);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <span
      className={`${verbTypeClass} animate-verb-slide-in`}
      style={{ hyphens: 'manual' }}
    >
      {verb}
    </span>
  );
}

interface VerbSlideOutProps {
  verb: string;
  onComplete?: () => void;
}

interface VerbSlideOutPropsWithClass extends VerbSlideOutProps {
  verbTypeClass: string;
}

function VerbSlideOut({ verb, onComplete, verbTypeClass }: VerbSlideOutPropsWithClass) {
  useEffect(() => {
    const t = setTimeout(() => onComplete?.(), VERB_ANIM_OUT_MS);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <span
      className={`${verbTypeClass} animate-verb-slide-out`}
      style={{ hyphens: 'manual' }}
    >
      {verb}
    </span>
  );
}

function TopRowTerminalCursor() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setVisible((v) => !v), 320);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      className={`inline-block bg-current transition-opacity duration-75 ${
        visible ? 'opacity-90' : 'opacity-20'
      }`}
      style={{
        width: '3px',
        height: '0.7em',
        marginLeft: '2px',
        verticalAlign: 'baseline',
      }}
      aria-hidden
    />
  );
}

function ECLabelTwoLines({ variant }: { variant: 'default' | 'editorial' }) {
  const tracking = variant === 'editorial' ? 'tracking-wide' : 'tracking-wider';
  return (
    <span
      className={`font-display font-medium uppercase ${tracking} text-black block`}
    >
      <span className="block">Elementary</span>
      <span className="block">Complexity</span>
    </span>
  );
}

interface ManifestoStagesAnimationProps {
  stages: ManifestoStage[];
  startDelayMs?: number;
  className?: string;
  /**
   * `default` — original hairlines + Anton verb + gray-100/50 fills.
   * `editorial` — card hairlines; verb column uses `EDITORIAL_CALLOUT_VERB_CLASS`.
   */
  variant?: 'default' | 'editorial';
  /**
   * `stage` (default) — large verb for canonical home.
   * `cta` — compact verb row (Anton in default; editorial uses callout verb).
   */
  verbVisualSize?: 'stage' | 'cta';
}

export function ManifestoStagesAnimation({
  stages,
  startDelayMs = 0,
  className = '',
  variant = 'default',
  verbVisualSize = 'stage',
}: ManifestoStagesAnimationProps) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'top' | 'verb' | 'rest' | 'verbExit'>('idle');
  const [topStarted, setTopStarted] = useState(false);
  const [topComplete, setTopComplete] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const [editorialHeights, setEditorialHeights] = useState<{
    top: number;
    second: number;
  } | null>(null);

  const stage = stages[index];

  const containerRef = useRef<HTMLDivElement>(null);
  const editorialTopMeasureRef = useRef<HTMLDivElement>(null);
  const editorialSecondMeasureRef = useRef<HTMLDivElement>(null);

  const longestTop = useMemo(() => longestStageField(stages, 'top'), [stages]);
  const longestRest = useMemo(() => longestStageField(stages, 'rest'), [stages]);
  const longestVerb = useMemo(() => longestStageField(stages, 'verb'), [stages]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    if (startDelayMs <= 0) {
      setPhase('top');
      setTopStarted(true);
      return;
    }
    const t = setTimeout(() => {
      setPhase('top');
      setTopStarted(true);
    }, startDelayMs);
    return () => clearTimeout(t);
  }, [mounted, startDelayMs, cycleKey]);

  const onTopComplete = useCallback(() => {
    setTopComplete(true);
    setTimeout(() => setPhase('verb'), 400);
  }, []);

  const onVerbComplete = useCallback(() => {
    setTimeout(() => setPhase('rest'), 300);
  }, []);

  const onRestComplete = useCallback(() => {
    setTimeout(() => setPhase('verbExit'), 2000);
  }, []);

  const onVerbExitComplete = useCallback(() => {
    setIndex((i) => (i + 1) % stages.length);
    setPhase('top');
    setTopStarted(true);
    setTopComplete(false);
    setCycleKey((k) => k + 1);
  }, [stages.length]);

  useLayoutEffect(() => {
    if (!mounted || variant !== 'editorial') return;

    const measure = () => {
      const topEl = editorialTopMeasureRef.current;
      const secondEl = editorialSecondMeasureRef.current;
      if (!topEl || !secondEl) return;
      const top = Math.max(topEl.offsetHeight, EDITORIAL_TOP_FALLBACK_PX);
      const second = Math.max(secondEl.offsetHeight, EDITORIAL_SECOND_FALLBACK_PX);
      setEditorialHeights((prev) =>
        prev && prev.top === top && prev.second === second ? prev : { top, second },
      );
    };

    measure();
    const wrap = containerRef.current;
    if (!wrap || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [mounted, variant, stages, longestTop, longestRest, longestVerb, verbVisualSize]);

  if (!stage) return null;

  const TOP_ROW_HEIGHT = '5rem';
  const verbClass = verbTypeClass(verbVisualSize, variant);
  const SECOND_ROW_HEIGHT = verbVisualSize === 'cta' ? '9rem' : '12rem';

  const hairline = variant === 'editorial' ? FRAMEWORK_CARD_HAIRLINE_BORDER : 'border-gray-200';
  const topRowClass =
    variant === 'editorial'
      ? `border ${hairline} bg-gray-50/30 p-4 font-display font-medium normal-case tracking-tight text-black text-base sm:text-lg leading-snug overflow-hidden`
      : `border ${hairline} bg-gray-100 p-4 font-display text-xs uppercase tracking-widest overflow-hidden leading-relaxed`;
  const editorialTopPx =
    variant === 'editorial'
      ? editorialHeights?.top ?? EDITORIAL_TOP_FALLBACK_PX
      : null;
  const editorialSecondPx =
    variant === 'editorial'
      ? editorialHeights?.second ?? EDITORIAL_SECOND_FALLBACK_PX
      : null;

  const topRowStyle: CSSProperties =
    variant === 'editorial'
      ? {
          width: '100%',
          height: editorialTopPx,
          minHeight: editorialTopPx,
          maxHeight: editorialTopPx,
        }
      : {
          fontSize: '1.03rem',
          height: TOP_ROW_HEIGHT,
          width: '100%',
          color: 'rgb(107, 114, 128)',
        };
  const leftCellBg = variant === 'editorial' ? 'bg-white' : '';
  const centerCellBg = variant === 'editorial' ? 'bg-gray-50/30' : 'bg-gray-50';
  const restTypeClass =
    variant === 'editorial'
      ? 'text-base sm:text-lg leading-relaxed text-gray-600'
      : 'text-lg leading-relaxed text-gray-700';

  const secondRowHeightStyle =
    variant === 'editorial'
      ? {
          width: '33.33%' as const,
          height: editorialSecondPx,
          minHeight: editorialSecondPx,
          maxHeight: editorialSecondPx,
        }
      : { width: '33.33%' as const, height: SECOND_ROW_HEIGHT };

  if (!mounted) {
    const skTop =
      variant === 'editorial' ? EDITORIAL_TOP_FALLBACK_PX : TOP_ROW_HEIGHT;
    const skSecond =
      variant === 'editorial' ? EDITORIAL_SECOND_FALLBACK_PX : SECOND_ROW_HEIGHT;
    return (
      <div className={`w-full max-w-full min-w-0 ${className}`}>
        <table className="w-full max-w-full border-collapse table-fixed">
          <tbody>
            <tr>
              <td
                colSpan={3}
                className={`border ${hairline} p-4 overflow-hidden ${
                  variant === 'editorial' ? 'bg-gray-50/30' : 'bg-gray-100'
                }`}
                style={
                  variant === 'editorial'
                    ? {
                        height: skTop,
                        minHeight: skTop,
                        maxHeight: skTop,
                        width: '100%',
                      }
                    : { height: TOP_ROW_HEIGHT, width: '100%' }
                }
              >
                <div />
              </td>
            </tr>
            <tr>
              <td
                className={`border ${hairline} p-4 overflow-hidden ${leftCellBg}`}
                style={
                  variant === 'editorial'
                    ? { ...secondRowHeightStyle }
                    : { width: '33.33%', height: skSecond }
                }
              >
                <div />
              </td>
              <td
                className={`border ${hairline} p-4 overflow-hidden ${centerCellBg}`}
                style={
                  variant === 'editorial'
                    ? { ...secondRowHeightStyle }
                    : { width: '33.33%', height: skSecond }
                }
              >
                <div />
              </td>
              <td
                className={`border ${hairline} p-4 overflow-hidden ${leftCellBg}`}
                style={
                  variant === 'editorial'
                    ? { ...secondRowHeightStyle }
                    : { width: '33.33%', height: skSecond }
                }
              >
                <div />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-full min-w-0 ${className}`}
      lang="en"
    >
      {variant === 'editorial' && (
        <div
          className="pointer-events-none invisible absolute left-0 top-0 z-0 w-full"
          aria-hidden
        >
          <div ref={editorialTopMeasureRef} className={topRowClass} style={{ width: '100%' }}>
            <div className="flex min-h-0 items-center justify-center text-center">
              <span>{longestTop}</span>
            </div>
          </div>
          <div ref={editorialSecondMeasureRef} className="flex w-full">
            <div
              className={`flex w-1/3 shrink-0 items-center justify-center p-4 ${leftCellBg}`}
            >
              <ECLabelTwoLines variant="editorial" />
            </div>
            <div
              className={`flex w-1/3 shrink-0 items-center justify-center overflow-hidden p-4 text-center ${centerCellBg}`}
            >
              <span className={verbClass} style={{ hyphens: 'manual' }}>
                {longestVerb}
              </span>
            </div>
            <div className={`flex w-1/3 shrink-0 items-center p-4 ${leftCellBg}`}>
              <span className={`block min-w-0 ${restTypeClass}`}>{longestRest}</span>
            </div>
          </div>
        </div>
      )}
      <table className="w-full max-w-full border-collapse table-fixed">
        <tbody>
          <tr>
            <td
              colSpan={3}
              className={topRowClass}
              style={topRowStyle}
            >
              <div className="flex h-full min-h-0 items-center justify-center overflow-hidden text-center">
                <span>
                  <StaggeredWordReveal
                    key={`${index}-${cycleKey}`}
                    text={stage.top}
                    totalMs={STAGGER_TOTAL_MS}
                    start={topStarted}
                    onComplete={onTopComplete}
                  />
                  {topComplete && <TopRowTerminalCursor />}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td
              className={`border ${hairline} p-4 overflow-hidden align-top ${leftCellBg}`}
              style={
                variant === 'editorial'
                  ? secondRowHeightStyle
                  : { width: '33.33%', height: SECOND_ROW_HEIGHT }
              }
            >
              {phase !== 'idle' && (
                <div className="flex h-full min-h-full items-center justify-center">
                  <ECLabelTwoLines variant={variant} />
                </div>
              )}
            </td>
            <td
              className={`border ${hairline} p-4 text-center align-top overflow-hidden ${centerCellBg}`}
              style={
                variant === 'editorial'
                  ? secondRowHeightStyle
                  : { width: '33.33%', height: SECOND_ROW_HEIGHT }
              }
            >
              <div className="flex h-full min-h-full min-w-0 w-full items-center justify-center overflow-hidden">
                <div className="min-w-0 w-full max-w-full overflow-hidden">
                  {phase === 'verb' && (
                    <VerbSlideIn
                      verb={stage.verb}
                      verbTypeClass={verbClass}
                      onComplete={onVerbComplete}
                    />
                  )}
                  {phase === 'rest' && (
                    <span className={verbClass} style={{ hyphens: 'manual' }}>
                      {stage.verb}
                    </span>
                  )}
                  {phase === 'verbExit' && (
                    <VerbSlideOut
                      verb={stage.verb}
                      verbTypeClass={verbClass}
                      onComplete={onVerbExitComplete}
                    />
                  )}
                </div>
              </div>
            </td>
            <td
              className={`border ${hairline} p-4 overflow-hidden align-middle ${leftCellBg}`}
              style={
                variant === 'editorial'
                  ? secondRowHeightStyle
                  : { width: '33.33%', height: SECOND_ROW_HEIGHT }
              }
            >
              {phase === 'rest' && (
                <div className="flex h-full min-h-0 items-center overflow-hidden">
                  <span className={`block min-h-0 w-full ${restTypeClass}`}>
                    <TypewriterText
                      key={`${index}-${cycleKey}`}
                      text={stage.rest}
                      start
                      cursor
                      onComplete={onRestComplete}
                    />
                  </span>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/** Framework page: same animation as {@link ManifestoStagesAnimation}, editorial strokes + callout verb column. */
export function ManifestoStagesAnimationEditorial(
  props: Omit<ManifestoStagesAnimationProps, 'variant'>,
) {
  return <ManifestoStagesAnimation {...props} variant="editorial" />;
}
