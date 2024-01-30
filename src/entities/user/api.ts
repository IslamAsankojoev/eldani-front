import { kyAuth } from "@/src/app/config"

export const UserService = {
  entity:'users',
  async getMe() {
    const entity = this.entity; // сохраняем значение в замыкании
    const data = await kyAuth.get(`${entity}/me`).json();
    return data as User;
  },
}
