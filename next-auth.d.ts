import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      isAdmin?: boolean
      warehouse?: IWarehouse
    } & DefaultSession['user']
  }

  interface User {
    id: string
    isAdmin?: boolean
    warehouse?: IWarehouse
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    isAdmin?: boolean
    warehouse?: IWarehouse
  }
}
