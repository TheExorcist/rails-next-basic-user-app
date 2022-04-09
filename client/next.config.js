/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    baseUrl: !!process.env.AWS_DOMAIN ? process.env.AWS_DOMAIN : 'localhost:3000'
  }
}

module.exports = nextConfig
