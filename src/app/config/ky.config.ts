import ky from 'ky'

export const kyInstance = ky.create({
  prefixUrl: process.env.API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
})