import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

const sensitiveRoutes = [
  "/trips",
  "/reservations",
  "/properties",
  "/favorites",
];

export default withAuth(
  async function middleware(req) {
    // get the current pathname
    const pathname = req.nextUrl.pathname
    const isAuth = await getToken({req});

    const isAccessingSensitiveRoutes = sensitiveRoutes.some(route => pathname.startsWith(route));

    // if user is not authenticated and trying to access a sensitive route
    if (!isAuth && isAccessingSensitiveRoutes) {
      return NextResponse.redirect(new URL("/", req.url))
      // req.url is a base url e.g localhost:3000
    }
    
  }, {
    callbacks : {
      async authorized() {
        return true
      }
    }
  }
)

export const config = {
  matcher : sensitiveRoutes
}