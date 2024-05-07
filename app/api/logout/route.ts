import { cookies } from 'next/headers'
import {NextResponse, type NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
  const url = request.url
  const cookie = cookies()
  cookie.delete('eldani.session')
  return Response.redirect(new URL(process.env.URL + '/login', request.url))
}
