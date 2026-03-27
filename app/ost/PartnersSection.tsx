export function PartnersSection() {
  return (
    <section className="section accent-light">
      <div className="container-large">
        <div className="partners-layout">
          <h2 className="heading medium">made possible by</h2>
          <div className="social-proof-logos-wrapper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ost/images/FSC-Logo-1-Vectorized.svg"
              alt="Family Stewardship Council"
              className="social-proof-logo"
              loading="lazy"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ost/images/MoonPay.svg"
              alt="MoonPay"
              className="social-proof-logo"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
