import { NextResponse } from 'next/server';
import { connectToMongoose } from '../../../lib/mongoose'; // استخدام connectToMongoose
import User from '../../../models/User'; // استيراد نموذج User

export async function POST(request) {
  try {
    const { name, email } = await request.json();

    // التحقق من وجود الاسم (البريد الإلكتروني يبقى كما هو في الجلسة)
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // الحصول على الجلسة (افتراضيًا عبر هيدرز أو سياق NextAuth)
    const session = request.headers.get('x-nextauth-session')
      ? JSON.parse(request.headers.get('x-nextauth-session'))
      : null;

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'غير مصرح - يجب تسجيل الدخول' }, { status: 401 });
    }

    console.log('Attempting to connect to MongoDB via Mongoose...');
    await connectToMongoose();
    console.log('Connected to database');

    // البحث عن المستخدم بناءً على _id من الجلسة
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: 'المستخدم غير موجود' }, { status: 404 });
    }

    // تحديث الاسم فقط، مع الاحتفاظ بالبريد الإلكتروني الحالي
    user.name = name;
    await user.save();

    return NextResponse.json(
      { message: 'Profile updated successfully', updatedUser: { name: user.name, email: user.email } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating profile:', error.message);
    return NextResponse.json(
      { error: error.message || 'An error occurred while updating the profile' },
      { status: 500 }
    );
  }
}