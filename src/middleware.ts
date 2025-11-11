import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Skip internationalization for portfolio routes
  if (request.nextUrl.pathname.startsWith('/portifolio')) {
    return;
  }
  
  return intlMiddleware(request);
}
 
export const config = {
  // Match all pathnames except for
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  // - portfolio routes (handled separately)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|portifolio).*)']
};