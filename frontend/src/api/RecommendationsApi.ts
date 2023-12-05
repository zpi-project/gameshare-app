import { Game } from "@/types/Game";
import { Paginated } from "@/types/Paginated";
import Api from "./Api";

export class RecommendationsApi {
  static async getAll(page: number, size: number) {
    const { data: recommendations } = await Api.get<Paginated<Game>>("/recommendations");
    return recommendations;
  }
}
