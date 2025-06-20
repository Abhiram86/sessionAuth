import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const sessionCookie = req.cookies.get("connect.sid")?.value;

  const isAuthenticated = Boolean(sessionCookie);
  if (isAuthenticated && ["/login", "/register"].includes(url.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"],
};
