interface Page{
  id: number
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  title?: string
  content?: any
  thumbnail?: { data: Media }
  page_category?: { data: PageCategory }
  slug?: string
};

interface PageCategory{
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  name?: string
};