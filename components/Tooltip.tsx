'use client';

import { ReactNode, useState } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  /** Placement relative to trigger. Default: top */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Additional class for the trigger wrapper */
  className?: string;
}

const placementClasses = {
  top: 'bottom-full left-1/2 -translate-x-3/4 mb-1',
  bottom: 'top-full left-1/2 -translate-x-3/4 mt-1',
  left: 'right-full top-1/2 -translate-y-1/2 mr-1',
  right: 'left-full top-1/2 -translate-y-1/2 ml-1',
};

/**
 * Site-standard tooltip. No delay, 250ms fade-in.
 * Body text, minimal padding, soft gray (#F7F7F7), hairline border, biased left for readability.
 */
export function Tooltip({
  content,
  children,
  placement = 'top',
  className = '',
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  const tooltipStyles =
    'px-2 py-1 text-sm text-gray-600 normal-case whitespace-nowrap bg-[#F7F7F7] border border-gray-200 rounded-sm';

  return (
    <div
      className={className ? `relative ${className}` : 'relative inline-block'}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <span
        role="tooltip"
        className={`
          pointer-events-none absolute z-50 transition-opacity duration-250 ease-out
          ${tooltipStyles}
          ${placementClasses[placement]}
          ${visible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {content}
      </span>
    </div>
  );
}
