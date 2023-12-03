import { User } from "./User";

export interface Opinion {
  id: number;
  timestamp: string;
  stars: number;
  description: string;
  ratingUser: User;
}

export interface NewOpinion {
  ratedUserUUID: string;
  stars: number;
  description: string;
  reservationId: string;
}
