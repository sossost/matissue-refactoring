import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (!request.cookies.get("session-id")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    "/my-page/:path*",
    "/add-recipe/:path*",
    "/edit-recipe/:path*",
    "/admin/:path*",
  ],
};
