import { Paginated } from "@/types/Paginated";
import { NewReservation, Reservation, ReservationDetails, ReservationQueryParams, ReservationStatusType } from "@/types/Reservation";
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
    console.log(newReservation);
    const { data: reservation } = await Api.post<Reservation>("/reservations", {
      ...newReservation,
      startDate: new Date(newReservation.startDate.setHours(0, 0, 0, 0)),
      endDate: new Date(newReservation.endDate.setHours(0, 0, 0, 0)),
    });
    return reservation;
  }

  static async getStatuses(reservationId: string) {
    const { data: statuses } = await Api.get<ReservationStatusType[]>(
      `/reservations/${reservationId}/statuses`,
    );
    return statuses;
  }

  static async changeStatus(reservationId: string, status: ReservationStatusType) {
    const { data } = await Api.put<Reservation>(
      `/reservations/${reservationId}/status?status=${status}`,
    );
    return data;
  }
}