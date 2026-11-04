import Link from 'next/link';
import { Arrow } from '@/components/Icons';
import { EmptyPlate } from '@/components/food/scenes';

export const metadata = { title: 'Page not found', description: 'This page is not on the menu at Immanuel Restaurant.' };

export default function NotFound() {
  return (
    <section className="nf">
      <div className="nf__img illo" aria-hidden="true">
        <EmptyPlate />
      </div>
      <div className="wrap grid">
        <div className="nf__copy">
          <p className="hero__kicker">Error 404</p>
          <h1 className="h-xl">Someone got to this one first.</h1>
          <p className="lede">The page you wanted is gone from the plate, crumbs and all. The rest of the frituras are still hot.</p>
          <div className="btn-row">
            <Link className="btn" href="/"><span>Back to the kitchen</span><Arrow /></Link>
            <Link className="btn btn--ghost" href="/menu"><span>See the menu</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
