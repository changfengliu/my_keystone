/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-day-picker'],
  experimental: {
    esmExternals: 'loose', // 强制用 ESM 方式打包
  },
  webpack: config => {
    config.resolve.alias['react-day-picker'] = require.resolve('react-day-picker')
    return config
  },
}

module.exports = nextConfig
