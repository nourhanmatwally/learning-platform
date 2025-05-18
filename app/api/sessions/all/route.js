import { connectToDatabase } from '../../../../lib/mongodb';
import Session from '../../../../models/Session';

export async function GET(req) {
  try {
    await connectToDatabase();
    const sessions = await Session.find().sort({ loginTime: -1 });
    return new Response(JSON.stringify(sessions), { status: 200 });
  } catch (error) {
    console.error('Error fetching all sessions:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}