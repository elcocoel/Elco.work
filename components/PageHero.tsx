import { getHeroBackgroundStyle } from '@/lib/headerBackground';

interface PageHeroProps {
  label: string;
  title: string;
  imagePath?: string;
  imagePosition?: string;
  /** When true, reduces min-height so content below is above the fold (e.g. login form). */
  compact?: boolean;
}

export function PageHero({
  label,
  title,
  imagePath = '/assets/field.png',
  imagePosition = '50% 40%',
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={`relative border-b border-gray-100 pt-16 sm:pt-20 pb-8 lg:pt-30 lg:pb-10 overflow-x-hidden flex flex-col bg-gray-50 ${compact ? 'min-h-[18vh]' : 'min-h-[32vh]'}`}
      style={getHeroBackgroundStyle(imagePath, imagePosition)}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full text-center">
        <p
          className="font-display uppercase tracking-widest text-gray-400 mb-6 mix-blend-multiply"
          style={{ fontSize: '1.03rem' }}
        >
          {label}
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-0 w-full">
        <div className="relative w-full max-w-full flex justify-center px-3 sm:px-6">
          <h1
            className="font-display font-extrabold uppercase tracking-tighter text-black leading-[0.85] whitespace-normal lg:whitespace-nowrap text-center max-w-full min-w-0 break-words [overflow-wrap:anywhere] hyphens-auto"
            style={{ fontSize: 'clamp(2.25rem, 7vw, 6.5rem)', textWrap: 'balance' }}
          >
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
