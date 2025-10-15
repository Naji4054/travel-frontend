
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const ADMIN_PATHS: string[] = ["/dashboard", "/admin","/dashboard/packages","/dashboard/category","dashboard/location"];
const USER_PATHS: string[] = [];
const PUBLIC_PATHS : string[] = ["/", "/login", "/register", "/international", "/indian", "/group"];


const middleware = async (req: NextRequest) => {
    const { pathname } = req.nextUrl;
    // const token = req.cookies.get("access_token")?.value
    // const role = req.cookies.get("role")?.value;

    console.log(pathname, 'at')
    const cookieStore = cookies()
    const token = (await cookieStore).get('access_token')?.value
    const role = (await cookieStore).get('role')?.value
    
    if (!token && role !== 'admin' && ADMIN_PATHS.includes(pathname)) {

        return NextResponse.redirect(new URL("/loign", req.url));
    } 

    if (!token && role !== 'user' && USER_PATHS.includes(pathname)) {

        return NextResponse.redirect(new URL("/loign", req.url));
    }

    if (role !== 'admin' && ADMIN_PATHS.includes(pathname)) {

        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (role !== 'user' && USER_PATHS.includes(pathname)) {

        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    NextResponse.next()
    
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
  };

export default middleware






