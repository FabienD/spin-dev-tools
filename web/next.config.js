/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  output: 'export',
  distDir: 'dist',
}

module.exports = nextConfig
