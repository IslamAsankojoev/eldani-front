import { ky } from '@/src/app/config'

export const FAQService = {
  entity: 'faq?populate=*',
  async find() {
    try {
      const data = await ky.get(this.entity).json()
      return data as FAQ
    } catch (e) {
      throw e
    }
  },
}
