export interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  locationLatitude: number;
  locationLongitude: number;
  avatarLink: string;
  avgRating: number;
  opinionsAmount: number;
  phoneNumber?: string;
}

export interface NewUser {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  locationLatitude: number;
  locationLongitude: number;
}

export interface RatingRatedUser {}
