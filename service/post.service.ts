import { ky } from "@/config"

export const PostService = {
  entity: 'posts',
  getAll() {
    const data = ky.get(this.entity)
    return data 
  }
}
