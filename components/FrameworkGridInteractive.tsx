'use client';

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { FrameworkIcon } from '../lib/framework-icons';
import {
  FRAMEWORK_CARD_HAIRLINE_BORDER,
  FRAMEWORK_UNIFIED_STRIP_FRAME_CLASS,
  SELECTED_WORK_TILE_HOVER_SHADOW_CLASS,
} from '../lib/frameworkCardStyles';
import { TypewriterText } from './ui/TypewriterText';

/** Match `app/framework/page.tsx` StaggerChildren + FrameworkCardSet narrative stagger. */
const GRID_ROW_REVEAL_DELAY_MS = 120;
const GRID_ROW_STAGGER_STEP_MS = 55;

const ROW_LABELS = ['Explore', 'Design', 'Operate'] as const;
const COL_LABELS = ['Alignment', 'Meaning', 'Embodiment'] as const;

type RowLabel = (typeof ROW_LABELS)[number];
type ColLabel = (typeof COL_LABELS)[number];

const CELL_KEYS = ROW_LABELS.flatMap((row) =>
  COL_LABELS.map((col) => `${row}-${col}`)
);

const CELLS: Record<string, { label: string; content: string; icon: string }> = {
  'Explore-Alignment': {
    icon: '1-explore-alignment',
    label: 'Coordination Audit',
    content:
      'Mapping how power flows through the organization. Understanding governance gaps, decision flows, incentive structures.',
  },
  'Explore-Meaning': {
    icon: '1-explore-meaning',
    label: 'Communication Diagnosis',
    content:
      'Mapping how information and narratives move through the organization — and what that enables or blocks.',
  },
  'Explore-Embodiment': {
    icon: '1-explore-embodiment',
    label: 'Artifact Review',
    content:
      "Mapping and tracking the artifacts that ground the organization's culture. Assessing their effectiveness and coherence.",
  },
  'Design-Alignment': {
    icon: '2-design-alignment',
    label: 'Coordination System Design',
    content:
      'Designing decision-making systems. Governance processes, incentive architectures, coordination structures.',
  },
  'Design-Meaning': {
    icon: '2-design-meaning',
    label: 'Communications Process Architecture',
    content:
      'Designing how content is produced and moves across the organization and ecosystem. Channels, formats, flows.',
  },
  'Design-Embodiment': {
    icon: '2-design-embodiment',
    label: 'Cultural Artifact Design',
    content:
      'Designing the systems that guide artifact production and anchor institutional identity.',
  },
  'Operate-Alignment': {
    icon: '3-operate-alignment',
    label: 'Governance & Incentive Implementation',
    content:
      'Running governance day-to-day. Facilitating decisions, implementing coordination changes, navigating change management.',
  },
  'Operate-Meaning': {
    icon: '3-operate-meaning',
    label: 'Communications Process Operation',
    content:
      'Coordinating production and distribution of content across the ecosystem. Newsletters, posts, media.',
  },
  'Operate-Embodiment': {
    icon: '3-operate-embodiment',
    label: 'Artifact Production',
    content:
      'Producing artifacts that embody and reinforce institutional culture. Events, videos, brand systems, or even beer cans.',
  },
};

// Picks a random cell key different from the current one
function pickNextCell(current: string | null): string {
  const pool = CELL_KEYS.filter((k) => k !== current);
  return pool[Math.floor(Math.random() * pool.length)];
}

const MINI_HEADER_CLASS =
  'flex min-h-[2.75rem] items-end justify-center border-b border-r border-black/[0.12] bg-gray-50/30 px-1 pb-1.5 pt-2 text-center font-display text-[0.6rem] font-medium uppercase leading-tight tracking-wider text-gray-400 last:border-r-0';

const MINI_CORNER_CLASS =
  'min-w-[3.25rem] border-b border-r border-black/[0.12] bg-gray-100 p-2';

const MINI_ROW_LABEL_CLASS =
  'flex min-w-[3.25rem] items-center border-b border-r border-black/[0.12] bg-gray-50/30 px-2 py-2 font-display text-[0.65rem] font-medium uppercase tracking-wider text-gray-400 transition-opacity duration-700 ease-out';

const MINI_CELL_CLASS =
  'flex min-h-[2.75rem] items-center justify-center border-b border-r border-black/[0.12] bg-white last:border-r-0';

