'use client';

import { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  speedMs?: number;
  onComplete?: () => void;
  start?: boolean;
  className?: string;
  cursor?: boolean;
}

export function TypewriterText({
  text,
  speedMs = 35,
  onComplete,
  start = true,
  className = '',
  cursor = true,
}: TypewriterTextProps) {
  const [len, setLen] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const didComplete = useRef(false);

  useEffect(() => {
    setLen(0);
    didComplete.current = false;
  }, [text]);

  useEffect(() => {
    if (!start || len >= text.length) return;
    const t = setTimeout(() => setLen((n) => Math.min(n + 1, text.length)), speedMs);
    return () => clearTimeout(t);
  }, [start, len, text.length, speedMs]);

  useEffect(() => {
    if (len < text.length || didComplete.current) return;
    didComplete.current = true;
    onComplete?.();
  }, [len, text.length, onComplete]);

  useEffect(() => {
    if (!cursor) return;
    const id = setInterval(() => setShowCursor((s) => !s), 530);
    return () => clearInterval(id);
  }, [cursor]);

  const visible = text.slice(0, len);
  const done = len >= text.length;

  return (
    <span className={className}>
      {visible}
      {cursor && start && !done && (
        <span
          className={`inline-block w-[2px] h-[1em] ml-0.5 align-baseline bg-current ${
            showCursor ? 'opacity-90' : 'opacity-0'
          }`}
          aria-hidden
        />
      )}
    </span>
  );
}
