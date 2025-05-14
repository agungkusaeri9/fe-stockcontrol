import { NextRequest, NextResponse } from "next/server";

// Define public paths that don't require authentication
const publicPaths = [
  '/',
  '/auth/signin',
  '/auth/signup',
  '/auth/forgot-password',
  '/auth/reset-password',
];

// Define admin paths that require authentication
const adminPaths = [
  '/dashboard',
  '/users',
  '/purchase-requests',
  '/purchase-orders',
  '/spareparts',
  '/machines',
  '/departments',
  '/racks',
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token");

  // Allow access to public paths
  if (publicPaths.includes(pathname)) {
    // If user is already authenticated, redirect to dashboard
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // Check authentication for admin paths
  if (adminPaths.some(path => pathname.startsWith(path))) {
    if (!token) {
      // Redirect to login if no token
      const url = new URL("/auth/signin", req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Default behavior for other paths
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 