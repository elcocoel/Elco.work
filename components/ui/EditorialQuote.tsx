import type { HTMLAttributes, ReactNode } from 'react';

interface EditorialQuoteProps extends HTMLAttributes<HTMLQuoteElement> {
  children: ReactNode;
}

export function EditorialQuote({
  children,
  className = '',
  ...props
}: EditorialQuoteProps) {
  return (
    <blockquote
      className={`mt-8 border-l-2 border-black pl-6 sm:pl-8 ${className}`}
      {...props}
    >
      <p className="font-display text-base italic font-medium leading-relaxed text-gray-500 sm:text-lg">
        {children}
      </p>
    </blockquote>
  );
}
