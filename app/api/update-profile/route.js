import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

export async function POST(request) {
  try {
    const { name, email } = await request.json();
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    console.log('Attempting to connect to MongoDB...');
    const client = await connectToDatabase();
    const db = client.db('learning-platform');
    console.log('Connected to database:', db.databaseName);

    const filter = { email: email };
    const updateDoc = { $set: { name: name, email: email } }; // تحديث الإيميل كمان لو اتغير
    const result = await db.collection('users').updateOne(filter, updateDoc, { upsert: true });

    if (result.matchedCount === 0 && result.upsertedCount === 0) {
      return NextResponse.json({ error: 'No user found or update failed' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Profile updated successfully', updatedUser: { name, email } }, { status: 200 });
  } catch (error) {
    console.error('Error updating profile:', error.message);
    return NextResponse.json({ error: error.message || 'An error occurred while updating the profile' }, { status: 500 });
  }
}