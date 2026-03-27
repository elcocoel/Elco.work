export function FooterSection() {
  return (
    <section className="section secondary">
      <div className="container-large">
        <div className="footer-flex-container-top">
          <div className="footer-column right">
            <div>
              <a
                href="https://www.fordham.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link alternate"
              >
                Fordham
                <br />
                university
              </a>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ost/images/Vector-1.svg" alt="" width={8} height={24} loading="lazy" className="image-5" />
            <div>
              <a
                href="https://www.fordham.edu/gabelli-school-of-business/industry-collaborations/family-stewardship-council/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link alternate"
              >
                Family Stewardship <br />
                Council
              </a>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ost/images/Vector-1.svg" alt="" width={8} height={24} loading="lazy" className="image-5" />
            <div>
              <a
                href="https://www.fordham.edu/gabelli-school-of-business/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link alternate"
              >
                Gabelli School <br />
                of Businness
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
