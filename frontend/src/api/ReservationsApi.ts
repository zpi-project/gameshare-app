import { Paginated } from "@/types/Paginated";
import {
  NewReservation,
  Reservation,
  ReservationDetails,
  ReservationQueryParams,
} from "@/types/Reservation";
import Api from "./Api";

export class ReservationsApi {
  static async getAll(page: number, size: number, queryParams: ReservationQueryParams) {
    const { data: reservations } = await Api.get<Paginated<Reservation>>("/reservations", {
      params: { page, size, ...queryParams },
    });
    return reservations;
  }

  static async getDetails(reservationId: string) {
    const { data: reservationDetails } = await Api.get<ReservationDetails>(
      `reservations/${reservationId}/details`,
    );
    return reservationDetails;
  }

  static async create(newReservation: NewReservation) {
    const { data: reservation } = await Api.post<Reservation>("/reservations", newReservation);
    return reservation;
  }
}
