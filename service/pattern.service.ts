import { ky } from "@/config"
import { SearchParamsOption } from "ky"

export const ProductService = {
  entity: 'products',
  async find(searchParams?: SearchParamsOption) {
    const data = await ky.get(this.entity, {
      searchParams,
    }).json()
    return data as Pattern[]
  },
  async findOne(id: number) {
    const data = await ky.get(`${this.entity}/${id}?populate=*`).json()
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
