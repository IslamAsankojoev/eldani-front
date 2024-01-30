import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'

import { ky } from '@/src/app/config'
import { decode } from '@/src/shared'

export async function GET(request: NextRequest) {
  const cookie = cookies()
  try {
    const user: any = await ky
      .get(`auth/google/callback`, {
        searchParams: request.nextUrl.searchParams,
      })
      .json()
    cookie.set({
      name: 'token',
      value: user?.jwt,
      secure: true,
      expires: new Date(decode(user?.jwt)?.payload?.exp * 1000),
    })
  } catch (e) {
    console.log(e)
  }

  return new Response(null, {
    status: 302,
    headers: {
      location: '/',
      'set-cookie': cookie.toString(),
    },
  })
}
