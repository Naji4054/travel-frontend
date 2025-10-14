import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import path from "path";

const ADMIN_PATHS = ["/dashboard", "/admin","/dashboard/packages","/dashboard/category","dashboard/location"];
const USER_PATHS = ["/auth/register","/international","/indian","/group"]

const middleware = async (req: NextRequest) => {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get("access_token")?.value
    const role = req.cookies.get("role")?.value;
    if (!token) {
        if(pathname.startsWith("/dashboard") || pathname.startsWith("/admin")){
            return NextResponse.redirect(new URL ("/login", req.url))
        }
        return NextResponse.next()
    }
     try {
        const decodedToken: any = jwt.verify(token ,process.env.JWT_SECRET_KEY!)
        if(ADMIN_PATHS.some((p)=> pathname.startsWith(p))) {
            if (role !== "admin") {
                return NextResponse.redirect(new URL("/", req.url)); // redirect non-admins
              }
        }
        if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
            if (role === "admin") {
                return NextResponse.redirect(new URL("/dashboard", req.url));
            }
            else return NextResponse.redirect(new URL("/", req.url));
          }
          return NextResponse.next()
     } catch (err) {
        console.error("JWT verification failed:", err);
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete("access_token");
        response.cookies.delete("role");
        return response;
     }

}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
  };

export default middleware


