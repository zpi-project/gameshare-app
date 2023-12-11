import { ReservationTimeframe, Timeframe } from "@/types/Reservation";

export const availabilityCurrMonth: Timeframe[] = [
  {
    startDate: "2023-12-22T23:00:00.000+00:00",
    endDate: "2023-12-24T23:00:00.000+00:00",
  },
  {
    startDate: "2023-12-27T23:00:00.000+00:00",
    endDate: "2023-12-29T23:00:00.000+00:00",
  },
];

export const availabilityNextMonth: Timeframe[] = [];

export const reservationsCurrMonth: ReservationTimeframe[] = [
  {
    startDate: "2023-12-22T23:00:00.000+00:00",
    endDate: "2023-12-24T23:00:00.000+00:00",
    reservationId: "2023-12-22",
  },
  {
    startDate: "2023-12-27T23:00:00.000+00:00",
    endDate: "2023-12-29T23:00:00.000+00:00",
    reservationId: "2023-12-27",
  },
];

export const reservationsNextMonth: ReservationTimeframe[] = [];
export const reservationsPrevMonth: ReservationTimeframe[] = [];
