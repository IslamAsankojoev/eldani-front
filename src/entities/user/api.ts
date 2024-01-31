import { Options } from 'ky'
import { ky } from '@/src/app/config'

export const UserService = {
  entity: 'users',
  async getMe(options?: Options) {
    try {
      const data = await ky.get(`${this.entity}/me`, options).json()
      setTimeout(() => {}, 1000)
      return data as User
    } catch (e) {
      throw e
    }
  },
}