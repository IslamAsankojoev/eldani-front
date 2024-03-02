/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: false,
  env: {
    API_URL: process.env.REACT_APP_SERVER_URL,
    API_KEY: process.env.REACT_APP_SERVER_KEY,
    URL: process.env.REACT_APP_CLIENT_URL,
  },
  images: {
    domains: [
      'loremflickr.com',
      'localhost',
      '192.168.101.136',
      '192.168.3.246',
      '192.168.0.101',
      '192.168.101.246',
      '192.168.101.40',
      'eldani-3333ab7cc275.herokuapp.com',
      '192.168.159.246',
      '192.168.0.106',
    ],
  },
  trailingSlash: true,
}

module.exports = nextConfig
