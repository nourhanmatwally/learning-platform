import { connectToMongoose } from '../../../lib/mongoose';
import User from '../../../models/User';

export async function POST(req) {
  try {
    await connectToMongoose();
    const { userId, role } = await req.json();

    if (!userId || !role) {
      return new Response(JSON.stringify({ error: 'User ID and role are required' }), { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!updatedUser) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Role updated successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error updating role:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}