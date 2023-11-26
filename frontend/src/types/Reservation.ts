import { RESERVATION_STATUSES } from "@/constants/reservationStatuses";
import { GameInstanceDetails } from "./GameInstance";
import { Opinion } from "./Opinion";
import { User } from "./User";

export type ReservationStatusType = (typeof RESERVATION_STATUSES)[number];

export interface ReservationStatus {
  id: number;
  status: ReservationStatusType;
}

export interface Reservation {
  reservationId: string;
  renter: User;
  startDate: string;
  endDate: string;
  status: ReservationStatusType;
  gameInstance: GameInstanceDetails;
  renterComment: string | null;
  timestamp: string;
  duration: number;
}

export interface ReservationDetails {
  reservation: Reservation;
  canAddRenterOpinion: boolean;
  canAddOwnerOpinion: boolean;
  canAddGameInstanceOpinion: boolean;
  ownerOpinion: Opinion | null;
  renterOpinion: Opinion | null;
  gameInstanceOpinion: Opinion | null;
}

export interface ReservationQueryParams {
  status?: ReservationStatusType;
  asOwner: boolean;
}

export interface Timeframe {
  startDate: string;
  endDate: string;
}

export interface ReservationTimeframe extends Timeframe {
  reservationId: string;
}

export interface NewReservation {
  startDate: Date;
  endDate: Date;
  renterComment?: string;
  gameInstanceUUID: string;
}
