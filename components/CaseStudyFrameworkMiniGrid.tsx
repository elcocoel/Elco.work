import { FrameworkIcon } from '@/lib/framework-icons';
import { Tooltip } from '@/components/Tooltip';

const ROWS = ['explore', 'design', 'operate'] as const;
const COLS = ['alignment', 'meaning', 'embodiment'] as const;

const ICON_SIZE = 16; // 1rem
const INNER_CELL_WIDTH = ICON_SIZE * 5; // 5× logo: logo + 2×logo padding each side
const INNER_CELL_HEIGHT = 44; // 2.75rem — previous height that was perfect

const ROW_LABELS: Record<string, string> = {
  explore: 'Explore',
  design: 'Design',
  operate: 'Operate',
};

const COL_LABELS: Record<string, string> = {
  alignment: 'Alignment',
  meaning: 'Meaning',
  embodiment: 'Embodiment',
};

const CELL_LABELS: Record<string, string> = {
  '1-explore-alignment': 'Coordination Audit',
  '1-explore-meaning': 'Communication Diagnosis',
  '1-explore-embodiment': 'Artifact Review',
  '2-design-alignment': 'Coordination System Design',
  '2-design-meaning': 'Communications Process Architecture',
  '2-design-embodiment': 'Cultural Artifact Design',
  '3-operate-alignment': 'Governance & Incentive Implementation',
  '3-operate-meaning': 'Communications Process Operation',
  '3-operate-embodiment': 'Artifact Production',
};

const ROW_PREFIX: Record<string, string> = {
  explore: '1',
  design: '2',
  operate: '3',
};

const LABEL_PADDING = 10; // visually equal padding on all sides of label cells

const labelCellBase =
  'font-display font-normal text-xs uppercase tracking-widest text-gray-400 border-gray-200';

export interface CaseStudyFrameworkMiniGridProps {
  cells: string[];
}

export function CaseStudyFrameworkMiniGrid({ cells }: CaseStudyFrameworkMiniGridProps) {
  return (
    <div className="overflow-x-auto max-w-full">
    <table
      className="w-fit border-collapse"
      role="img"
      aria-label="Framework touchpoints"
    >
      <thead>
        <tr>
          <th
            className={`${labelCellBase} border-t border-b border-r border-l`}
            style={{ padding: `${LABEL_PADDING}px` }}
          />
          {COLS.map((col) => (
            <th
              key={col}
              className={`${labelCellBase} text-right border-t border-b border-r`}
              style={{ padding: `${LABEL_PADDING}px` }}
            >
              {COL_LABELS[col]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ROWS.map((row) => (
          <tr key={row}>
            <td
              className={`${labelCellBase} text-right border-b border-r border-l align-middle whitespace-nowrap`}
              style={{ padding: `${LABEL_PADDING}px` }}
            >
              {ROW_LABELS[row]}
            </td>
            {COLS.map((col) => {
              const cellId = `${ROW_PREFIX[row]}-${row}-${col}`;
              const active = cells.includes(cellId);
              const label = CELL_LABELS[cellId] ?? cellId;
              return (
                <td
                  key={cellId}
                  className="relative p-0 border-b border-r border-gray-200 align-middle"
                  style={{
                    width: INNER_CELL_WIDTH,
                    minWidth: INNER_CELL_WIDTH,
                    height: INNER_CELL_HEIGHT,
                  }}
                >
                  {active ? (
                    <Tooltip content={label} className="block size-full">
                      <div
                        className={`
                          group flex size-full items-center justify-center
                          transition-colors duration-200
                          bg-gray-300 hover:bg-gray-400
                        `}
                      >
                        <FrameworkIcon
                          cellId={cellId}
                          className="size-4 shrink-0 text-gray-400 transition-colors duration-200 group-hover:text-gray-500"
                          aria-hidden
                        />
                      </div>
                    </Tooltip>
                  ) : (
                    <div
                      className="group flex size-full items-center justify-center transition-colors duration-200 bg-gray-100 hover:bg-gray-50"
                      aria-hidden
                    />
                  )}
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
