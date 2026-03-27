'use client';

import { useEffect, useRef, useState } from 'react';
import { FrameworkIcon } from '../lib/framework-icons';

const ROW_LABELS = ['Explore', 'Design', 'Operate'] as const;
const COL_LABELS = ['Alignment', 'Meaning', 'Embodiment'] as const;

type RowLabel = (typeof ROW_LABELS)[number];
type ColLabel = (typeof COL_LABELS)[number];

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

export function FrameworkGridAnimated() {
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);
  const [visibleRows, setVisibleRows] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !triggered.current) {
          triggered.current = true;
          ROW_LABELS.forEach((_, i) => {
            setTimeout(() => {
              setVisibleRows((prev) => ({ ...prev, [i]: true }));
            }, i * 140);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="overflow-x-auto">
      <table className="w-full border-collapse min-w-[min(100%,48rem)]">
        <thead>
          <tr>
            <th className="text-left p-4 border-b border-gray-200 w-28" />
            {COL_LABELS.map((col) => (
              <th
                key={col}
                className="text-left p-4 border-b border-gray-200 font-display text-sm font-extrabold uppercase tracking-wide text-black"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROW_LABELS.map((row: RowLabel, rowIndex) => (
            <tr
              key={row}
              className={`transition-all duration-700 ease-out ${
                visibleRows[rowIndex]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-3'
              }`}
            >
              <td className="p-4 border-b border-gray-200 font-display text-sm font-extrabold uppercase tracking-wide text-black align-top">
                {row}
              </td>
              {COL_LABELS.map((col: ColLabel) => {
                const cell = CELLS[`${row}-${col}`];
                return (
                  <td
                    key={col}
                    className="p-4 border-b border-gray-200 align-top group/cell hover:bg-white transition-colors duration-200 cursor-default"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      {cell?.icon && (
                        <FrameworkIcon
                          cellId={cell.icon}
                          className="size-3.5 text-gray-300 group-hover/cell:text-gray-500 transition-colors duration-200 shrink-0"
                        />
                      )}
                      <p className="font-display text-sm font-medium text-black leading-snug">
                        {cell?.label}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 leading-relaxed group-hover/cell:text-gray-700 transition-colors duration-200">
                      {cell?.content}
                    </p>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
