import { comment } from "postcss"

const entity = '/comments'

export const CommentService = {
  entity,
  async getAll(id: number) {
    try {
      const data = await fetch(
        process.env.API_URL + '/api' + entity + `/api::product.product:${id}`,
      ).then((res) => res.json())
      return data as IComment[]
    } catch (e) {
      throw e
    }
  },
  async create(id: number, comment: CommentPost) {
    try {
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
      return data as IComment
    } catch (e) {
      throw e
    }
  },
  async delete(id: number, commentId: number, authorId: number) {
    try {
      const data = await fetch(
        process.env.API_URL + '/api' + entity + `/api::product.product:${id}/comment/${commentId}?authorId=${authorId}`,
        {
          method: 'DELETE',
        },
      ).then((res) => res.json())
      return data as IComment
    } catch (e) {
      throw e
    }
  },
  async update(id: number, comment: IComment) {
    try {
      const data = await fetch(
        process.env.API_URL + '/api' + entity + `/api::product.product:${id}/comment/${comment.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...comment,
          }),
        },
      ).then((res) => res.json())
      return data as IComment
    } catch (e) {
      throw e
    }
  },
}
