import { getPaginatedReservations } from "@cypress/fixtures/reservations";
import { ReservationQueryParams } from "@/types/Reservation";

export class ReservationsApi {
  static async getAll(page: number, size: number, queryParams: ReservationQueryParams) {
    //     const { data: reservations } = await Api.get("/reservations", {
    //   params: { page, size, ...queryParams },
    // });
    // return reservations;
    await new Promise(resolve => setTimeout(resolve, 600));
    return getPaginatedReservations(page, size);
  }
}
