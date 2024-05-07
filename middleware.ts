import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(8, '180 s'),
});

// Define which routes you want to rate limit
export const config = {
  matcher: ['/api/:path*'], // This matches all routes under /api
};

export default async function middleware(request: NextRequest) {
    // get environment
    // const env = process.env.NODE_ENV ?? 'development';
    // // if not in production, do not rate limit
    // if (env !== 'production') {
    //     return NextResponse.next();
    // }

  const ip = request.ip ?? '127.0.0.1';
  const { success, pending, limit, reset, remaining } = await ratelimit.limit(
    ip
  );
  return success
    ? NextResponse.next()
    : NextResponse.json(
        {
          error: 'Rate limit exceeded',
          limit,
          remaining,
          reset,
        },
        {
          status: 429,
        }
      );
}