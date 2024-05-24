interface Order {
  id: number
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  note?: string
  status?: Status
  products?: any
  file?: Media
  user?: User
  uuid?: string
}
