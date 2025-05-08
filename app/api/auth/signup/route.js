/*
import { connectToDatabase } from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { hash } from 'bcryptjs';

export async function POST(req) {
  try {
    console.log('Step 1: Attempting to connect to MongoDB...');
    await connectToDatabase();
    console.log('Step 2: Connected to MongoDB');
    console.log('Step 3: Parsing request body...');
    const { name, email, password } = await req.json();
    console.log('Step 4: Received data:', { name, email, password });
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: 'البيانات ناقصة' }), { status: 400 });
    }
    console.log('Step 5: Checking for existing user...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'البريد الإلكتروني مسجل مسبقًا' }), { status: 400 });
    }
    console.log('Step 6: Hashing password...');
    const hashedPassword = await hash(password, 10);
    console.log('Step 7: Creating new user...');
    const user = new User({ name, email, password: hashedPassword });
    console.log('Step 8: Saving user to database...');
    await user.save();
    console.log('Step 9: User saved successfully');
    return new Response(JSON.stringify({ message: 'تم إنشاء الحساب بنجاح' }), { status: 201 });
  } catch (error) {
    console.error('Error in signup:', error);
    return new Response(JSON.stringify({ error: 'حدث خطأ، حاول مرة أخرى' }), { status: 500 });
  }
}
*/