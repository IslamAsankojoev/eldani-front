import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'

// import { ky } from '@/src/app/config'
import ky from 'ky'

export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
  const cookie = cookies()
  try {
    const user: UserWithToken = await ky
      .get(`${process.env.API_URL}/api/auth/google/callback${request.nextUrl.search}`)
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
}
