import type { Metadata } from 'next';
import { Arrow } from '@/components/Icons';
import { TodayRow } from '@/components/TodayRow';
import { hoursLabel, site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Visit and order',
  description: 'Immanuel is at 799 Stanley Avenue, Brooklyn, NY 11207. Open Monday to Saturday from 7 AM. Call (347) 240-4703 or order online for pickup and delivery.',
};

export default function VisitPage() {
  return (
    <>
      <header className="wrap grid page-head">
        <h1 className="intro display page-head__title">Come by, or we will come to you.</h1>
        <p className="lede page-head__lede muted" data-reveal>{site.address.streetLong} at Ashford Street, in {site.address.neighborhood}. Eat in, take out, or order for pickup and delivery.</p>
      </header>

      <div className="wrap grid visit-grid">
        <section className="hours" aria-labelledby="hours-title" data-reveal>
          <h2 id="hours-title" className="h-l" style={{ marginBottom: '1.4rem' }}>Hours</h2>
          <table className="hours__table">
            <caption className="sr-only">Opening hours</caption>
            <tbody>
              {site.hours.map((h, i) => (
                <TodayRow key={h.day} dayIndex={(i + 1) % 7}>
                  <th scope="row">{h.day}</th>
                  <td>{hoursLabel(h)}</td>
                </TodayRow>
              ))}
            </tbody>
          </table>
          <p className="hours__note">{site.hoursNote} Holiday hours may differ, so call ahead on holidays.</p>
        </section>

        <div className="visit-info">
          <div data-reveal>
            <p className="fact__k">Address</p>
            <p className="fact__v">{site.address.streetLong}<br />{site.address.city}, {site.address.region} {site.address.zip}</p>
            <p style={{ marginTop: '0.9rem' }}><a className="arrow-link" href={site.address.mapUrl} target="_blank" rel="noopener noreferrer"><span>Get directions</span><Arrow dir="up-right" /></a></p>
          </div>
          <div data-reveal>
            <p className="fact__k">Phone</p>
            <p className="fact__v"><a className="link tnum" href={site.phone.href}>{site.phone.display}</a></p>
          </div>
          <div data-reveal>
            <p className="fact__k">At the restaurant</p>
            <ul className="amenities">{site.amenities.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
        </div>

        <section className="channels" aria-labelledby="order-title">
          <div className="channels__title">
            <h2 id="order-title" className="h-xl" data-split>Order ahead.</h2>
            <p className="muted" data-reveal style={{ marginTop: '1.2rem', maxWidth: '34ch' }}>Ordering direct goes straight to the kitchen. The same menu is on the delivery apps.</p>
          </div>
          <ul className="channels__list">
            <li data-reveal>
              <a className="channel" href={site.order.primary.href} target="_blank" rel="noopener noreferrer">
                <span className="channel__name">Order direct</span>
                <small>{site.order.primary.note}</small>
                <Arrow dir="up-right" />
              </a>
            </li>
            {site.order.channels.map((c) => (
              <li key={c.label} data-reveal>
                <a className="channel" href={c.href} target="_blank" rel="noopener noreferrer">
                  <span className="channel__name">{c.label}</span>
                  <Arrow dir="up-right" />
                </a>
              </li>
            ))}
            <li data-reveal>
              <a className="channel" href={site.phone.href}>
                <span className="channel__name">Call it in</span>
                <small className="tnum">{site.phone.display}</small>
                <Arrow />
              </a>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
