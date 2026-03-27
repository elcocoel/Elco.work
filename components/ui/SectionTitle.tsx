import type { HTMLAttributes, ReactNode } from 'react';

interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export function SectionTitle({
  children,
  className = '',
  ...props
}: SectionTitleProps) {
  const classes = [
    'font-display text-2xl font-extrabold uppercase tracking-wide text-black',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <h2 className={classes} {...props}>
      {children}
    </h2>
  );
}
