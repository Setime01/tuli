/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en-US", "fr", "nl-NL"],
    defaultLocale: "en-US",
  },
  images: {
    dangerouslyAllowSVG: true, // this is to allow the FALLBACK_PROFILE_IMAGEURL to work properlly since it injects svg
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tulibucket.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "source.boringavatars.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/auth/login",
        permanent: true,
      },
    ];
  },
  // serwist: {
  //   cacheRoutes: [
  //     { url: '/dashboard', strategy: 'CacheFirst' },      // Cache the homepage
  //     { url: '/profile', strategy: 'CacheFirst' }, // Cache the about page
  //     { url: '/dashboard/settings', strategy: 'CacheFirst' } // Cache the contact page
  //   ],
  // },
};

// const withPWA = require('next-pwa')({
//   dest: "public", // Destination directory for the PWA files
//   disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
//   register: true, // Register the PWA service worker
//   skipWaiting: true, // Skip waiting for service worker activation
// });

// module.exports = withPWA(nextConfig);

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

/** @type {(phase: string, defaultConfig: import("next").NextConfig) => Promise<import("next").NextConfig>} */
module.exports = async (phase) => {

  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = (await import("@serwist/next")).default({
      // Note: This is only an example. If you use Pages Router,
      // use something else that works, such as "service-worker/index.ts".
      swSrc: "src/utils/sw.ts",
      swDest: "public/sw.js",
    });
    return withSerwist(nextConfig);
  }

  return nextConfig;
};