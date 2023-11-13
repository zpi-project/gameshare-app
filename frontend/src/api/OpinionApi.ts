import { Opinion } from "@/types/Opinion";
import { Paginated } from "@/types/Paginated";
import Api from "./Api";

export class OpinionApi {
  static async getAll(page: number, size: number) {
    const { data: opinions } = await Api.get<Paginated<Opinion>>("/user/opinions", {
      params: { page, size },
    });
    return opinions;
  }
}
