import { NextResponse } from 'next/server';

export async function GET(request) {
  return NextResponse.json({ message: 'Test endpoint is working' });
}