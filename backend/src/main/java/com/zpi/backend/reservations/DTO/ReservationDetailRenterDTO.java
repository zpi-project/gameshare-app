package com.zpi.backend.reservations.DTO;

import com.zpi.backend.reservations.Reservation;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ReservationDetailRenterDTO extends ReservationDetailDTO{
    private boolean canAddOwnerOpinion;
    private boolean canAddGameInstanceOpinion;


    public ReservationDetailRenterDTO(Reservation reservation, boolean canAddOwnerOpinion, boolean canAddGameInstanceOpinion) {
        super(reservation);
        this.canAddOwnerOpinion = canAddOwnerOpinion;
        this.canAddGameInstanceOpinion = canAddGameInstanceOpinion;
    }
}
