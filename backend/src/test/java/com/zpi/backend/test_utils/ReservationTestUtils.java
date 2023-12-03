package com.zpi.backend.test_utils;

import com.zpi.backend.reservation_status.ReservationStatus;
import com.zpi.backend.reservations.DTO.NewReservationDTO;
import com.zpi.backend.reservations.Reservation;
import com.zpi.backend.role.Role;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

public class ReservationTestUtils {
    public static NewReservationDTO createNewReservationDTO() {
        NewReservationDTO newReservationDTO = new NewReservationDTO();
        newReservationDTO.setGameInstanceUUID("uuid");
        LocalDate today = LocalDate.now();


        // Jutrzejsza data
        LocalDate tomorrow = today.plusDays(1);

        LocalDate dayAfterTomorrow = today.plusDays(2);

        // Konwersja LocalDate na Date
        Date tomorrowAsDate = Date.from(tomorrow.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date dayAfterTomorrowAsDate = Date.from(dayAfterTomorrow.atStartOfDay(ZoneId.systemDefault()).toInstant());
        newReservationDTO.setStartDate(tomorrowAsDate);
        newReservationDTO.setEndDate(dayAfterTomorrowAsDate);

        return newReservationDTO;
    }

    public static Reservation createReservation() {
        Reservation reservation = new Reservation();
        reservation.setId(1L);
        reservation.setGameInstance(GameInstanceTestUtils.createGameInstance());
        reservation.setRenter(UserTestUtils.createUser(Role.USER));
        reservation.setStatus(ReservationStatusTestUtils.createReservationStatus(ReservationStatus.PENDING));
        LocalDate today = LocalDate.now();

        // Jutrzejsza data
        LocalDate tomorrow = today.plusDays(1);

        // Konwersja LocalDate na Date
        Date todayAsDate = Date.from(today.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date tomorrowAsDate = Date.from(tomorrow.atStartOfDay(ZoneId.systemDefault()).toInstant());
        reservation.setStartDate(todayAsDate);
        reservation.setEndDate(tomorrowAsDate);
        return reservation;
    }
}
