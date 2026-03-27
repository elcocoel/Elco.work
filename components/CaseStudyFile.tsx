import Link from 'next/link';
import { PlaceholderTooltip } from './PlaceholderTooltip';

interface CaseStudyFileProps {
  url: string;
  label: string;
  filename?: string;
  placeholderHint?: string;
  onActivate?: () => void;
}

export function CaseStudyFile({ url, label, filename, placeholderHint, onActivate }: CaseStudyFileProps) {
  const content = (
    <>
      <svg
        className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <span className="border-b border-gray-400 group-hover:border-black transition-colors pb-0.5">
        {label}
      </span>
    </>
  );

  const sharedClassName =
    'inline-flex items-center gap-3 font-display text-sm uppercase tracking-wide text-gray-600 hover:text-black transition-colors group';

  const link = onActivate ? (
    <button
      type="button"
      onClick={onActivate}
      className={sharedClassName}
      aria-label={`Open ${label} in global gallery`}
    >
      {content}
    </button>
  ) : (
    <Link
      href={url}
      download={filename}
      target="_blank"
      rel="noopener noreferrer"
      className={sharedClassName}
    >
      {content}
    </Link>
  );

  if (placeholderHint) {
    return <PlaceholderTooltip hint={placeholderHint}>{link}</PlaceholderTooltip>;
  }
  return link;
}
