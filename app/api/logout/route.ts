import {cookies} from 'next/headers'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest ) {
  const cookie = cookies()
  console.log('delete token')
  cookie.delete('token')

  return Response.redirect(new URL(process.env.URL + '/login', request.url))
}