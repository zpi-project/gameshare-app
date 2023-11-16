package com.zpi.backend.game_instance.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
public class GameInstanceUnAvailabilityReservationDTO extends GameInstanceUnAvailabilityDTO {
    private String reservationUuid;

    public GameInstanceUnAvailabilityReservationDTO(Date startDate, Date endDate, String uuid) {
        super(startDate, endDate);
        this.reservationUuid = uuid;
    }
}
