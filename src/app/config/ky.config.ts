import Cookies from 'js-cookie'
import ky from 'ky'

export const kyInstance = ky.create({
  prefixUrl: process.env.API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const kyAuth = kyInstance.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        const token = Cookies.get('token')
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  }
})