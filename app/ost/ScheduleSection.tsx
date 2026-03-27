import { schedule, type ScheduleItem } from '@/lib/ost/schedule';

function renderNameFirst(text: string) {
  const trimmed = text.trim();
  const colonIdx = trimmed.indexOf(':');
  if (colonIdx > -1) {
    const prefix = trimmed.slice(0, colonIdx + 1);
    const rest = trimmed.slice(colonIdx + 1).trim();
    const commaIdx = rest.indexOf(',');
    if (commaIdx > -1) {
      const name = rest.slice(0, commaIdx).trim();
      const tail = rest.slice(commaIdx);
      return (
        <>
          {prefix} <strong>{name}</strong>
          {tail}
        </>
      );
    }
    return (
      <>
        {prefix} {rest}
      </>
    );
  }

  const commaIdx = trimmed.indexOf(',');
  if (commaIdx > -1) {
    const name = trimmed.slice(0, commaIdx).trim();
    const tail = trimmed.slice(commaIdx);
    return (
      <>
        <strong>{name}</strong>
        {tail}
      </>
    );
  }

  return trimmed;
}

function BreakCornerCuts() {
  return (
    <div className="corner-cuts-wrapper text-color-100">
      <div className="corner-cut-top-left w-embed">
        <svg width="100%" height="100%" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H72L0 72V0Z" fill="currentColor" />
        </svg>
      </div>
      <div className="corner-cut-top-right w-embed">
        <svg width="100%" height="100%" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M72 0V72L0 0L72 0Z" fill="currentColor" />
        </svg>
      </div>
      <div className="corner-cut-bottom-right w-embed">
        <svg width="100%" height="100%" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M72 72V0L0 72H72Z" fill="currentColor" />
        </svg>
      </div>
      <div className="corner-cut-bottom-left w-embed">
        <svg width="100%" height="100%" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 72H72L0 0V72Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

function ScheduleItemBreak({ item }: { item: ScheduleItem }) {
  return (
    <div className="schedule-item break">
      <div className="time-wrapper hide-mobile-landscape">
        <h5 className="heading extra-small breaktime">
          {item.startTime}
          {item.endTime !== item.startTime ? ` – ${item.endTime}` : ''}
        </h5>
      </div>
      <div className="div-block-9">
        <h4 className="heading medium">{item.title}</h4>
      </div>
      <BreakCornerCuts />
    </div>
  );
}

function ScheduleItemEvent({ item }: { item: ScheduleItem }) {
  const isBreakType = item.type === 'break' || item.type === 'meal';
  if (isBreakType) return <ScheduleItemBreak item={item} />;

  return (
    <div className="schedule-item">
      <div className="div-block-7">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ost/images/Vector.svg"
          alt=""
          loading="lazy"
          className="image-6"
        />
        <div className="time-wrapper paddingbottom">
          <h3 className="heading medium">{item.startTime}</h3>
          <div className="heading extra-small">—</div>
          <div className="heading medium">{item.endTime}</div>
        </div>
      </div>
      <div className="event-details-wrapper">
        <h4 className="heading medium">{item.title}</h4>
        {item.description && (
          <>
            <div className="spacer-16" />
            <div className="paragraph paragraph-s w-richtext">
              {renderNameFirst(item.description)}
            </div>
          </>
        )}
        {item.panelists && item.panelists.length > 0 && (
          <>
            <div className="spacer-16" />
            <div className="paragraph paragraph-s w-richtext">
              <ul>
                {item.panelists.map((p) => (
                  <li key={p}>{renderNameFirst(p)}</li>
                ))}
              </ul>
            </div>
          </>
        )}
        {item.moderator && (
          <>
            <div className="spacer-16" />
            <p className="paragraph paragraph-s w-richtext">
              <strong>Moderator:</strong> {renderNameFirst(item.moderator)}
            </p>
          </>
        )}
        {item.breakouts && item.breakouts.length > 0 && (
          <>
            <div className="spacer-16" />
            <div className="paragraph paragraph-s w-richtext">
              {item.breakouts.map((b) => (
                <div key={b.title}>
                  <strong>{b.title}</strong>
                  <br />
                  {b.description}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function ScheduleSection() {
  return (
    <>
      <div className="divider">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ost/images/Vector.svg"
          alt=""
          width={72}
          height={24}
          loading="lazy"
          className="image-3"
        />
      </div>
      <section id="schedule" className="section">
        <div className="container-large">
          <div className="centre-text">
            <h2 className="heading extra-large">Schedule</h2>
          </div>
          <div className="spacer-80" />
          <div className="w-layout-grid schedule-list">
            <div className="w-dyn-list">
              <div role="list" className="collection-list w-dyn-items">
                {schedule.map((item) => (
                  <div
                    key={`${item.startTime}-${item.title}`}
                    role="listitem"
                    className="w-dyn-item"
                  >
                    <ScheduleItemEvent item={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
