/** @type {import('next').NextConfig} */
const SERVER_API_URL =
  process.env.REACT_APP_MODE === 'development'
    ? process.env.REACT_APP_SERVER_URL_DEV
    : process.env.REACT_APP_SERVER_URL_PROD
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  env: {
    API_URL: SERVER_API_URL,
    API_KEY: process.env.REACT_APP_SERVER_KEY,
    URL: process.env.REACT_APP_CLIENT_URL,
    MODE: process.env.REACT_APP_MODE,
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
      '192.168.58.246',
    ],
  },
  rewrites: async () => {
    return [
      {
        source: '/server-api/:path*',
        destination: `${SERVER_API_URL}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${SERVER_API_URL}/uploads/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
