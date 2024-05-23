import ky from 'ky'
import { NextRequest, NextResponse, userAgent } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookie = request.cookies
  const url = request.nextUrl
  const { device } = userAgent(request)
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
  url.searchParams.set('viewport', viewport)
  const user: User = (await ky
    .get('https://eldani.shop:8000/api/users/me', {
      headers: {
        Authorization: `Bearer ${cookie.get('eldani.session')?.value}`,
      },
    })
    .json()
    .catch(() => null)) as User
  // routes guarded by this middleware
  if (url.pathname.startsWith('/me')) {
    if (!user?.id) {
      return NextResponse.redirect(new URL('/api/logout', request.url))
    }
  }
  if (url.pathname.startsWith('/login')) {
    if (user?.id) {
      return NextResponse.redirect(new URL('/me/profile', request.url))
    }
  }
}
