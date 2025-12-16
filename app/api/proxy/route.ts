import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

export const runtime = 'edge';

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
