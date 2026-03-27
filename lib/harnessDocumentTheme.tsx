/**
 * Harness mission markdown skins: semantic roles → Tailwind classes.
 * - legacy: existing HarnessMarkdown appearance (unchanged behavior).
 * - editorial2026: Syne for hierarchy/chrome; system sans (font-sans) for long-form body.
 *
 * Fold-in: default skin in HarnessMarkdown can switch here without touching call sites.
 */

import type { ReactNode } from 'react';
import type { Components } from 'react-markdown';

export type HarnessDocumentSkin = 'legacy' | 'editorial2026';

export function rewriteHarnessMarkdownHref(
  href: string,
  basePath?: string,
  linkBaseUrl?: string
): string {
  if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('/')) return href;
  /** No base: leave relative `.md` hrefs unchanged (marketing pages should pass linkBaseUrl when links matter). */
  if (linkBaseUrl == null || linkBaseUrl === '') return href;
  const clean = href.replace(/\.md$/i, '').replace(/^\.\//, '');
  const withBase = basePath ? `${basePath}/${clean}`.replace(/\/+/g, '/') : clean;
  const segments = withBase.split('/').filter(Boolean);
  const resolved: string[] = [];
  for (const s of segments) {
    if (s === '..') resolved.pop();
    else if (s !== '.') resolved.push(s);
  }
  const pathPart = resolved.join('/');
  const base = linkBaseUrl;
  return base.endsWith('/') ? `${base}${pathPart}` : `${base}/${pathPart}`;
}

const LINK_CLASS =
  'font-display text-sm uppercase tracking-wide text-gray-500 hover:text-black transition-colors underline';

/** @internal Exported for HarnessMarkdown tests / parity checks */
export function getHarnessMarkdownComponents(
  skin: HarnessDocumentSkin,
  basePath: string,
  linkBaseUrl?: string
): Components {
  const base = basePath ?? '';

  const legacy: Components = {
    h1: ({ children }) => (
      <h1 className="font-display text-2xl font-extrabold uppercase tracking-wide text-black mt-8 mb-4 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-xl font-extrabold uppercase tracking-wide text-black mt-8 mb-3 border-b border-gray-200 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-black mt-6 mb-2">
        {children}
      </h3>
    ),
    p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-4 space-y-1">{children}</ol>
    ),
    li: ({ children }) => <li className="ml-2">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-black">{children}</strong>,
    code: ({ className, children, ...props }) => {
      const isBlock = className?.includes('language-');
      if (isBlock) {
        return (
          <pre className="bg-gray-100 border border-gray-100 rounded-sm p-4 overflow-x-auto text-sm text-gray-800 my-4">
            <code {...props}>{children}</code>
          </pre>
        );
      }
      return (
        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-gray-800" {...props}>
          {children}
        </code>
      );
    },
    table: ({ children }) => (
      <div className="overflow-x-auto my-4 border border-gray-100 rounded-sm">
        <table className="min-w-full text-sm text-gray-700">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-gray-50 border-b border-gray-200">{children}</thead>,
    th: ({ children }) => (
      <th className="font-display text-xs uppercase tracking-widest text-gray-500 text-left px-4 py-3">
        {children}
      </th>
    ),
    td: ({ children }) => <td className="px-4 py-3 border-b border-gray-100">{children}</td>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-gray-300 pl-4 my-4 text-gray-600 italic">{children}</blockquote>
    ),
  };

  const editorial2026: Components = {
    h1: ({ children }) => (
      <h1 className="font-display text-2xl font-extrabold uppercase tracking-wide text-black mt-8 mb-4 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-xl font-extrabold uppercase tracking-wide text-black mt-8 mb-3 border-b border-gray-200 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-black mt-6 mb-2">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="font-sans text-gray-700 leading-relaxed mb-4 text-[15px] sm:text-base">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside font-sans text-gray-700 leading-relaxed mb-4 space-y-1 text-[15px] sm:text-base">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside font-sans text-gray-700 leading-relaxed mb-4 space-y-1 text-[15px] sm:text-base">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="ml-2 font-sans">{children}</li>,
    strong: ({ children }) => <strong className="font-sans font-semibold text-black">{children}</strong>,
    code: ({ className, children, ...props }) => {
      const isBlock = className?.includes('language-');
      if (isBlock) {
        return (
          <pre className="bg-gray-100 border border-gray-100 rounded-sm p-4 overflow-x-auto text-sm text-gray-800 my-4 font-mono">
            <code {...props}>{children}</code>
          </pre>
        );
      }
      return (
        <code
          className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-gray-800 font-mono"
          {...props}
        >
          {children}
        </code>
      );
    },
    table: ({ children }) => (
      <div className="overflow-x-auto my-4 border border-gray-100 rounded-sm">
        <table className="min-w-full text-sm font-sans text-gray-700">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-gray-50 border-b border-gray-200">{children}</thead>,
    th: ({ children }) => (
      <th className="font-display text-xs uppercase tracking-widest text-gray-500 text-left px-4 py-3">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 border-b border-gray-100 font-sans text-[15px]">{children}</td>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-gray-300 pl-4 my-4 text-gray-600 italic font-sans text-[15px] sm:text-base leading-relaxed">
        {children}
      </blockquote>
    ),
  };

  const baseMap = skin === 'legacy' ? legacy : editorial2026;

  return {
    ...baseMap,
    a: ({ href, children }: { href?: string; children?: ReactNode }) => {
      const url =
        typeof href === 'string' ? rewriteHarnessMarkdownHref(href, base, linkBaseUrl) : href || '#';
      return (
        <a href={url} className={LINK_CLASS}>
          {children}
        </a>
      );
    },
  };
}
