package com.zpi.backend.test_utils;

import com.zpi.backend.reservation_status.ReservationStatus;

public class ReservationStatusTestUtils {
    public static ReservationStatus createReservationStatus(String status) {
        ReservationStatus reservationStatus = new ReservationStatus();
        reservationStatus.setId(1L);
        reservationStatus.setStatus(status);
        return reservationStatus;
    }
}
