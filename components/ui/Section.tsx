import type { HTMLAttributes, ReactNode } from 'react';
import { FadeInSection } from '../FadeInSection';

type SectionVariant = 'default' | 'alt' | 'metadata' | 'cta' | 'compact';
type SectionReveal = 'none' | 'fade';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: SectionVariant;
  reveal?: SectionReveal;
  revealDelay?: number;
  contained?: boolean;
  containerClassName?: string;
}

const VARIANT_CLASSES: Record<SectionVariant, string> = {
  default: 'border-b border-gray-200 py-16 sm:py-20 lg:py-30 bg-white',
  alt: 'border-b border-gray-200 py-16 sm:py-20 lg:py-30 bg-gray-50/30',
  metadata: 'border-b border-gray-200 py-6 lg:py-8 bg-gray-50/30',
  cta: 'border-t border-gray-200 py-16 sm:py-20 lg:py-30 bg-gray-50',
  compact: 'border-b border-gray-200 py-8 sm:py-10 bg-white',
};

export function Section({
  children,
  variant = 'default',
  reveal = 'none',
  revealDelay = 0,
  contained = false,
  containerClassName = '',
  className = '',
  ...props
}: SectionProps) {
  const classes = [VARIANT_CLASSES[variant], className].filter(Boolean).join(' ');
  const containerClasses = ['mx-auto max-w-7xl px-6 sm:px-8 lg:px-12', containerClassName]
    .filter(Boolean)
    .join(' ');

  const content = contained ? (
    <div className={containerClasses}>{children}</div>
  ) : (
    children
  );

  if (reveal === 'fade') {
    return (
      <FadeInSection as="section" className={classes} delay={revealDelay} {...props}>
        {content}
      </FadeInSection>
    );
  }

  return (
    <section className={classes} {...props}>
      {content}
    </section>
  );
}
