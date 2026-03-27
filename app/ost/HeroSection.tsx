const TICKETS_URL =
  'https://securelb.imodules.com/s/1362/18/interior.aspx?sid=1362&gid=1&pgid=14963&cid=27650';
const SPONSOR_URL = 'https://tally.so/r/44892Y';

const themes = [
  {
    icon: '/ost/images/Arbitrage.svg',
    title: 'Arbitrage',
    text: 'Market efficiency in fragmented digital markets',
  },
  {
    icon: '/ost/images/Tokenization-Apple.svg',
    title: 'TOKENIZATION',
    text: 'Of traditional and non-traditional assets',
  },
  {
    icon: '/ost/images/STABLE.svg',
    title: 'Stablecoins',
    text: 'As payment, settlement, and liquidity rails',
  },
  {
    icon: '/ost/images/Exposure-Apple.svg',
    title: 'exposure',
    text: 'Taking on portfolio positions on the ecosystem',
  },
];

export function HeroSection() {
  return (
    <section className="section overflow-hidden">
      <div className="container-large">
        <div className="header-layout">
          <div
            className="header-content-top"
            id="w-node-_05c97b58-b1ac-eabe-afbc-3861dce3b03d-62105480"
          >
            <div
              className="text-color-700"
              id="w-node-_7586c490-d108-eb40-4ef7-3a9b9eba7483-62105480"
            >
              <div className="heading extra-small">
                march 21st 2026 | 9:00 am | 150 West 62nd Street, New York City
              </div>
            </div>
            <div className="spacer-32" />
            <div
              className="header-title"
              id="w-node-ea2abd82-4321-adbd-c086-de981a476235-62105480"
            >
              <h1 className="heading extra-large">
                Academic rigor with real-market relevance
              </h1>
            </div>
          </div>
          <div className="header-content-bottom">
            <div className="header-description-wrapper">
              <div className="topics-wrapper">
                <p className="paragraph large">
                  The <strong>One Shared Truth</strong> Conference is Hosted by
                  Fordham University&apos;s Gabelli School of Business and
                  Presented by the Family Stewardship Council. <br />
                  <br />
                  We are focused on supporting fiduciaries, family offices, and
                  long-term capital stewards on how to navigate digital assets
                  and blockchain opportunities. <br />
                  <br />
                  On this edition of <strong>One Shared Truth</strong>:
                </p>
              </div>
              <div className="spacer-64" />
              <div className="topics-wrapper">
                <div
                  className="div-block-6"
                  id="w-node-_8cf18185-a7e0-e2f5-7438-595deeb37ab4-62105480"
                >
                  {themes.map((t) => (
                    <div key={t.title} className="top-section-topic">
                      <div className="theme-wrapper">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={t.icon}
                          alt=""
                          width={64}
                          height={64}
                          className="icon-large"
                          loading="lazy"
                        />
                        <div className="spacer-16" />
                        <h3 className="heading medium">{t.title}</h3>
                      </div>
                      <div className="spacer-16" />
                      <p className="topic-paragraph">{t.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="spacer-64" />
              <div className="topics-wrapper">
                <p className="paragraph large">
                  Conference will be held at the{' '}
                  <strong>Fordham Law School</strong> Skadden Conference Ctr 150
                  West 62nd Street - New York City
                </p>
              </div>
              <div className="div-block-3">
                <a
                  href={TICKETS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-ticket-button w-button"
                >
                  tickets and registration
                </a>
                <a
                  href={SPONSOR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button small w-button"
                >
                  apply to sponsor
                </a>
              </div>
            </div>
            <div className="hero-image-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ost/images/Website-hero-test-image.png"
                alt=""
                className="hero-image"
                loading="eager"
                width={1920}
                height={1080}
                srcSet="/ost/images/Website-hero-test-image-p-500.png 500w, /ost/images/Website-hero-test-image-p-800.png 800w, /ost/images/Website-hero-test-image-p-1080.png 1080w, /ost/images/Website-hero-test-image-p-1600.png 1600w, /ost/images/Website-hero-test-image.png 1920w"
                sizes="(max-width: 1920px) 100vw, 1920px"
              />
              <div className="corner-cut-header w-embed">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 72 450"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0H72L0 72V0Z"
                    fill="currentColor"
                  />
                  <path
                    d="M0 450H72L0 378V450Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
