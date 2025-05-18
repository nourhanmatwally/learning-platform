import { NextResponse } from 'next/server';
import connectToMongoose from '../../../lib/mongoose';
import Comment from '../../../models/Comment';

export async function GET() {
  try {
    await connectToMongoose();
    const comments = await Comment.find().sort({ createdAt: -1 });
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToMongoose();
    const { userId, userName, role, comment } = await request.json();
    if (!userId || !userName || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const newComment = new Comment({
      userId,
      userName,
      role,
      comment,
      createdAt: new Date(),
    });
    const savedComment = await newComment.save();
    return NextResponse.json(savedComment, { status: 201 });
  } catch (error) {
    console.error('Error posting comment:', error);
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
  }
}