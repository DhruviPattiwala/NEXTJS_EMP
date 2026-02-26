import { NextResponse } from 'next/server';
 import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const {pathname}  = request.nextUrl;
      if (pathname == '/LoginForm') {
        return NextResponse.next();
      }
    if (!token) {
        return NextResponse.redirect(new URL('/LoginForm', request.url));
    }
    return NextResponse.next(); 
}


export const config = {
    matcher: [
        '/((?!api|_next|favicon.ico).*)',
    ],
};

