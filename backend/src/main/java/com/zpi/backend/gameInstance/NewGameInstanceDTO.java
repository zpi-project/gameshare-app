package com.zpi.backend.gameInstance;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;
import java.util.List;

@Data
@NoArgsConstructor
public class NewGameInstanceDTO {
    private long gameId;
    private String description;
    private double pricePerDay;
    private List<Blob> images;
}
