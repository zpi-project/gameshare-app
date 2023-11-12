import { User } from "./User";

export interface Opinion {
  id: number;
  timestamp: string;
  stars: number;
  description: string;
  ratingUser: User;
}
