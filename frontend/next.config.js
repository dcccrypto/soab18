/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tokenomics-page',
        destination: '/tokenomics',
        permanent: true,
      },
      {
        source: '/burns-page',
        destination: '/burns',
        permanent: true,
      },
      {
        source: '/soba-whitepaper',
        destination: '/whitepaper',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig 