import { NextRequest, NextResponse } from 'next/server';

// Server-side only environment variables (NOT exposed to browser)
const API_BASE_URL = process.env.API_URL || '';
const API_KEY = process.env.API_KEY || '';

// Allowed API paths - blocks unauthorized backend enumeration (HIGH-1)
const ALLOWED_PATHS = [
  // Shop endpoints
  /^\/shops\/v2\/public\/name\/.+$/,
  // Product endpoints
  /^\/product-v2\/public\/shop\/.+$/,
  /^\/product-v2\/public\/by-slug\/.+$/,
  // Cart endpoints
  /^\/v2\/carts$/,
  /^\/v2\/carts\/.+$/,
  /^\/v2\/carts\/.+\/products$/,
  /^\/v2\/carts\/.+\/products\/.+$/,
];

export const runtime = 'edge';

/**
 * Check if the requested path is in the allowlist
 */
function isPathAllowed(path: string): boolean {
  return ALLOWED_PATHS.some((pattern) => pattern.test(path));
}

export async function GET(request: NextRequest) {
  return proxyRequest(request);
}

export async function POST(request: NextRequest) {
  return proxyRequest(request);
}

export async function PUT(request: NextRequest) {
  return proxyRequest(request);
}

export async function PATCH(request: NextRequest) {
  return proxyRequest(request);
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request);
}

async function proxyRequest(request: NextRequest) {
  try {
    // Extract the target endpoint from query params
    const { searchParams } = request.nextUrl;
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json(
        { error: 'Missing path parameter' },
        { status: 400 }
      );
    }

    // Validate path against allowlist (HIGH-1: Restrict Proxy Allowlist)
    if (!isPathAllowed(path)) {
      return NextResponse.json(
        { error: 'Forbidden: Path not in allowlist' },
        { status: 403 }
      );
    }

    // Build the target URL with query parameters
    const targetUrl = new URL(path, API_BASE_URL);
    searchParams.delete('path'); // Remove our proxy param
    searchParams.forEach((value, key) => {
      targetUrl.searchParams.append(key, value);
    });

    // Prepare headers
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('x-droplinked-api-key', API_KEY);

    // Copy relevant headers from original request
    const contentType = request.headers.get('content-type');
    if (contentType) {
      headers.set('Content-Type', contentType);
    }

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method: request.method,
      headers,
    };

    // Add body for non-GET/HEAD requests
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      const body = await request.text();
      if (body) {
        fetchOptions.body = body;
      }
    }

    // Make the proxied request
    const response = await fetch(targetUrl.toString(), fetchOptions);

    // Get response body
    const contentTypeHeader = response.headers.get('content-type');
    let data = null;

    if (contentTypeHeader?.includes('application/json')) {
      const text = await response.text();
      data = text ? JSON.parse(text) : null;
    } else {
      data = await response.text();
    }

    // Return response with same status code
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('API Proxy Error:', error);
    }

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        error: 'Proxy request failed',
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
