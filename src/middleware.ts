// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host')?.split(':')[0] || ''
  const isAdminSubdomain = hostname === 'admin.localhost';

  if (isAdminSubdomain) {
    return NextResponse.rewrite(new URL(`/admin${url.pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};