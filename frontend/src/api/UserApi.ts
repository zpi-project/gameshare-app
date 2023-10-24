import { User } from "@/types/User";
import Api from "./Api";

export class UserApi {
  static async getUser() {
    const { data: user } = await Api.get<User>("/user");
    return user;
  }

  static async getUserByUUID(uuid: string) {
    const { data: user } = await Api.get<User>(`/user/${uuid}`);
    return user;
  }
}
