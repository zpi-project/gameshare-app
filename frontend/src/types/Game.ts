import { Category } from "./Category";

export type GameStatus = "Accepted" | "Rejected" | "Pending";

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
