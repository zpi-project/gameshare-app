import { GameInstance } from "@/types/Game";
import Api from "./Api";

export class GameInstanceApi {
  static async getInstancesByOwnerUUID(uuid: string) {
    const { data: instances } = await Api.get<[GameInstance]>(`game-instances/user/${uuid}`);
    return instances;
  }
}
