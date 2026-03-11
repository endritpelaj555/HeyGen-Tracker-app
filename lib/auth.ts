import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
}

declare module 'next-auth' {
  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'admin' | 'editor' | 'viewer';
  }
}

// Demo users
const users: Record<string, { password: string; name: string; role: 'admin' | 'editor' | 'viewer' }> = {
  'admin@heygen.com': {
    password: 'heygen2024',
    name: 'Admin User',
    role: 'admin',
  },
  'editor@heygen.com': {
    password: 'heygen2024',
    name: 'Editor User',
    role: 'editor',
  },
  'viewer@heygen.com': {
    password: 'heygen2024',
    name: 'Viewer User',
    role: 'viewer',
  },
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users[credentials.email];

        if (!user || user.password !== credentials.password) {
          return null;
        }

        return {
          id: credentials.email,
          email: credentials.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as User).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as User).role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'heygen-secret-key-2024',
};
