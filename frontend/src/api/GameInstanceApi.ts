import { GameInstance } from "@/types/GameInstance";
import { GameInstanceSearchParams, SearchGameInstance } from "@/types/GameInstance";
import { Paginated } from "@/types/Paginated";
import Api from "./Api";

export class GameInstanceApi {
  static async getAllByUUID(uuid: string, page: number, size: number) {
    const { data: instances } = await Api.get<Paginated<GameInstance>>(
      `game-instances/user/${uuid}`,
      { params: { page, size } },
    );
    return instances;
  }

  static async getAll(page: number, size: number) {
    const { data: instances } = await Api.get<Paginated<GameInstance>>(`game-instances`, {
      params: { page, size },
    });
    return instances;
  }

  static async search(
    latitude: number,
    longitude: number,
    page: number,
    size: number,
    searchParams: GameInstanceSearchParams,
  ) {
    const { data: gameInstances } = await Api.get<Paginated<SearchGameInstance>>(
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
