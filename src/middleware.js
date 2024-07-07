import { NextResponse } from 'next/server'
import { decrypt } from "@/lib/auth"

export async function middleware(request) {
  if(request.url.endsWith('/api/users/authenticate'))
    return;
  const session = request.cookies.get("session")?.value
  if (!session && !request.nextUrl.pathname.startsWith('/login'))
    return new NextResponse('Not authorised', { status: 401 })
  try {
    const parsed = await decrypt(session);
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', parsed.user.id)
    return NextResponse.next({ request: { headers: requestHeaders }})
  } catch (e) {
    console.log(e)
    return new NextResponse('Not authorised', { status: 401 })
  }
}

export const config = {
  matcher: ['/api/:path*'],
}
