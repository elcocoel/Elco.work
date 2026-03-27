import { FrameworkIcon } from '../../lib/framework-icons';
import { FRAMEWORK_CARD_HAIRLINE_BORDER } from '../../lib/frameworkCardStyles';

export interface FrameworkCardItem {
  icon: string;
  title: string;
  description: string;
  maps: string;
}

interface FrameworkCardDescriptionBlockProps {
  item: FrameworkCardItem;
  /** Optional: wrap in group for hover effects on parent card. */
  asGroup?: boolean;
}

/**
 * Reusable description block for Framework card family.
 * Icon + title + description + outcome (→ maps).
 * Shared by three-column, split-left, split-right variants.
 */
export function FrameworkCardDescriptionBlock({
  item,
  asGroup = false,
}: FrameworkCardDescriptionBlockProps) {
  const content = (
    <>
      <FrameworkIcon
        cellId={item.icon}
        className="mb-3 size-5 text-gray-500 transition-colors duration-300 group-hover:text-black"
      />
      <div className="min-w-0 flex flex-1 flex-col space-y-3">
        <h3 className="font-display text-lg font-medium uppercase tracking-wide text-black">
          {item.title}
        </h3>
        <p className="flex-1 break-words text-gray-600 leading-relaxed transition-colors group-hover:text-gray-700">
          {item.description}
        </p>
        <p
          className={`mt-auto flex items-center gap-1.5 border-t pt-3 text-sm text-gray-500 transition-colors group-hover:text-gray-600 ${FRAMEWORK_CARD_HAIRLINE_BORDER}`}
        >
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>{' '}
          {item.maps}
        </p>
      </div>
    </>
  );

  const wrapperClass =
    'flex min-h-0 flex-col px-6 py-5';

  if (asGroup) {
    return <div className={`group ${wrapperClass}`}>{content}</div>;
  }
  return <div className={wrapperClass}>{content}</div>;
}
