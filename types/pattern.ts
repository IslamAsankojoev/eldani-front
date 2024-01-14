interface Pattern {
  id: number
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  name?: string
  description?: any
  thumbnails?: Media[]
  price?: string
  category?: { data: Category }
  slug?: any
  attribute: Property[]
  comments?: any
  locale: string
}

interface MediaFormat {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  path: string
  url: string
}

interface Media {
  id: number
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: { thumbnail: MediaFormat; small: MediaFormat; medium: MediaFormat; large: MediaFormat }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string
  provider: string
  createdAt: Date
  updatedAt: Date
}
