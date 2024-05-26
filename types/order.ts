interface Order {
  id?: number
  createdAt?: string
  updatedAt?: string
  publishedAt?: Date
  note?: string
  status?: Status
  products?: Pattern[]
  user?: User
  uuid?: string
  price?: number
}
