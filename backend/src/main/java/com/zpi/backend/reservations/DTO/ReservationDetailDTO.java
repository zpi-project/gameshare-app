package com.zpi.backend.reservations.DTO;

import com.zpi.backend.game_instance_opinion.dto.GameInstanceOpinionDTO;
import com.zpi.backend.user_opinion.dto.UserOpinionDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReservationDetailDTO {
    ReservationDTO reservation;
    boolean canAddRenterOpinion;
    boolean canAddOwnerOpinion;
    boolean canAddGameInstanceOpinion;

    UserOpinionDTO ownerOpinion;
    UserOpinionDTO renterOpinion;
    GameInstanceOpinionDTO gameInstanceOpinion;

}
