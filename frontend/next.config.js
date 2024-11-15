/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'hebbkx1anhila5yf.public.blob.vercel-storage.com'
    ],
    unoptimized: true
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  distDir: '.next'
}

module.exports = nextConfig 