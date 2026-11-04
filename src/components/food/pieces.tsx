// Flat, top-down food illustrations of real Immanuel dishes. Hand-authored SVG, no raster art.
// One light from the upper left: darker crescents fall bottom-right, highlights sit top-left,
// and every piece casts the same soft shadow in world space (whatever its rotation).
// Each piece draws around (0, 0) at about 200 units across when s = 1.
import type { ReactNode } from 'react';

export const C = {
  shadow: 'rgba(38, 12, 30, 0.3)',
  plate: '#f6ecd8',
  plateWell: '#efe2c7',
  plateLine: '#e1d0ae',
  gold: '#ebb14a',
  fry: { deep: '#9a5722', shade: '#b8732b', base: '#dc9b3c', lit: '#efbd62', gloss: '#fbe3a8', crimp: '#94521f' },
  white: '#fbf6ec',
  yolk: '#f2a51c',
  yolkLit: '#ffcf4f',
  bacon: '#a8412d',
  fat: '#efc6a3',
  green: ['#244a2a', '#2f5d33', '#3f7340', '#558a49'],
  vein: '#9cc27a',
  mac: '#f0bb38',
  macDark: '#c98a1f',
  yam: '#dc6526',
  yamLit: '#f39246',
  coffee: '#3a1f12',
  sorrel: '#8c1a42',
  sorrelLit: '#b02b58',
};

// --- helpers ---------------------------------------------------------------------------------
const f = (n: number) => Math.round(n * 10) / 10;

export function rng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Smooth closed path through points (Catmull-Rom as cubic Béziers). */
export function smooth(pts: [number, number][]) {
  const n = pts.length;
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return `${d}Z`;
}

/** A wobbly round blob of radius r (rx, ry). */
export function blob(rx: number, ry: number, seed: number, n = 9, wob = 0.1) {
  const r = rng(seed);
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + (r() - 0.5) * 2 * wob;
    pts.push([Math.cos(a) * rx * k, Math.sin(a) * ry * k]);
  }
  return smooth(pts);
}

/** Deterministic specks inside an ellipse. */
function specks(seed: number, rx: number, ry: number, count: number, cx = 0, cy = 0, keep?: (x: number, y: number) => boolean) {
  const r = rng(seed);
  const out: { x: number; y: number; s: number; v: number }[] = [];
  let guard = 0;
  while (out.length < count && guard++ < count * 20) {
    const x = (r() * 2 - 1) * rx, y = (r() * 2 - 1) * ry;
    if ((x * x) / (rx * rx) + (y * y) / (ry * ry) > 1) continue;
    if (keep && !keep(x + cx, y + cy)) continue;
    out.push({ x: f(x + cx), y: f(y + cy), s: f(1 + r() * 2.2), v: r() });
  }
  return out;
}

export type Place = { x?: number; y?: number; r?: number; s?: number; i?: number };

/** Positions a piece (attribute transform) and wraps it in the animatable layer. */
export function Put({ x = 0, y = 0, r = 0, s = 1, i = 0, children }: Place & { children: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <g className="piece" style={{ ['--i' as string]: i }}>{children}</g>
    </g>
  );
}

/** The shared shadow offset, expressed in the piece's own (rotated, scaled) space. */
function sh(r = 0, s = 1, d: [number, number] = [6, 9]) {
  const a = (-r * Math.PI) / 180;
  return `translate(${f((d[0] * Math.cos(a) - d[1] * Math.sin(a)) / s)} ${f((d[0] * Math.sin(a) + d[1] * Math.cos(a)) / s)})`;
}

type Piece = Place & { id: string };

