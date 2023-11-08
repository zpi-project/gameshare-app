package com.zpi.backend.gameInstance;

import com.zpi.backend.game.GameDTO;
import com.zpi.backend.game.GameListDTO;
import com.zpi.backend.user.UserGameDTO;
import com.zpi.backend.user.UserGameGuestDTO;
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

    public GameInstanceListDTO(GameInstance gameInstance){
        uuid = gameInstance.getUuid();
        shortDescription = gameInstance.getDescription();
        pricePerDay = gameInstance.getPricePerDay();
        isActive = gameInstance.isActive();
        game = new GameListDTO(gameInstance.getGame());
    }

}