function ChevronMini({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`size-3.5 shrink-0 text-current transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

type MobileGridProps = {
  visibleRows: Record<number, boolean>;
  expanded: boolean;
  onToggleExpanded: () => void;
};

function FrameworkGridMobile({ visibleRows, expanded, onToggleExpanded }: MobileGridProps) {
  return (
    <div className="bg-white">
      <div
        className="grid w-full grid-cols-[minmax(3.25rem,auto)_repeat(3,minmax(0,1fr))] border-b border-black/[0.12]"
        role="img"
        aria-label="Intervention matrix: Explore, Design, Operate by Alignment, Meaning, Embodiment"
      >
        <div className={MINI_CORNER_CLASS} aria-hidden />
        {COL_LABELS.map((col) => (
          <div key={col} className={MINI_HEADER_CLASS}>
            <span className="line-clamp-3">{col}</span>
          </div>
        ))}
        {ROW_LABELS.map((row, rowIndex) => (
          <Fragment key={row}>
            <div
              className={`${MINI_ROW_LABEL_CLASS} ${
                visibleRows[rowIndex] ? 'opacity-100' : 'opacity-0'
              } ${rowIndex === ROW_LABELS.length - 1 ? 'border-b-0' : ''}`}
            >
              {row}
            </div>
            {COL_LABELS.map((col) => {
              const key = `${row}-${col}`;
              const cell = CELLS[key];
              return (
                <div
                  key={key}
                  className={`${MINI_CELL_CLASS} transition-opacity duration-700 ease-out ${
                    visibleRows[rowIndex] ? 'opacity-100' : 'opacity-0'
                  } ${rowIndex === ROW_LABELS.length - 1 ? 'border-b-0' : ''}`}
                >
                  {cell?.icon ? (
                    <FrameworkIcon
                      cellId={cell.icon}
                      className="size-5 text-gray-500"
                      aria-hidden
                    />
                  ) : null}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>

      <button
        type="button"
        aria-expanded={expanded}
        aria-controls="framework-grid-mobile-expanded"
        onClick={onToggleExpanded}
        className={`flex w-full items-center justify-center gap-2 bg-white px-4 py-3.5 font-display text-xs font-medium uppercase tracking-widest text-gray-500 transition-colors hover:text-black ${
          expanded ? `border-b ${FRAMEWORK_CARD_HAIRLINE_BORDER}` : 'border-b-0'
        } hover:border-black`}
      >
        {expanded ? 'Show compact matrix' : 'Full descriptions by mode'}
        <ChevronMini expanded={expanded} />
      </button>

      <div
        id="framework-grid-mobile-expanded"
        className={expanded ? 'block' : 'hidden'}
        aria-hidden={!expanded}
      >
        {ROW_LABELS.map((row, rowIndex) => (
          <div
            key={row}
            role="group"
            aria-label={`${row}: three intervention types`}
          >
            <div className="border-b border-black/[0.12] bg-gray-50/30 px-4 py-2.5">
              <span className="font-display text-xs font-medium uppercase tracking-widest text-gray-400">
                {row}
              </span>
              <span className="mt-0.5 block text-[0.65rem] font-normal normal-case tracking-normal text-gray-500">
                Row {rowIndex + 1} of 3 · Alignment, Meaning, Embodiment
              </span>
            </div>
            {COL_LABELS.map((col, colIndex) => {
              const key = `${row}-${col}`;
              const cell = CELLS[key];
              const isLast =
                rowIndex === ROW_LABELS.length - 1 &&
                colIndex === COL_LABELS.length - 1;
              return (
                <div
                  key={key}
                  className={`border-b border-black/[0.12] bg-white px-4 py-4 ${
                    isLast ? 'border-b-0' : ''
                  }`}
                >
                  <p className="font-display text-[0.65rem] font-medium uppercase tracking-widest text-gray-400">
                    {col}
                  </p>
                  <div className="mt-2 flex items-start gap-2.5">
                    {cell?.icon ? (
                      <FrameworkIcon
                        cellId={cell.icon}
                        className="mt-0.5 size-4 shrink-0 text-gray-500"
                        aria-hidden
                      />
                    ) : null}
                    <p className="font-display text-sm font-medium uppercase tracking-wide leading-snug text-black">
                      {cell?.label}
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {cell?.content}
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export type FrameworkGridInteractiveProps = {
  /**
   * Renders above the table inside the same outer frame (e.g. `FractalRevealStrip` with `cardShell="flush"`).
   * Shared border + radius — no gap between banner and grid.
   */
  topBanner?: ReactNode;
};

export function FrameworkGridInteractive({
  topBanner,
}: FrameworkGridInteractiveProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasEnteredRef = useRef(false);

  /** Below `md`: compact 3×3 + optional nine-card expansion. */
  const [mobileExpanded, setMobileExpanded] = useState(false);

  // Row-by-row entrance reveal
  const [visibleRows, setVisibleRows] = useState<Record<number, boolean>>({});

  // Which cell is hovered by the user
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const hoveredCellRef = useRef<string | null>(null);

  // Invitation loop state
  const [invitationCell, setInvitationCell] = useState<string | null>(null);
  const [invitationStarted, setInvitationStarted] = useState(false);
  const invitationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Entrance animation ──────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasEnteredRef.current) {
          hasEnteredRef.current = true;
          ROW_LABELS.forEach((_, i) => {
            setTimeout(() => {
              setVisibleRows((prev) => ({ ...prev, [i]: true }));
            }, GRID_ROW_REVEAL_DELAY_MS + i * GRID_ROW_STAGGER_STEP_MS);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -14% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Invitation loop ──────────────────────────────────────────────────
  const clearInvitationTimer = useCallback(() => {
    if (invitationTimerRef.current) {
      clearTimeout(invitationTimerRef.current);
      invitationTimerRef.current = null;
    }
  }, []);

  const scheduleNextInvitation = useCallback(
    (afterMs: number, currentKey: string | null) => {
      clearInvitationTimer();
      invitationTimerRef.current = setTimeout(() => {
        // Don't start if user is hovering
        if (hoveredCellRef.current !== null) return;
        const next = pickNextCell(currentKey);
        setInvitationCell(next);
        setInvitationStarted(false);
        // Small tick to let state settle before starting typewriter
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setInvitationStarted(true));
        });
      }, afterMs);
    },
    [clearInvitationTimer]
  );

  // Start invitation loop after grid enters viewport (1.5s delay)
  useEffect(() => {
    if (!hasEnteredRef.current) return;
  }, [visibleRows]);

  // When the last row becomes visible, kick off the invitation loop
  const lastRowVisible = visibleRows[ROW_LABELS.length - 1];
  useEffect(() => {
    if (!lastRowVisible) return;
    scheduleNextInvitation(1500, null);
    return () => clearInvitationTimer();
  }, [lastRowVisible, scheduleNextInvitation, clearInvitationTimer]);

  // When typewriter completes: hold 1.8s then clear, then wait 2s, then next
  const onInvitationComplete = useCallback(() => {
    clearInvitationTimer();
    invitationTimerRef.current = setTimeout(() => {
      const prev = invitationCell;
      setInvitationCell(null);
      setInvitationStarted(false);
      scheduleNextInvitation(2000, prev);
    }, 1800);
  }, [invitationCell, clearInvitationTimer, scheduleNextInvitation]);

  // ── Hover handlers ───────────────────────────────────────────────────
  const handleMouseEnter = useCallback(
    (key: string) => {
      hoveredCellRef.current = key;
      setHoveredCell(key);
      // Pause invitation if it's on the hovered cell
      if (invitationCell === key) {
        clearInvitationTimer();
        setInvitationCell(null);
        setInvitationStarted(false);
      }
    },
    [invitationCell, clearInvitationTimer]
  );

  const handleMouseLeave = useCallback(() => {
    hoveredCellRef.current = null;
    setHoveredCell(null);
    // Resume invitation loop after a short pause
    scheduleNextInvitation(800, null);
  }, [scheduleNextInvitation]);

  // Cleanup on unmount
  useEffect(() => () => clearInvitationTimer(), [clearInvitationTimer]);

  return (
    <div ref={containerRef} className="overflow-x-auto py-3">
      {/* Keep FRAMEWORK_UNIFIED_STRIP_FRAME_CLASS overflow-hidden so rounded-lg clips the banner; cell hover shadow may soften slightly at the card rim. */}
      <div
        className={`${FRAMEWORK_UNIFIED_STRIP_FRAME_CLASS} min-w-[min(100%,48rem)]`}
      >
        {topBanner != null ? (
          <div
            className={`shrink-0 border-b bg-gray-100 ${FRAMEWORK_CARD_HAIRLINE_BORDER}`}
          >
            {topBanner}
          </div>
        ) : null}

        <div className="md:hidden">
          <FrameworkGridMobile
            visibleRows={visibleRows}
            expanded={mobileExpanded}
            onToggleExpanded={() => setMobileExpanded((v) => !v)}
          />
        </div>

        {/* border-separate: collapsed borders mis-paint box-shadow on cells. Hover/shadow on <td> for full cell. */}
        <div className="hidden md:block">
        <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th
              scope="col"
              className="w-28 border-b border-r border-black/[0.12] bg-gray-100 p-5 text-left align-bottom"
            />
            {COL_LABELS.map((col) => (
              <th
                key={col}
                scope="col"
                className="border-b border-r border-black/[0.12] bg-gray-50/30 px-5 py-4 text-left align-bottom font-display text-xs font-medium uppercase tracking-widest text-gray-400 last:border-r-0"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/*
            Row reveal uses opacity only. transform on <tr> creates a per-row stacking context,
            so hovered <td> z-index cannot stack above the next row and box-shadow only reads on the bottom edge.
          */}
          {ROW_LABELS.map((row: RowLabel, rowIndex) => (
            <tr
              key={row}
              className={`transition-opacity duration-700 ease-out ${
                visibleRows[rowIndex] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <th
                scope="row"
                className={`border-r border-black/[0.12] bg-gray-50/30 px-5 py-4 text-left align-top font-display text-xs font-medium uppercase tracking-widest text-gray-400 ${
                  rowIndex === ROW_LABELS.length - 1
                    ? 'border-b-0'
                    : 'border-b border-black/[0.12]'
                }`}
              >
                {row}
              </th>
              {COL_LABELS.map((col: ColLabel) => {
                const key = `${row}-${col}`;
                const cell = CELLS[key];
                const isHovered = hoveredCell === key;
                const isInvitation = invitationCell === key;

                return (
                  <td
                    key={col}
                    className={`group border-b border-r border-black/[0.12] bg-white px-5 py-4 align-top cursor-default transition-shadow last:border-r-0 ${
                      isHovered
                        ? `relative z-10 ${SELECTED_WORK_TILE_HOVER_SHADOW_CLASS}`
                        : ''
                    } ${rowIndex === ROW_LABELS.length - 1 ? 'border-b-0' : ''}`}
                    onMouseEnter={() => handleMouseEnter(key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Inner flex only — hover lift + shadow live on <td> so they match the full cell, not text height. */}
                    <div className="relative flex min-h-full flex-col">
                      {/* Title row: icon + label — FrameworkCardDescriptionBlock grammar */}
                      <div className="mb-2 flex items-center gap-2.5">
                        {cell?.icon && (
                          <FrameworkIcon
                            cellId={cell.icon}
                            className="size-4 shrink-0 text-gray-500 transition-colors duration-300 group-hover:text-black sm:size-5"
                          />
                        )}
                        <p className="font-display text-sm font-medium uppercase tracking-wide leading-snug text-black">
                          {cell?.label}
                        </p>
                      </div>

                      {/* Description area — ghost text holds exact cell height forever.
                          Visible content is overlaid absolutely; layout never shifts. */}
                      <div className="relative text-sm leading-relaxed">
                        {/* Ghost: invisible, always present, sizes the container */}
                        <span className="opacity-0 select-none" aria-hidden>
                          {cell?.content}
                        </span>

                        {/* Overlay: absolutely positioned, never affects layout */}
                        <span className="absolute inset-0">
                          {/* Hover: full text, instant */}
                          {isHovered && (
                            <span className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                              {cell?.content}
                            </span>
                          )}

                          {/* Invitation: typewriter, only when not hovered */}
                          {!isHovered && isInvitation && cell?.content && (
                            <span className="text-gray-400">
                              <TypewriterText
                                key={`${key}-${invitationStarted}`}
                                text={cell.content}
                                speedMs={28}
                                start={invitationStarted}
                                cursor
                                onComplete={onInvitationComplete}
                              />
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
