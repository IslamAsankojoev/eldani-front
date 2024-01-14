const entity = '/comments'

export const CommentService = {
  entity,
  async getAll(id: number) {
    const data = await fetch(
      process.env.API_URL + '/api' + entity + `/api::product.product:${id}`,
    ).then((res) => res.json())
    return data as Comment[]
  },
  async create(id: number, comment: CommentPost) {
    const data = await fetch(
      process.env.API_URL + '/api' + entity + `/api::product.product:${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...comment,
        }),
      },
    ).then((res) => res.json())
    return data as Comment
  },
}
