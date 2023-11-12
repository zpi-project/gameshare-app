package com.zpi.backend.reservations.DTO;

import com.zpi.backend.reservations.Reservation;
import lombok.Data;


public class ReservationDetailOwnerDTO extends ReservationDetailDTO {
    private Boolean canAddRenterOpinion;

    public ReservationDetailOwnerDTO(Reservation reservation,boolean canAddRenterOpinion) {
        super(reservation);
        this.canAddRenterOpinion = canAddRenterOpinion;
    }
}
