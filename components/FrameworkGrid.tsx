import { Eyebrow } from './ui/Eyebrow';

const ROW_LABELS = ['Explore', 'Design', 'Operate'] as const;
const COL_LABELS = ['Alignment', 'Meaning', 'Embodiment'] as const;

const CELLS: Record<string, { label: string; content: string }> = {
  'Explore-Alignment': {
    label: 'Coordination Audit',
    content: 'Mapping how power flows through the organization.',
  },
  'Explore-Meaning': {
    label: 'Communication Diagnosis',
    content:
      'Mapping how information and narratives move through the organization and what it enables.',
  },
  'Explore-Embodiment': {
    label: 'Artifact Review',
    content:
      "Mapping and tracking artifacts that ground the organization's culture and their effectiveness.",
  },
  'Design-Alignment': {
    label: 'Coordination System Design',
    content: 'Designing decision-making systems.',
  },
  'Design-Meaning': {
    label: 'Communications Process Architecture',
    content:
      'Designing how content is produced and moves across the organization and ecosystem.',
  },
  'Design-Embodiment': {
    label: 'Cultural Artifact Design',
    content:
      'Designing the systems that guide artifact production and anchor institutional identity.',
  },
  'Operate-Alignment': {
    label: 'Governance & Incentive Implementation',
    content: 'Navigating change management day-to-day.',
  },
  'Operate-Meaning': {
    label: 'Communications Process Operation',
    content:
      'Coordinating production and distribution of content across the ecosystem.',
  },
  'Operate-Embodiment': {
    label: 'Artifact Production',
    content:
      'Producing artifacts that embody and reinforce institutional culture.',
  },
};

export function FrameworkGrid() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse min-w-[min(100%, 48rem)]">
        <thead>
          <tr>
            <th className="text-left p-4 border-b border-gray-200 font-display text-xs uppercase tracking-widest text-gray-400 w-28">
              <Eyebrow className="sr-only mb-0">Framework rows</Eyebrow>
            </th>
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
          {ROW_LABELS.map((row) => (
            <tr key={row}>
              <td className="p-4 border-b border-gray-200 font-display text-sm font-extrabold uppercase tracking-wide text-black align-top">
                {row}
              </td>
              {COL_LABELS.map((col) => {
                const cell = CELLS[`${row}-${col}`];
                return (
                  <td
                    key={col}
                    className="p-4 border-b border-gray-200 align-top"
                  >
                    <p className="font-display text-sm font-medium text-black">
                      {cell?.label}
                    </p>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">
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
