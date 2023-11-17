import { GameInstance } from "@/types/GameInstance";
import {
  GameInstanceSearchParams,
  GameInstanceDetails,
  SearchGameInstance,
} from "@/types/GameInstance";
import { Opinion } from "@/types/Opinion";
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

  static async getByUUID(uuid: string) {
    const { data: instance } = await Api.get<GameInstanceDetails>(`game-instances/${uuid}`);
    return instance;
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
    userUUID?: string,
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
          userUUID,
        },
      },
    );
    return gameInstances;
  }

  static async getAllGameInstanceOpinions(uuid: string, page: number, size: number) {
    const { data: opinions } = await Api.get<Paginated<Opinion>>(
      `game-instances/${uuid}/opinions`,
      {
        params: { page, size },
      },
    );
    return opinions;
  }
}
