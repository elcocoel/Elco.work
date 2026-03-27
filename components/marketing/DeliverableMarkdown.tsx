'use client';

import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  getHarnessMarkdownComponents,
  type HarnessDocumentSkin,
} from '@/lib/harnessDocumentTheme';

export type { HarnessDocumentSkin };

interface DeliverableMarkdownProps {
  content: string;
  /** Base path for resolving relative links in markdown. */
  basePath?: string;
  /** When set, relative .md links rewrite under this URL prefix. Prefer always passing for public deliverables. */
  linkBaseUrl?: string;
  variant?: HarnessDocumentSkin;
  contentWidth?: 'reading' | 'full';
}

/** Editorial markdown for public marketing pages (e.g. Gnosis deliverable). */
export function DeliverableMarkdown({
  content,
  basePath,
  linkBaseUrl,
  variant = 'legacy',
  contentWidth = 'reading',
}: DeliverableMarkdownProps) {
  const skin: HarnessDocumentSkin = variant;
  const components = useMemo(
    () => getHarnessMarkdownComponents(skin, basePath ?? '', linkBaseUrl),
    [skin, basePath, linkBaseUrl]
  );

  const widthClass =
    contentWidth === 'full' ? 'w-full max-w-none min-w-0' : 'max-w-reading';

  return (
    <div className={widthClass}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
