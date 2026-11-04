// Every business fact on the site lives here (menu items live in ./menu.ts).
// Source: raw messy data/Immanuel_Restaurant_Research_Brief.md (compiled Nov 3, 2026),
// plus the client note "a more professional and yummy feel".
//
// TO CONFIRM WITH THE OWNER (also listed in the hand-off report):
// - hours: the brief's "most consistent" set is used; their 2024 Instagram graphic says 6 AM on weekdays
// - owner first name: Yonayka (her own Instagram) vs Yonaika / Jonayka elsewhere
// - production domain: immanuelrest.com is assumed (the old WordPress site is down)
// - logo: no file was available; the wordmark is set in type until a vector logo is supplied
// - photography: none available; scene stills are rendered by the site's own shader
// - prices: online-ordering prices captured Nov 3, 2026; in-store prices were not found

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type Hours = { day: Day; short: string; open?: string; close?: string; schemaDay: string };

export const site = {
  name: 'Immanuel Restaurant',
  legalName: 'Immanuel Restaurant INC',
  shortName: 'Immanuel',
  url: 'https://immanuelrest.com', // assumed production domain, confirm before launch
  since: 'June 2018',
  sinceYear: 2018,
  tagline: 'Where you experience a heavenly taste',
  awning: ['American', 'Spanish', 'Soul Food'],
  description:
    'Panamanian frituras, soul food plates and breakfast from 7 AM at 799 Stanley Avenue in East New York, Brooklyn. Chef Yonayka Bryant Green, since 2018.',
  cuisines: ['Panamanian', 'Soul Food', 'Latin American', 'Caribbean', 'American', 'Breakfast'],

  phone: { display: '(347) 240-4703', href: 'tel:+13472404703', e164: '+1-347-240-4703' },
  address: {
    street: '799 Stanley Ave',
    streetLong: '799 Stanley Avenue',
    city: 'Brooklyn',
    region: 'NY',
    zip: '11207',
    neighborhood: 'East New York',
    cross: 'at Ashford Street',
    geo: { lat: 40.6614295, lng: -73.8796269 },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Immanuel+Restaurant+799+Stanley+Ave+Brooklyn+NY+11207',
  },

  // Brief, section 2: Restaurantji, Yelp and DoorDash agree on this set. Confirm with the owner.
  hours: [
    { day: 'Monday', short: 'Mon', open: '07:00', close: '19:00', schemaDay: 'Monday' },
    { day: 'Tuesday', short: 'Tue', open: '07:00', close: '19:00', schemaDay: 'Tuesday' },
    { day: 'Wednesday', short: 'Wed', open: '07:00', close: '17:00', schemaDay: 'Wednesday' },
    { day: 'Thursday', short: 'Thu', open: '07:00', close: '19:00', schemaDay: 'Thursday' },
    { day: 'Friday', short: 'Fri', open: '07:00', close: '19:00', schemaDay: 'Friday' },
    { day: 'Saturday', short: 'Sat', open: '07:00', close: '19:00', schemaDay: 'Saturday' },
    { day: 'Sunday', short: 'Sun', schemaDay: 'Sunday' },
  ] as Hours[],
  hoursNote: 'Online orders close about 20 minutes before the kitchen does.',

  order: {
    primary: { label: 'Order online', href: 'https://order.online/store/397994/', note: 'Pickup or delivery, ordered direct' },
    channels: [
      { label: 'DoorDash', href: 'https://www.doordash.com/en-US/store/immanuel-restaurant-brooklyn-397994' },
      { label: 'Grubhub', href: 'https://www.grubhub.com/restaurant/immanuel-restaurant-799-stanley-ave-brooklyn/858134' },
      { label: 'Uber Eats', href: 'https://postmates.com/store/immanuel-east-new-yorks/GFiJO40CQxOB-VPUFAqleQ' },
    ],
  },

  instagram: { handle: '@immanuel_restaurant', href: 'https://www.instagram.com/immanuel_restaurant/' },

  amenities: ['Dine in', 'Take out', 'Pickup', 'Delivery', 'Wheelchair accessible entrance and seating'],

  owner: {
    name: 'Yonayka Bryant Green',
    first: 'Yonayka',
    role: 'Chef and owner',
  },

  ratings: [
    { platform: 'Google', score: '4.4', count: '111 reviews' },
    { platform: 'Restaurantji', score: '4.4', count: '67 ratings' },
    { platform: 'DoorDash', score: '4.3', count: '400+ ratings' },
  ],
  ratingsAsOf: 'November 2026',

  honors: [
    {
      year: '2026',
      title: 'Brooklyn Chamber of Commerce small business grant',
      detail: 'Awarded in partnership with Cross River Bank, announced October 28, 2026.',
    },
    {
      year: '2025',
      title: 'Panamanian Parade honoree, Orgullo Panameño',
      detail: 'Recognized by the Day of Independence Committee of Panamanians in New York.',
    },
  ],
} as const;

