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

export interface GameInstanceDetails extends GameInstance {
  images: Image[];
  owner: User;
}

export interface SearchGameInstance extends GameInstance {
  owner: User;
}

// endpoint do searchu instancji
// Paginated<SearchGameInstance> sorted by distance from location + optional filters + optional filter - userUUID

//endpoint do searchu userów na mapie - piny
// Paginated<User> sorted by distance from location + optional filters

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
