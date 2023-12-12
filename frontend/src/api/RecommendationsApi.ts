import { Game } from "@/types/Game";
import { Paginated } from "@/types/Paginated";
import Api from "./Api";

export class RecommendationsApi {
  static async getAll(number: number, RECOMMENDATIONS_PAGE_SIZE: number) {
    console.log(number, RECOMMENDATIONS_PAGE_SIZE);
    const { data: recommendations } = await Api.get<Paginated<Game>>("/recommendations");
    return recommendations;
  }
}
