import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Publicly accessible routes that do not require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/projects(.*)",
  "/docs(.*)",
  "/blogs(.*)",
  "/solutions(.*)",
  "/about(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
]);

// Admin routes verify credentials themselves
const isAdminRoute = createRouteMatcher(["/admin(.*)", "/api/admin(.*)", "/api/projects"]);

export default clerkMiddleware((auth, req) => {
  // Admin page and its API check the passcode / Clerk role themselves (see lib/clerk/roles.ts)
  if (isAdminRoute(req)) {
    return NextResponse.next();
  }

  // Protect all other private routes
  if (!isPublicRoute(req)) {
    auth().protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
