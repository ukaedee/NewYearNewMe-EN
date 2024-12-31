import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isMobile } from './app/lib/deviceDetection'

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  
  // 403ページへのアクセスは常に許可
  if (request.nextUrl.pathname === '/403') {
    return NextResponse.next()
  }

  // モバイル以外のデバイスは403ページにリダイレクト
  if (!isMobile(userAgent)) {
    return NextResponse.redirect(new URL('/403', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/result/:path*']
} 