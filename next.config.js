const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Served static assets must not be packed into Node serverless bundles (Vercel 300MB cap).
   */
  outputFileTracingExcludes: {
    '*': [
      './content/**/*',
      // Served as static files; must not be packed into Node serverless bundles (Vercel 300MB cap).
      './public/project-media/**/*',
      './public/assets/**/*',
      './public/ost/**/*',
      './public/mission-research/**/*',
      './public/Illustration Iteration Temp/**/*',
      // Stale `next export` / static output; never needed at runtime for App Router server.
      './out/**/*',
    ],
  },
  /** Keep googleapis out of unrelated route bundles; calendar API routes still resolve it at runtime. */
  serverExternalPackages: ['googleapis'],
  // output: 'export' removed so /api/calendar/* routes work (scheduler + lead capture)
  images: {
    unoptimized: true,
    localPatterns: [
      { pathname: '/project-media/**' },
      { pathname: '/ost/**' },
      { pathname: '/mission-research/**' },
    ],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
  /** Next 16 defaults to Turbopack for build; keep `@` alias in sync with webpack-era setup. */
  turbopack: {
    resolveAlias: {
      '@': path.resolve(__dirname),
    },
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig;
