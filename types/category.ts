interface Category {
  id: number
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  name?: string
  preview?: { data: Media }
  products: { data: Pattern[] }
  children: { data: Category[] }
  parent?: { data: Category }
  locale: string
}
