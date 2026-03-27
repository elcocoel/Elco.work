import { Eyebrow } from './ui/Eyebrow';

const ROW_LABELS = ['Explore', 'Design', 'Operate'] as const;
const COL_LABELS = ['Alignment', 'Meaning', 'Embodiment'] as const;

const CELLS: Record<string, { label: string; content: string }> = {
  'Explore-Alignment': {
    label: 'Coordination Audit',
    content:
      'Mapping how power flows through the organization. Understanding governance gaps, decision flows, incentive structures.',
  },
  'Explore-Meaning': {
    label: 'Communication Diagnosis',
    content:
      'Mapping how information and narratives move through the organization — and what that enables or blocks.',
  },
  'Explore-Embodiment': {
    label: 'Artifact Review',
    content:
      "Mapping and tracking the artifacts that ground the organization's culture. Assessing their effectiveness and coherence.",
  },
  'Design-Alignment': {
    label: 'Coordination System Design',
    content:
      'Designing decision-making systems. Governance processes, incentive architectures, coordination structures.',
  },
  'Design-Meaning': {
    label: 'Communications Process Architecture',
    content:
      'Designing how content is produced and moves across the organization and ecosystem. Channels, formats, flows.',
  },
  'Design-Embodiment': {
    label: 'Cultural Artifact Design',
    content:
      'Designing the systems that guide artifact production and anchor institutional identity.',
  },
  'Operate-Alignment': {
    label: 'Governance & Incentive Implementation',
    content:
      'Running governance day-to-day. Facilitating decisions, implementing coordination changes, navigating change management.',
  },
  'Operate-Meaning': {
    label: 'Communications Process Operation',
    content:
      'Coordinating production and distribution of content across the ecosystem. Newsletters, posts, media.',
  },
  'Operate-Embodiment': {
    label: 'Artifact Production',
    content:
      'Producing artifacts that embody and reinforce institutional culture. Events, videos, brand systems, beer cans.',
  },
};

export function FrameworkGridv2() {
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
