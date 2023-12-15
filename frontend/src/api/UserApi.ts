import { GameInstanceSearchParams } from "@/types/GameInstance";
import { Opinion, NewOpinion } from "@/types/Opinion";
import { Paginated } from "@/types/Paginated";
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

  static async update(user: NewUser) {
    const { data } = await Api.put<NewUser>("/user", user);
    return data;
  }

  static async search(
    latitude: number,
    longitude: number,
    page: number,
    size: number,
    searchParams: GameInstanceSearchParams,
  ) {
    const { data: users } = await Api.get<Paginated<User>>("/user/search", {
      params: {
        latitude,
        longitude,
        page,
        size,
        ...searchParams,
      },
    });
    return users;
  }

  static async getMyOpinions(page: number, size: number) {
    const { data: opinions } = await Api.get<Paginated<Opinion>>("/user/opinions", {
      params: { page, size },
    });
    return opinions;
  }

  static async getAllOpinionsByUUID(uuid: string, page: number, size: number) {
    const { data: opinions } = await Api.get<Paginated<Opinion>>(`/user/${uuid}/opinions`, {
      params: { page, size },
    });
    return opinions;
  }

  static async addOpinion(opinion: NewOpinion) {
    const { data } = await Api.post<NewOpinion>("/user/opinions", opinion);
    return data;
  }
}
