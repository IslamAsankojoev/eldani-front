import { Options, SearchParamsOption } from 'ky'

import { ky } from '@/src/app/config'

export const UserService = {
  entity: 'users',
  async getMe(options?: Options) {
    try {
      const data = await ky.get(`${this.entity}/me?populate=*`, options).json()
      return data as User
    } catch (e) {
      throw e
    }
  },
  async updateMe(data: Partial<User>, options?: Options) {
    try {
      const user = await ky
        .put(`${this.entity}/${data.id}`, { json: data, ...options })
        .json()
      return user as User
    } catch (e) {
      throw e
    }
  },
  async findOrders(searchParams?: SearchParamsOption) {
    try {
      const data: User = await ky
        .get(`${this.entity}/me`, {
          searchParams,
        })
        .json()
      return data.orders as Order[]
    } catch (e) {
      throw e
    }
  },
}
