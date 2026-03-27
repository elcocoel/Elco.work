/**
 * Shared style tokens for Framework card family.
 * Edit here for global changes across all variants (three-column, split-left, split-right).
 */

/**
 * Internal rules + outer hairline — ~12% black, softer than `border-gray-100`.
 * Use for split seam, stacked row dividers, outcome row top border, and unified split outer frame.
 */
export const FRAMEWORK_CARD_HAIRLINE_BORDER = 'border-black/[0.12]';

/** One outer rounded rect — single hairline so the copy side matches the illustration edge (no inset + outer double ring). */
export const FRAMEWORK_UNIFIED_STRIP_FRAME_CLASS =
  `overflow-hidden rounded-lg bg-white border ${FRAMEWORK_CARD_HAIRLINE_BORDER}`;
export const FRAMEWORK_CARD_HAIRLINE_DIVIDE_Y = 'divide-y divide-black/[0.12]';

export const FRAMEWORK_CARD_CONTAINER_CLASS =
  'group grid h-full min-h-[20rem] grid-cols-1 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] bg-white transition-colors';

export const FRAMEWORK_CARD_ILLUSTRATION_WRAPPER_CLASS =
  `relative min-h-0 border-b ${FRAMEWORK_CARD_HAIRLINE_BORDER}`;

export const FRAMEWORK_CARD_DESCRIPTION_WRAPPER_CLASS =
  'flex min-h-0 flex-col px-6 py-5';

export const FRAMEWORK_CARD_GRID_CLASS =
  `grid grid-cols-1 ${FRAMEWORK_CARD_HAIRLINE_DIVIDE_Y} rounded-sm border ${FRAMEWORK_CARD_HAIRLINE_BORDER} sm:grid-cols-3 sm:divide-x sm:divide-y-0 [&>[data-stagger-index]]:h-full`;

export const FRAMEWORK_SPLIT_ILLUSTRATION_MIN_H = 'min-h-[20rem]';

/**
 * Home Selected Work tiles (`app/page.tsx`) — same shadow token for framework grid cells.
 * On tables: pair with `relative z-10` on the hovered `<td>` so the shadow paints above
 * neighbors (otherwise it sits under adjacent opaque cells). Do **not** add `translate`
 * on the cell — that shifts the fill over shared grid lines.
 * Keep in sync with the project card `className` in `app/page.tsx`.
 */
export const SELECTED_WORK_TILE_HOVER_SHADOW_CLASS =
  'shadow-[0_2px_8px_rgba(0,0,0,0.06)]';
