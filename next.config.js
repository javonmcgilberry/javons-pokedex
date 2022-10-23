/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.experiments = { ...config.experiments, ...{ topLevelAwait: true } }
    return config
  },
}

module.exports = nextConfig
