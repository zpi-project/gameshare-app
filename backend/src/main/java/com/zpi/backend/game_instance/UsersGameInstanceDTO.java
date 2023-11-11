package com.zpi.backend.game_instance;

import com.zpi.backend.game.GameListDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsersGameInstanceDTO {
    private String uuid;
    private String description;
    private double pricePerDay;
    private GameListDTO game;
    private double avgRating;
    private boolean isActive;

    public UsersGameInstanceDTO(GameInstance gameInstance){
        uuid = gameInstance.getUuid();
        description = gameInstance.getDescription();
        pricePerDay = gameInstance.getPricePerDay();
        game = new GameListDTO(gameInstance.getGame());
        avgRating = (double) Math.round(gameInstance.getAvgRating() * 100) /100;
        isActive = gameInstance.isActive();
    }
}
