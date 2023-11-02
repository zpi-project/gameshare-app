import { Category } from "./Category";

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
  accepted: boolean;
}
