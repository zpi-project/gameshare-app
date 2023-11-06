import { Category } from "./Category";

export type GameStatusType = "Accepted" | "Rejected" | "Pending";

export interface GameStatus {
  id: number;
  status: GameStatusType;
}

export interface Game {
  id: number;
  originalId: number;
  name: string;
  categories: Category[];
  minPlayers: number;
  maxPlayers: number;
  playingTime: number;
  age: number;
  shortDescription: string;
  image: string;
  gameStatus: GameStatus;
}
