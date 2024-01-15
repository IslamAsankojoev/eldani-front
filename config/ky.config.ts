import ky from 'ky'

export const kyInstance = ky.create({
  prefixUrl: process.env.API_URL,
})