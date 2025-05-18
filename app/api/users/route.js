import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import clientPromise from 'lib/mongodb';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  try {
    const client = await clientPromise;
    const db = client.db();

    const query = email ? { email: { $ne: email } } : {};
    const users = await db.collection('users').find(query, { projection: { id: '$_id', email: 1, _id: 0 } }).toArray();
    users.forEach(user => user.id = user.id.toString());
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}