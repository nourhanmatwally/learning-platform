import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { compare } from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('لا يوجد مستخدم بهذا البريد الإلكتروني');
        }
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('كلمة المرور غير صحيحة');
        }
        return { id: user._id, name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };