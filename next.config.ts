import type { NextConfig } from "next";

import createNextIntlPlugin from 'next-intl/plugin';
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http', // Use 'http' for your local Strapi instance
        hostname: 'localhost', // The hostname of your Strapi server
        port: '1337', // The port your Strapi server is running on
        pathname: '/uploads/**', // This allows any path under /uploads/
      },
      // Add other remote patterns here if you have images from other domains (e.g., CDN, cloud storage)
    ],
  },
};



const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
