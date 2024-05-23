import { SearchParamsOption } from 'ky'

import { ky } from '@/src/app/config'

export const OrderService = {
  entity: 'orders',
  async find(searchParams?: SearchParamsOption) {
    try {
      const data = await ky
        .get(this.entity, {
          searchParams,
        })
        .json()
      return data as Order[]
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
      return data as Order
    } catch (e) {
      throw e
    }
  },
  async findByArrayIds(ids: number[], searchParams?: SearchParamsOption) {
    const query = ids
      .map((id, idx) => `filters[id][$in][${idx}]=${id}`)
      .join('&')
    try {
      const data = await ky.get(`${this.entity}/?populate=*&${query}`).json()
      return data as Order[]
    } catch (e) {
      throw e
    }
  },
  async create(data: Order) {
    try {
      const response = await ky.post(this.entity, {
        json: data,
      })
      return response
    } catch (e) {
      throw e
    }
  },
  async update(id: number, data: Order) {
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
