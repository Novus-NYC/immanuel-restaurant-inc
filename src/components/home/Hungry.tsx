'use client';
// "What are you hungry for?": four plates, one at a time. A real tablist (arrow keys, Home, End).
// The incoming plate turns onto the table and its dishes rise in. Without JS every panel shows.
import { useEffect, useRef, useState, type ReactNode } from 'react';

export type HungryTab = { id: string; label: string; lede: string; plate: ReactNode; caption: string; dishes: { name: string; price: string; detail?: string }[] };

export function Hungry({ tabs }: { tabs: HungryTab[] }) {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  // the first plate is set down when the section comes into view, not while it is off screen
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { rootMargin: '0px 0px -15% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const select = (i: number, focus = false) => {
    const n = (i + tabs.length) % tabs.length;
    setActive(n);
    if (focus) refs.current[n]?.focus();
  };
  const onKey = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowDown: active + 1, ArrowLeft: active - 1, ArrowUp: active - 1, Home: 0, End: tabs.length - 1 };
    if (e.key in keys) { e.preventDefault(); select(keys[e.key], true); }
  };
  return (
    <div className="hungry__ui" ref={root} data-seen={seen} onFocus={() => setSeen(true)}>
      <div className="hungry__tabs" role="tablist" aria-label="Choose a part of the menu" onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { refs.current[i] = el; }}
            role="tab"
            id={`tab-${t.id}`}
            aria-controls={`panel-${t.id}`}
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            className="hungry__tab"
            onClick={() => select(i)}
          >
            <span>{t.label}</span>
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <section
          key={t.id}
          id={`panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${t.id}`}
          className="hungry__panel"
          data-active={active === i}
          tabIndex={0}
        >
          <figure className="hungry__plate">
            {t.plate}
            <figcaption>{t.caption}</figcaption>
          </figure>
          <div className="hungry__copy">
            <p className="hungry__lede">{t.lede}</p>
            <ul className="hungry__dishes">
              {t.dishes.map((d, k) => (
                <li key={d.name} style={{ ['--k' as string]: k }}>
                  <div className="hungry__row"><span className="hungry__name">{d.name}</span><span className="hungry__price">{d.price}</span></div>
                  {d.detail && <p className="hungry__detail">{d.detail}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
