package com.zpi.backend.reservations.DTO;

import com.zpi.backend.reservations.Reservation;
import lombok.Data;

@Data
public class ReservationDetailDTO {
    Reservation reservation;
    public ReservationDetailDTO(Reservation reservation) {
        this.reservation = reservation;
    }
}
