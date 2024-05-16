interface FAQ {
  id: number
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  questions: Question[]
};

interface Question {
  question?: string
  answer?: any
}