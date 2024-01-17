import { NextRequest, NextResponse, userAgent } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  let patternUrl: null | URL = null
  if(url?.searchParams?.get('id')){
    patternUrl = new URL('/pattern', url)
  }
  const { device } = userAgent(request)
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
  url.searchParams.set('viewport', viewport)
  url.searchParams.set('id', '3')
  return NextResponse.rewrite(url)
}
