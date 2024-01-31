import { NextRequest, NextResponse, userAgent } from 'next/server'

export function middleware(request: NextRequest) {
  const cookie = request.cookies
  const url = request.nextUrl
  const { device } = userAgent(request)
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
  url.searchParams.set('viewport', viewport)


  // routes guarded by this middleware
  if(url.pathname.startsWith('/profile')) {
    if(!cookie.has('token')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  if(url.pathname.startsWith('/login')) {
    if(cookie.has('token')) {
      return NextResponse.redirect(new URL('/profile', request.url))
    }
  }
  return NextResponse.rewrite(url)
}
