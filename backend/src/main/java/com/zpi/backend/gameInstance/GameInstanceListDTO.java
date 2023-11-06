package com.zpi.backend.gameInstance;

import com.zpi.backend.game.GameListDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameInstanceListDTO {
    private String uuid;
    private String shortDescription;
    private double pricePerDay;
    private GameListDTO game;
    private boolean isActive;

}
