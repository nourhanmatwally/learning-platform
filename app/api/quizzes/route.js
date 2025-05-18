import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const teacherId = searchParams.get('teacherId');
  const id = searchParams.get('id');

  try {
    const client = await clientPromise;
    const db = client.db();
    let quizzes;

    if (id) {
      quizzes = await db.collection('quizzes').findOne({ _id: new ObjectId(id) });
      if (!quizzes) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    } else if (teacherId) {
      quizzes = await db.collection('quizzes').find({ teacherId }).toArray();
    } else {
      quizzes = await db.collection('quizzes').find().toArray();
    }

    return NextResponse.json({ quizzes });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return NextResponse.json({ error: 'Failed to fetch quizzes' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, description, teacherId } = await request.json();
    if (!title || !description || !teacherId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const quiz = { title, description, teacherId, createdAt: new Date() };
    const result = await db.collection('quizzes').insertOne(quiz);

    return NextResponse.json({ quiz: { ...quiz, _id: result.insertedId.toString() } });
  } catch (error) {
    console.error('Error creating quiz:', error);
    return NextResponse.json({ error: 'Failed to create quiz' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { quizId } = await request.json();
    if (!quizId || !ObjectId.isValid(quizId)) {
      return NextResponse.json({ error: 'Invalid quizId' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('quizzes').deleteOne({ _id: new ObjectId(quizId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    return NextResponse.json({ error: 'Failed to delete quiz' }, { status: 500 });
  }
}