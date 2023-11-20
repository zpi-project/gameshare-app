package com.zpi.backend.game_instance.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor

public class GameInstanceUnAvailabilityDTO {
    Date startDate;
    Date endDate;

    public GameInstanceUnAvailabilityDTO(Date startDate, Date endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}