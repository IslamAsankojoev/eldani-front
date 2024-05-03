import { ky } from '@/src/app/config'
import { SearchParamsOption } from 'ky'

export const ProductService = {
  entity: 'products',
  entityBySlug: 'slugify/slugs/product',
  async find(searchParams?: SearchParamsOption) {
    try {
      const data = await ky
        .get(this.entity, {
          searchParams,
        })
        .json()
      return data as Pattern[]
    } catch (e) {
      throw e
    }
  },
  async findOne(slug: string, searchParams?: SearchParamsOption) {
    try {
      const data = await ky
        .get(`${this.entity}/${slug}`, {
          searchParams,
        })
        .json()
      return data as Pattern
    } catch (e) {
      throw e
    }
  },
  async findBySlug(slug: string, searchParams?: SearchParamsOption) {
    try {
      const data = await ky
        .get(`${this.entityBySlug}/${slug}`, {
          searchParams,
        })
        .json()
      return data as Pattern
    } catch (e) {
      throw e
    }
  },
  async create(data: Pattern) {
    try {
      const response = await ky.post(this.entity, {
        json: data,
      })
      return response
    } catch (e) {
      throw e
    }
  },
  async update(id: number, data: Pattern) {
    try {
      const response = await ky.put(`${this.entity}/${id}`, {
        json: data,
      })
      return response
    } catch (e) {
      throw e
    }
  },
  async delete(id: number) {
    try {
      const response = await ky.delete(`${this.entity}/${id}`)
      return response
    } catch (e) {
      throw e
    }
  },
}
