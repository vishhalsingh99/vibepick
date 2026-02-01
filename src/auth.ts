import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { connectDb } from './lib/db';
import User from './models/user.model';
import bcrypt from 'bcryptjs';
import { JWT } from 'next-auth/jwt';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          await connectDb();

          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("User doesn't exist");
          }

          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password,
          );

          if (!isMatch) {
            throw new Error('Incorrect Password');
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.CLIENT_GOOGLE_ID as string,
      clientSecret: process.env.CLIENT_GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account}) {
      if (account?.provider === 'google') {
        await connectDb();

        let dbUser = await User.findOne({ email: user.email });

        if (!dbUser) {
          dbUser = await User.create({
            name: user.name,
            email: user.email,
            role: 'user',
            image: user.image,
          });
        }

        user.id = dbUser._id.toString();
        user.role = dbUser.role;
      }

      return true;
    },

    jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 10 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
});

//connect db
// check email
// password match
// return user
