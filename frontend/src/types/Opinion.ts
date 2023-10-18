import { User } from "./User";

export interface Opinion {
  user: User;
  stars: number;
  description: string;
}
