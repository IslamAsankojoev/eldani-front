const entity = '/products'

export const ProductService = {
  entity,
  async getAll() {
    const data = await fetch(process.env.API_URL + '/api' + entity + '?populate=*').then((res) =>
      res.json(),
    )
    return data as Pattern[]
  },
  // async get(id: number) {
  //   const data = await fetch(`${entity}/${id}`).then((res) => res.json())
  //   return data as Pattern
  // },
  // async create(data: Pattern) {
  //   return await ky.post(entity, {
  //     body: JSON.stringify(data),
  //   })
  // },
  // async update(id: number, data: Pattern) {
  //   return await ky.put(`${entity}/${id}`, {
  //     body: JSON.stringify(data),
  //   })
  // },
  // async delete(id: number) {
  //   return await ky.delete(`${entity}/${id}`)
  // },
}
