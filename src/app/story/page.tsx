import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Icons';
import { PanamaPlate } from '@/components/food/scenes';
import { site, story } from '@/data/site';

export const metadata: Metadata = {
  title: 'Our story',
  description: 'Chef Yonayka Bryant Green learned to cook in a convent school kitchen in Colón, Panama. In June 2018 she opened Immanuel on Stanley Avenue in East New York.',
};

export default function StoryPage() {
  return (
    <>
      <header className="story-page__hero">
        <div className="wrap grid">
          <h1 className="intro display story-page__title">From Colón to Stanley Avenue.</h1>
          <figure className="story-page__figure illo">
            <PanamaPlate title="Illustration: the Combo Típico, an empanada, an arina and a tortilla with chorizo and egg, with coffee." />
            <figcaption>The Combo Típico, a Panamanian breakfast from the menu.</figcaption>
          </figure>
          <p className="lede story-page__lede muted" data-reveal>{site.owner.name} is the chef and owner of Immanuel. She learned to cook as a girl in Panama and has fed East New York since {site.since}.</p>
        </div>
      </header>

      <section className="wrap timeline" aria-label="The chef's path">
        {story.chapters.map((c) => (
          <article key={c.label} className="timeline__item" data-reveal>
            <p className="timeline__label">{c.label}</p>
            <h2 className="timeline__title">{c.title}</h2>
            <p className="timeline__text">{c.text}</p>
          </article>
        ))}
        <article className="timeline__item" data-reveal>
          <p className="timeline__label">Padrino Empresario</p>
          <h2 className="timeline__title">Service, learned early.</h2>
          <p className="timeline__text">{story.service}</p>
        </article>
      </section>

      <section className="tone quote-band" data-tone="plum" aria-labelledby="name-title">
        <div className="wrap grid">
          <h2 id="name-title" className="sr-only">{story.name.title}</h2>
          <p className="quote-band__text" data-split>Where you experience a heavenly taste.</p>
          <p className="quote-band__cite" data-reveal>The line on the Immanuel logo. The name itself means “God with us.”</p>
        </div>
      </section>

      <section className="honors" aria-labelledby="honors-title">
        <div className="wrap grid">
          <h2 id="honors-title" className="h-l honors__title" data-split>Recognition</h2>
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

      <section className="visit-strip" aria-labelledby="story-cta">
        <div className="wrap grid">
          <div className="visit-strip__title">
            <h2 id="story-cta" className="h-xl" data-split>The rest of the story is on the menu.</h2>
            <div className="btn-row" data-reveal style={{ marginTop: '2rem' }}>
              <Link className="btn" href="/menu"><span>See the menu</span><Arrow /></Link>
              <a className="btn btn--ghost" href={site.order.primary.href} target="_blank" rel="noopener noreferrer"><span>Order online</span></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
