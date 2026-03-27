'use client';

import { useMemo, useState } from 'react';
import { highlightedSpeakers, speakers } from '@/lib/ost/speakers';

function FeaturedSpeakerItem({
  name,
  title,
  org,
  bio,
  image,
}: {
  name: string;
  title: string;
  org: string;
  bio?: string;
  image?: string;
}) {
  const imgSrc = image ?? '/ost/images/pexels-amir-esrafili-6274712.jpg';
  return (
    <div className="speaker-item">
      <div className="speaker-image-wrapper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={name}
          width={400}
          height={400}
          className="speaker-image"
          loading="lazy"
        />
        <div className="corner-cut corner-cut-match-bg w-embed" aria-hidden>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 450 450"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H72L0 72V0Z" fill="currentColor" />
            <path d="M0 450H72L0 378V450Z" fill="currentColor" />
            <path d="M450 0V72L378 0L450 0Z" fill="currentColor" />
            <path d="M450 450V378L378 450H450Z" fill="currentColor" />
          </svg>
        </div>
      </div>
      <div className="spacer-32" />
        <h3 className="heading medium">{name}</h3>
        <div className="spacer-8" />
        <div className="text-color-muted">
          <div className="horizontal-wrapper">
            <div className="jobnew w-richtext">
              <p>{title}</p>
              {org && (
                <p>
                  <strong>{org}</strong>
                </p>
              )}
            </div>
          </div>
        </div>
        {bio && (
          <>
            <div className="spacer-16" />
            <p className="paragraph">{bio}</p>
            <div className="spacer-32" />
          </>
        )}
    </div>
  );
}

function GridSpeakerItem({
  name,
  title,
  org,
  image,
}: {
  name: string;
  title: string;
  org: string;
  image?: string;
}) {
  const imgSrc = image ?? '/ost/images/pexels-amir-esrafili-6274712.jpg';
  return (
    <div className="speaker-item">
      <div className="speaker-image-wrapper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={name}
          width={400}
          height={400}
          className="speaker-image"
          loading="lazy"
        />
        <div className="corner-cut corner-cut-match-bg w-embed" aria-hidden>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 450 450"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H72L0 72V0Z" fill="currentColor" />
            <path d="M0 450H72L0 378V450Z" fill="currentColor" />
            <path d="M450 0V72L378 0L450 0Z" fill="currentColor" />
            <path d="M450 450V378L378 450H450Z" fill="currentColor" />
          </svg>
        </div>
      </div>
      <div className="spacer-8" />
      <h3 className="heading medium center">{name}</h3>
      <div className="jobnew smaller w-richtext">
        <p>{title}</p>
        {org && (
          <p>
            <strong>{org}</strong>
          </p>
        )}
      </div>
    </div>
  );
}

function CornerCutsLight() {
  return (
    <div className="corner-cuts-wrapper text-color-accent-light">
      <div className="corner-cut-top-left w-embed">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0H72L0 72V0Z" fill="currentColor" />
        </svg>
      </div>
      <div className="corner-cut-top-right w-embed">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M72 0V72L0 0L72 0Z" fill="currentColor" />
        </svg>
      </div>
      <div className="corner-cut-bottom-right w-embed">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M72 72V0L0 72H72Z" fill="currentColor" />
        </svg>
      </div>
      <div className="corner-cut-bottom-left w-embed">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 72H72L0 0V72Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

export function SpeakersSection() {
  const featuredPageSize = 3;
  const featuredPageCount = Math.max(1, Math.ceil(highlightedSpeakers.length / featuredPageSize));
  const [featuredPage, setFeaturedPage] = useState(0);

  const featuredPageItems = useMemo(() => {
    const start = featuredPage * featuredPageSize;
    return highlightedSpeakers.slice(start, start + featuredPageSize);
  }, [featuredPage]);

  const goNext = () => {
    setFeaturedPage((p) => (p + 1) % featuredPageCount);
  };

  const goPrevious = () => {
    setFeaturedPage((p) => (p - 1 + featuredPageCount) % featuredPageCount);
  };

  return (
    <section id="speakers" className="section accent-light">
      <div className="container-large">
        <div className="card-item large">
          <div className="centre-text">
            <h2 className="heading extra-large">Meet the speakers</h2>
            <div className="spacer-64" />
          </div>
          <div className="speakers-featured-list">
            {featuredPageItems.map((s) => (
              <FeaturedSpeakerItem
                key={s.name}
                name={s.name}
                title={s.title}
                org={s.org}
                bio={s.bio}
                image={s.image}
              />
            ))}
          </div>
          <div className="featured-speakers-pagination w-pagination-wrapper">
            <button
              type="button"
              className="w-pagination-previous previous-2"
              onClick={goPrevious}
              aria-label="Previous featured speakers"
            >
              Previous
            </button>
            <button
              type="button"
              className="w-pagination-next next-2"
              onClick={goNext}
              aria-label="Next featured speakers"
            >
              Next
            </button>
          </div>
          <CornerCutsLight />
        </div>
        <div className="spacer-128" />
        <div className="centre-text">
          <h2 className="heading large">speakers</h2>
        </div>
        <div className="spacer-48" />
        <div className="speakers-list">
          {speakers.map((s) => (
            <GridSpeakerItem
              key={s.name}
              name={s.name}
              title={s.title}
              org={s.org}
              image={s.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
