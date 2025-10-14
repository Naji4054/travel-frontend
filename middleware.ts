
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const ADMIN_PATHS: string[] = ["/dashboard", "/admin","/dashboard/packages","/dashboard/category","dashboard/location"];
const USER_PATHS: string[] = [];
const PUBLIC_PATHS : string[] = ["/", "/login", "/register", "/international", "/indian", "/group"];

const middleware = async (req: NextRequest) => {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get("access_token")?.value
    const role = req.cookies.get("role")?.value;
   
    //  Public pages are always allowed
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
    // if no token
    if(!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    } else {
        // logined user 
        if (ADMIN_PATHS.some((path)=> pathname.startsWith(path))){
            
            if( role === 'admin'){
                // if its admin allow admin paths 
                return NextResponse.next();
            } else {
                // if role is anything other than admin show unauthorised page 
                return NextResponse.rewrite(new URL("/unauthorized", req.url));
            }
        }
        // if users with role NOT admin access user paths 
        if(USER_PATHS.some((path)=> pathname.startsWith(path))){
            if( role !== 'admin'){
                return NextResponse.next();
            }
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        // all pages other than the routes mentioned in admin paths and userpaths are alllowed to proceed normally
        return NextResponse.next();
    }
    
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
  };

export default middleware


