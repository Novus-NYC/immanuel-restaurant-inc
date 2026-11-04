import { Gloock } from 'next/font/google';
import localFont from 'next/font/local';

// Display: Gloock (Google, OFL), self-hosted at build time by next/font.
export const display = Gloock({ weight: '400', subsets: ['latin'], variable: '--font-display', display: 'swap' });

// Text and UI: Switzer (Fontshare, FFL), self-hosted from src/fonts.
export const text = localFont({
  src: [
    { path: '../fonts/switzer-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/switzer-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/switzer-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-text',
  display: 'swap',
});
