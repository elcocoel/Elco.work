'use client';

import { ReactNode, useState } from 'react';

interface PlaceholderTooltipProps {
  children: ReactNode;
  hint: string;
  className?: string;
}

/**
 * Wraps content and shows a tooltip on hover with suggested content description.
 * Used for placeholders to guide collaboration and final asset placement.
 */
export function PlaceholderTooltip({ children, hint, className = '' }: PlaceholderTooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 px-3 py-2 max-w-xs text-sm font-display uppercase tracking-wide text-gray-700 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg rounded-sm whitespace-normal text-left"
          role="tooltip"
        >
          {hint}
          <span className="block mt-1 text-xs text-gray-500 normal-case">
            Replace with actual asset when ready
          </span>
        </span>
      )}
    </span>
  );
}
