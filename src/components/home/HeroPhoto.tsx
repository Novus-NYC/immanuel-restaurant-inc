'use client';
// The hero photo, served as a plate: a circular crop of the restaurant's own empanada photo, with
// their logo line turning slowly around it. On load the plate opens from the centre while the
// photo settles; at rest it drifts (Ken Burns) under a soft gold halo; the photo leans away from
// the pointer. All motion lives in CSS and stops under reduced motion.
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const RING = 'Where you experience a heavenly taste • Since 2018 • Where you experience a heavenly taste • Since 2018 • ';

export function HeroPhoto({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let tx = 0, ty = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / innerWidth) * 2 - 1;
      ty = (e.clientY / innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.setProperty('--mx', tx.toFixed(3));
        el.style.setProperty('--my', ty.toFixed(3));
      });
    };
    addEventListener('pointermove', onMove, { passive: true });
    return () => { removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="hp" ref={ref}>
      <div className="hp__halo" aria-hidden="true" />
      <svg className="hp__ring" viewBox="0 0 400 400" aria-hidden="true">
        <defs><path id="hp-ring-path" d="M200 200m-186 0a186 186 0 1 1 372 0a186 186 0 1 1-372 0" /></defs>
        <circle cx="200" cy="200" r="172" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
        <text><textPath href="#hp-ring-path" startOffset="0" textLength="1162" lengthAdjust="spacing">{RING}</textPath></text>
      </svg>
      <figure className="hp__plate">
        <div className="hp__img">
          <Image src={src} alt={alt} fill priority sizes="(max-width: 900px) 92vw, min(46rem, 50vw)" quality={82} style={{ objectFit: 'cover' }} />
        </div>
      </figure>
      <p className="hp__sticker" aria-hidden="true"><span>Fried</span><span>to order</span></p>
    </div>
  );
}
