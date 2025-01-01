import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isMobileDevice } from './app/utils/deviceDetection'

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  
  // デバイス判定のロジックをここで実行
  const isMobile = /iPhone|Android|Mobile|webOS/i.test(userAgent);

  // PCからのアクセスの場合は403ページにリダイレクト
  if (!isMobile) {
    return NextResponse.redirect(new URL('/403', request.url))
  }

  return NextResponse.next()
}

// 特定のパスに対してのみミドルウェアを実行
export const config = {
  matcher: ['/', '/result']
} 