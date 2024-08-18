import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

export function middleware(request: NextRequest) {
  let token = request.cookies.get('token')
  if (!token?.value) {
    return NextResponse.redirect('/login')
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next|static|public|favicon.ico|register|login|.*\.svg).*)',
}
