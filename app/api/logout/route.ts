import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
  const searchParams = new URLSearchParams(request.nextUrl.search)
  if(searchParams.get('logout')){
    const cookie = cookies()
    cookie.delete('eldani.session')
  }
  return Response.redirect(new URL(process.env.URL + '/login', request.url))
}
