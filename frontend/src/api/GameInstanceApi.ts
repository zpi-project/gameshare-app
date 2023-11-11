import { GameInstance } from "@/types/Game";
import { Paginated } from "@/types/Paginated";
import Api from "./Api";

export class GameInstanceApi {
  static async getInstancesByOwnerUUID(uuid: string, page: number, size: number) {
    const { data: instances } = await Api.get<Paginated<GameInstance>>(
      `game-instances/user/${uuid}`,
      { params: { page, size } },
    );
    return instances;
  }
}
