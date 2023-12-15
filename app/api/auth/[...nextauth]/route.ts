import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { useLogin } from "@/app/services/useRequest";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }
        const res = await useLogin(credentials.username, credentials.password);
        if (res?.login) {
          console.log("res?.login => ", res?.login);
          return { ...res?.login };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          accessToken: user.accessToken,
          name: user.user.username,
          email: user.user.email,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session.user = {
          ...session.user,
          name: token.name,
          email: token.email,
          accessToken: token.accessToken,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
