import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const ratelimit = new Ratelimit({
  redis: kv,
  // 3 requests from the same IP in 180 seconds
  limiter: Ratelimit.slidingWindow(3, '180 s'),
});

// Define which routes to rate limit
export const config = {
  matcher: ['/api/:path*'], // This matches all routes under /api
};

export default async function middleware(request: NextRequest) {

  const requiredEnvVars = [
    'OPENAI_API_KEY',
    'OPENAI_API_MODEL',
    'KV_URL',
    'KV_REST_API_URL',
    'KV_REST_API_TOKEN',
    'KV_REST_API_READ_ONLY_TOKEN',
    'EBAY_APP_ID',
    'EBAY_CERT_ID',
  ];

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingEnvVars.length) {
    return NextResponse.json(
      {
        error: `Missing environment variables: ${missingEnvVars.join(', ')}. Please add them to your Vercel project.`,
      },
      {
        status: 500,
      }
    );
  }

    // get environment
    const env = process.env.NODE_ENV ?? 'development';
    // if not in production, do not rate limit
    if (env !== 'production') {
        return NextResponse.next();
    }

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