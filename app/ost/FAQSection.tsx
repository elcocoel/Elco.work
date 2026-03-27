'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'What is the One Shared Truth Conference?',
    a: 'One Shared Truth is an annual gathering hosted by the Gabelli School of Business at Fordham University, bringing together leaders from finance, family enterprises, digital assets, and long-term capital stewardship. The conference explores how values, governance, and emerging technologies intersect in shaping the future of wealth and responsibility. Through curated conversations and keynote sessions, it creates space for rigorous dialogue across generations and disciplines.',
  },
  {
    q: 'Who is One Shared Truth for?',
    a: "One Shared Truth is designed for family office principals, next-generation leaders, investors, founders, and advisors interested in the long-term stewardship of capital. It's particularly relevant for those navigating the intersection of traditional finance and emerging digital infrastructure. The conference offers thoughtful perspectives and meaningful connections for those who are preserving a legacy, building a new venture or advising others.",
  },
  {
    q: 'How can I register?',
    a: 'You can register directly through the conference website using the registration link provided. Attendance is limited to ensure a high-quality, discussion-driven environment. Early registration is encouraged.',
  },
  {
    q: 'Will sessions be recorded?',
    a: 'No. Sessions will not be recorded. One Shared Truth is designed as a private, closed-door environment to encourage candid and thoughtful dialogue. Conversations in the room are confidential, allowing speakers and attendees to engage openly and without attribution beyond the event.',
  },
];

function CornerCutsSmall() {
  return (
    <div className="corner-cuts-wrapper text-color-100">
      <div className="corner-cut-top-left small w-embed">
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
      <div className="corner-cut-top-right small w-embed">
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
      <div className="corner-cut-bottom-right small w-embed">
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
      <div className="corner-cut-bottom-left small w-embed">
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

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section">
      <div className="container-large">
        <div className="cta-layout">
          <div className="w-layout-grid faq-wrapper">
            <h2 className="heading extra-large">FAQs</h2>
            <div className="w-layout-grid faq-list">
              {faqs.map((faq, i) => (
                <div key={faq.q} className="faq-accordion">
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() =>
                      setOpenIndex(openIndex === i ? null : i)
                    }
                    aria-expanded={openIndex === i}
                  >
                    <h3 className="heading regular">
                      <strong className="heading medium">{faq.q}</strong>
                    </h3>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/ost/images/Vector.svg"
                      alt=""
                      width={12}
                      height={12}
                      loading="lazy"
                      className={`faq-icon ${openIndex === i ? 'faq-icon--open' : ''}`}
                      style={{
                        transform: openIndex === i ? 'rotate(180deg)' : undefined,
                      }}
                    />
                  </button>
                  <div
                    className="faq-answer"
                    style={{
                      height: openIndex === i ? 'auto' : 0,
                      overflow: 'hidden',
                    }}
                  >
                    <p className="paragraph">{faq.a}</p>
                    <div className="spacer-40" />
                  </div>
                  <CornerCutsSmall />
                </div>
              ))}
            </div>
          </div>
          <div className="w-layout-grid cta-wrapper">
            <div className="sticky">
              <div className="card-item accent">
                <h2 className="heading extra-large variant-color">
                  now, it&apos;s your move
                </h2>
                <div className="spacer-16" />
                <div className="spacer-40" />
                <div className="corner-cuts-wrapper text-color-100">
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
                <div className="div-block-5">
                  <a
                    href="https://securelb.imodules.com/s/1362/18/interior.aspx?sid=1362&gid=1&pgid=14963&cid=27650"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-secondary small hide-mobile-portrait w-button"
                  >
                    tickets and registration
                  </a>
                  <a
                    href="https://tally.so/r/44892Y"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-secondary small hide-mobile-portrait w-button"
                  >
                    apply to sponsor
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
