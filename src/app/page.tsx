import Link from 'next/link';
import { PanamaPlate, SoulPlate, BreakfastPlate, DrinksTray } from '@/components/food/scenes';
import { HeroPhoto } from '@/components/home/HeroPhoto';
import { Hungry, type HungryTab } from '@/components/home/Hungry';
import { Arrow } from '@/components/Icons';
import { menu, price, type MenuItem } from '@/data/menu';
import { praise, site } from '@/data/site';

// Pull dishes from the menu file so names and prices always match /menu.
const all = menu.flatMap((g) => g.sections.flatMap((s) => s.items.map((it) => ({ ...it, section: s.id }))));
const dish = (section: string, name: string, detail?: string) => {
  const it = all.find((x) => x.section === section && x.name === name) as MenuItem & { section: string };
  return { name: it.name, price: price(it), detail: detail ?? it.detail };
};

const tabs: HungryTab[] = [
  {
    id: 'panama',
    label: 'Panamanian breakfast',
    lede: 'Frituras fried to order, with free coffee or tea on every special.',
    plate: <PanamaPlate />,
    caption: 'The Combo Típico',
    dishes: [
      dish('panamanian-breakfast', 'Combo Típico'),
      dish('panamanian-breakfast', 'PTY Deluxe Breakfast'),
      dish('panamanian-breakfast', 'Campesino Special'),
      dish('panamanian-food', 'Empanadas', 'Corn dough, six fillings'),
    ],
  },
  {
    id: 'soul',
    label: 'Soul food',
    lede: 'Every special comes with mac and cheese, collard greens and candied yams.',
    plate: <SoulPlate />,
    caption: 'The chicken soul food special',
    dishes: [
      dish('soul-food', 'Chicken'),
      dish('soul-food', 'Fish'),
      dish('soul-food', 'Roast pork'),
      dish('soul-food', 'Oxtail'),
    ],
  },
  {
    id: 'breakfast',
    label: 'The breakfast counter',
    lede: 'The American side of the counter, from 7 AM. Specials come with free coffee or tea.',
    plate: <BreakfastPlate />,
    caption: 'The Stanley Deluxe Breakfast',
    dishes: [
      dish('immanuel-breakfast', 'Stanley Deluxe Breakfast'),
      dish('immanuel-breakfast', 'Bacon, scrambled egg and pancake'),
      dish('immanuel-breakfast', 'Turkey bacon, scrambled egg, grits and toast'),
      dish('griddle', 'Oreo waffle'),
    ],
  },
  {
    id: 'drinks',
    label: 'Drinks',
    lede: 'Homemade and traditional drinks, poured 16 oz.',
    plate: <DrinksTray />,
    caption: 'Sorrel, chicheme, passion fruit and panela',
    dishes: [
      dish('cold-drinks', 'Sorrel'),
      dish('panamanian-food', 'Chicheme'),
      dish('cold-drinks', 'Panela'),
      dish('cold-drinks', 'Passion fruit juice'),
    ],
  },
];

