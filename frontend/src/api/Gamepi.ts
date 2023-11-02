import { Game } from "@/types/Game";
import { Paginated } from "@/types/Paginated";
import Api from "./Api";

export class GameApi {
  static async getPopular(page: number, size: number) {
    const { data: games } = await Api.get<Paginated<Game>>("/games", { params: { page, size } });
    return games;
  }
}
