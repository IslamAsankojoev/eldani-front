interface Order {
  id?: number
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
  note?: string
  status?: Status
  products?: Pattern[]
  user?: User
  uuid?: string
  price?: number
}
