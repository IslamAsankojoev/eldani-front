import Cookies from 'js-cookie'
import ky from 'ky'

export const kyInstance = ky.create({
  prefixUrl: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  retry: 0,
  hooks: {
    beforeRequest: [
      (request) => {
        if (Cookies.get('token')) {
          request.headers.set('Authorization', `Bearer ${Cookies.get('token')}`)
        }
      },
    ],
  },
})
