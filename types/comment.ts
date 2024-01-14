interface Comment {
  id: number
  content: string
  blocked: boolean
  blockedThread: boolean
  blockReason: null
  isAdminComment: null
  removed: boolean
  approvalStatus: boolean
  createdAt: string
  updatedAt: string
  gotThread: boolean
  author: Author
  children: Comment[]
}

type CommentPost = Pick<Comment, 'content' | 'author'>
