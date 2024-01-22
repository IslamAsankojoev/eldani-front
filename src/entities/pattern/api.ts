import { ky } from '@/src/app/config'
import { SearchParamsOption } from 'ky'

export const ProductService = {
  entity: 'products',
  entityBySlug: 'slugify/slugs/product',
  async find(searchParams?: SearchParamsOption) {
    const data = await ky
      .get(this.entity, {
        searchParams,
      })
      .json()
    return data as Pattern[]
  },
  async findOne(slug: string, searchParams?: SearchParamsOption) {
    const data = await ky
      .get(`${this.entity}/${slug}`, {
        searchParams,
      })
      .json()
    return data as Pattern
  },
  async findBySlug(slug: string, searchParams?: SearchParamsOption) {
    const data = await ky
      .get(`${this.entityBySlug}/${slug}`, {
        searchParams,
      })
      .json()
    return data as Pattern
  },
  async create(data: Pattern) {
    const response = await ky.post(this.entity, {
      json: data,
    })
    return response
  },
  async update(id: number, data: Pattern) {
    const response = await ky.put(`${this.entity}/${id}`, {
      json: data,
    })
    return response
  },
  async delete(id: number) {
    const response = await ky.delete(`${this.entity}/${id}`)
    return response
  },
}
