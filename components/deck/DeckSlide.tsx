'use client';

import type { DeckSlide as DeckSlideType } from '@/lib/deckData';

const SLIDE_CLASS = 'deck-slide';

interface DeckSlideProps {
  slide: DeckSlideType;
  /** When true, only this slide is visible (e.g. for print). */
  isolated?: boolean;
}

export function DeckSlide({ slide, isolated }: DeckSlideProps) {
  const { type, eyebrow, title, body, imageSrc, imageAlt, items, steps } = slide;

  const content = (
    <>
      {eyebrow && (
        <p className="font-display text-xs uppercase tracking-widest text-gray-400 mb-2">
          {eyebrow}
        </p>
      )}
      {type === 'cover' && (
        <div className="flex flex-col justify-center min-h-[60vh] text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-wide text-black">
            {title}
          </h1>
          {body && (
            <p className="font-display text-lg uppercase tracking-wide text-gray-500 mt-4">
              {body}
            </p>
          )}
        </div>
      )}
      {type === 'hero' && (
        <div className="flex flex-col justify-center min-h-[50vh] max-w-3xl">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-black leading-tight">
            {title}
          </h2>
          {body && (
            <p className="text-gray-600 leading-relaxed mt-4">{body}</p>
          )}
        </div>
      )}
      {(type === 'hero-image-left' || type === 'hero-image-right') && (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center min-h-[50vh] ${
            type === 'hero-image-right' ? '' : 'md:grid-flow-dense'
          }`}
        >
          {type === 'hero-image-right' && (
            <>
              <div>
                <h2 className="font-display text-2xl font-extrabold uppercase tracking-wide text-black leading-tight">
                  {title}
                </h2>
                {body && (
                  <p className="text-gray-600 leading-relaxed mt-3">{body}</p>
                )}
              </div>
              <div className="rounded-sm border border-gray-100 overflow-hidden bg-gray-100 aspect-video flex items-center justify-center">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={imageAlt ?? ''}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-display text-xs uppercase tracking-widest text-gray-400">
                    Image
                  </span>
                )}
              </div>
            </>
          )}
          {type === 'hero-image-left' && (
            <>
              <div className="md:col-start-2 rounded-sm border border-gray-100 overflow-hidden bg-gray-100 aspect-video flex items-center justify-center">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={imageAlt ?? ''}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-display text-xs uppercase tracking-widest text-gray-400">
                    Image
                  </span>
                )}
              </div>
              <div className="md:col-start-1 md:row-start-1">
                <h2 className="font-display text-2xl font-extrabold uppercase tracking-wide text-black leading-tight">
                  {title}
                </h2>
                {body && (
                  <p className="text-gray-600 leading-relaxed mt-3">{body}</p>
                )}
              </div>
            </>
          )}
        </div>
      )}
      {type === 'section' && (
        <div className="flex flex-col justify-center min-h-[40vh]">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-wide text-black">
            {title}
          </h2>
        </div>
      )}
      {type === 'process' && steps && steps.length > 0 && (
        <div className="flex flex-col justify-center min-h-[50vh]">
          <h2 className="font-display text-xl font-extrabold uppercase tracking-wide text-black mb-8">
            {title}
          </h2>
          <div className="flex flex-wrap gap-3 items-center">
            {steps.map((step, i) => (
              <span key={step}>
                <span className="inline-block px-4 py-2 border border-gray-100 rounded-sm bg-gray-50 font-display text-sm uppercase tracking-wide text-black">
                  {step}
                </span>
                {i < steps.length - 1 && (
                  <span
                    className="inline-block mx-2 text-gray-300 font-display"
                    aria-hidden
                  >
                    →
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
      {type === 'list' && (
        <div className="flex flex-col justify-center min-h-[50vh] max-w-2xl">
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-wide text-black mb-6">
            {title}
          </h2>
          {items && items.length > 0 && (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-gray-700 leading-relaxed border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                >
                  <span
                    className="shrink-0 w-1.5 h-1.5 rounded-full bg-gray-500 mt-2"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {type === 'closing' && (
        <div className="flex flex-col justify-center min-h-[60vh] max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-wide text-black leading-tight">
            {title}
          </h2>
          {body && (
            <p className="text-gray-600 leading-relaxed mt-6">{body}</p>
          )}
        </div>
      )}
    </>
  );

  return (
    <div
      className={`${SLIDE_CLASS} w-full p-8 sm:p-10 md:p-12 bg-gray-50 min-h-[70vh] flex flex-col justify-center ${
        isolated ? 'deck-slide-isolated' : ''
      }`}
      data-slide-id={slide.id}
    >
      {content}
    </div>
  );
}

export { SLIDE_CLASS };
