'use client';

import { useEffect, useRef, useState } from 'react';
import {
  EDITORIAL_WORD_STAGGER_GAP_MS,
  EDITORIAL_WORD_STAGGER_START_DELAY_MS,
} from '../../lib/homeAltHeroTypography';

export type EditorialWordStaggerStartOn = 'mount' | 'inView';

export interface EditorialWordStaggerProps {
  text: string;
  className?: string;
  /** Classes for `<strong>` when `parseMarkdownBold` is true (e.g. Syne semibold on bridge body). */
  strongClassName?: string;
  /**
   * When true, `**like this**` is parsed as emphasis; each word still uses the same stagger timing.
   * Unclosed or stray `**` falls through as literal text.
   */
  parseMarkdownBold?: boolean;
  as?: 'p' | 'h1' | 'h2' | 'div';
  /** `mount` = home hero; `inView` = start when block enters viewport (exploration-driven). */
  startOn?: EditorialWordStaggerStartOn;
  startDelayMs?: number;
}

type WordToken = { word: string; bold: boolean };

function wordTokensFromText(text: string, parseBold: boolean): WordToken[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  if (!parseBold || !trimmed.includes('**')) {
    return trimmed.split(/\s+/).map((word) => ({ word, bold: false }));
  }

  const segments: { bold: boolean; content: string }[] = [];
  const re = /\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(trimmed)) !== null) {
    if (m.index > last) {
      segments.push({ bold: false, content: trimmed.slice(last, m.index) });
    }
    segments.push({ bold: true, content: m[1] });
    last = m.index + m[0].length;
  }
  if (last < trimmed.length) {
    segments.push({ bold: false, content: trimmed.slice(last) });
  }
  if (segments.length === 0) {
    segments.push({ bold: false, content: trimmed });
  }

  const tokens: WordToken[] = [];
  for (const seg of segments) {
    const parts = seg.content.trim().split(/\s+/).filter(Boolean);
    for (const word of parts) {
      tokens.push({ word, bold: seg.bold });
    }
  }
  return tokens;
}

/**
 * Word-in: `animate-stagger-word-in`, fixed inter-word interval (`EDITORIAL_WORD_STAGGER_GAP_MS`), reduced-motion safe.
 */
export function EditorialWordStagger({
  text,
  className = '',
  strongClassName = 'font-semibold text-black',
  parseMarkdownBold = false,
  as: Tag = 'p',
  startOn = 'mount',
  startDelayMs = EDITORIAL_WORD_STAGGER_START_DELAY_MS,
}: EditorialWordStaggerProps) {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(startOn === 'mount');
  const [revealStart, setRevealStart] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (startOn !== 'inView') return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [startOn]);

  useEffect(() => {
    // Never set revealStart while !mounted — that fired on the first effect pass and
    // left revealStart true before inView/mount timing, so below-fold lines finished on load.
    if (reducedMotion) {
      setRevealStart(true);
      return;
    }
    if (!mounted) return;
    if (startOn === 'inView' && !inView) return;

    const t = window.setTimeout(() => setRevealStart(true), startDelayMs);
    return () => window.clearTimeout(t);
  }, [mounted, reducedMotion, startOn, inView, startDelayMs]);

  const tokens = wordTokensFromText(text, parseMarkdownBold);
  const delayPerWord =
    reducedMotion || !revealStart ? 0 : Math.max(10, EDITORIAL_WORD_STAGGER_GAP_MS);

  const showStatic = reducedMotion || !mounted;

  return (
    <div ref={containerRef} className="w-full min-w-0">
      <Tag className={className}>
        {showStatic ? (
          parseMarkdownBold ? (
            <>
              {tokens.map((t, i) => (
                <span key={`s-${i}-${t.word}`} className="inline">
                  {t.bold ? <strong className={strongClassName}>{t.word}</strong> : t.word}
                  {i < tokens.length - 1 ? ' ' : ''}
                </span>
              ))}
            </>
          ) : (
            text.trim()
          )
        ) : (
          tokens.map((t, i) => (
            <span
              key={`${t.word}-${i}`}
              className={
                revealStart
                  ? 'animate-stagger-word-in inline opacity-0 [animation-fill-mode:forwards]'
                  : 'inline opacity-0'
              }
              style={revealStart ? { animationDelay: `${i * delayPerWord}ms` } : undefined}
            >
              {t.bold ? <strong className={strongClassName}>{t.word}</strong> : t.word}
              {i < tokens.length - 1 ? ' ' : ''}
            </span>
          ))
        )}
      </Tag>
    </div>
  );
}
