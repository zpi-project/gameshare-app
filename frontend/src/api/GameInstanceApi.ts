import { GameInstance } from "@/types/GameInstance";
import {
  GameInstanceSearchParams,
  GameInstanceDetails,
  SearchGameInstance,
  NewGameInstance,
} from "@/types/GameInstance";
import { Opinion } from "@/types/Opinion";
import { Paginated } from "@/types/Paginated";
import { ReservationTimeframe, Timeframe } from "@/types/Reservation";
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

  static async create(gameInstance: NewGameInstance) {
    const { data } = await Api.post<GameInstance>(`game-instances`, gameInstance);
    return data;
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

  static async getReservations(uuid: string, month: number, year: number) {
    const { data: reservations } = await Api.get<ReservationTimeframe[]>(
      `/game-instances/${uuid}/reservations`,
      { params: { year, month } },
    );
    return reservations;
  }

  static async getNonAvailability(uuid: string, month: number, year: number) {
    const { data: timeframes } = await Api.get<Timeframe[]>(
      `/game-instances/${uuid}/availability`,
      { params: { year, month } },
    );

    return timeframes;
  }

  static async checkAvailability(uuid: string, startDate: Date, endDate: Date) {
    // const { data: isAvailable } = await Api.get<boolean>(
    //   `/game-instances/${uuid}/timeframes/avaliable`,
    //   { params: { startDate, endDate } },
    // );
    await new Promise(resolve => setTimeout(resolve, 1000));
    return false;
  }
}
