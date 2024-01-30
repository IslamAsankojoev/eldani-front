interface User {
  id: number,
  username: null | string,
  email: string,
  provider: string,
  confirmed: boolean,
  blocked: boolean,
  createdAt: string,
  updatedAt: string
}

interface UserWithToken {
  jwt: string,
  user: User
}