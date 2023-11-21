import { Paginated } from "@/types/Paginated";
import { Reservation, ReservationQueryParams } from "@/types/Reservation";
import Api from "./Api";

export class ReservationsApi {
  static async getAll(page: number, size: number, queryParams: ReservationQueryParams) {
    const { data: reservations } = await Api.get<Paginated<Reservation>>("/reservations", {
      params: { page, size, ...queryParams },
    });
    console.log(reservations);
    return reservations;
  }
}
