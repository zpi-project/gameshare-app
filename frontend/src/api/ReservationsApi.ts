import { getPaginatedReservations } from "@cypress/fixtures/reservations";
import { ReservationQueryParams } from "@/types/Reservation";

export class ReservationsApi {
  static async getAll(page: number, size: number, queryParams: ReservationQueryParams) {
    await new Promise(resolve => setTimeout(resolve, 600));
    return getPaginatedReservations(page, size);
  }
}
