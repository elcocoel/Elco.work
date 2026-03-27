import type { HTMLAttributes, ReactNode } from 'react';

interface EyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export function Eyebrow({ children, className = '', ...props }: EyebrowProps) {
  const classes = [
    'font-display text-xs uppercase tracking-widest text-gray-400',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <p className={classes} {...props}>
      {children}
    </p>
  );
}
