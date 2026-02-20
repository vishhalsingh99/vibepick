import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest){
    const {pathname} = req.nextUrl;

    const publicRoutes = ['/login', '/register', '/api/auth', '/favicon.ico', '/_next']
    if(publicRoutes.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    const token = await getToken({req, secret: process.env.AUTH_SECRET});

    console.log('Token:', token);
    console.log(req.url);

    if(!token){
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('callbackUrl', req.url);
        return NextResponse.redirect(loginUrl);
    }

    const role = token?.role as string;

    if(pathname.startsWith("/user") && role!=="user"){
        return NextResponse.redirect(new URL("/unauthorized", req.url))
    }
    else if(pathname.startsWith("/admin") && role !=="admin"){
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    else if(pathname.startsWith("/delivery-boy") && role!=="deliveryBoy"){
        return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    return NextResponse.next();
} 


export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}