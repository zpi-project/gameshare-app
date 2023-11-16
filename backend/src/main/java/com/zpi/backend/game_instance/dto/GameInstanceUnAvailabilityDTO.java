package com.zpi.backend.game_instance.dto;

import lombok.Data;
import org.springframework.data.util.Pair;

import java.util.Date;
import java.util.List;

@Data
public class GameInstanceUnAvailabilityDTO {
    Date startDate;
    Date endDate;

    public GameInstanceUnAvailabilityDTO(Date startDate, Date endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}