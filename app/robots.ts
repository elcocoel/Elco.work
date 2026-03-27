import type { MetadataRoute } from 'next';

const host = 'https://elco.work';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${host}/sitemap.xml`,
  };
}
