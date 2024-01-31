import {cookies} from 'next/headers'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest ) {
  const cookie = cookies()
  console.log('delete token')
  cookie.delete('token')

  return new Response(null, {
    status: 302,
    headers: {
      location: '/login',
      'set-cookie': cookie.toString(),
    },
  })
}