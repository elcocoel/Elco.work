'use client';

import { StaggerChildren } from './StaggerChildren';

const CONDITIONS = [
  {
    number: '01',
    label: 'Align',
    description: 'People coordinate around shared goals.',
  },
  {
    number: '02',
    label: 'Understand',
    description: 'The system must be legible to those inside it.',
  },
  {
    number: '03',
    label: 'Embody',
    description: 'Ideas must take form in the world.',
  },
] as const;

export function FrameworkCallout() {
  return (
    <StaggerChildren
      className="grid grid-cols-1 sm:grid-cols-3 mt-10"
      stepMs={80}
      revealDelayMs={100}
    >
      {CONDITIONS.map((c, i) => (
        <div
          key={c.number}
          className={`py-6 pr-8 ${
            i > 0 ? 'sm:border-l sm:border-gray-200 sm:pl-8' : ''
          } ${i < CONDITIONS.length - 1 ? 'border-b sm:border-b-0 border-gray-100' : ''}`}
        >
          <p className="font-display text-xs text-gray-400 tracking-widest mb-3">
            {c.number}
          </p>
          <p className="font-display text-sm font-extrabold uppercase tracking-wide text-black mb-2">
            {c.label}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">{c.description}</p>
        </div>
      ))}
    </StaggerChildren>
  );
}
