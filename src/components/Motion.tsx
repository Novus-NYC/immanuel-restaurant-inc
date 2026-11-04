'use client';
// Global motion, on one clock (gsap.ticker):
// - page transitions: a plum panel rises with a domed top edge, like dough puffing, then lifts off
// - reveals: [data-reveal] rises and settles; [data-split] headings rise line by line inside masks
// - header: turns solid once content scrolls under it, steps aside while scrolling down
// Reduced motion: no transitions, no reveals (everything visible), header stays put.
import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE_INOUT = 'expo.inOut';

function initReveals() {
  const cleanups: (() => void)[] = [];
  if (reduced()) return () => {};
  const blocks = [...document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)')];
  const splits = [...document.querySelectorAll<HTMLElement>('[data-split]')];
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        io.unobserve(el);
        if (el.hasAttribute('data-split')) playSplit(el);
        else el.classList.add('is-in');
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  const made: SplitText[] = [];
  const playSplit = (el: HTMLElement) => {
    const s = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
    made.push(s);
    el.classList.add('is-split');
    gsap.from(s.lines, {
      yPercent: 110,
      duration: 1.15,
      stagger: 0.08,
      ease: 'expo.out',
      delay: parseFloat(el.dataset.delay || '0'),
      onComplete: () => s.revert(),
    });
  };
  blocks.forEach((el) => io.observe(el));
  splits.forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect(), () => made.forEach((s) => s.revert()));
  return () => cleanups.forEach((c) => c());
}

export function Motion() {
  const router = useRouter();
  const path = usePathname();
  const busy = useRef(false);
  const first = useRef(true);
  const label = useRef('');

  // header state from the ticker (no scroll listeners)
  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>('.header');
    let last = scrollY;
    let solid = false;
    let away = false;
    const tick = () => {
      const y = scrollY;
      const nextSolid = y > 24;
      if (nextSolid !== solid) { solid = nextSolid; header?.classList.toggle('is-solid', solid); }
      if (Math.abs(y - last) > 6) {
        const nextAway = !reduced() && y > 520 && y > last && !root.classList.contains('menu-is-open');
        if (nextAway !== away) { away = nextAway; root.classList.toggle('header-away', away); }
        last = y;
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  // intercept internal links: cover, navigate, uncover
  useEffect(() => {
    const curtain = document.getElementById('curtain');
    const panel = curtain?.querySelector<HTMLElement>('.curtain__panel');
    const text = curtain?.querySelector<HTMLElement>('.curtain__label');
    const onClick = async (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest('a');
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download') || a.hasAttribute('data-no-transition')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || (url.pathname === location.pathname)) return;
      e.preventDefault();
      if (busy.current) return;
      busy.current = true;
      const href = url.pathname + url.search + url.hash;
      router.prefetch(href);
      if (reduced() || !curtain || !panel || !text) { router.push(href); return; }
      label.current = (a.dataset.label || a.textContent || '').trim().split('\n')[0].slice(0, 24);
      text.textContent = url.pathname === '/' ? 'Immanuel' : label.current;
      await gsap.timeline()
        .set(curtain, { visibility: 'visible' })
        .fromTo(panel, { clipPath: 'inset(100% 0% 0% 0% round 50% 50% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0% round 0% 0% 0% 0%)', duration: 0.75, ease: EASE_INOUT })
        .fromTo(text, { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: 'expo.out' }, '-=0.3');
      router.push(href, { scroll: false });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [router]);

  // every page: reset scroll, uncover, wire reveals
  useEffect(() => {
    const curtain = document.getElementById('curtain');
    const panel = curtain?.querySelector<HTMLElement>('.curtain__panel');
    const text = curtain?.querySelector<HTMLElement>('.curtain__label');
    let off = () => {};
    const start = () => { off = initReveals(); };
    if (first.current) {
      first.current = false;
      start();
    } else {
      if (!location.hash) scrollTo(0, 0);
      document.getElementById('main')?.focus({ preventScroll: true });
      start();
      if (busy.current && curtain && panel && text && !reduced()) {
        gsap.timeline({ onComplete: () => { busy.current = false; } })
          .to(text, { yPercent: -40, autoAlpha: 0, duration: 0.35, ease: 'power3.in' })
          .to(panel, { clipPath: 'inset(0% 0% 100% 0% round 0% 0% 50% 50%)', duration: 0.8, ease: EASE_INOUT }, '-=0.1')
          .set(curtain, { visibility: 'hidden' });
      } else {
        busy.current = false;
      }
    }
    return () => off();
  }, [path]);

  return null;
}
