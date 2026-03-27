const themes = [
  {
    icon: '/ost/images/Arbitrage.svg',
    title: 'Arbitrage',
    text: 'Market efficiency in fragmented digital markets',
    accent: true,
  },
  {
    icon: '/ost/images/Tokenization-Apple.svg',
    title: 'TOKENIZATION',
    text: 'Of traditional and non-traditional assets',
    accent: false,
  },
  {
    icon: '/ost/images/STABLE.svg',
    title: 'Stablecoins',
    text: 'As payment, settlement, and liquidity rails',
    accent: false,
  },
  {
    icon: '/ost/images/Exposure-Apple.svg',
    title: 'portfolio exposure',
    text: 'Taking on positions and exposure on the ecosystem',
    accent: true,
  },
];

function CornerCuts() {
  return (
    <div className="corner-cuts-wrapper text-color-accent">
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

export function CoreThemesSection() {
  return (
    <>
      <div className="divider">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ost/images/Vector.svg" alt="" width={72} height={24} loading="lazy" className="image-3" />
      </div>
      <section id="about" className="section accent">
        <div className="container-large">
          <div className="div-block">
            <h2 className="heading extra-large variant-color">CORE THEMES:</h2>
            <div className="spacer-24" />
            <p className="paragraph large variant-color">
              Each session emphasizes practical insight, market structure, and
              real-world application. The conference provides a professional,
              compliance-aware environment suitable for regulated institutions.
            </p>
          </div>
          <div className="spacer-80" />
          <div className="w-layout-grid card-list">
            {themes.map((t, idx) => (
              <div
                key={t.title}
                className={`card-item ${t.accent ? 'accent-light' : ''}`}
                id={
                  idx === 0
                    ? 'w-node-_2de5a4bf-75e7-91f2-ca27-0f179f6547b9-62105480'
                    : idx === 1
                      ? 'w-node-_2de5a4bf-75e7-91f2-ca27-0f179f6547c6-62105480'
                      : idx === 2
                        ? 'w-node-_2de5a4bf-75e7-91f2-ca27-0f179f6547d3-62105480'
                        : 'w-node-_2de5a4bf-75e7-91f2-ca27-0f179f6547e0-62105480'
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.icon} alt="" width={64} height={64} className="icon-large" loading="lazy" />
                <div className="spacer-64" />
                <h3 className="heading medium left">{t.title}</h3>
                <div className="spacer-16" />
                <p className="paragraph">{t.text}</p>
                <CornerCuts />
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="divider star-right">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ost/images/Vector.svg" alt="" width={72} height={24} loading="lazy" className="image-3" />
      </div>
    </>
  );
}
