export function getAuthorFromUser (user: User): Author {
  return {
    id: user.id,
    name: user.username,
    email: user.email,
    avatar: user.avatar_google || user.avatar as string || '',
  }
}