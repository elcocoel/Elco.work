'use client';

import {
  Children,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

interface StaggerChildrenProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  stepMs?: number;
  revealDelayMs?: number;
  /**
   * Child indices that stay unmounted until that item’s viewport reveal fires.
   * Use for components that start timers/animations on mount (e.g. manifesto, fractal strip).
   */
  deferMountIndices?: number[];
  /** Tailwind classes for the placeholder that reserves layout while deferred (per index). */
  deferMountPlaceholderClassName?: Partial<Record<number, string>>;
}

export function StaggerChildren({
  children,
  className = '',
  stepMs = 60,
  revealDelayMs = 90,
  deferMountIndices,
  deferMountPlaceholderClassName,
  ...props
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const timersRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});
  const triggeredRef = useRef<Record<number, boolean>>({});
  const [visibleMap, setVisibleMap] = useState<Record<number, boolean>>({});
  const items = Children.toArray(children);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const childrenEls = Array.from(el.querySelectorAll<HTMLElement>('[data-stagger-index]'));
    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const topDelta = a.boundingClientRect.top - b.boundingClientRect.top;
            if (Math.abs(topDelta) > 12) return topDelta;
            return a.boundingClientRect.left - b.boundingClientRect.left;
          });

        entering.forEach((entry, batchIndex) => {
          const idx = Number((entry.target as HTMLElement).dataset.staggerIndex);
          if (Number.isNaN(idx) || triggeredRef.current[idx]) return;
          triggeredRef.current[idx] = true;

          const delay = revealDelayMs + batchIndex * stepMs;
          timersRef.current[idx] = setTimeout(() => {
            setVisibleMap((prev) => ({ ...prev, [idx]: true }));
          }, delay);

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -14% 0px' }
    );

    childrenEls.forEach((itemEl) => observer.observe(itemEl));

    return () => {
      observer.disconnect();
      Object.values(timersRef.current).forEach(clearTimeout);
      timersRef.current = {};
      triggeredRef.current = {};
    };
  }, [items.length, revealDelayMs, stepMs]);

  const deferSet = deferMountIndices ? new Set(deferMountIndices) : null;

  return (
    <div ref={ref} className={className} {...props}>
      {items.map((child, index) => {
        const visible = !!visibleMap[index];
        const deferMount = deferSet?.has(index) ?? false;
        const showMountedContent = !deferMount || visible;
        const itemClasses = `transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`;
        const placeholderClass =
          deferMountPlaceholderClassName?.[index] ?? 'min-h-[200px] w-full';

        return (
          <div key={index} data-stagger-index={index} className={itemClasses}>
            {showMountedContent ? (
              child
            ) : (
              <div aria-hidden className={placeholderClass} />
            )}
          </div>
        );
      })}
    </div>
  );
}
