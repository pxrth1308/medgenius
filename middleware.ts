import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Simple middleware that allows the request to continue
  // We can enhance this later if needed without dependencies
  return NextResponse.next()
}
