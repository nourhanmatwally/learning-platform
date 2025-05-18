import connectToMongoose from 'lib/mongoose';
import User from 'models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return new Response(JSON.stringify({ message: 'التوكن أو كلمة المرور مفقودة' }), { status: 400 });
    }

    // التحقق من التوكن
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return new Response(JSON.stringify({ message: 'الرابط منتهي الصلاحية أو غير صالح' }), { status: 400 });
    }

    // الاتصال بقاعدة البيانات
    await connectToMongoose();
    const user = await User.findById(decoded.sub);

    if (!user) {
      return new Response(JSON.stringify({ message: 'المستخدم غير موجود' }), { status: 404 });
    }

    // تشفير كلمة المرور الجديدة
    const hashedPassword = await bcrypt.hash(password, 10);

    // تحديث كلمة المرور
    await User.updateOne(
      { _id: decoded.sub },
      { $set: { password: hashedPassword } }
    );

    return new Response(JSON.stringify({ message: 'تم تحديث كلمة المرور بنجاح' }), { status: 200 });
  } catch (error) {
    console.error('Error in confirm reset-password:', error.message || error);
    return new Response(JSON.stringify({ message: 'حدث خطأ، حاول مرة أخرى' }), { status: 500 });
  }
}