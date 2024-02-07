import { Options } from 'ky'

import { ky } from '@/src/app/config'

export const UserService = {
  entity: 'users',
  async getMe(options?: Options) {
    try {
      const data = await ky.get(`${this.entity}/me`, options).json()
      return data as User
    } catch (e) {
      return null
    }
  },
  async updateMe(data: Partial<User>, options?: Options) {
    try {
      const user = await ky
        .put(`${this.entity}/${data.id}`, { json: data, ...options })
        .json()
      return user as User
    } catch (e) {
      return null
    }
  },
}
