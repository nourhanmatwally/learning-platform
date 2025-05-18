import { NextResponse } from 'next/server';
import connectToMongoose from '../../../lib/mongoose';
import Result from '../../../models/Result';

export async function GET(request) {
  try {
    await connectToMongoose();
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    if (!studentId) {
      return NextResponse.json({ error: 'Student ID is required' }, { status: 400 });
    }
    const results = await Result.find({ studentId });
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }
}