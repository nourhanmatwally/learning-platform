import connectToMongoose from '../../../../lib/mongoose';
import User from '../../../../models/User';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'; // استيراد مكتبة jsonwebtoken

export async function POST(req) {
  try {
    // التأكد من وجود المتغيرات البيئية
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    if (!process.env.NEXTAUTH_URL) {
      throw new Error('NEXTAUTH_URL is not defined in environment variables');
    }
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email credentials are not defined in environment variables');
    }

    // الاتصال بقاعدة البيانات
    await connectToMongoose();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: 'لا يوجد مستخدم بهذا البريد' }), { status: 404 });
    }

    // إنشاء توكن باستخدام jsonwebtoken
    const token = jwt.sign(
      { sub: user._id.toString() }, // البيانات اللي هتتحط في التوكن
      process.env.JWT_SECRET, // المفتاح السري
      { expiresIn: '1h' } // التوكن صالح لمدة ساعة
    );

    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password/confirm?token=${token}`;

    // إعداد إرسال الإيميل
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'إعادة تعيين كلمة المرور',
      text: `اضغط هنا لإعادة تعيين كلمة المرور: ${resetLink}`,
      html: `<p>اضغط على الرابط التالي لإعادة تعيين كلمة المرور: <a href="${resetLink}">إعادة تعيين كلمة المرور</a></p>`,
    });

    return new Response(JSON.stringify({ message: 'تم إرسال رابط إعادة التعيين' }), { status: 200 });
  } catch (error) {
    console.error('Error in reset-password:', error.message || error);
    return new Response(JSON.stringify({ error: 'حدث خطأ، حاول مرة أخرى' }), { status: 500 });
  }
}