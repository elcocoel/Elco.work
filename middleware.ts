import { NextResponse, type NextRequest } from 'next/server';

/**
 * Marketing site middleware: host rewrites only (no admin/client auth).
 * Harness 3.5 lives in a separate repo.
 *
 * One Shared Truth: rewrite onesharedtruth.com (and www) to /ost.
 */
export function middleware(request: NextRequest) {
  const host = request.nextUrl.hostname;
  const path = request.nextUrl.pathname;

  if (host === 'onesharedtruth.com' || host === 'www.onesharedtruth.com') {
    const url = request.nextUrl.clone();
    url.pathname =
      path === '/' ? '/ost' : path.startsWith('/ost') ? path : `/ost${path}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
