import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
export async function middleware(req: NextRequest) {}

export const config = {
  matcher: ['/dashboard/:path*', '/'],
}
