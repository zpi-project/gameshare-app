package com.zpi.backend.game_instance.dto;

import com.zpi.backend.game.dto.GameDTO;
import com.zpi.backend.game_instance.GameInstance;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameInstanceDTO {
    private String uuid;
    private String description;
    private double pricePerDay;
    private GameDTO game;
    private double avgRating;
    private int opinionsAmount;
    private boolean isActive;

    public GameInstanceDTO(GameInstance gameInstance){
        uuid = gameInstance.getUuid();
        description = gameInstance.getDescription();
        pricePerDay = gameInstance.getPricePerDay();
        isActive = gameInstance.isActive();
        game = new GameDTO(gameInstance.getGame());
        avgRating = (double) Math.round(gameInstance.getAvgRating() * 100) /100;
        opinionsAmount = gameInstance.getOpinionsAmount();
    }

}
