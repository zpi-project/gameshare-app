import { NewUser, User } from "@/types/User";
import Api from "./Api";

export class UserApi {
  static async get() {
    const { data: user } = await Api.get<User>("/user");
    return user;
  }

  static async getByUUID(uuid: string) {
    const { data: user } = await Api.get<User>(`/user/${uuid}`);
    return user;
  }

  static async create(user: NewUser) {
    const { data } = await Api.post<User>("/user", user);
    return data;
  }
}
