/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: [
      'hebbkx1anhila5yf.public.blob.vercel-storage.com'
    ],
    unoptimized: true
  },
  distDir: '.next',
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  }
}

module.exports = nextConfig 