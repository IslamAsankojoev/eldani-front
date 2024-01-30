/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: process.env.REACT_APP_SERVER_URL,
    API_KEY: process.env.REACT_APP_SERVER_KEY,
  },
  images: {
    domains: ['loremflickr.com', 'localhost', '192.168.101.136', '192.168.3.246', '192.168.0.101', '192.168.101.246', '192.168.101.40','fc07-77-235-23-216.ngrok-free.app'],
  },
}

module.exports = nextConfig
