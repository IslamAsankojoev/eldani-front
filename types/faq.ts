interface FAQ {
  id: number
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  questions: Question[]
}

interface Question {
  id: number
  question?: string
  answer?: any
}
