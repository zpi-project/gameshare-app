export interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  locationLatitude: number;
  locationLongitude: number;
  email?: string;
  avatarLink: string;
}

export interface NewUser {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  locationLatitude: number;
  locationLongitude: number;
}
