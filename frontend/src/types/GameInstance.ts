import { GameInfo } from "./Game";
import { User } from "./User";

export interface GameInstance {
  uuid: string;
  description: string;
  pricePerDay: 0;
  game: GameInfo;
  avgRating: number;
  active: boolean;
}

export interface GameInstanceSearchParams {
  searchName?: string;
  categoryId?: number;
  age?: number;
  playersNumber?: number;
  maxPricePerDay?: number;
}

export interface SearchUserGameInstances {
  owner: User;
  gameInstances: GameInstance[];
}
