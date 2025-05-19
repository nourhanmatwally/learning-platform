import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../../lib/mongodb';
import { compare } from 'bcryptjs';

// التحقق من المتغيرات البيئية
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google OAuth environment variables');
}
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('Missing NEXTAUTH_SECRET environment variable');
}

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
          scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
        },
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('SignIn Callback - User:', user, 'Account:', account, 'Profile:', profile);
      if (account.provider === 'google') {
        console.log('Step 1: Google Sign-In detected, letting MongoDBAdapter handle user creation...');
        const db = (await clientPromise).db();
        const existingUser = await db.collection('users').findOne({ email: user.email });
        if (existingUser) {
          console.log('Step 2: Existing user found:', existingUser);
          if (existingUser.provider && existingUser.provider !== 'google') {
            console.log('Step 3: User exists but with a different provider:', existingUser.provider);
            throw new Error('هذا الحساب مسجل بطريقة أخرى، جرب تسجيل الدخول بطريقة مختلفة');
          }
          user.id = existingUser._id.toString();
        } else {
          console.log('Step 2: No existing user found, MongoDBAdapter will create one...');
        }
        const accountExists = await db.collection('accounts').findOne({
          provider: 'google',
          providerAccountId: account.providerAccountId,
        });
        if (accountExists) {
          console.log('Step 3: Account already linked:', accountExists);
        } else {
          console.log('Step 3: No account linked yet, MongoDBAdapter should handle this...');
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      console.log('JWT Callback - Token:', token, 'User:', user, 'Account:', account);
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session Callback - Session:', session, 'Token:', token);
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.provider = token.provider;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect Callback - URL:', url, 'Base URL:', baseUrl);
      return baseUrl + '/materials';
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };