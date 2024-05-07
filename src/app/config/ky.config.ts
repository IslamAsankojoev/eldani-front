import Cookies from 'js-cookie'
import ky from 'ky'

export const kyInstance = ky.create({
  prefixUrl: '/server-api',
  headers: {
    'Content-Type': 'application/json',
  },
  retry: 0,
  hooks: {
    beforeRequest: [
      (request) => {
        if (Cookies.get('eldani.session')) {
          request.headers.set('Authorization', `Bearer ${Cookies.get('eldani.session')}`)
        }
      },
    ],
  },
})
