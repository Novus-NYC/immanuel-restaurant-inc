import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/menu', '/story', '/visit'].map((path) => ({ url: `${site.url}${path === '/' ? '' : path}`, changeFrequency: 'monthly', priority: path === '/' ? 1 : 0.8 }));
}
