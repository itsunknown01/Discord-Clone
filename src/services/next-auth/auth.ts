import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import { getUserById } from "../auth/user";
import { db } from "../db";
import authConfig from "./auth.config";

const adapter = PrismaAdapter(db);

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    }
  },
  callbacks: {
    async signIn({ user, account }) { 
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      // if(!existingUser?.emailVerified) return false

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
      }

      return session;
    },
    async jwt({ token, account }) {
      if (!token.sub) return token;
    
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.username = existingUser.username;

      return token;
    },
  },
  ...authConfig,
});