// Chef's story. Source: Panamanian Parade biography (Oct 4, 2025) and the restaurant's Instagram.
// Birth date and children's names are in the source and deliberately left out.
export const story = {
  chapters: [
    {
      label: 'Colón, Panama',
      title: 'It started in a convent kitchen.',
      text: 'Yonayka Bryant Green was born in Colón, the fourth of nine children. At eight she went to a boarding school run by nuns. She found the kitchen there, and by nine she was cooking for her classmates.',
    },
    {
      label: 'California, then New York',
      title: 'She learned the business first.',
      text: 'She moved to the United States in 2006, spent time in California, then settled in New York City. She worked in restaurants and learned how a kitchen runs before she opened her own.',
    },
    {
      label: 'Stanley Avenue, June 2018',
      title: 'Then she opened the door on Stanley.',
      text: 'Immanuel opened at 799 Stanley Avenue in June 2018: Panamanian food, soul food and a full breakfast counter, six days a week, for East New York and anyone willing to drive in for it.',
    },
  ],
  service:
    'She credits those school years with the discipline, resilience and sense of service she brings to her own kitchen. For more than a decade she has also sponsored a child in Colón through the Padrino Empresario program.',
  name: {
    title: 'The name on the awning',
    text: 'Immanuel means “God with us.” Faith is part of how the restaurant describes itself, from the name to the line on the logo: where you experience a heavenly taste.',
  },
};

// Paraphrased from public reviews (brief, section 5.2). Not verbatim quotes: never wrap in quote marks.
export const praise = [
  { dish: 'Cod with fried bread', said: 'Had it for breakfast and called it the best fish she has had.', who: 'Ornella A.', where: 'Google' },
  { dish: 'Collard greens', said: 'A Dominican diner who loves soul food: the best greens he had tasted in a long time.', who: 'Marcos W.', where: 'Google' },
  { dish: 'Beans and rice with jerk chicken', said: 'She and her husband drive in from Long Island for it.', who: 'Nirvanha N.', where: 'Restaurantji' },
  { dish: 'Tortillas, empanadas, chicheme', said: 'Reminded her of home. Her favorite place to eat when she visits New York.', who: 'Thaysha B.', where: 'Restaurantji' },
  { dish: 'Mangú con salami', said: 'A hidden gem in East New York, with family-like service and generous portions.', who: 'Nelly N.', where: 'Restaurantji' },
  { dish: 'Mac and cheese, candied yams', said: 'Good for vegetarians: the best mac and cheese, and get the yams on the platter.', who: 'Sahil K.', where: 'Restaurantji' },
];

export const nav = [
  { href: '/menu', label: 'Menu' },
  { href: '/story', label: 'Story' },
  { href: '/visit', label: 'Visit' },
] as const;

// "7:00" -> "7 AM", "17:00" -> "5 PM", "18:40" -> "6:40 PM". No leading zeroes in visible numbers.
export function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hr = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hr}:${String(m).padStart(2, '0')} ${suffix}` : `${hr} ${suffix}`;
}

export function hoursLabel(h: Hours) {
  return h.open && h.close ? `${formatTime(h.open)} to ${formatTime(h.close)}` : 'Closed';
}
