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
}

interface UserWithToken {
  jwt: string
  user: User
}
