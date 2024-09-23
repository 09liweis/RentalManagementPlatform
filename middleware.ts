import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  console.log('test middleware');
  // response.cookies.set('vercel', 'fast')
  // response.cookies.set({
  //   name: 'vercel',
  //   value: 'fast',
  //   path: '/',
  // });
 
  return response
}