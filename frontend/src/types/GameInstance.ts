import { Game } from "./Game";
import { Image } from "./Image";
import { User } from "./User";

export interface GameInstance {
  uuid: string;
  description: string;
  pricePerDay: number;
  game: Game;
  avgRating: number;
  active: boolean;
}

export interface NewGameInstance {
  description: string;
  pricePerDay: number;
  gameId: number;
}

export interface GameInstanceDetails extends GameInstance {
  images: Image[];
  owner: User;
}

export interface SearchGameInstance extends GameInstance {
  owner: User;
}

export interface GameInstanceSearchParams {
  searchName?: string;
  categoryId?: number;
  age?: number;
  playersNumber?: number;
  maxPricePerDay?: number;
}
