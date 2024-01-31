interface User {
  id: number,
  username: string,
  email: string,
  provider: string,
  confirmed: boolean,
  blocked: boolean,
  createdAt: string,
  updatedAt: string
  avatar_google: string,
}

interface UserWithToken {
  jwt: string,
  user: User
}