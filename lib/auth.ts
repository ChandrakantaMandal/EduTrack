import NextAuth, { AuthOptions } from "next-auth"
import Google from "next-auth/providers/google"
import prisma from "./prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  } as const,
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60,
      },
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const pattern = /^\d{2}[a-zA-Z]{3}\d{3}@abit\.edu\.in$/
        if (!user.email || !pattern.test(user.email)) {
          return "/login?error=college_email"
        }
      }
      return true
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        ;(
          session.user as {
            id: string
            name?: string | null
            email?: string | null
            image?: string | null
          }
        ).id = token.sub
      }
      return session
    },
  },
} satisfies AuthOptions

export default NextAuth(authOptions)

export { getServerSession as auth } from "next-auth"
