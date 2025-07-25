import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
 const path = request.nextUrl.pathname

 const ispublishpath = path === '/login' || path === '/signup' || path === '/verifyemail'

 const token = request.cookies.get('token')?.value || ''

 if (ispublishpath && token) {    
     return NextResponse.redirect(new URL ('/',request.url))
    }

    if (!ispublishpath && !token) { 
        return NextResponse.redirect(new URL('login',request.url))
    }
 }



 
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/verifyemail'
  ]
}