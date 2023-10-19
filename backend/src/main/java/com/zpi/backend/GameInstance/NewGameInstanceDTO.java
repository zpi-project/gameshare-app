package com.zpi.backend.GameInstance;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class NewGameInstanceDTO {
    private long gameId;
    private long userId;
    private String description;
    private double pricePerDay;
    private List<String> images;
}
