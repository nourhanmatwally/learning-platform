import { config } from 'dotenv';
config();

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../../lib/mongodb';
import { compare } from 'bcryptjs';

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          console.log('Step 1: Connecting to MongoDB for Credentials...');
          const db = (await clientPromise).db();
          console.log('Step 2: Connected to MongoDB');
          console.log('Step 3: Finding user with email:', credentials.email);
          const user = await db.collection('users').findOne({ email: credentials.email });
          if (!user) {
            console.log('Step 4: No user found');
            throw new Error('لا يوجد مستخدم بهذا البريد الإلكتروني');
          }
          console.log('Step 5: Comparing password...');
          if (!user.password) {
            console.log('Step 6: No password set for this user');
            throw new Error('هذا الحساب مسجل باستخدام Google، استخدم تسجيل الدخول عبر Google');
          }
          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            console.log('Step 6: Invalid password');
            throw new Error('كلمة المرور غير صحيحة');
          }
          console.log('Step 7: User authenticated:', user.email);
          return { id: user._id.toString(), name: user.name, email: user.email };
        } catch (error) {
          console.error('Error in Credentials authorize:', error.message);
          throw new Error(error.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        },
      },
    }),
  ],
  pages: {
    signIn: '/api/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account.provider === 'google') {
          console.log('Step 1: Connecting to MongoDB for Google Sign-In...');
          const db = (await clientPromise).db();
          console.log('Step 2: Connected to MongoDB');
          console.log('Step 3: Checking for existing user with email:', user.email);
          let existingUser = await db.collection('users').findOne({ email: user.email });
          if (!existingUser) {
            console.log('Step 4: Creating new user for Google Sign-In...');
            existingUser = await db.collection('users').insertOne({
              name: user.name,
              email: user.email,
              password: null,
              provider: 'google',
            });
            console.log('Step 5: New user created:', user.email);
          } else {
            console.log('Step 5: Existing user found:', user.email);
          }
          user.id = existingUser.insertedId ? existingUser.insertedId.toString() : existingUser._id.toString();
        }
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };