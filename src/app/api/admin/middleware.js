// src/middleware.js
import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/auth/verifyJwt"; // Your custom JWT verify function

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;

  // Check if token exists
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const user = await verifyJwt(token); // your JWT decoding logic

    // Restrict access to admin-only routes
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      user.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Apply middleware to these routes
export const config = {
  matcher: ["/admin/:path*"], // Adjust based on your protected route
};
