import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(3, '180 s'),
});

// Define which routes you want to rate limit
export const config = {
  matcher: ['/api/:path*'], // This matches all routes under /api
};

export default async function middleware(request: NextRequest) {

  // check if there is the following environment variables:
  // OPENAI_API_KEY="sk-proj-i6NBx4QBucnMDEOCq9M8T3BlbkFJ5wskFrGF3SEvE4YXIEAI"
// KV_URL="redis://default:Aas_AAIncDEwOWJhOGY2ZGJkOWM0OTBkOTVlZTE3OGMyNmViMDY1MHAxNDM4Mzk@select-redfish-43839.upstash.io:6379"
// KV_REST_API_URL="https://select-redfish-43839.upstash.io"
// KV_REST_API_TOKEN="Aas_AAIncDEwOWJhOGY2ZGJkOWM0OTBkOTVlZTE3OGMyNmViMDY1MHAxNDM4Mzk"
// KV_REST_API_READ_ONLY_TOKEN="Aqs_AAIgcDFe2KeBTt8DCB2jIKBUNxEQKQwwcaWc5r74AVUAQMi_Vw"
// EBAY_APP_ID="strafe-pyramidP-PRD-2ee6b197e-0ac27611"
// EBAY_CERT_ID="PRD-ee6b197e309f-e342-4eb7-b842-c194"

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