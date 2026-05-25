import { NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/ideas/create",
  "/workspace",
  "/teams",
  "/projects",
  "/settings",
  "/notifications",
  "/achievements",
  "/ai-tools",
  "/launches",
  "/hiring",
  "/jobs"
];

export function middleware(request) {
  const token = request.cookies.get("wvx_token")?.value;
  const pathname = request.nextUrl.pathname;
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !token) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/ideas/create", "/workspace/:path*", "/teams/:path*", "/projects/:path*", "/settings/:path*", "/notifications/:path*", "/achievements/:path*", "/ai-tools/:path*", "/launches/:path*", "/hiring/:path*", "/jobs/:path*"]
};
