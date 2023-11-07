import { Game } from "@/types/Game";
import { Paginated } from "@/types/Paginated";
import Api from "./Api";

export class GameApi {
  static async getPopular(page: number, size: number) {
    // for now it uses games endpoint cause /games/popular does not exist yet
    const { data: games } = await Api.get<Paginated<Game>>("/games", { params: { page, size } });
    return games;
  }

  static async search(page: number, size: number, search?: string, categoriesIds?: number[]) {
    const { data: games } = await Api.get<Paginated<Game>>("/games", {
      params: { page, size, search, categoriesIds: categoriesIds?.join(",") },
    });
    return games;
  }
}
