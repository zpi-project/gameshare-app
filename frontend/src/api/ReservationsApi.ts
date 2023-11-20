import { getPaginatedReservations } from "@cypress/fixtures/reservations";
import { NewReservation, Reservation, ReservationQueryParams } from "@/types/Reservation";
import Api from "./Api";

export class ReservationsApi {
  static async getAll(page: number, size: number, queryParams: ReservationQueryParams) {
    //     const { data: reservations } = await Api.get("/reservations", {
    //   params: { page, size, ...queryParams },
    // });
    // return reservations;
    await new Promise(resolve => setTimeout(resolve, 600));
    return getPaginatedReservations(page, size);
  }

  static async create(newReservation: NewReservation) {
    const { data: reservation } = await Api.post<Reservation>("/reservations", newReservation);
    return reservation;
  }
}
