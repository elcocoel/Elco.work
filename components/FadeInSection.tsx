'use client';

import {
  useRef,
  useState,
  useEffect,
  type ReactNode,
  type HTMLAttributes,
} from 'react';

interface FadeInSectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'section' | 'div';
}

export function FadeInSection({
  children,
  className = '',
  delay = 90,
  as: Component = 'section',
  ...props
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeoutId = setTimeout(() => setVisible(true), delay);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -12% 0px' }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [delay]);

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ease-out ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
