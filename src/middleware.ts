import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware" //most important line if we need middleware for entire site

import { getToken } from "next-auth/jwt" //if we need token from anywhere from the site


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const token = await getToken({req: request}) //getting token using gettoken function
    const url = request.nextUrl //which url we are in now

    //defining pages we can access when we got the token
    if(token && 
        (
            url.pathname.startsWith('/sign-up') || url.pathname === '/'
        )
    ){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }


    if(!token && (url.pathname.startsWith('/dashboard') || url.pathname.startsWith("/book"))){
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
    
}

// See "Matching Paths" below to learn more
export const config = {  //config file defines as where we want our middleware to run
    matcher: [
        '/sign-up',
        '/',
        '/dashboard/:path*', //means every path where dashboard in included 
        '/book/:path*'
    ]
}