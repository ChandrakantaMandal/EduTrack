import NextAuth, { AuthOptions } from "next-auth"
import Google from "next-auth/providers/google"
import prisma from "./prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" } as const,
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
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
