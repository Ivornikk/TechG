import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";


export function middleware(req) {
    if (req.nextUrl.pathname.startsWith('/admin')) {
        const token = jwtDecode(req.cookies.get('token')?.value, process.env.SECRET_KEY)
        const role = token.role

        if (role != 'ADMIN') {
            return NextResponse.redirect(new URL('/', req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*']
}