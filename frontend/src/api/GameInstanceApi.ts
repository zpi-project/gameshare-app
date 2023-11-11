import { GameInstanceSearchParams, SearchUserGameInstances } from "@/types/GameInstance";
import { Paginated } from "@/types/Paginated";
import Api from "./Api";

export class GameInstanceApi {
  static async search(
    latitude: number,
    longitude: number,
    page: number,
    size: number,
    searchParams: GameInstanceSearchParams,
  ) {
    const { data: gameInstances } = await Api.get<Paginated<SearchUserGameInstances>>(
      "/game-instances/search",
      {
        params: {
          latitude,
          longitude,
          page,
          size,
          ...searchParams,
        },
      },
    );
    return gameInstances;
  }
}
