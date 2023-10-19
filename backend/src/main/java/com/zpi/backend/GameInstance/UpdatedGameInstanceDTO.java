package com.zpi.backend.GameInstance;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatedGameInstanceDTO {
    private String description;
    private double pricePerDay;
}
