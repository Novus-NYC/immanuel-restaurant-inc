import type { Metadata } from 'next';
import { Arrow } from '@/components/Icons';
import { MenuIndex } from '@/components/MenuIndex';
import { MenuIcons } from '@/components/food/scenes';
import { menu, menuNote, price } from '@/data/menu';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'The full Immanuel menu: Panamanian frituras and breakfast, soul food specials, lunch plates, family combos, sides, cakes and drinks, with prices.',
};

const wide = new Set(['sides', 'cold-drinks', 'heroes', 'panamanian-food', 'plates', 'family-combos']);

export default function MenuPage() {
  const count = menu.reduce((n, g) => n + g.sections.reduce((m, s) => m + s.items.length, 0), 0);
  return (
    <div className="tone" data-tone="cream">
      <header className="wrap grid page-head">
        <h1 className="intro display page-head__title">The menu.</h1>
        <p className="lede page-head__lede" data-reveal>Panamanian frituras and breakfast, soul food, lunch plates and the whole American breakfast counter. {count} things, six days a week.</p>
        <div className="page-head__aside" data-reveal>
          <div className="btn-row">
            <a className="btn" href={site.order.primary.href} target="_blank" rel="noopener noreferrer"><span>Order online</span><Arrow dir="up-right" /></a>
            <a className="btn btn--ghost" href={site.phone.href}><span>Call {site.phone.display}</span></a>
          </div>
        </div>
      </header>

      <div className="wrap grid menu-page">
        <MenuIndex groups={menu.map((g) => ({ id: g.id, title: g.title, count: g.sections.reduce((m, s) => m + s.items.length, 0) }))} note={menuNote} />
        <div className="menu-body">
          {menu.map((g) => (
            <section key={g.id} id={g.id} className="menu-group" aria-labelledby={`${g.id}-title`}>
              <div className="menu-group__head">
                <h2 id={`${g.id}-title`} className="menu-group__title" data-split>{g.title}</h2>
                {MenuIcons[g.id] && <span className="menu-group__icon">{MenuIcons[g.id]({})}</span>}
              </div>
              <div className="menu-group__sections">
                {g.sections.map((s) => (
                  <section key={s.id} className={`menu-section${wide.has(s.id) ? ' menu-section--wide' : ''}`} aria-labelledby={`${s.id}-t`} data-reveal>
                    <h3 id={`${s.id}-t`} className="menu-section__title">{s.title}</h3>
                    {s.note && <p className="menu-section__note">{s.note}</p>}
                    <ul className="menu-items">
                      {s.items.map((it) => (
                        <li key={it.name + it.price} className="mi">
                          <div className="mi__row">
                            <span className="mi__name">{it.name}</span>
                            <span className="mi__price">
                              {price(it)}
                              {it.source === 'grubhub' && <><span className="mi__gh" aria-hidden="true">•</span><span className="sr-only"> (listed on Grubhub)</span></>}
                            </span>
                          </div>
                          {it.detail && <p className="mi__detail">{it.detail}</p>}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </section>
          ))}
          <div className="menu-cta" data-reveal>
            <p className="h-m">Hungry already? Order ahead for pickup or delivery.</p>
            <a className="btn" href={site.order.primary.href} target="_blank" rel="noopener noreferrer"><span>Order online</span><Arrow dir="up-right" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
