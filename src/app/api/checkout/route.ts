import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return new NextResponse('{"test":"ok"}', {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: NextRequest) {
  return new NextResponse('{"test":"post"}', {
    headers: { 'Content-Type': 'application/json' },
  });
}