// --- the frituras ----------------------------------------------------------------------------
// Fried pieces use a radial gradient lit from the upper left, plus gloss, blisters and specks.
function FryGrad({ id, cx = '34%', cy = '28%', r = '78%', stops = FRY_STOPS }: { id: string; cx?: string; cy?: string; r?: string; stops?: [number, string][] }) {
  return (
    <radialGradient id={id} cx={cx} cy={cy} r={r}>
      {stops.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
    </radialGradient>
  );
}
const FRY_STOPS: [number, string][] = [[0, '#fbd27a'], [0.32, '#eeac44'], [0.68, '#cf7f27'], [1, '#97501a']];
const CARI_STOPS: [number, string][] = [[0, '#f6c160'], [0.35, '#df9233'], [0.75, '#b86622'], [1, '#7e3f13']];
const TORT_STOPS: [number, string][] = [[0, '#f7d58c'], [0.45, '#e6ad57'], [0.82, '#c98535'], [1, '#93531d']];

const EMP = 'M-100 0C-94-17 94-17 100 0A100 100 0 0 1-100 0Z';

export function Empanada({ id, ...p }: Piece) {
  const dots = specks(id.length * 17 + 3, 74, 38, 30, 0, 36, (x, y) => x * x + y * y < 78 * 78 && y > 4);
  const scallops = Array.from({ length: 17 }, (_, k) => (4 + k * 10.75) * (Math.PI / 180));
  return (
    <Put {...p}>
      <g transform="translate(0 -40)">
        <defs><FryGrad id={`${id}-g`} cx="38%" cy="18%" r="85%" /></defs>
        <g transform={sh(p.r, p.s)} fill={C.shadow}>
          <path d={EMP} />
          {scallops.map((a, k) => <circle key={k} cx={f(Math.cos(a) * 95)} cy={f(Math.sin(a) * 95)} r="9" />)}
        </g>
        {/* the pressed edge: a ring of scallops, a shade deeper than the body */}
        {scallops.map((a, k) => <circle key={k} cx={f(Math.cos(a) * 95)} cy={f(Math.sin(a) * 95)} r="9.5" fill="#b0631f" />)}
        {scallops.map((a, k) => <circle key={`l${k}`} cx={f(Math.cos(a) * 94 - 1.5)} cy={f(Math.sin(a) * 94 - 1.5)} r="6" fill="#e39a3a" />)}
        <clipPath id={id}><path d={EMP} /></clipPath>
        <path d={EMP} fill={`url(#${id}-g)`} />
        <g clipPath={`url(#${id})`}>
          <path d="M90 2A90 90 0 0 1-90 2" fill="none" stroke="#a85c1e" strokeWidth="16" opacity="0.35" />
          {dots.map((d, k) => (
            <g key={k}>
              <circle cx={d.x + 0.8} cy={d.y + 1} r={d.s} fill="#9a5319" opacity="0.35" />
              <circle cx={d.x} cy={d.y} r={d.s} fill={d.v > 0.7 ? '#c06f24' : '#fbd98f'} opacity={d.v > 0.7 ? 0.55 : 0.85} />
            </g>
          ))}
          <ellipse cx="-34" cy="12" rx="40" ry="13" fill="#fff1c9" opacity="0.38" transform="rotate(-6 -34 12)" />
        </g>
        {scallops.slice(1, -1).map((a, k) => (
          <line key={k} x1={f(Math.cos(a) * 82)} y1={f(Math.sin(a) * 82)} x2={f(Math.cos(a) * 92)} y2={f(Math.sin(a) * 92)} stroke="#8e4a17" strokeWidth="3.4" strokeLinecap="round" opacity="0.6" />
        ))}
        <path d="M-84-5C-50-15 40-15 80-7" fill="none" stroke="#fff0c4" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
      </g>
    </Put>
  );
}

const CARI = 'M-100 0C-72-41 72-41 100 0C72 41-72 41-100 0Z';
export function Carimanola({ id, ...p }: Piece) {
  const dots = specks(id.length * 13 + 7, 72, 22, 30, -2, -2);
  return (
    <Put {...p}>
      <defs><FryGrad id={`${id}-g`} cx="40%" cy="22%" r="80%" stops={CARI_STOPS} /></defs>
      <path d={CARI} fill={C.shadow} transform={sh(p.r, p.s)} />
      <clipPath id={id}><path d={CARI} /></clipPath>
      <path d={CARI} fill={`url(#${id}-g)`} />
      <g clipPath={`url(#${id})`}>
        {dots.map((d, k) => (
          <g key={k}>
            <circle cx={d.x + 0.8} cy={d.y + 1} r={d.s * 0.9} fill="#7e3f13" opacity="0.35" />
            <circle cx={d.x} cy={d.y} r={d.s * 0.9} fill={d.v > 0.6 ? '#a95a1d' : '#f7cf7f'} opacity="0.75" />
          </g>
        ))}
        <path d="M-46 14C-24 19 8 19 32 13M24-21C38-23 54-19 64-12M-70-6C-62-12-52-15-44-16" fill="none" stroke="#7e3f13" strokeWidth="1.8" opacity="0.45" strokeLinecap="round" />
      </g>
      <path d="M-68-17C-32-28 30-28 66-17" fill="none" stroke="#fff0c4" strokeWidth="4.5" strokeLinecap="round" opacity="0.8" />
      <ellipse cx="-30" cy="-14" rx="18" ry="5" fill="#fff6dc" opacity="0.45" transform="rotate(-6 -30 -14)" />
    </Put>
  );
}

export function Tortilla({ id, ...p }: Piece) {
  const grain = specks(id.length * 11 + 5, 58, 58, 46, -3, -4);
  const toast = specks(id.length * 7 + 9, 44, 44, 5, -2, -2);
  return (
    <Put {...p}>
      <defs><FryGrad id={`${id}-g`} cx="38%" cy="32%" r="72%" stops={TORT_STOPS} /></defs>
      <circle r="72" fill={C.shadow} transform={sh(p.r, p.s)} />
      <circle r="72" fill="#94521d" />
      <circle cx="-2" cy="-3" r="70" fill={`url(#${id}-g)`} />
      <circle cx="-3" cy="-4" r="60" fill="none" stroke="#fbe0a3" strokeWidth="1.5" opacity="0.35" />
      {toast.map((d, k) => <ellipse key={k} cx={d.x} cy={d.y} rx={f(4 + d.s * 2.2)} ry={f(3 + d.s * 1.2)} transform={`rotate(${f(d.v * 180)} ${d.x} ${d.y})`} fill="#b06424" opacity="0.4" />)}
      {grain.map((d, k) => <circle key={k} cx={d.x} cy={d.y} r={f(d.s * 0.55)} fill={d.v > 0.5 ? '#fbe2a8' : '#b8732f'} opacity="0.75" />)}
      <path d="M-58-30A64 64 0 0 1-22-60" fill="none" stroke="#fff0c4" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
    </Put>
  );
}

export function Arina({ id, ...p }: Piece) {
  const shape = blob(62, 58, id.length * 5 + 2, 8, 0.07);
  const dots = specks(id.length * 3 + 1, 44, 40, 16, -6, -6);
  return (
    <Put {...p}>
      <defs><FryGrad id={`${id}-g`} cx="36%" cy="30%" r="74%" /></defs>
      <path d={shape} fill={C.shadow} transform={sh(p.r, p.s)} />
      <clipPath id={id}><path d={shape} /></clipPath>
      <path d={shape} fill={`url(#${id}-g)`} />
      <g clipPath={`url(#${id})`}>
        {dots.map((d, k) => <circle key={k} cx={d.x} cy={d.y} r={d.s} fill={d.v > 0.6 ? '#c06f24' : '#fde3a0'} opacity="0.6" />)}
        <ellipse cx="-20" cy="-24" rx="20" ry="11" fill="#fff3cf" opacity="0.55" transform="rotate(-20 -20 -24)" />
      </g>
    </Put>
  );
}

// --- breakfast -------------------------------------------------------------------------------
export function Egg({ id, ...p }: Piece) {
  const white = blob(52, 46, id.length * 9 + 4, 10, 0.13);
  return (
    <Put {...p}>
      <path d={white} fill={C.shadow} transform={sh(p.r, p.s, [3, 5])} />
      <clipPath id={id}><path d={white} /></clipPath>
      <path d={white} fill="#e9dcc7" />
      <g clipPath={`url(#${id})`}><path d={white} fill={C.white} transform="translate(-3 -4)" /></g>
      <circle cx="6" cy="3" r="18" fill="#d98d12" />
      <circle cx="4" cy="1" r="17" fill={C.yolk} />
      <circle cx="1" cy="-2" r="11" fill={C.yolkLit} opacity="0.8" />
      <ellipse cx="-3" cy="-7" rx="5" ry="3" fill="#fff4cf" opacity="0.9" />
    </Put>
  );
}

function wave(len: number, amp: number, w: number, phase = 0) {
  const top: [number, number][] = [], bot: [number, number][] = [];
  for (let k = 0; k <= 12; k++) {
    const x = -len / 2 + (len * k) / 12;
    const y = Math.sin(k * 0.95 + phase) * amp;
    top.push([x, y - w / 2]);
    bot.push([x, y + w / 2]);
  }
  const line = (pts: [number, number][]) => pts.map((q, k) => `${k ? 'L' : 'M'}${f(q[0])} ${f(q[1])}`).join('');
  return { body: `${line(top)}${line(bot.reverse()).replace('M', 'L')}Z`, mid: (o: number) => line(top.map((q) => [q[0], q[1] + w / 2 + o])) };
}
export function Bacon({ id, ...p }: Piece) {
  const w = wave(180, 7, 30, id.length);
  return (
    <Put {...p}>
      <path d={w.body} fill={C.shadow} transform={sh(p.r, p.s, [3, 5])} strokeLinejoin="round" />
      <path d={w.body} fill={C.bacon} stroke="#7e2c1d" strokeWidth="2" strokeLinejoin="round" />
      <path d={w.mid(-5)} fill="none" stroke={C.fat} strokeWidth="5" strokeLinecap="round" opacity="0.9" />
      <path d={w.mid(7)} fill="none" stroke="#d98a6a" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <path d={w.mid(-11)} fill="none" stroke="#7e2c1d" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </Put>
  );
}

export function Sausage(p: Place) {
  return (
    <Put {...p}>
      <rect x="-48" y="-14" width="96" height="28" rx="14" fill={C.shadow} transform={sh(p.r, p.s, [3, 5])} />
      <rect x="-48" y="-14" width="96" height="28" rx="14" fill="#7d3e22" />
      <rect x="-46" y="-14" width="90" height="22" rx="11" fill="#9e5530" />
      <path d="M-34-6H30" stroke="#d08a5e" strokeWidth="3.5" strokeLinecap="round" opacity="0.65" />
      <path d="M-20-12l-8 22M0-12l-8 22M20-12l-8 22" stroke="#4f2412" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
    </Put>
  );
}

export function Pancakes({ id, ...p }: Piece) {
  const syrup = blob(34, 26, id.length * 4 + 8, 9, 0.3);
  return (
    <Put {...p}>
      <circle r="76" fill={C.shadow} transform={sh(p.r, p.s)} />
      <circle cx="7" cy="9" r="74" fill="#a8652a" />
      <circle cx="4" cy="5" r="74" fill="#c47f34" />
      <clipPath id={id}><circle r="74" /></clipPath>
      <circle r="74" fill="#d29240" />
      <g clipPath={`url(#${id})`}>
        <circle cx="-4" cy="-5" r="70" fill="#e4ad5c" />
        <circle cx="-2" cy="-2" r="48" fill="#dc9d48" opacity="0.6" />
      </g>
      <path d={syrup} fill="#8a4214" opacity="0.62" transform="translate(6 6)" />
      <path d={syrup} fill="none" stroke="#c7712c" strokeWidth="2" opacity="0.5" transform="translate(4 4) scale(0.8)" />
      <rect x="-15" y="-17" width="32" height="28" rx="6" fill="#e9cc79" transform="rotate(14)" />
      <rect x="-15" y="-19" width="30" height="25" rx="6" fill="#f8e5a6" transform="rotate(14)" />
      <path d="M-8-14h14" stroke="#fffbe8" strokeWidth="3" strokeLinecap="round" transform="rotate(14)" opacity="0.9" />
    </Put>
  );
}

export function HomeFries(p: Place) {
  const r = rng(91 + (p.i ?? 0));
  const cubes = Array.from({ length: 11 }, () => ({ x: f((r() - 0.5) * 80), y: f((r() - 0.5) * 60), a: f(r() * 90), c: ['#e2a44c', '#c9832f', '#efbe68', '#d8963f'][Math.floor(r() * 4)] }));
  return (
    <Put {...p}>
      {cubes.map((c, k) => (
        <g key={k} transform={`translate(${c.x} ${c.y}) rotate(${c.a})`}>
          <rect x="-7" y="-6" width="18" height="17" rx="5" fill={C.shadow} />
          <rect x="-9" y="-9" width="18" height="17" rx="5" fill={c.c} />
          <rect x="-7" y="-8" width="9" height="5" rx="2.5" fill={C.fry.gloss} opacity="0.5" />
        </g>
      ))}
    </Put>
  );
}

export function Toast(p: Place) {
  return (
    <Put {...p}>
      <rect x="-40" y="-38" width="80" height="78" rx="16" fill={C.shadow} transform={sh(p.r, p.s, [4, 6])} />
      <rect x="-40" y="-38" width="80" height="78" rx="16" fill="#a9622a" />
      <rect x="-33" y="-31" width="64" height="62" rx="11" fill="#e8bb72" />
      <rect x="-26" y="-24" width="48" height="46" rx="10" fill="#dca355" opacity="0.6" />
      <path d="M-40 40L40-38" stroke="#7d4518" strokeWidth="1.5" opacity="0.35" />
    </Put>
  );
}

// --- soul food -------------------------------------------------------------------------------
const STICK = 'M-74 0C-74-44-10-48 22-22C40-8 50-9 62-8L62 8C50 9 40 8 22 22C-10 48-74 44-74 0Z';
export function Drumstick({ id, ...p }: Piece) {
  const dots = specks(id.length * 21 + 1, 52, 26, 18, -26, -6);
  return (
    <Put {...p}>
      <path d={STICK} fill={C.shadow} transform={sh(p.r, p.s)} />
      <g transform={sh(p.r, p.s)} fill={C.shadow}><rect x="56" y="-7" width="28" height="14" rx="6" /><circle cx="88" cy="-8" r="10" /><circle cx="88" cy="8" r="10" /></g>
      <rect x="56" y="-7" width="28" height="14" rx="6" fill="#efe1c3" />
      <circle cx="88" cy="-8" r="10" fill="#f6ecd6" />
      <circle cx="88" cy="8" r="10" fill="#e6d5b2" />
      <defs><FryGrad id={`${id}-g`} cx="30%" cy="30%" r="75%" stops={[[0, '#f2b45a'], [0.35, '#d0812e'], [0.75, '#a55a1f'], [1, '#6f3410']]} /></defs>
      <clipPath id={id}><path d={STICK} /></clipPath>
      <path d={STICK} fill={`url(#${id}-g)`} />
      <g clipPath={`url(#${id})`}>
        <ellipse cx="-42" cy="-22" rx="16" ry="7" fill={C.fry.gloss} opacity="0.6" />
        {dots.map((d, k) => <circle key={k} cx={d.x} cy={d.y} r={d.s} fill={d.v > 0.5 ? '#7a3c15' : C.fry.lit} opacity="0.55" />)}
      </g>
    </Put>
  );
}

export function Greens(p: Place) {
  const r = rng(41 + (p.i ?? 0) * 3);
  const leaves = Array.from({ length: 9 }, (_, k) => ({ x: f((r() - 0.5) * 70), y: f((r() - 0.5) * 56), a: f(r() * 180), rx: f(24 + r() * 14), ry: f(12 + r() * 8), c: C.green[k % 4] }));
  return (
    <Put {...p}>
      <ellipse rx="66" ry="54" fill={C.shadow} transform={sh(p.r, p.s, [4, 7])} />
      <ellipse rx="64" ry="52" fill={C.green[0]} />
      {leaves.map((l, k) => (
        <g key={k} transform={`translate(${l.x} ${l.y}) rotate(${l.a})`}>
          <ellipse rx={l.rx} ry={l.ry} fill={l.c} />
          <path d={`M${-l.rx * 0.8} 0Q0 ${-l.ry * 0.3} ${l.rx * 0.8} 0`} fill="none" stroke={C.vein} strokeWidth="1.6" opacity="0.55" />
        </g>
      ))}
      <ellipse cx="-22" cy="-22" rx="16" ry="6" fill="#a7cf86" opacity="0.35" transform="rotate(-20 -22 -22)" />
    </Put>
  );
}

export function Mac(p: Place) {
  const r = rng(77 + (p.i ?? 0));
  const shape = blob(58, 48, 12 + (p.i ?? 0), 9, 0.12);
  const elbows = Array.from({ length: 26 }, () => ({ x: f((r() - 0.5) * 84), y: f((r() - 0.5) * 66), a: f(r() * 360) })).filter((e) => (e.x * e.x) / 1600 + (e.y * e.y) / 1050 < 1);
  return (
    <Put {...p}>
      <path d={shape} fill={C.shadow} transform={sh(p.r, p.s, [4, 7])} />
      <path d={shape} fill={C.macDark} />
      <path d={shape} fill={C.mac} transform="translate(-2 -3) scale(0.96)" />
      {elbows.map((e, k) => (
        <g key={k} transform={`translate(${e.x} ${e.y}) rotate(${e.a})`}>
          <path d="M-7 1A7 7 0 0 1 7 1" fill="none" stroke={C.macDark} strokeWidth="6" strokeLinecap="round" />
          <path d="M-7 -1A7 7 0 0 1 7 -1" fill="none" stroke="#f9d867" strokeWidth="4" strokeLinecap="round" />
        </g>
      ))}
      <ellipse cx="18" cy="12" rx="12" ry="7" fill="#c47a22" opacity="0.4" />
    </Put>
  );
}

export function Yams(p: Place) {
  const r = rng(63 + (p.i ?? 0));
  const chunks = Array.from({ length: 6 }, (_, k) => ({ x: f(Math.cos(k * 1.1) * 26 + (r() - 0.5) * 12), y: f(Math.sin(k * 1.1) * 20 + (r() - 0.5) * 10), d: blob(17 + r() * 5, 14 + r() * 4, 200 + k * 7, 7, 0.14) }));
  return (
    <Put {...p}>
      <ellipse rx="58" ry="46" fill="#b84c1b" opacity="0.45" />
      {chunks.map((c, k) => (
        <g key={k} transform={`translate(${c.x} ${c.y})`}>
          <path d={c.d} fill={C.shadow} transform="translate(3 5)" />
          <path d={c.d} fill="#b14a1a" />
          <path d={c.d} fill={C.yam} transform="translate(-2 -2) scale(0.9)" />
          <ellipse cx="-5" cy="-6" rx="7" ry="4" fill={C.yamLit} opacity="0.9" />
          <ellipse cx="-7" cy="-7" rx="3" ry="1.6" fill="#ffd3a1" opacity="0.9" />
        </g>
      ))}
    </Put>
  );
}

export function Chorizo(p: Place) {
  const r = rng(5 + (p.i ?? 0));
  return (
    <Put {...p}>
      <circle r="17" fill={C.shadow} transform={sh(p.r, p.s, [3, 4])} />
      <circle r="17" fill="#7e2a18" />
      <circle cx="-1" cy="-1" r="14" fill="#a7391f" />
      {Array.from({ length: 6 }, (_, k) => <circle key={k} cx={f((r() - 0.5) * 18)} cy={f((r() - 0.5) * 18)} r={f(1.5 + r() * 1.5)} fill="#eaa27f" opacity="0.85" />)}
    </Put>
  );
}

export function Plantains(p: Place) {
  const r = rng(29 + (p.i ?? 0));
  const slices = Array.from({ length: 7 }, (_, k) => ({ x: f(((k % 4) - 1.5) * 30 + (k > 3 ? 15 : 0) + (r() - 0.5) * 8), y: f((k > 3 ? 18 : -10) + (r() - 0.5) * 10), a: f(r() * 50 - 25) }));
  return (
    <Put {...p}>
      {slices.map((sl, k) => (
        <g key={k} transform={`translate(${sl.x} ${sl.y}) rotate(${sl.a})`}>
          <ellipse rx="22" ry="13" fill={C.shadow} transform="translate(3 4)" />
          <ellipse rx="22" ry="13" fill="#7f3a13" />
          <ellipse cx="-1" cy="-1" rx="18.5" ry="10.5" fill="#d07b2a" />
          <ellipse cx="-2" cy="-2" rx="12" ry="6.5" fill="#eaa748" />
          <ellipse cx="-3" cy="-2" rx="6" ry="3" fill="#f6cc72" opacity="0.9" />
          <ellipse cx="-7" cy="-5" rx="5" ry="2" fill="#ffe2a6" opacity="0.8" />
        </g>
      ))}
    </Put>
  );
}

// --- cups, glasses, plates -------------------------------------------------------------------
export function Coffee(p: Place) {
  return (
    <Put {...p}>
      <circle r="80" fill={C.shadow} transform={sh(p.r, p.s)} />
      <circle r="80" fill="#efe3cc" />
      <circle r="78" fill={C.plate} />
      <circle r="60" fill="none" stroke={C.plateLine} strokeWidth="2" />
      <g transform="rotate(32)">
        <rect x="40" y="-11" width="40" height="22" rx="11" fill={C.shadow} transform="translate(3 5)" />
        <rect x="40" y="-11" width="40" height="22" rx="11" fill="#e8dcc4" />
        <rect x="44" y="-9" width="32" height="12" rx="6" fill="#fbf6ec" />
      </g>
      <circle r="51" fill={C.shadow} transform="translate(4 6)" />
      <circle r="51" fill="#e9dcc4" />
      <circle cx="-1" cy="-1" r="50" fill="#fbf6ec" />
      <circle r="41" fill="#2a160c" />
      <circle cx="-1" cy="-1" r="39" fill={C.coffee} />
      <circle r="38" fill="none" stroke="#7c4b26" strokeWidth="4" opacity="0.75" />
      <ellipse cx="-16" cy="-17" rx="11" ry="4" fill="#ffffff" opacity="0.3" transform="rotate(-35 -16 -17)" />
    </Put>
  );
}

const DRINK: Record<string, { base: string; lit: string; ice?: string; specks?: string }> = {
  sorrel: { base: C.sorrel, lit: C.sorrelLit, ice: '#d4547e' },
  passion: { base: '#e39a1d', lit: '#f5bb3d', ice: '#f8d278', specks: '#3b2610' },
  chicheme: { base: '#dcc7a0', lit: '#eedfc1', specks: '#9a5a2b' },
  panela: { base: '#9c5418', lit: '#c0712b', ice: '#d9944e' },
};
export function Glass({ kind = 'sorrel', ...p }: Place & { kind?: keyof typeof DRINK }) {
  const d = DRINK[kind];
  const r = rng(kind.length * 31);
  return (
    <Put {...p}>
      <circle r="50" fill={C.shadow} transform={sh(p.r, p.s)} />
      <circle r="50" fill="#f3e9f6" opacity="0.22" />
      <circle r="49" fill="none" stroke="#fbf3ff" strokeWidth="2.5" opacity="0.6" />
      <circle r="42" fill={d.base} />
      <circle cx="-4" cy="-5" r="37" fill={d.lit} opacity="0.75" />
      {d.ice && [[-10, -6, 18], [12, 8, -12], [6, -16, 30]].map(([x, y, a], k) => (
        <rect key={k} x={x - 10} y={y - 10} width="20" height="20" rx="5" transform={`rotate(${a} ${x} ${y})`} fill={d.ice} opacity="0.55" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" />
      ))}
      {d.specks && Array.from({ length: 12 }, (_, k) => <circle key={k} cx={f((r() - 0.5) * 56)} cy={f((r() - 0.5) * 56)} r={f(0.8 + r())} fill={d.specks} opacity="0.7" />)}
      <path d="M-34-22A42 42 0 0 1-14-38" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.55" />
    </Put>
  );
}

export function Plate({ R = 300, ...p }: Place & { R?: number }) {
  return (
    <Put {...p}>
      <circle r={R} fill={C.shadow} transform={`translate(${f(R * 0.03)} ${f(R * 0.045)})`} />
      <circle r={R} fill="#e8dbbf" />
      <circle r={R} fill={C.plate} transform={`translate(${f(-R * 0.006)} ${f(-R * 0.008)})`} />
      <circle r={f(R * 0.93)} fill="none" stroke={C.gold} strokeWidth={f(R * 0.008)} opacity="0.75" />
      <circle r={f(R * 0.78)} fill={C.plateWell} />
      <circle r={f(R * 0.78)} fill="none" stroke={C.plateLine} strokeWidth={f(R * 0.007)} />
      <path d={`M${f(-R * 0.86)} ${f(-R * 0.3)}A${f(R * 0.9)} ${f(R * 0.9)} 0 0 1 ${f(-R * 0.3)} ${f(-R * 0.86)}`} fill="none" stroke="#ffffff" strokeWidth={f(R * 0.018)} strokeLinecap="round" opacity="0.6" />
    </Put>
  );
}

export function Fork(p: Place) {
  const d = 'M-8 -150h4v52h3v-52h3v52h3v-52h4v60c0 12-6 18-8 22v124c0 8-4 12-8 12s-8-4-8-12v-124c-2-4-8-10-8-22v-60z';
  return (
    <Put {...p}>
      <path d={d} fill={C.shadow} transform={sh(p.r, p.s, [4, 6])} />
      <path d={d} fill="#c9bba4" />
      <path d="M-1 -80v150" stroke="#f4ecdf" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    </Put>
  );
}

export function Crumbs({ seed = 3, ...p }: Place & { seed?: number }) {
  const r = rng(seed);
  return (
    <Put {...p}>
      {Array.from({ length: 22 }, (_, k) => {
        const x = f((r() - 0.5) * 220), y = f((r() - 0.5) * 160), s = f(2 + r() * 6);
        return <path key={k} d={blob(s, s * 0.7, seed + k, 5, 0.3)} transform={`translate(${x} ${y})`} fill={r() > 0.5 ? C.fry.base : C.fry.shade} opacity="0.85" />;
      })}
    </Put>
  );
}

/** Steam: wavy strokes that drift up and fade (animated in CSS). */
export function Steam({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g className="steam" transform={`translate(${x} ${y}) scale(${s})`} aria-hidden="true">
      <path d="M0 0C-12-22 12-40 0-62C-12-84 10-100 0-124" />
      <path d="M26 6C14-16 38-34 26-56C14-78 36-94 26-118" />
      <path d="M-26 8C-38-14-14-32-26-54C-38-76-16-92-26-116" />
    </g>
  );
}
