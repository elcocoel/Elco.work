import type { MetadataRoute } from 'next';
import { CASE_STUDIES_V3 } from '@/lib/caseStudiesv3';

const host = 'https://elco.work';

const staticPaths = [
  '',
  '/about',
  '/case-studies',
  '/deck',
  '/framework',
  '/ost',
  '/gnosis/evrodeployment',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: p === '' ? `${host}/` : `${host}${p}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: p === '' ? 1 : 0.7,
  }));

  for (const cs of CASE_STUDIES_V3) {
    entries.push({
      url: `${host}/case-studies/${cs.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  return entries;
}
