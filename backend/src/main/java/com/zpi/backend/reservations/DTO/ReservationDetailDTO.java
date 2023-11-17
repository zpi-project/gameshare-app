package com.zpi.backend.reservations.DTO;

import com.zpi.backend.game_instance_opinion.GameInstanceOpinion;
import com.zpi.backend.reservations.Reservation;
import com.zpi.backend.user_opinion.UserOpinion;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReservationDetailDTO {
    Reservation reservation;
    boolean canAddRenterOpinion;
    boolean canAddOwnerOpinion;
    boolean canAddGameInstanceOpinion;

    UserOpinion ownerOpinion;
    UserOpinion renterOpinion;
    GameInstanceOpinion gameInstanceOpinion;

}
