/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['loremflickr.com', 'localhost', '192.168.101.40'],
  },
  env: {
    API_URL: process.env.REACT_APP_SERVER_URL,
    API_KEY: process.env.REACT_APP_SERVER_KEY,
  }
}

module.exports = nextConfig
