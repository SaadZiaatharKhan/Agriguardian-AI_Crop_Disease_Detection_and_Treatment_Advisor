import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define which routes should be public
const isPublicRoute = createRouteMatcher([
  '/Home(.*)', 
  '/Chat(.*)',
  '/api/create'
])


export default clerkMiddleware(async (auth, request) => {
  // Protect all non-public routes
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    
    // Always run for API routes (includes trpc if needed)
    '/(api|trpc)(.*)',
  ],
}
