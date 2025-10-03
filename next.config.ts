import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sturmproject.ru',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
}

export default nextConfig
