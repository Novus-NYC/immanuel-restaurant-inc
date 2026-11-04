import Link from 'next/link';
import { hoursLabel, nav, site } from '@/data/site';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="awning" aria-label="Immanuel Restaurant, 799 Stanley Ave">
        <div className="wrap">
          <p className="awning__sign" aria-hidden="true">
            <span className="awning__name">Immanuel</span>
            <span className="awning__rest">Restaurant</span>
          </p>
        </div>
        <div className="awning__strip">
          <div className="wrap awning__strip-inner">
            <p className="awning__words">{site.awning.map((w) => <span key={w}>{w}</span>)}</p>
            <p className="awning__plate">{site.address.street}.</p>
          </div>
        </div>
        <div className="awning__valance" aria-hidden="true" />
      </div>
      <div className="wrap grid footer__cols">
        <div className="footer__col">
          <h2>Visit</h2>
          <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer">
            {site.address.street}<br />{site.address.city}, {site.address.region} {site.address.zip}
          </a>
          <span className="muted">{site.address.neighborhood}</span>
          <a href={site.phone.href}>{site.phone.display}</a>
        </div>
        <div className="footer__col">
          <h2>Hours</h2>
          <dl className="footer__hours">
            {site.hours.map((h) => (
              <div key={h.day} style={{ display: 'contents' }}>
                <dt>{h.short}</dt>
                <dd>{hoursLabel(h)}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="footer__col">
          <h2>Order</h2>
          <a href={site.order.primary.href} target="_blank" rel="noopener noreferrer">Order direct</a>
          {site.order.channels.map((c) => (
            <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer">{c.label}</a>
          ))}
        </div>
        <div className="footer__col">
          <h2>Pages</h2>
          <Link href="/">Home</Link>
          {nav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          <a href={site.instagram.href} target="_blank" rel="noopener noreferrer">Instagram {site.instagram.handle}</a>
        </div>
      </div>
      <div className="wrap footer__base">
        <p>© {year} {site.legalName}. Since {site.since}.</p>
        <a href="https://novusnyc.org" target="_blank" rel="noopener noreferrer">Made by Novus</a>
      </div>
    </footer>
  );
}
