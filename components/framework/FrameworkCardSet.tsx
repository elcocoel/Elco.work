'use client';

import { FractalRevealStrip } from '../FractalRevealStrip';
import { StaggerChildren } from '../StaggerChildren';
import { FrameworkCardDescriptionBlock, type FrameworkCardItem } from './FrameworkCardDescriptionBlock';
import {
  FRAMEWORK_CARD_CONTAINER_CLASS,
  FRAMEWORK_CARD_GRID_CLASS,
  FRAMEWORK_CARD_HAIRLINE_BORDER,
  FRAMEWORK_CARD_HAIRLINE_DIVIDE_Y,
  FRAMEWORK_CARD_ILLUSTRATION_WRAPPER_CLASS,
  FRAMEWORK_UNIFIED_STRIP_FRAME_CLASS,
} from '../../lib/frameworkCardStyles';

export type FrameworkCardSetVariant = 'three-column' | 'split-left' | 'split-right';

interface IllustrationPhase {
  initialFrameIndex: number;
  startDelayMs: number;
}

interface FrameworkCardSetProps {
  variant: FrameworkCardSetVariant;
  items: readonly FrameworkCardItem[];
  illustrationPhases: readonly IllustrationPhase[];
  illustrationCaptionPrefix: string;
  stepMs?: number;
  revealDelayMs?: number;
}

/**
 * Framework card family: three-column, split-left, split-right.
 * Shared description block + illustration. StaggerChildren wired for reveal.
 */
export function FrameworkCardSet({
  variant,
  items,
  illustrationPhases,
  illustrationCaptionPrefix,
  /** Split layouts: per-description viewport stagger (harness home grid: 55 / 120). */
  stepMs = 55,
  revealDelayMs = 120,
}: FrameworkCardSetProps) {
  const singlePhase = illustrationPhases[0]!;

  if (variant === 'three-column') {
    return (
      <StaggerChildren
        className={FRAMEWORK_CARD_GRID_CLASS}
        stepMs={70}
        revealDelayMs={80}
      >
        {items.map((item, i) => {
          const phase = illustrationPhases[i]!;
          return (
            <div
              key={item.title}
              className={FRAMEWORK_CARD_CONTAINER_CLASS}
            >
              <div className={`${FRAMEWORK_CARD_ILLUSTRATION_WRAPPER_CLASS} border-b sm:border-b`}>
                <FractalRevealStrip
                  layout="card"
                  className="h-full min-h-0 w-full"
                  initialFrameIndex={phase.initialFrameIndex}
                  startDelayMs={phase.startDelayMs}
                  caption={`Fractal illustration — ${item.title} (${illustrationCaptionPrefix})`}
                />
              </div>
              <FrameworkCardDescriptionBlock item={item} asGroup={false} />
            </div>
          );
        })}
      </StaggerChildren>
    );
  }

  // split-left: illo left, descriptions right
  // split-right: descriptions left, illo right
  const illoFirst = variant === 'split-left';

  // FractalRevealStrip `layout="card"` uses h-full for the image viewport; that only works if
  // an ancestor has a definite height (min-height alone does not establish % height).
  const illustrationCell = (
    <div className="relative h-[20rem] w-full shrink-0 lg:h-full lg:min-h-[20rem]">
      <FractalRevealStrip
        layout="card"
        cardShell="flush"
        className="h-full min-h-0 w-full"
        initialFrameIndex={singlePhase.initialFrameIndex}
        startDelayMs={singlePhase.startDelayMs}
        caption={`Fractal illustration — ${illustrationCaptionPrefix}`}
      />
    </div>
  );

  const descriptionsCell = (
    <StaggerChildren
      className={`flex w-full flex-col ${FRAMEWORK_CARD_HAIRLINE_DIVIDE_Y}`}
      stepMs={stepMs}
      revealDelayMs={revealDelayMs}
    >
      {items.map((item) => (
        <div key={item.title} className="flex flex-col">
          <FrameworkCardDescriptionBlock item={item} asGroup />
        </div>
      ))}
    </StaggerChildren>
  );

  // Mobile: illustration always on top. Desktop: illo left or right per variant.
  // One outer hero-style frame (radius + ring) wraps illo + descriptions; strip uses flush shell at seam.
  const splitClassName = `flex flex-col lg:flex-row lg:min-h-[20rem] ${FRAMEWORK_UNIFIED_STRIP_FRAME_CLASS}`;
  return (
    <div className={splitClassName}>
      {illoFirst ? (
        <>
          <div
            className={`flex min-h-0 w-full flex-col border-b ${FRAMEWORK_CARD_HAIRLINE_BORDER} lg:w-1/3 lg:min-h-[20rem] lg:border-b-0 lg:border-r ${FRAMEWORK_CARD_HAIRLINE_BORDER}`}
          >
            {illustrationCell}
          </div>
          <div className="flex min-h-0 w-full flex-col lg:w-2/3">{descriptionsCell}</div>
        </>
      ) : (
        <>
          <div className="order-2 flex min-h-0 w-full flex-col lg:order-1 lg:w-2/3">
            {descriptionsCell}
          </div>
          <div
            className={`order-1 flex min-h-0 w-full flex-col border-b ${FRAMEWORK_CARD_HAIRLINE_BORDER} lg:order-2 lg:w-1/3 lg:min-h-[20rem] lg:border-b-0 lg:border-l ${FRAMEWORK_CARD_HAIRLINE_BORDER}`}
          >
            {illustrationCell}
          </div>
        </>
      )}
    </div>
  );
}
