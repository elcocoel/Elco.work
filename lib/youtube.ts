'use client';

import { useEffect, useState } from 'react';

const THUMBNAIL_QUALITIES = ['maxresdefault', 'sddefault', 'hqdefault'] as const;

/** YouTube serves a 120×90 generic placeholder for private/unavailable videos (200 OK, not 404). */
const PLACEHOLDER_WIDTH = 120;
const PLACEHOLDER_HEIGHT = 90;

/** Match local video extensions (mp4, webm, mov) per project-media-convention. */
const LOCAL_VIDEO_EXT = /\.(mp4|webm|mov)$/i;

/**
 * True if URL points to a local video file (not YouTube).
 */
export function isLocalVideoUrl(url: string | null): boolean {
  if (!url || typeof url !== 'string') return false;
  if (getYouTubeVideoId(url) !== null) return false;
  try {
    const pathname = new URL(url, 'http://dummy').pathname.toLowerCase();
    return LOCAL_VIDEO_EXT.test(pathname);
  } catch {
    return url.toLowerCase().match(LOCAL_VIDEO_EXT) !== null;
  }
}

/**
 * Extract YouTube video ID from watch, embed, or youtu.be URLs.
 */
export function getYouTubeVideoId(url: string | null): string | null {
  if (!url || typeof url !== 'string') return null;
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes('youtube.com') && parsed.hostname !== 'youtu.be') return null;
    if (parsed.pathname.startsWith('/embed/')) {
      return parsed.pathname.split('/')[2] ?? null;
    }
    if (parsed.pathname === '/watch') {
      return parsed.searchParams.get('v');
    }
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1).split('/')[0] || null;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Probe for first working thumbnail URL (maxresdefault → sddefault → hqdefault).
 * Returns null while probing or if URL is invalid. Never shows a broken image.
 * When all probes fail (e.g. private video), returns fallbackUrl if provided.
 */
export function useYouTubeThumbnailUrl(url: string | null, fallbackUrl?: string | null): string | null {
  const [result, setResult] = useState<string | null>(null);
  const videoId = getYouTubeVideoId(url);

  useEffect(() => {
    if (!videoId) {
      setResult(null);
      return;
    }
    let cancelled = false;
    setResult(null);
    let idx = 0;

    function tryNext() {
      if (cancelled) return;
      if (idx >= THUMBNAIL_QUALITIES.length) {
        if (!cancelled) setResult(fallbackUrl ?? null);
        return;
      }
      const quality = THUMBNAIL_QUALITIES[idx];
      const src = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        if (img.naturalWidth <= PLACEHOLDER_WIDTH && img.naturalHeight <= PLACEHOLDER_HEIGHT) {
          idx += 1;
          tryNext();
          return;
        }
        setResult(src);
      };
      img.onerror = () => {
        idx += 1;
        tryNext();
      };
      img.src = src;
    }
    tryNext();
    return () => {
      cancelled = true;
    };
  }, [videoId, fallbackUrl]);

  return result;
}
