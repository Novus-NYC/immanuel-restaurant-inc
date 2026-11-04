import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Motion } from '@/components/Motion';
import { site } from '@/data/site';
import { display, text } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Panamanian and soul food in East New York`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: './' },
  openGraph: { type: 'website', siteName: site.name, locale: 'en_US', images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Immanuel Restaurant: a heavenly taste of Panama and soul food in East New York' }] },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#170b1c', colorScheme: 'dark' };

// Before first paint: .js, and .motion when the visitor has not asked for reduced motion.
// Hidden-before-reveal styles and entrance animations only apply under these flags.
const flags = `(function(){var d=document.documentElement;d.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('motion')})()`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  telephone: site.phone.e164,
  slogan: site.tagline,
  servesCuisine: site.cuisines,
  foundingDate: '2018-06',
  founder: { '@type': 'Person', name: site.owner.name },
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.streetLong,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.zip,
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: site.address.geo.lat, longitude: site.address.geo.lng },
  hasMenu: `${site.url}/menu`,
  openingHoursSpecification: site.hours.filter((h) => h.open).map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: `https://schema.org/${h.schemaDay}`,
    opens: h.open,
    closes: h.close,
  })),
  potentialAction: { '@type': 'OrderAction', target: site.order.primary.href },
  sameAs: [site.instagram.href],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: flags }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <div id="curtain" aria-hidden="true">
          <div className="curtain__panel"><span className="curtain__label" /></div>
        </div>
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
        <Motion />
      </body>
    </html>
  );
}
