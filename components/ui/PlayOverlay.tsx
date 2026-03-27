'use client';

/** Centered play button overlay for video previews — clickable. */
export function PlayOverlay({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center cursor-pointer group"
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? 'Play video' : undefined}
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-900 shadow-md shadow-black/10 transition-transform group-hover:scale-105">
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 text-gray-900 ml-0.5 shrink-0"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}
