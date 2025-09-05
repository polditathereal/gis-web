/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gis-web.b-cdn.net',
        port: '',
        pathname: '/**',
      }
    ],
  },
}



module.exports = nextConfig
