import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { question, userId, timestamp } = await req.json();

    // إعداد الـ Transporter لإرسال الإيميل
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // إرسال الإيميل للمطور
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'nourhanmatwally@gmail.com', // إيميل المطور
      subject: 'New Unanswered Question from Chatbot',
      text: `A user asked an unanswered question:\n\nQuestion: ${question}\nUser ID: ${userId}\nTimestamp: ${timestamp}`,
      html: `<p>A user asked an unanswered question:</p><ul><li><strong>Question:</strong> ${question}</li><li><strong>User ID:</strong> ${userId}</li><li><strong>Timestamp:</strong> ${timestamp}</li></ul>`,
    });

    return new Response(JSON.stringify({ message: 'Notification sent successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error sending notification:', error);
    return new Response(JSON.stringify({ message: 'Failed to send notification' }), { status: 500 });
  }
}