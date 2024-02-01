import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'

import { ky } from '@/src/app/config'

export async function GET(request: NextRequest) {
  const cookie = cookies()
  try {
    const user: UserWithToken = await ky
      .get(`auth/google/callback`, {
        searchParams: request.nextUrl.searchParams,
      })
      .json()
    if (user) {
      const expires: any = (jwtDecode(user.jwt).exp as number) * 1000
      cookie.set('token', user.jwt, { expires: new Date(expires) })
    }
  } catch (e) {
    throw e
  }

  return new Response(null, {
    status: 302,
    headers: {
      location: '/login',
      'set-cookie': cookie.toString(),
    },
  })
  // return new Response('12')
}
