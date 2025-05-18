import connectToMongoose from '../../../lib/mongoose';
import Session from '../../../models/Session';

export async function POST(req) {
  try {
    await connectToMongoose();
    const { userId, loginTime, logoutTime } = await req.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
    }

    let session;

    if (loginTime) {
      session = new Session({
        userId,
        loginTime: new Date(loginTime),
      });
      await session.save();
      return new Response(JSON.stringify({ message: 'Login time recorded' }), { status: 201 });
    } else if (logoutTime) {
      session = await Session.findOne({ userId, logoutTime: null }).sort({ loginTime: -1 });
      if (session) {
        session.logoutTime = new Date(logoutTime);
        const duration = Math.round((new Date(logoutTime) - new Date(session.loginTime)) / 1000); // المدة بالثواني
        session.duration = duration;
        await session.save();
        return new Response(JSON.stringify({ message: 'Logout time recorded', duration }), { status: 200 });
      } else {
        return new Response(JSON.stringify({ error: 'No active session found' }), { status: 404 });
      }
    }

    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  } catch (error) {
    console.error('Error in /api/sessions POST:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToMongoose();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
    }

    const sessions = await Session.find({ userId })
      .sort({ loginTime: -1 })
      .maxTimeMS(15000); // زيادة مهلة الاستعلام إلى 15 ثانية
    return new Response(JSON.stringify(sessions), { status: 200 });
  } catch (error) {
    console.error('Error in /api/sessions GET:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}