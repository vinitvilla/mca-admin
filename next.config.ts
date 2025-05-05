import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['knex'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/**', // Matches your Firebase Storage URL pattern
      },
    ],
  },
};

export default nextConfig;