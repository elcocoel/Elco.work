import { ReactNode } from 'react';

interface ManifestoBlockProps {
  children: ReactNode;
  className?: string;
  label?: string;
  heading?: string;
}

export function ManifestoBlock({
  children,
  className = '',
  label,
  heading,
}: ManifestoBlockProps) {
  return (
    <section
      className={`max-w-reading prose-editorial w-full ${className}`.trim()}
      aria-labelledby={heading ? undefined : undefined}
    >
      {label && (
        <p
          className="font-display uppercase tracking-widest text-gray-400 mix-blend-multiply mb-4"
          style={{ fontSize: '1.03rem' }}
        >
          {label}
        </p>
      )}
      {heading && (
        <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-black mb-4">
          {heading}
        </h2>
      )}
      <div className="text-lg leading-relaxed text-gray-700">{children}</div>
    </section>
  );
}
