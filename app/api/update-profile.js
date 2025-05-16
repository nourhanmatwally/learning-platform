import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { connectToDatabase } from '../../../lib/mongodb'; // حذفنا clientPromise

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    try {
      // الاتصال بقاعدة البيانات
      const client = await connectToDatabase();
      const db = client.db();

      // تحديث بيانات المستخدم في قاعدة البيانات
      const updatedUser = await db.collection('users').findOneAndUpdate(
        { _id: session.user.id },
        { $set: { name, email } },
        { returnDocument: 'after' }
      );

      if (!updatedUser.value) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating profile:', error);
      return res.status(500).json({ error: 'Failed to update profile' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}