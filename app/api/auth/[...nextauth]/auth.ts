import NextAuth, { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { User } from '@/models/models'
import dbConnect from '@/lib/dbConnect'
import { IWarehouse } from '@/models/interfaces'

export const config = {
  trustHost: true,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/error',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        try {
          await dbConnect()
          const userDb = await User.findOne({
            email: credentials.email as string,
          }).populate('warehouse')

          const user = userDb.toObject()

          if (!user || !user.password || !user.isActive) {
            return null
          }
          // Compare provided password with hashed password
          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          )

          if (!isPasswordValid) {
            return null
          }

          // Return user object if authentication is successful
          return {
            id: user._id.toString() as string,
            email: user.email as string,
            name: user.name as string,
            isAdmin: user.isAdmin as boolean,
            warehouse: {
              ...user.warehouse,
              _id: user.warehouse._id.toString() as string,
            },
          }
        } catch (error) {
          console.error('Error during authentication:', error)
          return null
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.isAdmin = user.isAdmin
        token.warehouse = user.warehouse
      }

      if (trigger === 'update' && session) {
        token.warehouse = session.user?.warehouse ?? token.warehouse
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.isAdmin = token.isAdmin as boolean
        session.user.warehouse = token.warehouse as IWarehouse
      }
      return session
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
