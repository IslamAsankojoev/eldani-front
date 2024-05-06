interface User {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  avatar_google: string
  phone: string
  avatar: string | null | File
  role?: UserRole
}

interface UserWithToken {
  jwt: string
  user: User
}

interface UserRole {
  id: number
  name: string
  description: string
  type: "public" | "authenticated" | "admin"
  createdAt: string
  updatedAt: string
}