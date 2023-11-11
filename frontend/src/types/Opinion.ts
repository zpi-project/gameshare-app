import { User } from "./User";

export interface Opinion {
  id: number
  ratedUser: User	
  ratingUser: User
  stars: number
  description: string
  timestamp: Timestamp
  ratingUserOwner: boolean
}

export interface Timestamp {
  value: number
  dateOnly: boolean
  timeZoneShift: number
}
