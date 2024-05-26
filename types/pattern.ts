interface Pattern {
  id: number
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  name?: string
  description?: any
  thumbnails?: Media[] | null
  price?: string
  category?: Category
  slug?: any
  attribute: Property[]
  comments?: any
  locale: string
  file: Media
  sizes: Size[]
}

interface Size {
  id: number
  value: string
  file?: Media
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
  formats: {
    thumbnail: MediaFormat
    small: MediaFormat
    medium: MediaFormat
    large: MediaFormat
  }
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
