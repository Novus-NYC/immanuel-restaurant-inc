'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { nav, site } from '@/data/site';
import { Arrow } from './Icons';

const creamRoutes = ['/menu'];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const tone = creamRoutes.some((r) => path.startsWith(r)) ? 'cream' : 'dark';
  const current = (href: string) => (path === href || path.startsWith(`${href}/`) ? 'page' : undefined);

  // close on navigation
  useEffect(() => { setOpen(false); }, [path]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('menu-is-open', open);
    if (!open) return;
    const first = panel.current?.querySelector<HTMLElement>('a');
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); return; }
      if (e.key !== 'Tab' || !panel.current) return;
      const items = [btn.current, ...panel.current.querySelectorAll<HTMLElement>('a')].filter(Boolean) as HTMLElement[];
      const i = items.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className={`header${open ? ' menu-open' : ''}`} data-tone={open ? 'dark' : tone}>
        <div className="wrap header__inner">
          <Link href="/" className="wordmark">
            <span className="wordmark__name">Immanuel</span>{' '}
            <span className="wordmark__sub">Restaurant</span>
          </Link>
          <nav className="nav" aria-label="Main">
            <ul className="nav__list">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link className="nav__link" href={n.href} aria-current={current(n.href)}>{n.label}</Link>
                </li>
              ))}
            </ul>
            <a className="nav__link nav__phone" href={site.phone.href}>{site.phone.display}</a>
            <a className="btn btn--sm" href={site.order.primary.href} target="_blank" rel="noopener noreferrer">
              <span>Order online</span>
              <Arrow dir="up-right" />
            </a>
            <button
              ref={btn}
              className="menu-btn"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span>{open ? 'Close' : 'Menu'}</span>
              <span className="menu-btn__icon" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </header>
      <div id="mobile-menu" ref={panel} className={`mmenu${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobile">
          <ul className="mmenu__list">
            <li><Link className="mmenu__link" href="/" aria-current={path === '/' ? 'page' : undefined}><span>Home</span></Link></li>
            {nav.map((n) => (
              <li key={n.href}>
                <Link className="mmenu__link" href={n.href} aria-current={current(n.href)}><span>{n.label}</span></Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mmenu__meta">
          <a className="btn" href={site.order.primary.href} target="_blank" rel="noopener noreferrer"><span>Order online</span><Arrow dir="up-right" /></a>
          <a href={site.phone.href}>Call {site.phone.display}</a>
          <p className="muted">{site.address.street}, {site.address.city}, {site.address.region} {site.address.zip}</p>
        </div>
      </div>
    </>
  );
}
