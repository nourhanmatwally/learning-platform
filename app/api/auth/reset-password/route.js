import connectToMongoose from '../../../../lib/mongoose';
import User from '../../../models/User';
import { generateResetToken } from 'next-auth/jwt';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    await connectToMongoose();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: 'لا يوجد مستخدم بهذا البريد' }), { status: 404 });
    }

    const token = generateResetToken({ sub: user._id.toString() }, '1h'); // رابط صالح لساعة
    const resetLink = `${process.env.NEXTAUTH_URL}/api/auth/reset-password/confirm?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // أضيفي الإيميل في .env.local
        pass: process.env.EMAIL_PASS, // أضيفي كلمة المرور أو App Password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'إعادة تعيين كلمة المرور',
      text: `اضغط هنا لإعادة تعيين كلمة المرور: ${resetLink}`,
      html: `<a href="${resetLink}">إعادة تعيين كلمة المرور</a>`,
    });

    return new Response(JSON.stringify({ message: 'تم إرسال رابط إعادة التعيين' }), { status: 200 });
  } catch (error) {
    console.error('Error in reset-password:', error);
    return new Response(JSON.stringify({ error: 'حدث خطأ، حاول مرة أخرى' }), { status: 500 });
  }
}