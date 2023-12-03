import { Game, NewGame } from "@/types/Game";
import { GameInstanceDetails } from "@/types/GameInstance";
import { Paginated } from "@/types/Paginated";
import Api from "./Api";

export class GameApi {
  static async getPopular(page: number, size: number) {
    const { data: games } = await Api.get<Paginated<Game>>("/games/popular", {
      params: { page, size },
    });
    return games;
  }

  static async search(page: number, size: number, search?: string, categoriesIds?: number[]) {
    const { data: games } = await Api.get<Paginated<Game>>("/games", {
      params: { page, size, search, categoriesIds: categoriesIds?.join(",") },
    });
    return games;
  }

  static async getOne(id: number) {
    const { data: game } = await Api.get<Game>(`/games/${id}`);
    return game;
  }

  static async create(game: NewGame) {
    const { data } = await Api.post<Game>("/games", game);
    return data;
  }

  static async addImage(gameId: number, file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await Api.post<{
      id: number;
      fileName: string;
      fileURL: string;
    }>(`/games/${gameId}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  }

  static async getInstances(
    id: number,
    page: number,
    size: number,
    latitude: number,
    longitude: number,
  ) {
    const { data: gameInstances } = await Api.get<Paginated<GameInstanceDetails>>(
      `/games/${id}/users`,
      { params: { page, size, latitude, longitude } },
    );
    return gameInstances;
  }

  static async getPending(page: number, size: number) {
    const { data: games } = await Api.get<Paginated<Game>>("/games/pending", {
      params: { page, size },
    });
    return games;
  }

  static async accept(id: number) {
    const { data } = await Api.put(`/games/${id}/accept`);
    return data;
  }

  static async reject(id: number) {
    const { data } = await Api.put(`/games/${id}/reject`);
    return data;
  }
}
