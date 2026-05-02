import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect admin routes
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    // In a real app, you would verify the token here via an Edge Function
    // For now, we allow the request and let the component/API check validity
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