const ticker = ['Empanadas', 'Carimañolas', 'Oxtail', 'Mangú con salami', 'Collard greens', 'Candied yams', 'Chicheme', 'Sorrel', 'Bacalao', 'Caribbean pasta', 'Stanley Deluxe Breakfast'];

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap grid hero__grid">
          <div className="hero__copy">
            <p className="hero__kicker intro">East New York, since 2018</p>
            <h1 id="hero-title" className="hero__title">
              <span className="display intro">A heavenly taste</span>
              <span className="hero__sub intro" style={{ ['--d' as string]: '0.12s' }}>of Panama and soul food, fried, stewed and served hot at 799 Stanley Avenue.</span>
            </h1>
            <div className="btn-row intro" style={{ ['--d' as string]: '0.22s' }}>
              <a className="btn" href={site.order.primary.href} target="_blank" rel="noopener noreferrer"><span>Order online</span><Arrow dir="up-right" /></a>
              <Link className="btn btn--ghost" href="/menu"><span>See the menu</span></Link>
            </div>
            <p className="hero__meta intro" style={{ ['--d' as string]: '0.3s' }}>
              <span><strong>Mon to Sat</strong> from 7 AM</span>
              <a href={site.phone.href}><strong>{site.phone.display}</strong></a>
              <span>Pickup and delivery</span>
            </p>
          </div>
          <div className="hero__art">
            <HeroPhoto src="/photos/empanada-plate.jpg" alt="A golden corn empanada and corn tortillas with a fried egg, fried sausage and salami, from Immanuel's kitchen." />
          </div>
        </div>
      </section>

      <div className="ticker" aria-label="On the menu">
        <div className="ticker__track">
          <ul className="ticker__list">{ticker.map((t) => <li key={t}>{t}</li>)}</ul>
          <ul className="ticker__list" aria-hidden="true">{ticker.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </div>

      <section className="hungry tone" data-tone="cream" aria-labelledby="hungry-title">
        <div className="wrap">
          <header className="hungry__head">
            <h2 id="hungry-title" className="h-xl" data-split>What are you hungry for?</h2>
            <p className="hungry__intro" data-reveal>About two hundred things on the menu, from bagels to whole red snapper. Start with one of these.</p>
          </header>
          <Hungry tabs={tabs} />
          <p className="hungry__more" data-reveal>
            <Link className="arrow-link" href="/menu"><span>See the full menu</span><Arrow /></Link>
          </p>
        </div>
      </section>

      <section className="chef" aria-labelledby="chef-title">
        <div className="wrap grid">
          <div className="chef__head">
            <p className="label gold">Chef {site.owner.name}</p>
            <h2 id="chef-title" className="h-xl" data-split>She was cooking for her classmates at nine.</h2>
            <p className="lede muted" data-reveal>Born in Colón, the fourth of nine children, she found her way into the kitchen of a boarding school run by nuns. That kitchen is where Immanuel starts.</p>
            <p data-reveal style={{ marginTop: '2rem' }}><Link className="arrow-link" href="/story"><span>Read her story</span><Arrow /></Link></p>
          </div>
          <dl className="chef__facts">
            <div className="fact-big" data-reveal>
              <dt className="fact-big__n">9</dt>
              <dd>Her age when she started cooking for classmates in Colón, Panama.</dd>
            </div>
            <div className="fact-big" data-reveal style={{ ['--d' as string]: '0.08s' }}>
              <dt className="fact-big__n">2006</dt>
              <dd>The year she came to the United States, first California, then New York.</dd>
            </div>
            <div className="fact-big" data-reveal style={{ ['--d' as string]: '0.16s' }}>
              <dt className="fact-big__n">2018</dt>
              <dd>June: Immanuel opens its doors at 799 Stanley Avenue.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="praise" aria-labelledby="praise-title">
        <div className="wrap grid">
          <div className="praise__head">
            <h2 id="praise-title" className="h-xl" data-split>What people come back for.</h2>
          </div>
          <ul className="praise__ratings" aria-label={`Ratings as of ${site.ratingsAsOf}`}>
            {site.ratings.map((r) => (
              <li key={r.platform} className="rating" data-reveal>
                <span className="rating__score">{r.score}</span>
                <span className="rating__where">{r.platform}</span>
                <span className="rating__count">{r.count}</span>
              </li>
            ))}
          </ul>
          <ul className="praise__list">
            {praise.map((p) => (
              <li key={p.dish} className="praise__row" data-reveal>
                <h3 className="praise__dish">{p.dish}</h3>
                <p className="praise__said">{p.said}</p>
                <p className="praise__who">{p.who}, {p.where}</p>
              </li>
            ))}
          </ul>
          <p className="praise__note">Paraphrased from public reviews. Ratings as of {site.ratingsAsOf}.</p>
        </div>
      </section>

      <section className="honors" aria-labelledby="honors-title">
        <div className="wrap grid">
          <h2 id="honors-title" className="h-l honors__title" data-split>Recognized by Brooklyn, and by Panamanian New York.</h2>
          <ul className="honors__list">
            {site.honors.map((h) => (
              <li key={h.title} className="honor" data-reveal>
                <span className="honor__year">{h.year}</span>
                <div>
                  <h3 className="honor__title">{h.title}</h3>
                  <p className="honor__detail">{h.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tone visit-strip" data-tone="plum" aria-labelledby="visit-title">
        <div className="wrap grid">
          <div className="visit-strip__title">
            <h2 id="visit-title" className="h-xl" data-split>Breakfast starts at 7.</h2>
            <p className="lede muted" data-reveal>Monday to Saturday on Stanley Avenue at Ashford Street. Closed Sundays.</p>
            <div className="btn-row" data-reveal style={{ marginTop: '2rem' }}>
              <a className="btn" href={site.order.primary.href} target="_blank" rel="noopener noreferrer"><span>Order online</span><Arrow dir="up-right" /></a>
              <Link className="btn btn--ghost" href="/visit"><span>Hours and directions</span></Link>
            </div>
          </div>
          <dl className="visit-strip__facts">
            <div data-reveal>
              <dt className="fact__k">Address</dt>
              <dd className="fact__v"><a className="link" href={site.address.mapUrl} target="_blank" rel="noopener noreferrer">{site.address.streetLong}, {site.address.city}</a></dd>
            </div>
            <div data-reveal>
              <dt className="fact__k">Phone</dt>
              <dd className="fact__v"><a className="link tnum" href={site.phone.href}>{site.phone.display}</a></dd>
            </div>
            <div data-reveal>
              <dt className="fact__k">Hours</dt>
              <dd className="fact__v">Mon, Tue, Thu, Fri, Sat 7 AM to 7 PM<br />Wednesday 7 AM to 5 PM</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
