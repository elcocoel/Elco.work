const TICKETS_URL =
  'https://securelb.imodules.com/s/1362/18/interior.aspx?sid=1362&gid=1&pgid=14963&cid=27650';

export function OSTNav() {
  return (
    <div
      className="nav w-nav"
      role="banner"
      data-animation="default"
      data-easing2="ease"
      data-easing="ease"
      data-collapse="medium"
      data-duration="400"
      data-w-id="abad23f6-3206-d95e-518e-2548f4c46996"
    >
      <div className="nav-container">
        <nav
          className="nav-menu w-nav-menu"
          role="navigation"
          id="w-node-abad23f6-3206-d95e-518e-2548f4c4699b-f4c46996"
        >
          <a href="#about" className="nav-link left w-nav-link">
            About
          </a>
          <a href="#speakers" className="nav-link w-nav-link">
            Speakers
          </a>
          <a href="#schedule" className="nav-link w-nav-link">
            Schedule
          </a>
          <a href="#faq" className="nav-link right2 w-nav-link">
            FAQ
          </a>
        </nav>
        <div
          className="actions-wrapper"
          id="w-node-abad23f6-3206-d95e-518e-2548f4c469b0-f4c46996"
        >
          <a
            href={TICKETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary small hide-mobile-portrait w-button"
          >
            tickets and registration
          </a>
          <div className="nav-menu-button w-nav-button" />
        </div>
      </div>
      <div className="logo-wrapper">
        <a href="/ost" className="logo w-nav-brand w--current" aria-current="page">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ost/images/1STC---Logomark--Large-Knight.svg"
            alt="One Shared Truth"
            width={120}
            height={80}
            className="image"
          />
        </a>
      </div>
    </div>
  );
}
