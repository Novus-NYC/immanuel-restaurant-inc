// Compositions of the pieces: the hero table, four plates for "What are you hungry for?", a
// small icon set for the menu, and the empty plate for the 404.
import {
  Arina, Bacon, Carimanola, Chorizo, Coffee, Crumbs, Drumstick, Egg, Empanada, Fork, Glass, Greens,
  HomeFries, Mac, Pancakes, Plantains, Plate, Sausage, Steam, Toast, Tortilla, Yams,
} from './pieces';

type SvgProps = { className?: string; title?: string };

function Svg({ viewBox, className, title, children }: SvgProps & { viewBox: string; children: React.ReactNode }) {
  return (
    <svg viewBox={viewBox} className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} focusable="false">
      {children}
    </svg>
  );
}

/** Combo Típico: an empanada, an arina, a tortilla with chorizo and egg, coffee on the side. */
export function PanamaPlate(props: SvgProps) {
  return (
    <Svg viewBox="0 0 640 640" {...props}>
      <Plate x={300} y={310} R={265} i={0} />
      <Arina id="p-ari" x={458} y={262} r={0} s={1.0} i={1} />
      <Empanada id="p-emp" x={262} y={236} r={-12} s={1.5} i={2} />
      <Tortilla id="p-tor" x={212} y={420} r={0} s={1.15} i={3} />
      <Egg id="p-egg" x={208} y={414} r={-10} s={1.12} i={4} />
      <Chorizo x={368} y={408} i={5} s={1.35} />
      <Chorizo x={410} y={448} i={6} s={1.35} />
      <Chorizo x={352} y={462} i={7} s={1.35} />
      <Chorizo x={420} y={392} i={8} s={1.35} />
      <Chorizo x={390} y={500} i={9} s={1.35} />
      <Coffee x={552} y={552} s={0.85} i={6} />
      <Steam x={250} y={140} s={0.75} />
    </Svg>
  );
}

/** Soul food special: chicken with mac and cheese, collard greens and candied yams. */
export function SoulPlate(props: SvgProps) {
  return (
    <Svg viewBox="0 0 640 640" {...props}>
      <Plate x={310} y={310} R={265} i={0} />
      <Drumstick id="s-dr1" x={276} y={204} r={-18} s={1.38} i={1} />
      <Drumstick id="s-dr2" x={384} y={262} r={-32} s={1.26} i={2} />
      <Greens x={186} y={386} s={1.28} i={3} />
      <Mac x={318} y={452} s={1.26} i={4} />
      <Yams x={452} y={384} s={1.2} i={5} />
      <Steam x={290} y={132} s={0.75} />
    </Svg>
  );
}

/** Stanley Deluxe Breakfast: eggs, bacon and sausage, home fries, toast and pancakes. */
export function BreakfastPlate(props: SvgProps) {
  return (
    <Svg viewBox="0 0 640 640" {...props}>
      <Plate x={310} y={310} R={265} i={0} />
      <Pancakes id="b-pan" x={412} y={224} s={1.22} i={1} />
      <Egg id="b-eg1" x={204} y={222} r={-8} s={1.12} i={2} />
      <Egg id="b-eg2" x={262} y={336} r={30} s={1.06} i={3} />
      <Toast x={486} y={350} r={14} s={0.86} i={4} />
      <Bacon id="b-ba1" x={196} y={440} r={-24} s={0.94} i={5} />
      <Bacon id="b-bac" x={224} y={480} r={-24} s={0.94} i={6} />
      <Sausage x={374} y={392} r={-12} s={0.98} i={7} />
      <Sausage x={390} y={432} r={-12} s={0.98} i={8} />
      <HomeFries x={404} y={508} s={1.12} i={9} />
      <Steam x={412} y={124} s={0.7} />
    </Svg>
  );
}

/** Drinks: sorrel, chicheme, passion fruit and panela on a tray. */
export function DrinksTray(props: SvgProps) {
  return (
    <Svg viewBox="0 0 640 640" {...props}>
      <Plate x={318} y={318} R={268} i={0} />
      <Glass kind="sorrel" x={222} y={222} s={1.48} i={1} />
      <Glass kind="chicheme" x={414} y={224} s={1.48} i={2} />
      <Glass kind="passion" x={222} y={414} s={1.48} i={3} />
      <Glass kind="panela" x={414} y={414} s={1.48} i={4} />
    </Svg>
  );
}

/** 404: someone got here first. */
export function EmptyPlate(props: SvgProps) {
  return (
    <Svg viewBox="0 0 800 800" {...props}>
      <Plate x={400} y={400} R={320} i={0} />
      <ellipse cx="380" cy="380" rx="120" ry="70" fill="#e3c98f" opacity="0.45" transform="rotate(-12 380 380)" />
      <Crumbs x={392} y={392} seed={11} i={1} />
      <Fork x={600} y={470} r={28} s={1.15} i={2} />
    </Svg>
  );
}

// Small icons for the menu group headers (no plate, one piece each).
export const MenuIcons: Record<string, (p: SvgProps) => React.ReactElement> = {
  panama: (p) => <Svg viewBox="-120 -80 240 160" {...p}><Empanada id="mi-emp" s={1} /></Svg>,
  breakfast: (p) => <Svg viewBox="-80 -70 160 140" {...p}><Egg id="mi-egg" s={1.2} /></Svg>,
  plates: (p) => <Svg viewBox="-80 -70 160 140" {...p}><Greens s={1} /></Svg>,
  family: (p) => <Svg viewBox="-110 -70 220 140" {...p}><Drumstick id="mi-dr" s={1} /></Svg>,
  sides: (p) => <Svg viewBox="-110 -60 220 120" {...p}><Plantains s={1} /></Svg>,
  drinks: (p) => <Svg viewBox="-70 -70 140 140" {...p}><Glass kind="sorrel" s={1.2} /></Svg>,
};
