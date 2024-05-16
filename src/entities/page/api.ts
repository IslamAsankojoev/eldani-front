import { ky } from '@/src/app/config'
import { SearchParamsOption } from 'ky'

export const PageService = {
  entity: 'pages',
  entityBySlug: 'slugify/slugs/page',
  async find(searchParams?: SearchParamsOption) {
    try {
      const data = await ky
        .get(this.entity, {
          searchParams,
        })
        .json()
      return data as Page[]
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
      return data as Page
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
      return data as Page
    } catch (e) {
      throw e
    }
  },
}
