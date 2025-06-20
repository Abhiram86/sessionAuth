import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const cookie = req.cookies.get("connect.sid")?.value;

  let isAuthenticated = false;

  if (cookie) {
    const res = await fetch("https://session-auth-theta.vercel.app/getUser", {
      headers: {
        Cookie: `connect.sid=${cookie}`,
      },
    });

    if (res.ok) {
      isAuthenticated = true;
    }
  }

  if (isAuthenticated && ["/login", "/register"].includes(url.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!isAuthenticated && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
