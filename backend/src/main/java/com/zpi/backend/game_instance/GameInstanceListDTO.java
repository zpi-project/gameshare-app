package com.zpi.backend.game_instance;

import com.zpi.backend.game.GameListDTO;
import com.zpi.backend.user.UserDTO;
import com.zpi.backend.user.UserGameInstanceDTO;
import com.zpi.backend.user.UserGuestDTO;
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
    private double avgRating;
    private boolean isActive;
    private UserGuestDTO owner;

    public GameInstanceListDTO(GameInstance gameInstance, boolean isGuest){
        uuid = gameInstance.getUuid();
        shortDescription = gameInstance.getDescription();
        pricePerDay = gameInstance.getPricePerDay();
        isActive = gameInstance.isActive();
        game = new GameListDTO(gameInstance.getGame());
        avgRating = (double) Math.round(gameInstance.getAvgRating() * 100) /100;
        if (isGuest)
            owner = new UserGuestDTO(gameInstance.getOwner());
        else
            owner = new UserDTO(gameInstance.getOwner());
    }
}
