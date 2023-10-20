package com.zpi.backend.gameInstance;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatedGameInstanceDTO {
    private String description;
    private double pricePerDay;
}
