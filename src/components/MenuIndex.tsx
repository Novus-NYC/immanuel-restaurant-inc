'use client';
import { useEffect, useState } from 'react';

type G = { id: string; title: string; count: number };

// Section index for the menu card. Marks the group currently in view.
export function MenuIndex({ groups, note }: { groups: G[]; note: string }) {
  const [current, setCurrent] = useState(groups[0]?.id);
  useEffect(() => {
    const els = groups.map((g) => document.getElementById(g.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setCurrent(hit.target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [groups]);
  return (
    <nav className="menu-index" aria-label="Menu sections">
      <ul className="menu-index__list">
        {groups.map((g) => (
          <li key={g.id}>
            <a className={`menu-index__link${current === g.id ? ' is-current' : ''}`} href={`#${g.id}`} aria-current={current === g.id ? 'true' : undefined}>
              <span className="menu-index__name">{g.title}</span>
              <small>{g.count}</small>
            </a>
          </li>
        ))}
      </ul>
      <p className="menu-index__note">{note}</p>
    </nav>
  );
}
